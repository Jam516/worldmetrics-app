"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav() {
    const pathname = usePathname();
    const segments = pathname.split("/")[1];

    return (
        <nav className="flex items-center space-x-4 text-lg lg:space-x-6" >
            <Link href="/" className="flex items-center">
                <img src="/worldmetrics_logo1.png" alt="WorldMetrics Logo" className="mr-2 h-6 w-10" />
                <h1 className="font-bold md:text-lg">Keymetrics.World</h1>
            </Link>
        </nav>
    );
}
