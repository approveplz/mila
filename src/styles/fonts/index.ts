import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

// Inter (Google)
export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

// TT Ramillas Trial Variable (Local)
export const ttRamillasTrlVar = localFont({
    variable: '--font-tt-ramillas-trl-var',
    src: [
        {
            path: './tt-ramillas/TT-Ramillas-Trial-Light.woff',
            weight: '300',
            style: 'normal'
        },
        {
            path: './tt-ramillas/TT-Ramillas-Trial-Light-Italic.woff',
            weight: '300',
            style: 'italic'
        },
        {
            path: './tt-ramillas/TT-Ramillas-Trial-Regular.woff',
            weight: '400',
            style: 'normal'
        },
        {
            path: './tt-ramillas/TT-Ramillas-Trial-Medium.woff',
            weight: '500',
            style: 'normal'
        },
        {
            path: './tt-ramillas/TT-Ramillas-Trial-Bold.woff',
            weight: '700',
            style: 'normal'
        },
        {
            path: './tt-ramillas/TT-Ramillas-Trial-ExtraBold.woff',
            weight: '800',
            style: 'normal'
        }
    ]
});
