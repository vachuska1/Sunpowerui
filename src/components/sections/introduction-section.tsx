"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function IntroductionSection({
  dictionary,
  lang,
}: {
  dictionary: any
  lang: string
}) {
  const router = useRouter()

  return (
    <div className="container">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{dictionary.home.title}</h1>
          <p className="text-lg text-muted-foreground md:text-xl">{dictionary.home.description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={() => {
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {dictionary.home.exploreButton}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {dictionary.home.contactButton}
            </Button>
          </div>
        </div>
        <div className="relative aspect-video lg:aspect-square">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Hero Image"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
}