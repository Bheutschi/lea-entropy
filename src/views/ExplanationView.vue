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
  <div class="explication">
    <div class="explication__background">
      <img :src="backgroundImage" alt="" class="explication__background-img" />
    </div>

    <div class="explication__container" :class="{ 'is-visible': isVisible }">
      <h1 class="explication__title">L'entropie et la sécurité des mots de passe</h1>

      <div class="explication__body">
        <p>
          L'entropie de Shannon, issue de la théorie de l'information, mesure la quantité
          d'incertitude ou d'aléa dans un système. Appliquée aux mots de passe, elle permet
          d'évaluer leur robustesse face aux tentatives de piratage.
        </p>

        <p>
          Plus l'entropie d'un mot de passe est élevée, plus il est difficile pour un ordinateur de
          le deviner. Cette entropie se mesure en bits et dépend de la longueur du mot de passe et
          de la diversité des caractères utilisés.
        </p>

        <p>
          À travers ce bijou, ce projet explore le lien entre sécurité numérique et objet physique,
          afin de sensibiliser à l'importance de protéger ses données personnelles.
        </p>

        <div class="explication__callout">
          <p>
            Pour découvrir le diamant, vous devez entrer un mot de passe avec une entropie
            suffisamment élevée.
          </p>
        </div>
      </div>

      <div class="explication__actions">
        <button class="explication__btn explication__btn--back" @click="router.push('/')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="explication__icon"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Retour
        </button>

        <button class="explication__btn explication__btn--next" @click="router.push('/password')">
          Procéder au déverrouillage
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="explication__icon"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.explication {
  min-height: 100dvh;
  background: white;
  color: black;
  padding: clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 1.5rem);
  position: relative;
}

/* --- Background --- */

.explication__background {
  position: absolute;
  inset: 0;
  opacity: 0.03;
}

.explication__background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- Container --- */

.explication__container {
  max-width: 48rem;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.explication__container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Title --- */

.explication__title {
  font-size: clamp(1.5rem, 5vw, 3rem);
  text-align: center;
  letter-spacing: 0.05em;
  color: black;
  margin-bottom: clamp(2rem, 5vw, 3rem);
  line-height: 1.3;
}

/* --- Body --- */

.explication__body {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 1.5rem);
  color: #404040;
  line-height: 1.75;
  font-size: clamp(0.95rem, 2vw, 1.125rem);
}

/* --- Callout --- */

.explication__callout {
  margin-top: clamp(1.5rem, 4vw, 3rem);
  padding: clamp(1rem, 3vw, 1.5rem);
  border: 2px solid black;
  background: white;
}

.explication__callout p {
  color: black;
  font-weight: 500;
}

/* --- Actions --- */

.explication__actions {
  display: flex;
  gap: 1rem;
  margin-top: clamp(2.5rem, 6vw, 4rem);
  justify-content: center;
  flex-wrap: wrap;
}

/* --- Buttons --- */

.explication__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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

.explication__btn:active {
  transform: scale(0.95);
}

.explication__btn--back {
  border: 2px solid #a3a3a3;
  color: #525252;
  background: transparent;
}

.explication__btn--back:hover {
  border-color: black;
  color: black;
}

.explication__btn--next {
  border: 2px solid black;
  color: white;
  background: black;
}

.explication__btn--next:hover {
  background: #262626;
}

/* --- Icon --- */

.explication__icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>
