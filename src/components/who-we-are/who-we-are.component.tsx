import Image from 'next/image';
import { data } from './metadata';

export function WhoWeAre() {
    return (
        <div id='about-us' className="grid grid-cols-12 sm:gap-10 gap-8 sm:px-10 lg:px-52 px-5 py-20">
            <div className="sm:col-span-7 lg:col-span-9 col-span-12">
                <div className="text-left">
                    <h2 className="text-3xl font-stardom text-primary-600">
                        {data?.title}
                    </h2>
                    <p className="text-lg text-primary-500 sm:mt-6 mt-12">
                        {data?.description}
                    </p>
                </div>
            </div>
            <div className="sm:col-span-5 lg:col-span-3 col-span-12 sm:mt-0 mt-8">
                <div className="flex justify-center">
                    <div className="relative max-w-[250px] min-h-[300px] rounded-t-full rounded-br-full before:content-['] before:absolute before:-right-1 before:top-2 before:w-full before:h-full before:border before:-z-40 before:border-primary-600 before:rounded-t-full before:rounded-br-full">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/f11c/b65d/6e3970bb3d1da51dee671273a841ed49?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kChY4RA8KC6flPUldzaL93qNPH3jfpFk49yMIC3w-Q-yCsO0qNXpCpj0Y3Pn0kcdMNuXe72Y03P5cu0QGvPnmIZL75PXLPScxFiuychu-vsP6lw04TkitCX4z3h0WsFNJuMKkY9tbu5JbaNEhk7WxQDsQYxu~wPC76EXZYfagVzVjttuNwv4ql59c9O6pW9KMSGE8PmCdZ27IA3BapU9iInrEOZTMjZX18mYzIhRbnMBILre7mh1NvdP0-Ovfznc6T6IO9MP6zNf3mBXZt9VbCWHt6N-z~41nod1yQifi6V50WOhWcsa8Jqu4zpBKQFQaOqm5Gl1xjUT1UeBNX4LYA__"
                            alt="Who We Are"
                            className="rounded-t-full rounded-br-full border border-gray-300 border-b-0 max-w-[250px] min-h-[300px]"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

