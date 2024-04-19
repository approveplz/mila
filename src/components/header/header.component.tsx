import React from 'react'
import { Button } from '../button/button.component'
import Image from 'next/image'

{/* Hero */ }
export function Header() {
    return (
        <header className="pt-[50px] mx-auto flex justify-between items-center max-w-7xl">
            {/* Hero Info */}
            <div className="flex flex-col">
                <h1 className="font-stardom text-7xl text-primary-600">Welcome to <br /> MilaCollective</h1>
                <p className="text-primary-500 mt-3 text-xl">Over 500+ stores available — rewards at your own pace.</p>

                <div className="flex gap-3 mt-12">
                    <Button variant="ghost-dark">Learn more</Button>
                    <Button variant="ghost-dark">Sign up</Button>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[423px] w-[286px] bg-primary-200 rounded-t-full before:content-['] before:absolute before:-right-3 before:top-3 before:w-full before:h-full before:border before:-z-40 before:border-primary-600 before:rounded-t-full">
                <Image src="/images/hero-woman.png" alt="hero-woman" fill objectFit="contain" />
            </div>
        </header>
    )
}
