export const ProductDetailsSkeleton = () => {
    return (
        <div className="container mx-auto px-5 lg:px-20 py-8 w-full">
            <div className="mb-5">
                <div className="w-2/3 h-6 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                {/* product images */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Vertical Bar with small image boxes */}
                    <div className="border rounded flex flex-row lg:flex-col order-last lg:order-first gap-1">
                        {/* 3 Placeholder boxes */}
                        {Array(4).fill(0).map((_, index) => (
                            <div key={index} className="w-20 h-20 bg-gray-300 rounded-md animate-pulse" />
                        ))}
                    </div>

                    {/* Main Image Div */}
                    <div className="flex-1">
                        <div className="w-auto md:w-[400px] lg:w-[550px] h-[500px] bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                </div>

                <div className="space-y-6 w-full">
                    {/* Skeleton for Paragraphs (2-3 lines) */}
                    <div className="space-y-4">
                        <div className="w-2/3 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                        <div className="w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>

                    {/* Skeleton for Product Price */}
                    <div className="p-5 border rounded flex flex-col gap-5 w-full">

                        <div className="w-32 h-8 bg-gray-300 rounded-md animate-pulse"></div>

                        {/* Skeleton for Select Size Label */}
                        <div className="w-40 h-5 bg-gray-300 rounded-md animate-pulse"></div>

                        {/* Skeleton for Select Size Dropdown */}
                        <div className="w-[250px] h-10 bg-gray-300 rounded-sm animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
