import assert from 'node:assert/strict'
import test from 'node:test'
import { setImmediate as flush } from 'node:timers/promises'
import { createPinia } from 'pinia'
import { createDynamometer } from '../src/services/dynamometer.js'
import { useMeasurementSave } from '../src/composables/useMeasurementSave.js'
import { useSessionStore } from '../src/stores/auth.js'
import { useDataStore } from '../src/stores/data.js'

const id = 42
const series = [{ t: 0, f: -0.03012345 }, { t: 0.025, f: 12.75012345 }]
const payload = { status: 'finished', measurements: series }
const lines = 'DATA,0,-0.03012345\nDATA,25,12.75012345\n'

async function setup (t, beforePatch = async () => {}) {
  let record = { id, status: 'running', seconds: 30, measurements: [] }
  const calls = []
  function newStore () {
    const pinia = createPinia()
    useSessionStore(pinia).request = async (path, options = {}) => {
      assert.equal(path, '/assessments/42/')
      calls.push(structuredClone(options))
      if (options.method === 'PATCH') {
        await beforePatch()
        record = { ...record, ...structuredClone(options.body) }
      }
      return structuredClone(record)
    }
    return useDataStore(pinia)
  }
  const store = newStore()
  const finished = []
  const submission = useMeasurementSave(id, store.updateTest, saved => finished.push(saved))
  const samples = []
  let input
  const write = text => input.enqueue(new TextEncoder().encode(text))
  const port = {
    open () {}, close () {},
    readable: new ReadableStream({ start (controller) { input = controller } }),
    writable: new WritableStream({ write (bytes) {
      if (new TextDecoder().decode(bytes) === 'STOP\n') write('END\n')
    } }),
  }
  const device = createDynamometer({
    onState () {}, onError () {},
    onSample: sample => samples.push(sample),
    onEnd: () => submission.finish(samples),
  })
  await device.connect(port)
  await device.start(30, false)
  t.after(() => device.dispose())
  return { device, write, input, samples, submission, store, newStore, calls, finished }
}

test('END envia uma série completa e aguarda confirmação, mesmo com END duplicado', async t => {
  let confirm
  const ctx = await setup(t, () => new Promise(resolve => { confirm = resolve }))
  ctx.write(lines + 'END\nEND\n')
  await flush()
  await ctx.submission.retry()
  assert.deepEqual(ctx.calls, [{ method: 'PATCH', body: payload }])
  assert.equal(ctx.submission.saving.value, true)
  assert.deepEqual(ctx.finished, [])
  confirm()
  await flush()
  assert.deepEqual(ctx.finished, [id])
  const result = await ctx.newStore().loadTest(id)
  assert.equal(result.status, 'finished')
  assert.deepEqual(result.measurements, series)
  assert.deepEqual(ctx.calls.at(-1), {})
})

test('END sem amostras não finaliza; resultado antigo com série vazia carrega', async t => {
  const ctx = await setup(t)
  ctx.write('END\n')
  await flush()
  assert.deepEqual(ctx.calls, [])
  await ctx.store.updateTest(id, 'finished')
  assert.deepEqual((await ctx.newStore().loadTest(id)).measurements, [])
})

for (const reason of ['desconexão física', 'desconexão manual', 'cancelamento', 'desmontagem']) {
  test(reason + ' durante a coleta não salva medições', async t => {
    const ctx = await setup(t)
    ctx.write(lines)
    await flush()
    assert.deepEqual(ctx.samples, series)
    if (reason === 'desconexão física') ctx.input.error(new Error('USB removido'))
    else if (reason === 'desmontagem') await ctx.device.dispose()
    else await ctx.device.disconnect()
    if (reason === 'cancelamento') await ctx.store.updateTest(id, 'cancelled')
    await flush()
    assert.deepEqual(ctx.calls, reason === 'cancelamento' ? [{ method: 'PATCH', body: { status: 'cancelled' } }] : [])
    assert.deepEqual(ctx.finished, [])
  })
}

test('falha de rede preserva o lote e reenvia os mesmos valores e ID', async t => {
  let first = true
  const ctx = await setup(t, () => {
    if (first) { first = false; throw new Error('Rede indisponível') }
  })
  ctx.write(lines)
  await ctx.device.stop()
  await flush()
  assert.equal(ctx.submission.error.value, 'Rede indisponível')
  assert.deepEqual(ctx.finished, [])
  await ctx.submission.finish([{ t: 9, f: 999 }])
  ctx.samples.length = 0
  await ctx.submission.retry()
  assert.deepEqual(ctx.calls, Array(2).fill({ method: 'PATCH', body: payload }))
  assert.deepEqual(ctx.finished, [id])
})
