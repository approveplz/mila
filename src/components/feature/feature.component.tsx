export function Feature({
    icon,
    count,
    title,
    description
}: {
    count: number,
    title: string,
    description: string,
    icon: React.ReactNode;
}) {
    return (
        <div className="relative p-6 bg-white border border-primary-100 min-h-full before:content-[''] before:absolute before:-right-2 before:-bottom-2 before:w-full before:h-full before:border before:-z-40 before:border-primary-200">
            <div className="text-accent text">
                {icon}
            </div>

            <div className="mt-[14px]">
                <p className="text-lg font-bold text-primary-800">{count}. {title}</p>
                <p className="leading-6 text-primary-500 mt-2">{description}</p>
            </div>
        </div>
    )
}
