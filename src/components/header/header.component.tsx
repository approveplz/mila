import React from 'react'
import { Button, Container } from '@/components';
import Image from 'next/image'
import Link from 'next/link';

{/* Hero */ }
export function Header() {
    return (
        <Container>
            <header className="relative pt-[50px] pb-20 sm:flex sm:min-h-[585px] lg:gap-x-[93px]">
                {/* Hero Info */}
                <div className="z-40 sm:min-w-[561px] sm:mt-[78px]">
                    <h1 className="font-stardom text-primary-600 text-5xl sm:text-7xl">Welcome to <br /> MilaCollective</h1>
                    <p className="text-primary-500 mt-3 text-xl">Over 500+ stores available — rewards at your own pace.</p>

                    <div className="hidden sm:flex sm:gap-3 sm:mt-12">
                        <Button variant="accent" asChild>
                            <Link href="/#FAQ">Learn more</Link>
                        </Button>
                        <Button variant="ghost-light" asChild>
                            <Link href="/#contact-us">
                                Sign up
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="sm:flex sm:justify-center sm:w-full sm:-ml-10">
                    <div className="relative justify-self-center h-[440px] mt-[15px] sm:absolute sm:top-[37px] sm:right-0 lg:relative lg:top-0 sm:h-[440px] sm:mt-0 lg:h-[440px] sm:min-w-[286px] sm:rounded-t-full after:bg-primary-200 after:content-[''] after:absolute after:w-full after:h-[382px] after:-z-30 after:sm:-right-0 after:bottom-0 after:sm:w-full after:sm:h-[423px] after:sm:rounded-t-full before:sm:content-[''] before:sm:absolute before:sm:-right-3 before:sm:-bottom-[17px] before:sm:w-full before:sm:h-[423px] before:sm:border before:sm:-z-40 before:sm:border-primary-600 before:sm:rounded-t-full">
                        <Image src="/images/hero-woman.png" alt="hero-woman" fill objectFit="contain" />
                    </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-3 mt-8 sm:hidden">
                    <Button variant="accent" className="grow">Learn more</Button>
                    <Button variant="ghost-light" className="grow">Sign up</Button>
                </div>
            </header>
        </Container>
    )
}
