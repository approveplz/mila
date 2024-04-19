'use client'
import { useState } from 'react';
import { data } from './metadata';

export function FAQ() {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index: any) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <div className="sm:px-10 lg:p-20 p-5">
            <div className="text-left">
                <h2 className="text-3xl font-stardom text-primary-600">
                    {data?.title}
                </h2>
            </div>

            <div className='w-full py-10'>
                {data.accordian.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between pt-5 cursor-pointer items-center" onClick={() => toggleAccordion(index)}>
                            <div className="text-base font-medium text-primary-800">{item.title}</div>
                            <div className="text-3xl font-light text-primary-800">{activeAccordion === index ? '-' : '+'}</div>
                        </div>
                        <div className={`transition-all duration-500 ${activeAccordion === index ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                            {activeAccordion === index && (
                                <div className='text-primary-500 text-base'>
                                    {item.description}
                                </div>
                            )}
                        </div>
                        <div className='border-b pb-5'></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
