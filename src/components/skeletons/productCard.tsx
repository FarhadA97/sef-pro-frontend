export const ProductCardSkeleton = () => {
  return (
      <div className="flex gap-5">
          {/* Map over 3 Skeleton Items with height and width props */}
          {Array(3).fill(0).map((_, index) => (
              <ProductCard key={index} />
          ))}
      </div>
  );
};

export const ProductCard = () => (
    <div className="relative border w-full overflow-hidden cursor-pointer animate-pulse">
      {/* Image Skeleton */}
      <div className="h-[400px] bg-gray-300"></div>
  
      {/* Content Skeleton */}
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
      </div>
  
      {/* Hover Effect Skeleton */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gray-400 bg-opacity-80 text-white text-center flex items-center justify-center translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
        <div className="h-6 w-24 bg-gray-500 rounded-md"></div>
      </div>
    </div>
);
