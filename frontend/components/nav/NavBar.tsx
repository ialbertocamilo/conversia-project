"use client"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {ModeToggle} from "@/components/buttons/button-theme-toggle";

export default function NavBar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background shadow-sm h-25">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-semibold">Home</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Contact
          </Link>
        <ModeToggle/>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <div className="grid gap-6 p-6">
              <Link href="#" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Features
              </Link>
              <Link href="#" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Pricing
              </Link>
              <Link href="#" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                About
              </Link>
              <Link href="#" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function MenuIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


