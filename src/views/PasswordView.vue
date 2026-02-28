<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { calculateEntropy } from '@/utils/entropy'
import backgroundImage from '@/assets/images/entropie-bg.jpeg'

const router = useRouter()
const isVisible = ref(false)
const password = ref('')
const passwordInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
  passwordInput.value?.focus()
})

function handleSubmit() {
  if (!password.value) return

  const entropy = calculateEntropy(password.value)
  router.push({ path: '/result', query: { entropy: String(entropy) } })
}
</script>

<template>
  <div class="password">
    <div class="password__background">
      <img :src="backgroundImage" alt="" class="password__background-img" />
    </div>

    <div class="password__card" :class="{ 'is-visible': isVisible }">
      <div class="password__header">
        <div class="password__icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="password__icon"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 class="password__title">Entrer un mot de passe</h1>
      </div>

      <div class="password__form">
        <div class="password__field">
          <label for="password" class="password__label">Mot de passe</label>
          <input
            id="password"
            ref="passwordInput"
            v-model="password"
            type="password"
            class="password__input"
            placeholder="•••••••••"
            @keydown.enter="handleSubmit"
          />
        </div>

        <button class="password__submit" :disabled="!password" @click="handleSubmit">
          Essayer
        </button>
      </div>

      <button class="password__back" @click="router.push('/explication')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="password__back-icon"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        Retour
      </button>
    </div>
  </div>
</template>

<style scoped>
.password {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 1.5rem;
  position: relative;
}

.password__background {
  position: absolute;
  inset: 0;
  opacity: 0.05;
}

.password__background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.password__card {
  width: 100%;
  max-width: 28rem;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.password__card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.password__header {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.password__icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(3.5rem, 8vw, 5rem);
  height: clamp(3.5rem, 8vw, 5rem);
  border-radius: 50%;
  background: white;
  border: 2px solid black;
  margin-bottom: 1.5rem;
  color: black;
}

.password__icon {
  width: clamp(1.5rem, 4vw, 2.5rem);
  height: clamp(1.5rem, 4vw, 2.5rem);
}

.password__title {
  font-size: clamp(1.5rem, 5vw, 2.25rem);
  letter-spacing: 0.05em;
  color: black;
}

.password__form {
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 2rem);
}

.password__field {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.password__label {
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  color: #525252;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.password__input {
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
  background: white;
  border: 2px solid #d4d4d4;
  color: black;
  font-size: clamp(0.95rem, 2vw, 1rem);
  outline: none;
  transition: border-color 0.3s ease;
}

.password__input::placeholder {
  color: #a3a3a3;
}

.password__input:focus {
  border-color: black;
}

.password__submit {
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem) 2rem;
  background: black;
  border: 2px solid black;
  color: white;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.15s ease;
}

.password__submit:hover:not(:disabled) {
  background: #262626;
}

.password__submit:active:not(:disabled) {
  transform: scale(0.98);
}

.password__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.password__back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: clamp(1.5rem, 4vw, 2rem) auto 0;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  color: #a3a3a3;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition:
    color 0.3s ease,
    transform 0.15s ease;
}

.password__back:hover {
  color: black;
}

.password__back:active {
  transform: scale(0.95);
}

.password__back-icon {
  width: 1rem;
  height: 1rem;
}
</style>
