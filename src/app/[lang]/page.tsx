import { getDictionary } from "./dictionaries"

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(lang as "en" | "cs" | "de")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-6">{dict.home.title}</h1>
        <p className="text-xl mb-4">{dict.home.description}</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">{dict.home.featuresTitle}</h2>
            <ul className="list-disc pl-5 space-y-2">
              {dict.home.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">{dict.home.contactTitle}</h2>
            <p>{dict.home.contactText}</p>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded">{dict.home.contactButton}</button>
          </div>
        </div>
      </div>
    </main>
  )
}

