// Protocolo e tara adaptados de apert_sensor/visualizer/index.html.
let pendingSelection

export function requestDynamometerPort () {
  if (!navigator.serial) throw new Error('Web Serial indisponível. Use Chrome ou Edge no computador, em HTTPS ou localhost.')
  return navigator.serial.requestPort()
}

export function rememberTestPort (testId, port) {
  pendingSelection = { testId: String(testId), port }
}

export function takeTestPort (testId) {
  if (pendingSelection?.testId !== String(testId)) return
  const { port } = pendingSelection
  pendingSelection = undefined
  return port
}

export function createDynamometer ({ onState, onError, onSample, onEnd }) {
  let port, reader, writer, reading, closing
  let disposed = false
  let collecting = false
  let tare = false
  let tareBuf = []
  let tareOffset = 0

  function handleLine (line) {
    if (line.startsWith('ERRO')) onError(line)
    if (line === 'END' && collecting) {
      collecting = false
      onEnd()
    }
    if (!collecting || !line.startsWith('DATA,')) return
    const parts = line.split(',')
    if (parts.length !== 3 || !parts[1].trim() || !parts[2].trim()) return
    const tMs = Number(parts[1])
    const rawForce = Number(parts[2])
    if (!Number.isFinite(tMs) || !Number.isFinite(rawForce)) return
    if (tare && tareBuf.length < 10) {
      tareBuf.push(rawForce)
      tareOffset = tareBuf.reduce((a, b) => a + b, 0) / tareBuf.length
    }
    onSample({ t: tMs / 1000, f: rawForce - tareOffset })
  }

  async function readLoop () {
    const decoder = new TextDecoder()
    let lineBuffer = ''
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        lineBuffer += decoder.decode(value, { stream: true })
        const lines = lineBuffer.split('\n')
        lineBuffer = lines.pop()
        for (const line of lines) handleLine(line.trim())
      }
    } finally {
      reader.releaseLock()
      reader = null
    }
  }

  function sendCommand (cmd) {
    return writer.write(new TextEncoder().encode(cmd + '\n'))
  }

  function disconnect () {
    if (!port || closing) return closing
    const shouldStop = collecting
    collecting = false
    onState('disconnecting')
    closing = Promise.resolve().then(async () => {
      try {
        if (shouldStop && writer) await sendCommand('STOP')
      } catch (error) { onError(error.message) }
      try {
        await reader?.cancel()
      } catch (error) { onError(error.message) }
      await reading?.catch(() => {})
      writer?.releaseLock()
      try { await port.close() } catch (error) { onError(error.message) }
      port = reader = writer = reading = closing = null
      onState('disconnected')
    })
    return closing
  }

  async function connect (selectedPort) {
    onState('connecting')
    try {
      const selected = selectedPort ?? await requestDynamometerPort()
      if (disposed) return
      await selected.open({ baudRate: 115200 })
      port = selected
      if (disposed) return await disconnect()
      writer = port.writable.getWriter()
      reader = port.readable.getReader()
      reading = readLoop()
      reading.catch(() => {}).then(() => {
        if (!closing && port) {
          onError('A leitura USB foi interrompida. Reconecte o dinamômetro.')
          disconnect()
        }
      })
      onState('connected')
    } catch (error) {
      if (error.name !== 'NotFoundError') onError(error.message)
      if (port) await disconnect()
      else onState('disconnected')
    }
  }

  async function command (cmd) {
    try { await sendCommand(cmd) } catch (error) {
      onError(error.message)
      await disconnect()
    }
  }

  return {
    connect, disconnect,
    start (seconds, zero) {
      if (![30, 60].includes(seconds) || collecting || !writer) return
      tare = zero
      tareBuf = []
      tareOffset = 0
      collecting = true
      return command('START' + seconds)
    },
    stop: () => command('STOP'),
    dispose () { disposed = true; return disconnect() },
  }
}
