import { Provider } from "./_components/provider/provider.component";

export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider>
            {children}
        </Provider>
    );
}