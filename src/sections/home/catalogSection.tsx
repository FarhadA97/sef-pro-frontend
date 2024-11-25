
const CatalogData = [
  {
    title: 'Sportswear',
    image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=',
    colorClass: 'bg-[#e1be69]',
  },
  {
    title: 'Activewear',
    image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=',
    colorClass: 'bg-[#e62531]',
  },
  {
    title: 'Teamwear',
    image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=',
    colorClass: 'bg-[#89bba8]',
  },
  {
    title: 'Caps',
    image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=',
    colorClass: 'bg-[#95d4e4]',
  },
  {
    title: 'Bags',
    image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=',
    colorClass: 'bg-[#ccbeb0]',
  }
]

const CatalogItem = ({image ,title ,color}: {image: string, title:string, color: string}) => {
  return (
    <div className="flex align-center group relative h-96 overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Image */}
      <img
        src={image}
        alt="Product"
        className="relative z-10 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:-translate-y-12 group-hover:scale-105"
      />
      {/* Overlay Text */}
      <div className={`absolute inset-0 flex justify-center bg-opacity-30 text-white text-lg font-semibold transition-opacity duration-1000 group-hover:bg-opacity-60 ${color}`}>
        <p className="absolute z-20 bottom-6 text-white text-[25px] font-semibold transition-all duration-500 group-hover:bottom-1 group-hover:text-[18px]">
          {title}
        </p>
      </div>
    </div>
  );
}

export const Catalog = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {CatalogData.map((data,index) => (
          <CatalogItem key={index} title={data.title} image={data.image} color={data.colorClass} />
        ))}
      </div>
      );
}