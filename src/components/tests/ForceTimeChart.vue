<script setup>
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { Chart, Filler, LinearScale, LineController, LineElement, PointElement, Tooltip } from 'chart.js'
  import { measurementSummary } from '@/services/assessments'
  import { formatMeasure } from '@/utils/number'

  Chart.register(LineController, LineElement, PointElement, LinearScale, Tooltip, Filler)

  const props = defineProps({
    samples: { type: Array, required: true },
    seconds: { type: Number, required: true },
    title: { type: String, default: 'Força x tempo' },
    showPeak: { type: Boolean, default: true },
    showTable: { type: Boolean, default: true },
  })

  // Validated with the dataviz palette checker against a white surface.
  const LINE = '#1F6FD1'
  const INK_MUTED = '#64748B'
  const GRID = 'rgba(15, 23, 42, 0.06)'
  const SURFACE = '#FFFFFF'
  const MONO = "'IBM Plex Mono', ui-monospace, monospace"

  const canvas = ref(null)
  const tableOpen = ref(false)
  const summary = computed(() => props.showPeak ? measurementSummary(props.samples) : null)
  // One row per second keeps the accessible table readable.
  const tableRows = computed(() => {
    const rows = []
    let next = 0
    for (const sample of props.samples) {
      if (sample.t >= next) {
        rows.push(sample)
        next = Math.floor(sample.t) + 1
      }
    }
    return rows
  })

  let chart
  let frame

  // Vertical guide under the hovered time.
  const crosshair = {
    id: 'crosshair',
    afterDatasetsDraw (instance) {
      const active = instance.tooltip?.getActiveElements?.()
      if (!active?.length) return
      const { ctx, chartArea } = instance
      const x = active[0].element.x
      ctx.save()
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.24)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(x, chartArea.top)
      ctx.lineTo(x, chartArea.bottom)
      ctx.stroke()
      ctx.restore()
    },
  }

  // Direct label next to the peak marker.
  const peakLabel = {
    id: 'peakLabel',
    afterDatasetsDraw (instance) {
      const peak = instance.data.datasets[1]?.data?.[0]
      const point = instance.getDatasetMeta(1)?.data?.[0]
      if (!peak || !point) return
      const { ctx, chartArea } = instance
      const text = `Pico ${formatMeasure(peak.y)} N`
      ctx.save()
      ctx.font = `500 12px ${MONO}`
      const width = ctx.measureText(text).width
      let x = point.x + 10
      if (x + width > chartArea.right) x = point.x - 10 - width
      const y = Math.max(chartArea.top + 12, point.y - 12)
      ctx.fillStyle = '#0F172A'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, x, y)
      ctx.restore()
    },
  }

  function datasets () {
    const points = props.samples.map(({ t, f }) => ({ x: t, y: f }))
    const peak = summary.value ? [{ x: summary.value.peakTime, y: summary.value.peak }] : []
    return [
      {
        label: 'Força',
        data: points,
        borderColor: LINE,
        borderWidth: 2,
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
        backgroundColor: 'rgba(31, 111, 209, 0.08)',
        fill: 'origin',
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: LINE,
        pointHoverBorderColor: SURFACE,
        pointHoverBorderWidth: 2,
        tension: 0,
      },
      {
        label: 'Pico',
        data: peak,
        pointRadius: 5,
        pointHoverRadius: 5,
        pointBackgroundColor: LINE,
        pointBorderColor: SURFACE,
        pointBorderWidth: 2,
        showLine: false,
      },
    ]
  }

  function draw () {
    frame = undefined
    if (!chart) return
    chart.data.datasets = datasets()
    chart.options.scales.x.suggestedMax = props.seconds
    chart.update('none')
  }

  onMounted(() => {
    chart = new Chart(canvas.value, {
      type: 'line',
      data: { datasets: datasets() },
      plugins: [crosshair, peakLabel],
      options: {
        locale: 'pt-BR',
        responsive: true,
        maintainAspectRatio: false,
        parsing: false,
        animation: false,
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            filter: item => item.datasetIndex === 0,
            displayColors: false,
            backgroundColor: '#0F172A',
            padding: 10,
            cornerRadius: 8,
            titleFont: { family: MONO, weight: '500', size: 12 },
            bodyFont: { family: MONO, size: 12 },
            callbacks: {
              title: items => `${formatMeasure(items[0].parsed.x, 2)} s`,
              label: item => `Força ${formatMeasure(item.parsed.y)} N`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            suggestedMax: props.seconds,
            title: { display: true, text: 'Tempo (s)', color: INK_MUTED, font: { family: 'Inter', size: 12 } },
            grid: { display: false },
            border: { color: 'rgba(15, 23, 42, 0.16)' },
            ticks: { color: INK_MUTED, font: { family: MONO, size: 11 }, maxTicksLimit: 8 },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Força (N)', color: INK_MUTED, font: { family: 'Inter', size: 12 } },
            grid: { color: GRID },
            border: { display: false },
            ticks: { color: INK_MUTED, font: { family: MONO, size: 11 }, maxTicksLimit: 6 },
          },
        },
      },
    })
  })

  watch([() => props.samples, () => props.samples.length, () => props.seconds], () => {
    frame ??= requestAnimationFrame(draw)
  })
  onBeforeUnmount(() => { cancelAnimationFrame(frame); chart?.destroy() })
</script>

<template>
  <v-card>
    <div class="card-header">
      <h2>{{ title }}</h2>
      <slot name="header" />
    </div>
    <div class="chart-area">
      <canvas ref="canvas" aria-label="Força em newtons ao longo do tempo em segundos" role="img" />
      <div v-if="!samples.length" class="chart-empty"><span>Nenhuma medição registrada ainda</span></div>
    </div>
    <template v-if="showTable && samples.length">
      <v-divider />
      <div class="px-4 py-2">
        <v-btn
          :aria-expanded="tableOpen"
          size="small"
          variant="text"
          @click="tableOpen = !tableOpen"
        >{{ tableOpen ? 'Ocultar tabela' : 'Ver dados em tabela' }}</v-btn>
      </div>
      <div v-if="tableOpen" class="chart-table">
        <v-table density="compact" fixed-header height="240">
          <thead><tr><th>Tempo (s)</th><th class="text-right">Força (N)</th></tr></thead>
          <tbody>
            <tr v-for="row in tableRows" :key="row.t">
              <td>{{ formatMeasure(row.t) }}</td>
              <td class="text-right">{{ formatMeasure(row.f) }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </template>
  </v-card>
</template>

<style scoped>
.chart-area { position: relative; height: clamp(240px, 28vw, 340px); padding: 16px 16px 8px; }
.chart-empty { position: absolute; inset: 0; display: grid; place-items: center; color: var(--app-ink-subtle); font-size: 0.875rem; pointer-events: none; }
.chart-empty span { padding: 4px 12px; border-radius: 8px; background: rgb(var(--v-theme-surface)); border: 1px solid var(--app-border); }
.chart-table { padding: 0 16px 16px; }
.chart-table td { font-family: var(--app-mono); font-variant-numeric: tabular-nums; }
</style>
