<script setup>
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { Chart, LineController, LineElement, PointElement, LinearScale, Tooltip } from 'chart.js'

  Chart.register(LineController, LineElement, PointElement, LinearScale, Tooltip)
  const props = defineProps({
    samples: { type: Array, required: true },
    seconds: { type: Number, required: true },
  })
  const canvas = ref(null)
  let chart
  let frame
  function draw () {
    frame = undefined
    chart.data.datasets[0].data = props.samples.map(({ t, f }) => ({ x: t, y: f }))
    chart.options.scales.x.suggestedMax = props.seconds
    chart.update('none')
  }
  onMounted(() => {
    chart = new Chart(canvas.value, {
      type: 'line',
      data: { datasets: [{ label: 'Força (N)', borderColor: '#2563eb', borderWidth: 1.5, pointRadius: 0, pointHitRadius: 6, data: [] }] },
      options: {
        responsive: true, maintainAspectRatio: false, parsing: false, animation: false,
        scales: {
          x: { type: 'linear', min: 0, title: { display: true, text: 'Tempo (s)' }, grid: { display: false } },
          y: { beginAtZero: true, title: { display: true, text: 'Força (N)' }, ticks: { maxTicksLimit: 6 } },
        },
      },
    })
    draw()
  })
  watch([() => props.samples, () => props.samples.length, () => props.seconds], () => {
    frame ??= requestAnimationFrame(draw)
  })
  onBeforeUnmount(() => { cancelAnimationFrame(frame); chart?.destroy() })
</script>

<template>
  <section>
    <h2 class="text-h6 font-weight-bold px-5 py-4">Força x Tempo</h2>
    <v-divider />
    <div class="chart-area"><canvas ref="canvas" role="img" aria-label="Força em newtons ao longo do tempo em segundos" /></div>
    <p v-if="!samples.length" class="text-body-2 px-5 pb-3">Nenhuma medição registrada.</p>
  </section>
</template>

<style scoped>
.chart-area { position: relative; height: clamp(200px, 25vw, 300px); padding: 16px; }
</style>
