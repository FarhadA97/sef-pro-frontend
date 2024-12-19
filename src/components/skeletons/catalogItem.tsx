interface SkeletonCatalogItemProps {
  height?: string;
  width?: string;
  showHeading?: boolean;
  containerStyle?: string;
}

export const SkeletonCatalog = ({ height = 'h-96', width = 'w-64', showHeading = false, containerStyle }: SkeletonCatalogItemProps) => {
  return (
    <div className={`flex flex-col gap-10 p-5 overflow-x-auto lg:overflow-x-hidden space-x-4 ${containerStyle}`}>
      {showHeading && <div className="w-[200px] self-center h-6 bg-gray-300 rounded-md animate-pulse"></div>}
      {/* Map over 3 Skeleton Items with height and width props */}
      <div className="flex gap-8">
      {Array(5).fill(0).map((_, index) => (
        <SkeletonCatalogItem key={index} height={height} width={width} />
      ))}
      </div>
    </div>
  );
};

const SkeletonCatalogItem = ({ height, width }: SkeletonCatalogItemProps) => {
  return (
    <div
      className={`flex-shrink-0 group relative ${height} ${width} overflow-hidden rounded-lg bg-white shadow-lg cursor-pointer animate-pulse`}
    >
      {/* Image Skeleton */}
      <div className={`relative z-10 ${width} ${height} bg-gray-200 rounded-lg`} />
      {/* Overlay Skeleton */}
      <div className="absolute inset-0 flex justify-center bg-opacity-30 text-white text-lg font-semibold bg-gray-300">
        <p className="absolute z-20 bottom-6 text-black text-[25px] font-semibold bg-gray-400 w-1/2 h-6 rounded-md"></p>
      </div>
    </div>
  );
};
