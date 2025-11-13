import { franc } from 'franc'
import wordsPt from 'words-pt'
import wordsEn from 'word-list-json'

class LanguageDetector {
  private static setPt: Set<string>
  private static setEn: Set<string>
  private static initialized = false

  static async init(): Promise<void> {
    if (this.initialized) return

    await new Promise<void>((resolve) => {
      wordsPt.init(() => {
        const ptArray = wordsPt.getArray ? wordsPt.getArray() : []
        this.setPt = new Set(ptArray.map((w: string) => w.toLowerCase()))
        this.setEn = new Set(wordsEn.map((w: string) => w.toLowerCase()))
        this.initialized = true
        resolve()
      })
    })
  }

  static detectLanguage(text: string): string {
    if (!this.initialized)
      throw new Error('LanguageDetector not initialized. Run init() first.')

    const words = text
      .split(/\s+/)
      .map(w => w.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      .filter(Boolean)

    let ptCount = 0
    let enCount = 0

    for (const word of words) {
      const isPt = this.setPt.has(word)
      const isEn = this.setEn.has(word)
      if (isPt) ptCount++
      if (isEn) enCount++
    }

    // fallback para franc caso ambos sejam baixos
    if (ptCount === 0 && enCount === 0) {
      const langFranc = franc(text)
      if (langFranc === 'por') return 'pt'
      if (langFranc === 'eng') return 'en'
      return 'unknown'
    }

    if (ptCount > enCount) return 'pt'
    if (enCount > ptCount) return 'en'
    return 'unknown'
  }
}

export default LanguageDetector
