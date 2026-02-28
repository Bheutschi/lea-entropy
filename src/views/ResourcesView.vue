<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import backgroundImage from '@/assets/images/entropie-bg.jpeg'

const router = useRouter()
const isVisible = ref(false)
const visibleCards = ref<number[]>([])

const videos = [
  {
    id: 1,
    title: 'Comment les hackers cassent les mots de passe',
    url: 'https://www.youtube.com/watch?v=7U-RbOKanYs',
    thumbnail: 'https://img.youtube.com/vi/7U-RbOKanYs/maxresdefault.jpg',
    description:
      'Découvrez les techniques utilisées par les hackers pour compromettre vos mots de passe',
  },
  {
    id: 2,
    title: 'Comment fonctionnent les gestionnaires de mots de passe',
    url: 'https://www.youtube.com/watch?v=w68BBPDAWr8',
    thumbnail: 'https://img.youtube.com/vi/w68BBPDAWr8/maxresdefault.jpg',
    description: 'Apprenez comment sécuriser efficacement vos mots de passe avec un gestionnaire',
  },
]

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  videos.forEach((_, index) => {
    setTimeout(
      () => {
        visibleCards.value.push(index)
      },
      200 + index * 100,
    )
  })
})
</script>

<template>
  <div class="resources">
    <div class="resources__background">
      <img :src="backgroundImage" alt="" class="resources__background-img" />
    </div>

    <div class="resources__container" :class="{ 'is-visible': isVisible }">
      <h1 class="resources__title">Ressources</h1>
      <p class="resources__subtitle">
        Approfondissez vos connaissances sur la sécurité des mots de passe
      </p>

      <div class="resources__grid">
        <a
          v-for="(video, index) in videos"
          :key="video.id"
          :href="video.url"
          target="_blank"
          rel="noopener noreferrer"
          class="resources__card"
          :class="{ 'is-visible': visibleCards.includes(index) }"
        >
          <div class="resources__card-thumbnail">
            <img :src="video.thumbnail" :alt="video.title" class="resources__card-img" />
            <div class="resources__card-overlay">
              <div class="resources__play-btn">
                <div class="resources__play-triangle" />
              </div>
            </div>
          </div>

          <div class="resources__card-body">
            <h3 class="resources__card-title">
              <span>{{ video.title }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="resources__external-icon"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </h3>
            <p class="resources__card-description">{{ video.description }}</p>
          </div>
        </a>
      </div>

      <div class="resources__footer">
        <button class="resources__btn" @click="router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="resources__btn-icon"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Retour à l'accueil
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resources {
  min-height: 100dvh;
  background: white;
  padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem);
  position: relative;
}

/* --- Background --- */

.resources__background {
  position: absolute;
  inset: 0;
  opacity: 0.05;
}

.resources__background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- Container --- */

.resources__container {
  max-width: 60rem;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.resources__container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Header --- */

.resources__title {
  font-size: clamp(1.5rem, 5vw, 3rem);
  text-align: center;
  letter-spacing: 0.05em;
  color: black;
  margin-bottom: 1rem;
}

.resources__subtitle {
  text-align: center;
  color: #525252;
  font-size: clamp(0.875rem, 2vw, 1rem);
  margin-bottom: clamp(2rem, 5vw, 3rem);
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

/* --- Grid --- */

.resources__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

@media (min-width: 640px) {
  .resources__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* --- Card --- */

.resources__card {
  display: block;
  background: white;
  border: 2px solid #e5e5e5;
  overflow: hidden;
  text-decoration: none;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    border-color 0.3s ease;
}

.resources__card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.resources__card:hover {
  border-color: black;
}

/* --- Thumbnail --- */

.resources__card-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f5f5f5;
}

.resources__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.resources__card:hover .resources__card-img {
  transform: scale(1.05);
}

.resources__card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.resources__card:hover .resources__card-overlay {
  background: rgba(0, 0, 0, 0.2);
}

.resources__play-btn {
  width: clamp(3rem, 8vw, 4rem);
  height: clamp(3rem, 8vw, 4rem);
  border-radius: 50%;
  background: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.resources__card:hover .resources__play-btn {
  background: #ef4444;
}

.resources__play-triangle {
  width: 0;
  height: 0;
  border-left: clamp(0.75rem, 2vw, 1rem) solid white;
  border-top: clamp(0.5rem, 1.2vw, 0.625rem) solid transparent;
  border-bottom: clamp(0.5rem, 1.2vw, 0.625rem) solid transparent;
  margin-left: 0.2rem;
}

/* --- Card body --- */

.resources__card-body {
  padding: clamp(1rem, 3vw, 1.5rem);
}

.resources__card-title {
  font-size: clamp(0.95rem, 2.5vw, 1.25rem);
  color: black;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.resources__card:hover .resources__card-title {
  color: #262626;
}

.resources__external-icon {
  width: clamp(0.875rem, 2vw, 1.25rem);
  height: clamp(0.875rem, 2vw, 1.25rem);
  color: #a3a3a3;
  flex-shrink: 0;
  margin-top: 0.2rem;
  transition: color 0.3s ease;
}

.resources__card:hover .resources__external-icon {
  color: black;
}

.resources__card-description {
  color: #525252;
  font-size: clamp(0.8rem, 1.6vw, 0.875rem);
  line-height: 1.6;
}

/* --- Footer --- */

.resources__footer {
  text-align: center;
}

.resources__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: clamp(0.6rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 2rem);
  border: 2px solid #a3a3a3;
  color: #525252;
  background: transparent;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition:
    border-color 0.3s ease,
    color 0.3s ease,
    transform 0.15s ease;
}

.resources__btn:hover {
  border-color: black;
  color: black;
}

.resources__btn:active {
  transform: scale(0.95);
}

.resources__btn-icon {
  width: 1rem;
  height: 1rem;
}
</style>
