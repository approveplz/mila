'use client'
import React, { useState } from 'react';
import { data } from './metadata';

export function FAQ() {
    const [activeAccordions, setActiveAccordions] = useState(Array(data.accordion.length).fill(false));

    const toggleAccordion = (index:any) => {
        const newActiveAccordions = [...activeAccordions];
        newActiveAccordions[index] = !newActiveAccordions[index];
        setActiveAccordions(newActiveAccordions);
    };

    return (
        <div id='FAQ' className="sm:px-10 lg:pt-20 lg:px-52 p-5">
            <div className="text-left">
                <h2 className="text-3xl font-stardom text-primary-600">
                    {data?.title}
                </h2>
            </div>

            <div className='w-full py-10'>
                {data.accordion.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between pt-5 cursor-pointer items-center" onClick={() => toggleAccordion(index)}>
                            <div className="text-base font-medium text-primary-800">{item.title}</div>
                            <div className="text-3xl font-light text-primary-800">{activeAccordions[index] ? '-' : '+'}</div>
                        </div>
                        <div className={`transition-all duration-500 ${activeAccordions[index] ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                            {activeAccordions[index] && (
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
