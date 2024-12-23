import AcmeLogo from '@/app/ui/acme-logo';

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen flex-col p-2 lg:p-6">
            <header className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <AcmeLogo />
            </header>
            {children}
        </main>
    );
}
