"use client";
import * as React from 'react';
import { Container, Feature } from "@/components";
import { Gift, HandPointing, Lock, LockKeyOpen } from '@phosphor-icons/react';

/* Rectangle 11 */

// position: absolute;
// width: 1024px;
// height: 302px;
// left: 0px;
// top: 1054px;

// background: url(.png), linear-gradient(180deg, rgba(254, 252, 232, 0) 0%, #EFECE5 100%);
// transform: matrix(1, 0, 0, -1, 0, 0);

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-[url('/images/bg-section.png')] bg-no-repeat bg-cover">
            <Container>
                <h2 className="text-3xl font-stardom text-primary-600 mb-14">How it works</h2>

                <ul className="flex flex-col justify-between flex-wrap items-stretch gap-11 sm:flex-row">
                    <li className="flex-1 flex-grow">
                        <Feature
                            count={1}
                            title="Subscribe"
                            description="Sign up for our newsletter."
                            icon={<HandPointing className="h-[42px] w-[42px]" />}
                        />
                    </li>
                    <li className="flex-1 flex-grow">
                        <Feature
                            count={2}
                            title="Access benefits"
                            description="Unlock the best of what MiaCollective has to offer."
                            icon={<LockKeyOpen className="h-[42px] w-[42px]" />}
                        />
                    </li>
                    <li className="flex-1 flex-grow">
                        <Feature
                            count={3}
                            title="Win giveaways"
                            description="That’s it, you’re entered into all our giveaways. Including monthly and smaller giveaways."
                            icon={<Gift className="h-[42px] w-[42px]" />}
                        />
                    </li>
                </ul>
            </Container>
        </section>
    )
}
