import React from 'react';
import { Button } from '../button/button.component';
import { data } from './metadata';

export function ContactUs() {
    return (
        <div
            id='contact-us'
            className="lg:px-20 px-10 lg:py-40 py-16 flex flex-col lg:flex-row lg:gap-0 gap-8 justify-left bg-[url('/images/bg-section-rotate.png')] bg-no-repeat bg-cover"
        >
            <div className='sm:w-1/2 w-full'>
                <div className='xl:px-32'>
                    <h2 className="text-3xl font-stardom text-primary-600">
                        {data.title}
                    </h2>
                    <p className="text-[20px] text-primary-500 mt-2">
                        {data.description}
                    </p>
                </div>
            </div>
            <div>
                <div className='flex flex-col sm:flex-row sm:gap-5 gap-2 items-center w-full sm:w-1/2'>
                    <input
                        className='border border-primary-300 h-[48px] text-primary-400 w-full sm:min-w-[324px] px-5 placeholder-primary-700 shadow-md'
                        placeholder='Enter your email'
                        type="text"
                    />
                    <Button variant="accent" className="grow w-full sm:w-[104px] h-[48px]">{data.buttonText}</Button>
                </div>
                <p className="text-sm text-primary-500 mt-2">
                    {data.policyStatement} <span className="font-medium cursor-pointer">{data.privacyPolicy}</span>
                </p>
            </div>
        </div>
    );
};