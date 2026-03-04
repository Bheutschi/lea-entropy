<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUnlockStore } from '@/utils/unlock'
import backgroundImage from '@/assets/images/entropie-bg.jpeg'

const router = useRouter()
const { isUnlocked } = useUnlockStore()

const showVideo = ref(false)
const showText = ref(false)
const showActions = ref(false)

onMounted(() => {
  if (!isUnlocked.value) {
    router.replace('/')
    return
  }

  requestAnimationFrame(() => {
    showVideo.value = true
  })
  setTimeout(() => {
    showText.value = true
  }, 600)
  setTimeout(() => {
    showActions.value = true
  }, 1200)
})
</script>

<template>
  <div class="success">
    <div class="success__background">
      <img :src="backgroundImage" alt="" class="success__background-img" />
    </div>

    <div class="success__content">
      <div class="success__text" :class="{ 'is-visible': showText }">
        <h1 class="success__title">Déverrouillage réussi</h1>
      </div>

      <div class="success__video" :class="{ 'is-visible': showVideo }">
        <video
          class="success__video-player"
          src="/ouverture_bijou.mp4"
          autoplay
          muted
          playsinline
          loop
        />
      </div>

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

        <button class="success__btn success__btn--ghost" @click="router.push('/')">
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
          Retour
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

.success__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 40rem;
  width: 100%;
}

.success__video {
  margin-bottom: clamp(2rem, 5vw, 3rem);
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success__video.is-visible {
  opacity: 1;
  transform: scale(1);
}

.success__video-player {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  display: block;
  border: 2px solid #e5e5e5;
  background: #fafafa;
}

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
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  color: black;
  letter-spacing: 0.05em;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
}

.success__subtitle {
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  color: #525252;
  line-height: 1.7;
  max-width: 28rem;
  margin: 0 auto;
}

.success__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(15px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.success__actions.is-visible {
  opacity: 1;
  transform: translateY(0);
}

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

.success__btn--filled {
  border: 2px solid black;
  color: white;
  background: black;
}

.success__btn--filled:hover {
  background: #262626;
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

.success__btn-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>
