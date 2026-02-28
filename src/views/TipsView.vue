<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import backgroundImage from '@/assets/images/entropie-bg.jpeg'

const router = useRouter()
const isVisible = ref(false)
const visibleCards = ref<number[]>([])

const tips = [
  {
    icon: 'layers',
    title: 'Utilisez des mots de passe longs',
    description:
      "Un mot de passe de 12 caractères ou plus est considérablement plus difficile à craquer qu'un mot de passe court, même complexe.",
  },
  {
    icon: 'key',
    title: 'Combinez différents types de caractères',
    description:
      'Mélangez lettres majuscules, minuscules, chiffres et symboles pour augmenter la complexité.',
  },
  {
    icon: 'refresh',
    title: 'Évitez les mots du dictionnaire',
    description:
      'Les mots courants et les phrases prévisibles sont vulnérables aux attaques par dictionnaire.',
  },
  {
    icon: 'shield',
    title: 'Un mot de passe unique par compte',
    description:
      'Ne réutilisez jamais le même mot de passe. Si un service est compromis, les autres restent sécurisés.',
  },
  {
    icon: 'lock',
    title: 'Utilisez un gestionnaire de mots de passe',
    description:
      'Un gestionnaire génère et stocke des mots de passe complexes de manière sécurisée pour vous.',
  },
  {
    icon: 'smartphone',
    title: "Activez l'authentification à deux facteurs",
    description:
      'Ajoutez une couche de sécurité supplémentaire même si votre mot de passe est compromis.',
  },
]

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  tips.forEach((_, index) => {
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
  <div class="tips">
    <div class="tips__background">
      <img :src="backgroundImage" alt="" class="tips__background-img" />
    </div>

    <div class="tips__container" :class="{ 'is-visible': isVisible }">
      <h1 class="tips__title">Bonnes pratiques</h1>
      <p class="tips__subtitle">Pour créer des mots de passe robustes et protéger vos données</p>

      <div class="tips__list">
        <div
          v-for="(tip, index) in tips"
          :key="index"
          class="tips__card"
          :class="{ 'is-visible': visibleCards.includes(index) }"
        >
          <div class="tips__card-inner">
            <div class="tips__card-icon-wrapper">
              <svg
                v-if="tip.icon === 'layers'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tips__card-icon"
              >
                <path
                  d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84z"
                />
                <path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12" />
                <path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17" />
              </svg>
              <!-- Key -->
              <svg
                v-else-if="tip.icon === 'key'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tips__card-icon"
              >
                <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
                <path d="m21 2-9.6 9.6" />
                <circle cx="7.5" cy="15.5" r="5.5" />
              </svg>
              <svg
                v-else-if="tip.icon === 'refresh'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tips__card-icon"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              <svg
                v-else-if="tip.icon === 'shield'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tips__card-icon"
              >
                <path
                  d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                />
              </svg>
              <svg
                v-else-if="tip.icon === 'lock'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tips__card-icon"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <svg
                v-else-if="tip.icon === 'smartphone'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tips__card-icon"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
            </div>

            <div class="tips__card-content">
              <h3 class="tips__card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="tips__check-icon"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {{ tip.title }}
              </h3>
              <p class="tips__card-description">{{ tip.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tips__footer">
        <button class="tips__btn" @click="router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="tips__btn-icon"
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
.tips {
  min-height: 100dvh;
  background: white;
  padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem);
  position: relative;
}

.tips__background {
  position: absolute;
  inset: 0;
  opacity: 0.05;
}

.tips__background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tips__container {
  max-width: 52rem;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.tips__container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.tips__title {
  font-size: clamp(1.5rem, 5vw, 3rem);
  text-align: center;
  letter-spacing: 0.05em;
  color: black;
  margin-bottom: 1rem;
}

.tips__subtitle {
  text-align: center;
  color: #525252;
  font-size: clamp(0.875rem, 2vw, 1rem);
  margin-bottom: clamp(2rem, 5vw, 3rem);
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

.tips__list {
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.tips__card {
  background: white;
  border: 2px solid #e5e5e5;
  padding: clamp(1rem, 3vw, 1.5rem);
  opacity: 0;
  transform: translateX(-20px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    border-color 0.3s ease;
}

.tips__card.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.tips__card:hover {
  border-color: black;
}

.tips__card-inner {
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
}

.tips__card-icon-wrapper {
  flex-shrink: 0;
  width: clamp(2.5rem, 6vw, 3rem);
  height: clamp(2.5rem, 6vw, 3rem);
  border-radius: 50%;
  background: white;
  border: 2px solid #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #525252;
  transition:
    border-color 0.3s ease,
    color 0.3s ease;
}

.tips__card:hover .tips__card-icon-wrapper {
  border-color: black;
  color: black;
}

.tips__card-icon {
  width: clamp(1rem, 3vw, 1.5rem);
  height: clamp(1rem, 3vw, 1.5rem);
}

.tips__card-content {
  flex: 1;
  min-width: 0;
}

.tips__card-title {
  font-size: clamp(0.95rem, 2.5vw, 1.25rem);
  color: black;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tips__check-icon {
  width: clamp(0.875rem, 2vw, 1.25rem);
  height: clamp(0.875rem, 2vw, 1.25rem);
  color: black;
  flex-shrink: 0;
}

.tips__card-description {
  color: #525252;
  line-height: 1.7;
  font-size: clamp(0.85rem, 1.8vw, 1rem);
}

.tips__footer {
  text-align: center;
}

.tips__btn {
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

.tips__btn:hover {
  border-color: black;
  color: black;
}

.tips__btn:active {
  transform: scale(0.95);
}

.tips__btn-icon {
  width: 1rem;
  height: 1rem;
}
</style>
