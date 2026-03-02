<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCrackingTime, getEntropyLevel } from '@/utils/entropy'
import backgroundImage from '@/assets/images/entropie-bg.jpeg'
import diamondImage from '@/assets/images/diamond.png'
import { useUnlockStore } from '@/utils/unlock.ts'

const { unlock } = useUnlockStore()
const route = useRoute()
const router = useRouter()

const isVisible = ref(false)
const showIcon = ref(false)
const showStatus = ref(false)
const showMessage = ref(false)
const showCracking = ref(false)
const showDiamond = ref(false)
const showActions = ref(false)

const entropy = computed(() => parseFloat((route.query.entropy as string) || '0'))
const crackingTime = computed(() => getCrackingTime(entropy.value))
const level = computed(() => getEntropyLevel(entropy.value))

const statusIconClass = computed(() => {
  if (level.value.unlocked) return 'result__status-icon--unlocked'
  if (entropy.value > 40) return 'result__status-icon--medium'
  return 'result__status-icon--weak'
})

onMounted(() => {
  if (level.value.unlocked) {
    unlock()
  }
  requestAnimationFrame(() => {
    isVisible.value = true
  })
  setTimeout(() => {
    showIcon.value = true
  }, 200)
  setTimeout(() => {
    showStatus.value = true
  }, 300)
  setTimeout(() => {
    showMessage.value = true
  }, 500)
  setTimeout(() => {
    showCracking.value = true
  }, 600)
  setTimeout(() => {
    showDiamond.value = true
  }, 800)
  setTimeout(() => {
    showActions.value = true
  }, 1000)
})
</script>

<template>
  <div class="result">
    <div class="result__background">
      <img :src="backgroundImage" alt="" class="result__background-img" />
    </div>

    <div class="result__container" :class="{ 'is-visible': isVisible }">
      <!-- Icon -->
      <div class="result__status-icon" :class="[statusIconClass, { 'is-visible': showIcon }]">
        <!-- Unlock -->
        <svg
          v-if="level.unlocked"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="result__icon"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
        <!-- ShieldAlert -->
        <svg
          v-else-if="entropy > 40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="result__icon"
        >
          <path
            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        <!-- Shield -->
        <svg
          v-else-if="entropy > 20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="result__icon"
        >
          <path
            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          />
        </svg>
        <!-- AlertCircle -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="result__icon"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>

      <!-- Status -->
      <div class="result__status" :class="{ 'is-visible': showStatus }">
        <h2 class="result__status-title">Statut : {{ level.status }}</h2>
        <div class="result__entropy">
          <span class="result__entropy-value">{{ entropy }}</span>
          <span class="result__entropy-unit">bits</span>
        </div>
      </div>

      <!-- Message -->
      <div class="result__message" :class="{ 'is-visible': showMessage }">
        <p>{{ level.message }}</p>
      </div>

      <div class="result__cracking" :class="{ 'is-visible': showCracking }">
        <p class="result__cracking-label">
          Temps de piratage pour ce mot de passe
          <span class="tooltip-container" tabindex="0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="result__icon-info"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span class="tooltip-text"
              >Estimation basée sur 1 ordinateur standard ciblant l'algorithme Argon2.</span
            >
          </span>
        </p>
        <p class="result__cracking-value">{{ crackingTime }}</p>
      </div>

      <div v-if="level.unlocked" class="result__diamond" :class="{ 'is-visible': showDiamond }">
        <div class="result__diamond-wrapper">
          <img :src="diamondImage" alt="Diamant" class="result__diamond-img" />
        </div>
      </div>

      <!-- Actions -->
      <div class="result__actions" :class="{ 'is-visible': showActions }">
        <button
          v-if="!level.unlocked"
          class="result__btn result__btn--retry"
          @click="router.push('/password')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="result__btn-icon"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Réessayer
        </button>

        <button
          v-if="level.unlocked"
          class="result__btn result__btn--unlock"
          @click="router.push('/success')"
        >
          Procéder au déverrouillage
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="result__btn-icon"
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
.tooltip-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  cursor: help;
}

.result__icon-info {
  width: 18px;
  height: 18px;
  color: #6c757d;
  transition: color 0.2s ease;
}

.tooltip-container:hover .result__icon-info,
.tooltip-container:focus .result__icon-info {
  color: #333333;
}

.tooltip-text {
  visibility: hidden;
  opacity: 0;
  width: max-content;
  max-width: min(250px, 80vw); /* ← ne dépasse pas 80% du viewport */
  background-color: #333333;
  color: #ffffff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 12px;
  position: absolute;
  z-index: 10;
  bottom: 150%;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.2s ease-in-out;
  font-size: 13px;
  font-weight: normal;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333333 transparent transparent transparent;
}

.tooltip-container:hover .tooltip-text,
.tooltip-container:focus .tooltip-text {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 480px) {
  .tooltip-text {
    position: fixed;
    bottom: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 85vw;
  }

  .tooltip-text::after {
    display: none;
  }
}

.result {
  min-height: 100dvh;
  background: white;
  padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem);
  position: relative;
}

/* --- Background --- */

.result__background {
  position: absolute;
  inset: 0;
  opacity: 0.05;
}

.result__background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- Container --- */

.result__container {
  max-width: 40rem;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.result__container.is-visible {
  opacity: 1;
  transform: scale(1);
}

/* --- Status icon --- */

.result__status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(5rem, 14vw, 7rem);
  height: clamp(5rem, 14vw, 7rem);
  border-radius: 50%;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  color: white;
  transform: scale(0);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
}

.result__status-icon.is-visible {
  transform: scale(1);
}

.result__status-icon--unlocked {
  background: black;
}

.result__status-icon--medium {
  background: #525252;
}

.result__status-icon--weak {
  background: #262626;
}

.result__icon {
  width: clamp(2rem, 6vw, 3rem);
  height: clamp(2rem, 6vw, 3rem);
}

/* --- Status text --- */

.result__status {
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.result__status.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.result__status-title {
  font-size: clamp(1.25rem, 4vw, 1.875rem);
  color: black;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.result__entropy {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.75rem;
  color: #525252;
}

.result__entropy-value {
  font-size: clamp(2rem, 7vw, 3rem);
  font-weight: 300;
  color: black;
}

.result__entropy-unit {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
}

/* --- Message --- */

.result__message {
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  padding: clamp(1.25rem, 4vw, 2rem);
  background: white;
  border: 2px solid #e5e5e5;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.result__message.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.result__message p {
  color: #404040;
  font-size: clamp(0.95rem, 2vw, 1.125rem);
  line-height: 1.7;
}

/* --- Cracking time --- */

.result__cracking {
  margin-bottom: clamp(2rem, 5vw, 3rem);
  color: #525252;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.result__cracking.is-visible {
  opacity: 1;
}

.result__cracking-label {
  font-size: clamp(0.7rem, 1.5vw, 0.8rem);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.result__cracking-value {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: black;
}

/* --- Diamond --- */

.result__diamond {
  margin-bottom: clamp(2rem, 5vw, 3rem);
  opacity: 0;
  transform: scale(0.5);
  transition:
    opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.result__diamond.is-visible {
  opacity: 1;
  transform: scale(1);
}

.result__diamond-wrapper {
  display: inline-block;
  width: clamp(6rem, 16vw, 8rem);
  height: clamp(6rem, 16vw, 8rem);
}

.result__diamond-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* --- Actions --- */

.result__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.result__actions.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Buttons --- */

.result__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: clamp(0.6rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 2rem);
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition:
    border-color 0.3s ease,
    color 0.3s ease,
    background 0.3s ease,
    transform 0.15s ease;
}

.result__btn:active {
  transform: scale(0.95);
}

.result__btn--retry {
  border: 2px solid #a3a3a3;
  color: #525252;
  background: transparent;
}

.result__btn--retry:hover {
  border-color: black;
  color: black;
}

.result__btn--unlock {
  border: 2px solid black;
  color: white;
  background: black;
}

.result__btn--unlock:hover {
  background: #262626;
}

.result__btn-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>
