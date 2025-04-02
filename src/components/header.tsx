"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type Language = "cs" | "en" | "de"

export default function Header({ currentLang = "cs" }: { currentLang?: string }) {
  const [language, setLanguage] = useState<Language>((currentLang as Language) || "cs")
  const pathname = usePathname()
  const router = useRouter()

  // Update language state when currentLang prop changes
  useEffect(() => {
    setLanguage((currentLang as Language) || "cs")
  }, [currentLang])

  const menuItems = [
    {
      en: "Introduction",
      cs: "Úvod",
      de: "Einführung",
      href: "/#introduction",
    },
    {
      en: "Products",
      cs: "Produkty",
      de: "Produkte",
      href: "/#products",
    },
    {
      en: "Contacts",
      cs: "Kontakty",
      de: "Kontakte",
      href: "/#contacts",
    },
    {
      en: "Articles",
      cs: "Články",
      de: "Artikel",
      href: "/articles",
    },
  ]

  const languages = [
    { code: "cs", name: "Čeština", flag: "/czech.png" },
    { code: "en", name: "English", flag: "/english.png" },
    { code: "de", name: "Deutsch", flag: "/german.png" },
  ]

  // Get current language data
  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  // Function to switch language
  const switchLanguage = (newLanguage: Language) => {
    // Get the current path without the language prefix
    const pathWithoutLang = pathname.replace(/^\/(en|cs|de)/, "")

    // Navigate to the same page but with the new language
    router.push(`/${newLanguage}${pathWithoutLang}`)

    // Update the language state
    setLanguage(newLanguage)

    // Set a cookie to remember the language preference
    document.cookie = `NEXT_LOCALE=${newLanguage}; path=/; max-age=31536000`
  }

  // Translations for the inquiry button
  const inquiryText = {
    en: "Inquiry",
    cs: "Poptávka",
    de: "Anfrage",
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16">
        {/* Desktop Layout - 3 sections with space-around */}
        <div className="hidden lg:flex justify-between items-center h-full">
          {/* Logo Section */}
          <div className="flex-1 flex justify-start">
            <Link href={`/${language}`} className="flex items-center">
              <Image src="/logo.png" alt="Logo" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          {/* Navigation Menu Section */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={`/${language}${item.href}`} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === `/${language}${item.href}` ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {item[language]}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Inquiry & Language Section */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <Link href={`/${language}/contacts#inquiry`}>
              <Button>{inquiryText[language]}</Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-9 px-2">
                  <Image
                    src={currentLanguage.flag || "/placeholder.svg"}
                    alt={currentLanguage.name}
                    width={24}
                    height={16}
                    className="h-4 w-6 object-cover"
                  />
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code as Language)}
                    className={cn("gap-2", language === lang.code && "bg-accent font-medium")}
                  >
                    <Image
                      src={lang.flag || "/placeholder.svg"}
                      alt={lang.name}
                      width={24}
                      height={16}
                      className="h-4 w-6 object-cover"
                    />
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex lg:hidden justify-between items-center h-full">
          {/* Logo */}
          <Link href={`/${language}`} className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={100} height={32} className="h-8 w-auto" />
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 pt-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${language}${item.href}`}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === `/${language}${item.href}` ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item[language]}
                  </Link>
                ))}

                {/* Inquiry Button in Mobile Menu */}
                <Link href={`/${language}/contacts#inquiry`} className="mt-4 w-full">
                  <Button className="w-full">{inquiryText[language]}</Button>
                </Link>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-col gap-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant={language === lang.code ? "default" : "ghost"}
                        className="justify-start gap-2"
                        onClick={() => switchLanguage(lang.code as Language)}
                      >
                        <Image
                          src={lang.flag || "/placeholder.svg"}
                          alt={lang.name}
                          width={24}
                          height={16}
                          className="h-4 w-6 object-cover"
                        />
                        {lang.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

