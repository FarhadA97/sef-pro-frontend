import CatalogSlider from "./catalogSlider";

const categories = [
    { image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=', title: 'Category 1', color: 'bg-blue-600' },
    { image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=', title: 'Category 2', color: 'bg-red-600' },
    { image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=', title: 'Category 3', color: 'bg-green-600' },
    { image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=', title: 'Category 4', color: 'bg-yellow-600' },
];

const ProductData = [
    {
      title: 'Tanktop',
      image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
      colorClass: 'bg-[#e1be69]',
    },
    {
      title: 'Tanktop',
      image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
      colorClass: 'bg-[#e62531]',
    },
    {
      title: 'Tanktop',
      image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
      colorClass: 'bg-[#89bba8]',
    },
    {
      title: 'Tanktop',
      image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
      colorClass: 'bg-[#95d4e4]',
    },
    {
      title: 'Tanktop',
      image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
      colorClass: 'bg-[#ccbeb0]',
    }
]

const ProductCard = ({ product }: {product: {image: string, title: string}}) => {
    return (
        <div className="relative group border overflow-hidden cursor-pointer">
        {/* Image and Content Container */}
        <div className="h-full transform group-hover:-translate-y-12 transition-transform duration-300">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-cover"
          />
  
          {/* Title and Price */}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-500">$24.00</p>
          </div>
        </div>
  
        {/* Hover Effect: Customize */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-[#111710] bg-opacity-80 text-white text-center flex items-center justify-center translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-lg font-semibold">Customize</span>
        </div>
      </div>
    );
  };

export const Shop = () => {
    return (
        <div className="p-5">
            <CatalogSlider categories={categories} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {ProductData.map((item, index) => (
                    <ProductCard key={index} product={item} />
                ))}
            </div>
        </div>
    );
};
