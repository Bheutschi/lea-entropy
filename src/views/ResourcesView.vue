<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import backgroundImage from '@/assets/images/entropie-bg.jpeg'

const router = useRouter()
const isVisible = ref(false)
const visibleCards = ref<number[]>([])

const resources = [
  {
    category: 'Outils',
    items: [
      {
        title: 'Bitwarden',
        description: 'Gestionnaire de mots de passe open source, sécurisé et gratuit.',
        url: 'https://bitwarden.com/',
        icon: 'lock',
      },
    ],
  },
  {
    category: 'Organismes officiels',
    items: [
      {
        title: 'Office fédéral de la cybersécurité (OFCS)',
        description: 'Informations et recommandations officielles sur la cybersécurité en Suisse.',
        url: 'https://www.ncsc.admin.ch/ncsc/fr/home.html',
        icon: 'shield',
      },
      {
        title: 'Prévention Suisse de la Criminalité',
        description: 'Conseils de prévention contre la cybercriminalité et les arnaques en ligne.',
        url: 'https://www.skppsc.ch/fr/',
        icon: 'shield',
      },
    ],
  },
  {
    category: 'Émissions & vidéos',
    items: [
      {
        title: 'RTS — Ne cliquez pas : Phishing (épisode 1)',
        description: "Comprendre les mécanismes du phishing et comment s'en protéger.",
        url: 'https://www.rts.ch/play/recherche?query=ne+cliquez+pas&shows=urn%3Arts%3Ashow%3Atv%3A10844101',
        icon: 'play',
      },
      {
        title: "RTS — Ne cliquez pas : L'attaque brute force (épisode 6)",
        description: 'Découvrez comment les attaques par force brute ciblent vos mots de passe.',
        url: 'https://www.rts.ch/play/recherche?query=ne+cliquez+pas&shows=urn%3Arts%3Ashow%3Atv%3A10844101',
        icon: 'play',
      },
      {
        title: 'IT-Connect — Gérer ses mots de passe avec Bitwarden',
        description: 'Tutoriel vidéo pour bien démarrer avec le gestionnaire Bitwarden.',
        url: 'https://www.youtube.com/watch?v=7onFyJtwvjk',
        icon: 'play',
      },
    ],
  },
]

const allItems = resources.flatMap((section) => section.items)

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  allItems.forEach((_, index) => {
    setTimeout(
      () => {
        visibleCards.value.push(index)
      },
      200 + index * 80,
    )
  })
})

function getGlobalIndex(categoryIndex: number, itemIndex: number): number {
  let count = 0
  for (let i = 0; i < categoryIndex; i++) {
    count += resources[i].items.length
  }
  return count + itemIndex
}
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

      <div
        v-for="(section, sIndex) in resources"
        :key="section.category"
        class="resources__section"
      >
        <h2 class="resources__section-title">{{ section.category }}</h2>

        <div class="resources__list">
          <a
            v-for="(item, iIndex) in section.items"
            :key="item.url"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="resources__card"
            :class="{ 'is-visible': visibleCards.includes(getGlobalIndex(sIndex, iIndex)) }"
          >
            <div class="resources__card-icon-wrapper">
              <!-- Lock -->
              <svg
                v-if="item.icon === 'lock'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="resources__card-icon"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <!-- Shield -->
              <svg
                v-else-if="item.icon === 'shield'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="resources__card-icon"
              >
                <path
                  d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                />
              </svg>
              <!-- Play -->
              <svg
                v-else-if="item.icon === 'play'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="resources__card-icon"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </div>

            <div class="resources__card-content">
              <h3 class="resources__card-title">
                <span>{{ item.title }}</span>
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
              <p class="resources__card-description">{{ item.description }}</p>
            </div>
          </a>
        </div>
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
          Retour
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
  margin-bottom: clamp(2.5rem, 6vw, 3.5rem);
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

/* --- Section --- */

.resources__section {
  margin-bottom: clamp(2rem, 5vw, 2.5rem);
}

.resources__section-title {
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #a3a3a3;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e5e5;
}

/* --- List --- */

.resources__list {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
}

/* --- Card --- */

.resources__card {
  display: flex;
  align-items: flex-start;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(0.875rem, 2.5vw, 1.25rem);
  background: white;
  border: 2px solid #e5e5e5;
  text-decoration: none;
  opacity: 0;
  transform: translateX(-15px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    border-color 0.3s ease;
}

.resources__card.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.resources__card:hover {
  border-color: black;
}

/* --- Card icon --- */

.resources__card-icon-wrapper {
  flex-shrink: 0;
  width: clamp(2.25rem, 5vw, 2.75rem);
  height: clamp(2.25rem, 5vw, 2.75rem);
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

.resources__card:hover .resources__card-icon-wrapper {
  border-color: black;
  color: black;
}

.resources__card-icon {
  width: clamp(0.875rem, 2.5vw, 1.125rem);
  height: clamp(0.875rem, 2.5vw, 1.125rem);
}

/* --- Card content --- */

.resources__card-content {
  flex: 1;
  min-width: 0;
}

.resources__card-title {
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  color: black;
  margin-bottom: 0.25rem;
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
  width: clamp(0.75rem, 1.5vw, 0.875rem);
  height: clamp(0.75rem, 1.5vw, 0.875rem);
  color: #a3a3a3;
  flex-shrink: 0;
  margin-top: 0.2rem;
  transition: color 0.3s ease;
}

.resources__card:hover .resources__external-icon {
  color: black;
}

.resources__card-description {
  color: #737373;
  font-size: clamp(0.775rem, 1.5vw, 0.85rem);
  line-height: 1.6;
}

/* --- Footer --- */

.resources__footer {
  text-align: center;
  margin-top: clamp(1.5rem, 4vw, 2rem);
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
