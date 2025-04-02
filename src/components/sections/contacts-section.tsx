"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactsSection({
  dictionary,
  lang,
}: {
  dictionary: any
  lang: string
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - in a real app, this would send the data to a server
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    // Show success message
    alert(dictionary.contacts.successMessage)
  }

  return (
    <div className="container">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{dictionary.contacts.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
          {dictionary.contacts.description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{dictionary.contacts.infoTitle}</CardTitle>
              <CardDescription>{dictionary.contacts.infoDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">{dictionary.contacts.addressTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Business Street
                    <br />
                    Prague, 110 00
                    <br />
                    Czech Republic
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">{dictionary.contacts.phoneTitle}</h3>
                  <p className="text-sm text-muted-foreground">+420 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">{dictionary.contacts.emailTitle}</h3>
                  <p className="text-sm text-muted-foreground">info@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map placeholder - in a real app, this would be an actual map */}
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">{dictionary.contacts.mapPlaceholder}</p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div id="inquiry">
          <Card>
            <CardHeader>
              <CardTitle>{dictionary.contacts.formTitle}</CardTitle>
              <CardDescription>{dictionary.contacts.formDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{dictionary.contacts.nameLabel}</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{dictionary.contacts.emailLabel}</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{dictionary.contacts.subjectLabel}</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{dictionary.contacts.messageLabel}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  {dictionary.contacts.submitButton}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}