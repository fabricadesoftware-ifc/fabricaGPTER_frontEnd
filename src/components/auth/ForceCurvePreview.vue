<script setup>
  import { formatMeasure } from '@/utils/number'

  // Illustrative 30 s grip contraction: fast rise, peak near 2.4 s, then slow fatigue.
  // Deterministic so the drawing is identical on every load.
  const SECONDS = 30
  const MAX_FORCE = 450
  const box = { left: 40, right: 392, top: 16, bottom: 184 }

  const samples = []
  for (let t = 0; t <= SECONDS; t += 0.2) {
    const rise = t < 0.3 ? 0 : 1 - Math.exp(-(t - 0.3) / 0.55)
    const fatigue = t < 2.4 ? 1 : 1 - 0.011 * (t - 2.4)
    const tremor = t < 0.3 ? 0 : 2.2 * Math.sin(t * 5.1) + 1.4 * Math.sin(t * 13.7) + 0.9 * Math.sin(t * 23.3)
    samples.push({ t, f: Math.max(0, 384 * rise * fatigue + tremor) })
  }
  const peak = samples.reduce((best, sample) => (sample.f > best.f ? sample : best))

  const x = t => box.left + (t / SECONDS) * (box.right - box.left)
  const y = f => box.bottom - (f / MAX_FORCE) * (box.bottom - box.top)
  const line = samples.map((s, i) => `${i ? 'L' : 'M'}${x(s.t).toFixed(1)} ${y(s.f).toFixed(1)}`).join(' ')
  const area = `${line} L${x(SECONDS)} ${box.bottom} L${box.left} ${box.bottom} Z`
  const forceTicks = [0, 150, 300, 450]
  const timeTicks = [0, 10, 20, 30]
  const peakX = x(peak.t)
  const peakY = y(peak.f)
</script>

<template>
  <figure class="preview">
    <figcaption class="preview__head">
      <span>Força × tempo</span>
      <span class="preview__meta">30 s · mão direita</span>
    </figcaption>
    <svg aria-label="Exemplo de curva de força ao longo de 30 segundos com pico marcado" role="img" viewBox="0 0 400 208">
      <g class="preview__grid">
        <line
          v-for="tick in forceTicks"
          :key="tick"
          :x1="box.left"
          :x2="box.right"
          :y1="y(tick)"
          :y2="y(tick)"
        />
      </g>
      <g class="preview__labels">
        <text
          v-for="tick in forceTicks"
          :key="`f${tick}`"
          text-anchor="end"
          :x="box.left - 8"
          :y="y(tick) + 4"
        >{{ tick }}</text>
        <text
          v-for="tick in timeTicks"
          :key="`t${tick}`"
          :text-anchor="tick === 0 ? 'start' : tick === SECONDS ? 'end' : 'middle'"
          :x="x(tick)"
          :y="box.bottom + 20"
        >{{ tick }} s</text>
      </g>
      <path class="preview__area" :d="area" />
      <path class="preview__line" :d="line" />
      <line
        class="preview__guide"
        :x1="peakX"
        :x2="peakX"
        :y1="peakY + 8"
        :y2="box.bottom"
      />
      <circle class="preview__peak" :cx="peakX" :cy="peakY" r="4" />
      <text class="preview__peak-label" :x="peakX + 12" :y="peakY - 8">Pico {{ formatMeasure(peak.f) }} N</text>
    </svg>
  </figure>
</template>

<style scoped>
.preview {
  margin: 0;
  padding: 16px 16px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
}
.preview__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
}
.preview__meta { font-weight: 400; color: rgba(255, 255, 255, 0.6); }
svg { display: block; width: 100%; height: auto; overflow: visible; }
.preview__grid line { stroke: rgba(255, 255, 255, 0.08); stroke-width: 1; }
.preview__labels text { fill: rgba(255, 255, 255, 0.56); font: 400 11px var(--app-mono); }
.preview__area { fill: rgba(141, 187, 245, 0.12); }
.preview__line { fill: none; stroke: #8DBBF5; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.preview__guide { stroke: rgba(255, 255, 255, 0.24); stroke-width: 1; stroke-dasharray: 3 3; }
.preview__peak { fill: #FFFFFF; stroke: #0F2D52; stroke-width: 2; }
.preview__peak-label { fill: #FFFFFF; font: 500 12px var(--app-mono); }
</style>
