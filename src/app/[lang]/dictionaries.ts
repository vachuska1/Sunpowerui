import "server-only"

// Define the dictionary type
interface Dictionary {
  home: {
    title: string
    description: string
    featuresTitle: string
    features: string[]
    contactTitle: string
    contactText: string
    contactButton: string
  }
  navigation: {
    introduction: string
    products: string
    contacts: string
    articles: string
  }
}

// Create dictionaries for each language
const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () =>
    Promise.resolve({
      home: {
        title: "Welcome to our Website",
        description: "Discover our amazing products and services.",
        featuresTitle: "Our Features",
        features: ["High quality products", "Fast delivery", "Customer support", "Money-back guarantee"],
        contactTitle: "Contact Us",
        contactText: "Have questions? Our team is here to help you.",
        contactButton: "Get in Touch",
      },
      navigation: {
        introduction: "Introduction",
        products: "Products",
        contacts: "Contacts",
        articles: "Articles",
      },
    }),
  cs: () =>
    Promise.resolve({
      home: {
        title: "Vítejte na našem webu",
        description: "Objevte naše úžasné produkty a služby.",
        featuresTitle: "Naše funkce",
        features: ["Vysoce kvalitní produkty", "Rychlé doručení", "Zákaznická podpora", "Záruka vrácení peněz"],
        contactTitle: "Kontaktujte nás",
        contactText: "Máte otázky? Náš tým je tu, aby vám pomohl.",
        contactButton: "Spojte se s námi",
      },
      navigation: {
        introduction: "Úvod",
        products: "Produkty",
        contacts: "Kontakty",
        articles: "Články",
      },
    }),
  de: () =>
    Promise.resolve({
      home: {
        title: "Willkommen auf unserer Website",
        description: "Entdecken Sie unsere erstaunlichen Produkte und Dienstleistungen.",
        featuresTitle: "Unsere Funktionen",
        features: ["Hochwertige Produkte", "Schnelle Lieferung", "Kundensupport", "Geld-zurück-Garantie"],
        contactTitle: "Kontaktieren Sie uns",
        contactText: "Haben Sie Fragen? Unser Team ist hier, um Ihnen zu helfen.",
        contactButton: "In Kontakt kommen",
      },
      navigation: {
        introduction: "Einführung",
        products: "Produkte",
        contacts: "Kontakte",
        articles: "Artikel",
      },
    }),
}

// Function to get the dictionary for a specific language
export const getDictionary = async (locale: "en" | "cs" | "de"): Promise<Dictionary> => {
  return dictionaries[locale]()
}

