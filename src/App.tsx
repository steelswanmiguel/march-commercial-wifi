import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Wifi, Link, HelpCircle } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_800px] lg:gap-12 xl:grid-cols-[1fr_800px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to OSO Net!
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Fast, secure, and easy to access. Sign up now to enjoy our high-speed internet connection.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    <span>High-speed connection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    <span>Secure and encrypted</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border shadow-xl">
                <div className="rounded-lg border bg-card text-card-foreground shadow-xl" data-v0-t="card">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Sign Up for WiFi</h3>
                    <p className="text-sm text-muted-foreground">Enter your details to get connected</p>
                  </div>
                  <div className="p-6">
                    {isSubmitted ? (
                      <div className="text-center text-green-600">
                        <h3 className="text-xl font-semibold mb-2">Thank you for signing up!</h3>
                        <p>Please check your email for further instructions on how to connect.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="john@example.com" required type="email" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="text">Last four characters of MAC Address</Label>
                            <Input id="text" placeholder='3A-01' required />
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                                  <HelpCircle className="h-4 w-4 mr-1" />
                                  How to find your MAC address
                                </Button>
                              </SheetTrigger>
                              <SheetContent>
                                <SheetHeader>
                                  <SheetTitle>How to Find Your MAC Address</SheetTitle>
                                  <SheetDescription>
                                    Follow these steps to find your MAC address using PowerShell:
                                  </SheetDescription>
                                </SheetHeader>
                                <div className="mt-4">
                                  <ol className="list-decimal list-inside space-y-2">
                                    <li>Open PowerShell as an administrator</li>
                                    <li>Type the following command and press Enter:
                                      <pre className="bg-gray-100 p-2 mt-1 rounded">getmac /v /fo list</pre>
                                    </li>
                                    <li>Look for the "Physical Address" of your network adapter</li>
                                    <li>The MAC address will be in the format: XX-XX-XX-XX-XX-XX</li>
                                    <li>Enter the last four characters (last two pairs) in the form</li>
                                  </ol>
                                </div>
                              </SheetContent>
                            </Sheet>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms" required />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the terms and conditions
                            </label>
                          </div>
                          <Button type="submit">Sign Up</Button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}