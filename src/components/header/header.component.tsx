import React from 'react'
import { Button } from '../button/button.component'
import Image from 'next/image'

{/* Hero */ }
export function Header() {
    return (
        <div className="mx-auto max-w-7xl">
            <header className="pt-[50px] md:flex md:items-center md:gap-x-10">
                {/* Hero Info */}
                <div className="mx-auto max-w-[555px] lg:mx-0 lg:flex-auto">
                    <h1 className="font-stardom text-7xl text-primary-600">Welcome to <br /> MilaCollective</h1>
                    <p className="text-primary-500 mt-3 text-xl">Over 500+ stores available — rewards at your own pace.</p>

                    <div className="hidden sm:flex sm:gap-3 sm:mt-12">
                        <Button variant="accent">Learn more</Button>
                        <Button variant="ghost-light">Sign up</Button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative ml-auto max-w-full w-full h-[440px] mt-[15px] sm:h-[440px] sm:w-[286px] sm:rounded-t-full after:bg-primary-200 after:content-[''] after:absolute after:w-full after:h-[382px] after:-z-30 after:sm:-right-0 after:bottom-0 after:sm:w-full after:sm:h-[423px] after:sm:rounded-t-full before:sm:content-[''] before:sm:absolute before:sm:-right-3 before:sm:-bottom-[17px] before:sm:w-full before:sm:h-[423px] before:sm:border before:sm:-z-40 before:sm:border-primary-600 before:sm:rounded-t-full">
                    <Image src="/images/hero-woman.png" alt="hero-woman" fill objectFit="contain" />
                </div>
            </header>
        </div>
    )
}
