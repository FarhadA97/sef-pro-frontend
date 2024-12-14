export const NavbarSkeleton = () => {
    return (
        <div className="flex gap-5">
            {/* Map over 3 Skeleton Items with height and width props */}
            {Array(3).fill(0).map((_, index) => (
                <NavbarItem key={index} />
            ))}
        </div>
    );
};

const NavbarItem = () => {
    return (
        <div className={`p-5 flex flex-col gap-4 align-center group relative h-full w-[250px] overflow-hidden rounded-lg bg-white cursor-pointer animate-pulse`}>
            <div className="w-40 h-5 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="w-28 h-5 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="w-28 h-5 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="w-28 h-5 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
    );
};
