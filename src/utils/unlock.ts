import { ref } from 'vue'

const isUnlocked = ref(false)

export function useUnlockStore() {
  function unlock() {
    isUnlocked.value = true
  }

  function lock() {
    isUnlocked.value = false
  }

  return {
    isUnlocked,
    unlock,
    lock,
  }
}
