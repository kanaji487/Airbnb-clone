"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();

    return (
        <Image src="/image/logo.png" alt="Logo" width={100} height={100} className="hidden md:block cursor-pointer mr-2" />
    )
}

export default Logo