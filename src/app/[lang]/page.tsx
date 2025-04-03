import { getDictionary } from "./dictionaries"
import IntroductionSection from "@/components/sections/introduction-section"
import ProductsSection from "@/components/sections/products-section"
import InstallationsSection from "@/components/sections/installations-section"
import PartnersSection from "@/components/sections/partners-section"
import ContactsSection from "@/components/sections/contacts-section"

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(lang as "en" | "cs" | "de")

  return (
    <main className="flex flex-col min-h-screen">
      {/* Introduction Section */}
      <section id="introduction" className="py-16 bg-background">
        <IntroductionSection dictionary={dict} lang={lang} />
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-muted/30">
        <ProductsSection dictionary={dict} lang={lang} />
      </section>

      {/* Installations Gallery Section */}
      <section id="installations" className="py-16 bg-background">
        <InstallationsSection dictionary={dict} lang={lang} />
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 bg-muted/30">
        <PartnersSection dictionary={dict} lang={lang} />
      </section>

      {/* Contacts Section with Inquiry Form */}
      <section id="contacts" className="py-16 bg-background">
        <ContactsSection dictionary={dict} lang={lang} />
      </section>
    </main>
  )
}

