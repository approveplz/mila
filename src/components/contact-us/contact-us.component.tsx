import * as React from 'react';
import { data } from './metadata';
import { ContactUsForm } from './contact-us.form';

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
            <ContactUsForm />
        </div>
    );
};