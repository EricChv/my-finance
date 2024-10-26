'use client'

import {
    Sheet,
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
                    text-black-1">MyFinance</h1>
                </Link>

                {sidebarLinks.map((items) => {
                const isActive = pathname === items.route || pathname.startsWith(`${items.route}/`)
            
                return (
                    <Link href={items.route} key={items.label}
                        className={cn('sidebar-link', {'bg-bank-gradient': isActive})}
                        >
                            <div className="relative size-6">
                                <Image 
                                    src={items.imgURL}
                                    alt={items.label}
                                    fill
                                    className={cn({
                                        'brightness-[3] invert-0': isActive
                                    })}
                                />
                            </div>

                            {/* Text label for the sidebar items */}
                            <p className={cn("sidebar-label", {"!text-white" :isActive})}> {/* Apply white text color if item is active  */}
                                {items.label} {/* Display the item's label text */}
                            </p>
                    </Link>
                    )
                })}
            </SheetContent>
        </Sheet>
    </section>
  );
}

export default MobileNav;