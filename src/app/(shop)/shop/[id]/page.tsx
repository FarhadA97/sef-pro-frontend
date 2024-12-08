import { Shop } from "@/sections/shop";

export default async function ShopPage({
	params,
  }: {
	params: Promise<{ id: string }>
  }) {
	const categoryId = (await params).id

	return (
		<Shop categoryId={categoryId} />
	);
}
  