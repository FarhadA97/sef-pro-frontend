import { CategoryShop } from "@/sections/shop/categoryShop";


export default async function CategoryPage({
	params,
  }: {
	params: Promise<{ id: string, categoryId: string }>
  }) {
	const categoryId = (await params).id
	const subCategoryId = (await params).categoryId

	return (
		<CategoryShop categoryId={categoryId} subCategoryId={subCategoryId} />
	);
}
  