<template>
  <div class="relative w-full h-full overflow-hidden">
    <canvas ref="canvasRef" class="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
    <div class="relative z-1 bg-none ">

      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  particleCount: { type: Number, default: 100 },
  particleRadius: { type: Number, default: 1 },
  particleColor: { type: String, default: '98,217,241' },
  particleAlpha: { type: Number, default: 0.5 },

  lineAlpha: { type: Number, default: 0.5 },
  lineDistance: { type: Number, default: 120 },
  mouseDistance: { type: Number, default: 150 },

  secondParticleCount: { type: Number, default: 100 },
  secondParticleRadius: { type: Number, default: 2 },
  secondParticleColor: { type: String, default: '68,161,234' },
  secondParticleAlpha: { type: Number, default: 0.8 },

  secondLineDistance: { type: Number, default: 120 },
  secondMouseDistance: { type: Number, default: 160 },
})

function updateParticles(list: Particle[], canvas: HTMLCanvasElement) {
  for (const p of list) {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1
  }
}

function drawParticles(list: Particle[], color: string, alpha: number) {
  if (!ctx) return
  for (const p of list) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${color}, ${alpha})`
    ctx.fill()
  }
}

function drawCrossConnections(
  list1: Particle[],
  list2: Particle[]
) {
  if (!ctx) return

  for (const p1 of list1) {
    for (const p2 of list2) {
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < props.lineDistance) {
        ctx.strokeStyle =
          `rgba(${props.particleColor},
            ${props.lineAlpha * (1 - dist / props.secondLineDistance)})`

      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    }
  }
}}

function drawConnections(list: Particle[]) {
  if (!ctx) return
  for (const p1 of list) {
    for (const p2 of list) {
      if (p1 === p2) continue

      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < props.lineDistance) {
        ctx.strokeStyle =
          `rgba(${props.particleColor},
            ${props.lineAlpha * (1 - dist / props.lineDistance)})`

        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
  }
}

function drawMouseConnections(list: Particle[]) {
  if (!ctx) return

  for (const p of list) {
    const dx = p.x - mouse.x
    const dy = p.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < props.mouseDistance) {
      ctx.strokeStyle =
        `rgba(${props.particleColor},
          ${props.lineAlpha * (1 - dist / props.mouseDistance)})`

      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(mouse.x, mouse.y)
      ctx.stroke()
    }
  }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId = 0

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const particles: Particle[] = []
const particles2: Particle[] = []

// теперь координаты мыши относительно окна
const mouse = { x: -1000, y: -1000 }

onMounted(() => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  // создаём частицы
  for (let i = 0; i < props.particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: props.particleRadius
    })
  }

  for (let i = 0; i < props.secondParticleCount; i++) {
    particles2.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5, // можно медленнее
      vy: (Math.random() - 0.5) * 0.5,
      radius: props.secondParticleRadius
    })
  }

  // отслеживаем мышку по window
  window.addEventListener('mousemove', (e: MouseEvent) => {
    if (!canvasRef.value) return
    const rect = canvasRef.value.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  })

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000
    mouse.y = -1000
  })

  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', () => { })
  window.removeEventListener('mouseleave', () => { })
})

function animate() {
  if (!ctx || !canvasRef.value) return

  const canvas = canvasRef.value
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // === 1. Обновляем все частицы ===
  updateParticles(particles, canvas)
  updateParticles(particles2, canvas)

  // === 2. Линии между частицами ===
  drawConnections(particles)
  drawConnections(particles2)

  drawCrossConnections(particles, particles2)

  // === 3. Линии к мышке (только первые) ===
  drawMouseConnections(particles)
  drawMouseConnections(particles2)


  // === 4. Рисуем точки ===
  drawParticles(particles, props.particleColor, props.particleAlpha)
  drawParticles(particles2, props.secondParticleColor, props.secondParticleAlpha)

  animationId = requestAnimationFrame(animate)
}
</script>

<style scoped>
canvas {
  display: block;
  /* pointer-events-none позволяет мышке проходить сквозь canvas */
}
</style>
