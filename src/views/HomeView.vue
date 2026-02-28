<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import backgroundImage from '@/assets/images/entropie-bg.jpeg'

const router = useRouter()
const isVisible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>

<template>
  <div class="home">
    <div class="home__background">
      <img :src="backgroundImage" alt="" class="home__background-img" />
    </div>

    <div class="home__content" :class="{ 'is-visible': isVisible }">
      <h1 class="home__title">ENTROPIE</h1>
      <button class="home__cta" @click="router.push('/explication')">Commencer</button>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
}

/* --- Background image --- */

.home__background {
  position: absolute;
  inset: 0;
  opacity: 0.05;
}

.home__background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- Content --- */

.home__content {
  text-align: center;
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 50rem;
}

/* --- Title --- */

.home__title {
  font-size: clamp(2.5rem, 12vw, 8rem);
  letter-spacing: clamp(0.15em, 3vw, 0.3em);
  margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
  color: black;
  line-height: 1.1;
  opacity: 0;
  transition: opacity 1s ease 0.2s;
}

.is-visible .home__title {
  opacity: 1;
}

/* --- Subtitle --- */

.home__subtitle {
  color: #525252;
  font-size: clamp(0.875rem, 2.5vw, 1.5rem);
  letter-spacing: clamp(0.1em, 1.5vw, 0.2em);
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
  opacity: 0;
  transition: opacity 1s ease 0.4s;
}

.is-visible .home__subtitle {
  opacity: 1;
}

/* --- CTA Button --- */

.home__cta {
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 5vw, 3rem);
  border: 2px solid black;
  color: black;
  letter-spacing: 0.2em;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  text-transform: uppercase;
  background: transparent;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 1s ease 0.6s,
    transform 0.8s ease 0.6s,
    background-color 0.3s ease,
    color 0.3s ease;
}

.is-visible .home__cta {
  opacity: 1;
  transform: translateY(0);
}

.home__cta:hover {
  background: black;
  color: white;
}

.home__cta:active {
  transform: scale(0.95);
}
</style>
