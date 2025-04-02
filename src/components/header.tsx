"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"

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

type Language = "en" | "cs" | "de"

export default function Header({ currentLang = "en" }: { currentLang?: string }) {
  const [language, setLanguage] = useState<Language>(currentLang as Language)
  const pathname = usePathname()
  const router = useRouter()

  // Update language state when currentLang prop changes
  useEffect(() => {
    setLanguage(currentLang as Language)
  }, [currentLang])

  const menuItems = [
    {
      en: "Introduction",
      cs: "Úvod",
      de: "Einführung",
      href: "/introduction",
    },
    {
      en: "Products",
      cs: "Produkty",
      de: "Produkte",
      href: "/products",
    },
    {
      en: "Contacts",
      cs: "Kontakty",
      de: "Kontakte",
      href: "/contacts",
    },
    {
      en: "Articles",
      cs: "Články",
      de: "Artikel",
      href: "/articles",
    },
  ]

  const languages = [
    { code: "en", name: "English" },
    { code: "cs", name: "Čeština" },
    { code: "de", name: "Deutsch" },
  ]

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href={`/${language}`} className="flex items-center space-x-2">
            <span className="font-bold">LOGO</span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon" className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
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
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-col gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => switchLanguage(lang.code as Language)}
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex mx-auto">
          <NavigationMenuList>
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

        {/* Language Switcher */}
        <div className="hidden lg:flex ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Globe className="h-4 w-4" />
                <span>{language.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code as Language)}
                  className={cn(language === lang.code && "bg-accent font-medium")}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

