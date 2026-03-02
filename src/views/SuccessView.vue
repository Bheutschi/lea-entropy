<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import backgroundImage from '@/assets/images/entropie-bg.jpeg'
import { useUnlockStore } from '@/utils/unlock.ts'

const { isUnlocked } = useUnlockStore()
const router = useRouter()

const showDiamond = ref(false)
const showSparkles = ref(false)
const showText = ref(false)
const showActions = ref(false)

onMounted(() => {
  if (!isUnlocked.value) {
    router.replace('/')
    return
  }
  setTimeout(() => {
    showDiamond.value = true
  }, 100)
  setTimeout(() => {
    showSparkles.value = true
  }, 1500)
  setTimeout(() => {
    showText.value = true
  }, 1000)
  setTimeout(() => {
    showActions.value = true
  }, 1500)
})

function sparkleStyle(index: number) {
  const angleDeg = index * 60
  const angleRad = angleDeg * (Math.PI / 180)
  const radius = 100

  return {
    '--tx': `${Math.cos(angleRad) * radius}px`,
    '--ty': `${Math.sin(angleRad) * radius}px`,
    animationDelay: `${1.5 + index * 0.1}s`,
  } as Record<string, string>
}
</script>

<template>
  <div class="success">
    <div class="success__background">
      <img :src="backgroundImage" alt="" class="success__background-img" />
    </div>

    <div class="success__content">
      <!-- Diamond -->
      <div class="success__diamond" :class="{ 'is-visible': showDiamond }">
        <div class="success__diamond-shape">
          <svg viewBox="0 0 100 100" class="success__diamond-svg">
            <polygon
              points="50,10 80,35 50,90 20,35"
              fill="white"
              stroke="black"
              stroke-width="2"
            />
            <line
              x1="20"
              y1="35"
              x2="80"
              y2="35"
              stroke="black"
              stroke-width="1.5"
              class="success__diamond-line"
            />
            <line
              x1="50"
              y1="10"
              x2="50"
              y2="90"
              stroke="black"
              stroke-width="1.5"
              class="success__diamond-line success__diamond-line--d2"
            />
            <line
              x1="20"
              y1="35"
              x2="50"
              y2="90"
              stroke="black"
              stroke-width="1"
              class="success__diamond-line success__diamond-line--d3"
            />
            <line
              x1="80"
              y1="35"
              x2="50"
              y2="90"
              stroke="black"
              stroke-width="1"
              class="success__diamond-line success__diamond-line--d3"
            />
          </svg>
        </div>

        <!-- Sparkles -->
        <div
          v-for="i in 6"
          :key="i"
          class="success__sparkle"
          :class="{ 'is-visible': showSparkles }"
          :style="sparkleStyle(i - 1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="success__sparkle-icon"
          >
            <path
              d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Text -->
      <div class="success__text" :class="{ 'is-visible': showText }">
        <h1 class="success__title">Structure stabilisée</h1>
        <h2 class="success__subtitle">Déverrouillage réussi</h2>
        <p class="success__tagline">Le diamant est révélé.</p>
      </div>

      <!-- Actions (stacked: Ressources → Conseils → Retour) -->
      <div class="success__actions" :class="{ 'is-visible': showActions }">
        <button class="success__btn success__btn--filled" @click="router.push('/resources')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="success__btn-icon"
          >
            <path d="M12 7v14" />
            <path
              d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
            />
          </svg>
          Ressources
        </button>

        <button class="success__btn success__btn--filled" @click="router.push('/tips')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="success__btn-icon"
          >
            <path
              d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
            />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
          Conseils
        </button>
        <button class="success__btn success__btn--ghost" @click="router.push('/password')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="success__btn-icon"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Recommencer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.success {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

/* --- Background --- */

.success__background {
  position: absolute;
  inset: 0;
  opacity: 0.05;
}

.success__background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- Content --- */

.success__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 40rem;
  width: 100%;
}

/* --- Diamond --- */

.success__diamond {
  position: relative;
  display: inline-block;
  margin-bottom: clamp(2rem, 5vw, 3rem);
  transform: scale(0) rotate(-180deg);
  transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success__diamond.is-visible {
  transform: scale(1) rotate(0deg);
}

.success__diamond-shape {
  position: relative;
  width: clamp(8rem, 24vw, 12rem);
  height: clamp(8rem, 24vw, 12rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.success__diamond-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1));
}

.success__diamond-line {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw-line 0.8s ease forwards 1s;
}

.success__diamond-line--d2 {
  animation-delay: 1.2s;
}

.success__diamond-line--d3 {
  animation-delay: 1.4s;
  animation-duration: 0.6s;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

/* --- Sparkles --- */

.success__sparkle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translate(0, 0) scale(0);
  opacity: 0;
  color: black;
  pointer-events: none;
}

.success__sparkle.is-visible {
  animation: sparkle-burst 2s ease-in-out infinite;
  animation-delay: var(--animation-delay, 0s);
}

@keyframes sparkle-burst {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0);
    opacity: 0;
  }
  30% {
    transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}

.success__sparkle-icon {
  width: 1rem;
  height: 1rem;
}

/* --- Text --- */

.success__text {
  margin-bottom: clamp(2rem, 5vw, 3rem);
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.success__text.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.success__title {
  font-size: clamp(2rem, 7vw, 3.75rem);
  margin-bottom: 1rem;
  color: black;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.success__subtitle {
  font-size: clamp(1.25rem, 4vw, 1.875rem);
  color: #404040;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  letter-spacing: 0.05em;
}

.success__tagline {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #525252;
}

/* --- Actions (stacked) --- */

.success__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.success__actions.is-visible {
  opacity: 1;
}

/* --- Buttons --- */

.success__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 22rem;
  padding: clamp(0.6rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 2rem);
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition:
    border-color 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease,
    transform 0.15s ease;
}

.success__btn:active {
  transform: scale(0.95);
}

.success__btn--ghost {
  border: 2px solid #a3a3a3;
  color: #525252;
  background: transparent;
}

.success__btn--ghost:hover {
  border-color: black;
  color: black;
}

.success__btn--filled {
  border: 2px solid black;
  color: white;
  background: black;
}

.success__btn--filled:hover {
  background: #262626;
}

.success__btn-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>
