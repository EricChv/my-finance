'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
  
const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
            <SheetTrigger>
                <Image 
                    src="/icons/hamburger.svg"
                    width={30}
                    height={30}
                    alt="menu"
                    className="cursor-pointer"
                />
            </SheetTrigger>
            <SheetContent side="left" className="border-none bg-white">
                <Link href="/" className="mb-12 cursor-pointer flex items-center gap-1 px-4">
                    <Image 
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="MyFinance logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold
                    text-black-2">MyFinance</h1>
                </Link>
                <div className="mobilenav-sheet">
                    <SheetClose asChild>
                        <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                            {sidebarLinks.map((items) => {
                    const isActive = pathname === items.route || pathname.startsWith(`${items.route}/`)
                
                    return (
                        <SheetClose asChild key={items.route}>
                            <Link href={items.route} key={items.label}
                            className={cn('mobilenav-sheet_close w-full', {'bg-bank-gradient': isActive})}>
                                <Image 
                                    src={items.imgURL}
                                    alt={items.label}
                                    width={20}
                                    height={20}
                                    className={cn({
                                        'brightness-[3] invert-0': isActive
                                    })}
                                />
                                {/* Text label for the sidebar items */}
                                <p className={cn("text-16 font-semibold text-black-2",
                                    {"text-white" :isActive})}> {/* Apply white text color if item is active  */}
                                    {items.label} {/* Display the item's label text */}
                                </p>
                            </Link>
                        </SheetClose>
                            )
                            })}

                            USER
                        </nav>
                    </SheetClose>

                    FOOTER
                </div>
            </SheetContent>
        </Sheet>
    </section>
    );
}

export default MobileNav;