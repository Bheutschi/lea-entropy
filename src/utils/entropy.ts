/**
 * Calcule l'entropie de Shannon d'un mot de passe en bits.
 *
 * Formule : E = L × log2(R)
 * - L = longueur du mot de passe
 * - R = taille du pool de caractères utilisés
 */
export function calculateEntropy(password: string): number {
  if (!password.length) return 0

  let poolSize = 0

  if (/[a-z]/.test(password)) poolSize += 26
  if (/[A-Z]/.test(password)) poolSize += 26
  if (/[0-9]/.test(password)) poolSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32

  return Math.floor(password.length * Math.log2(poolSize))
}

/**
 * Estime le temps de cassage par force brute.
 * Modèle : attaquant motivé avec cluster GPU (~1 milliard d'essais/sec).
 */
export function getCrackingTime(entropy: number): string {
  const guessesPerSecond = 10e9
  const totalGuesses = Math.pow(2, entropy)
  const seconds = totalGuesses / guessesPerSecond

  if (seconds < 0.001) return 'Instantané'
  if (seconds < 1) return "Moins d'une seconde"
  if (seconds < 60) return `${Math.round(seconds)} secondes`
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.round(seconds / 3600)} heures`
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} jours`
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} ans`
  if (seconds < 31536000 * 1e6)
    return `${Math.round(seconds / (31536000 * 1000))} milliers d'années`
  if (seconds < 31536000 * 1e9) return `${Math.round(seconds / (31536000 * 1e6))} millions d'années`

  return `${Math.round(seconds / (31536000 * 1e9))} milliards d'années`
}

export interface EntropyLevel {
  status: string
  message: string
  unlocked: boolean
}

const RETRY_SUFFIX = "\n\n Il faut réessayer, le mot de passe n'a pas assez d'entropie."

export function getEntropyLevel(entropy: number): EntropyLevel {
  if (entropy >= 80) {
    return {
      status: 'Succès',
      message:
        'Votre maison est parfaitement sécurisée. La serrure est inviolable, et vous seul possédez la clé.\n' +
        "L'entropie est suffisante.",
      unlocked: true,
    }
  }

  if (entropy > 69) {
    return {
      status: 'Échec',
      message:
        "Votre maison est protégée par une porte blindée. Seuls des moyens exceptionnels permettraient d'y entrer, après un très long effort." +
        RETRY_SUFFIX,
      unlocked: false,
    }
  }

  if (entropy > 59) {
    return {
      status: 'Échec',
      message:
        "Votre porte est solide et votre serrure est fiable. Entrer devient difficile, mais reste possible pour quelqu'un de déterminé." +
        RETRY_SUFFIX,
      unlocked: false,
    }
  }

  if (entropy > 49) {
    return {
      status: 'Échec',
      message:
        'Votre maison est fermée à clé, mais un cambrioleur équipé pourrait entrer avec un peu de temps et les bons outils.' +
        RETRY_SUFFIX,
      unlocked: false,
    }
  }

  if (entropy > 39) {
    return {
      status: 'Échec',
      message:
        'Votre porte est fermée à clé, mais vous utilisez une serrure simple que presque tout le monde peut crocheter rapidement.' +
        RETRY_SUFFIX,
      unlocked: false,
    }
  }

  if (entropy > 19) {
    return {
      status: 'Échec',
      message:
        'Votre maison est fermée mais la clé est sur la porte. Il suffit de la tourner pour entrer.' +
        RETRY_SUFFIX,
      unlocked: false,
    }
  }

  return {
    status: 'Échec',
    message:
      "La porte de votre maison est grande ouverte, sans aucune protection. N'importe qui peut entrer immédiatement, sans effort." +
      RETRY_SUFFIX,
    unlocked: false,
  }
}
