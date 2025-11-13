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

  static detectLanguage(text: string): { lang: string; confidence: number } {
    if (!this.initialized)
      throw new Error('LanguageDetector not initialized. Run init() first.')

    const normalized = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const words = normalized.split(/\s+/).filter(Boolean)

    let ptMatches = 0
    let enMatches = 0

    for (const w of words) {
      if (this.setPt.has(w)) ptMatches++
      if (this.setEn.has(w)) enMatches++
    }

    const total = words.length || 1
    const ptScore = ptMatches / total
    const enScore = enMatches / total
    const langFranc = franc(normalized)

    if (ptScore > enScore && ptScore > 0.2) return { lang: 'pt', confidence: ptScore }
    if (enScore > ptScore && enScore > 0.2) return { lang: 'en', confidence: enScore }

    if (langFranc === 'por') return { lang: 'pt', confidence: 0.3 }
    if (langFranc === 'eng') return { lang: 'en', confidence: 0.3 }

    return { lang: 'unknown', confidence: 0 }
  }
}

export default LanguageDetector
