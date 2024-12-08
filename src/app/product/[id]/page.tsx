import { ProductPage } from "@/sections/productDetails"

export default async function ProductDetailPage({
	params,
  }: {
	params: Promise<{ id: string }>
  }) {
	const id = (await params).id

	return (
		<ProductPage id={id} />
	)
  }
  