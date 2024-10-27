'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({ user }: SidebarProps) => {
    const pathname = usePathname();

    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">

                // Logo
                <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
                    <Image 
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Finance logo"
                        className="size-[24px] max-xl:size-14"
                    />
                    <h1 className="sidebar-logo">Truist</h1>
                </Link>

                {sidebarLinks.map((items) => {
                    const isActive = pathname === items.route || pathname.startsWith(`${items.route}/`)
                    
                    return (
                        <Link href={items.route} key={items.label}
                            className={cn('sidebar-link', {'bg-[#31393C]': isActive})}
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

                USER
            </nav>
            FOOTER
        </section>
    )
}

export default Sidebar
