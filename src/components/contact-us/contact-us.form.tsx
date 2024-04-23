"use client";

import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as actions from "@/actions";
import { Button } from "@/components";
import { data } from './metadata';

function Submit() {
    const { pending } = ReactDom.useFormStatus();

    return (
        <Button type="submit" variant="accent" className="grow w-full sm:w-[104px] h-[48px]" disabled={pending}>{data.buttonText}</Button>
    );
}

export function ContactUsForm() {
    const [state, action] = ReactDom.useFormState(actions.addUserToNotion, { message: '' });
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useEffect(() => {
        if (state && state.id) {
            formRef.current?.reset();
        }
    }, [state]);

    return (
        <div>
            <form ref={formRef} action={action} className='flex flex-col sm:flex-row sm:gap-5 gap-2 items-center w-full sm:w-1/2'>
                <input
                    className='border border-primary-300 h-[48px] text-primary-500 font-medium w-full sm:min-w-[324px] px-5 placeholder-primary-500 shadow-md placeholder:font-medium outline-none'
                    placeholder='Enter your email'
                    type="text"
                    name="email"
                />

                <Submit />
            </form>
            {state?.message ? (
                <p className="text-sm text-red-500 mt-2">
                    {state?.message}
                </p>
            ) : (
                <>
                    {state?.id ? (
                        <p className="text-sm text-primary-500 mt-2">
                            Thank you! You have been added to our mailing list
                        </p>
                    ) : (
                        <p className="text-sm text-primary-500 mt-2">
                            {data.policyStatement} <a href="/privacy-policy.pdf" target="_blank" className="font-medium cursor-pointer">{data.privacyPolicy}</a>
                        </p>
                    )}
                </>
            )}
        </div>
    )
}
