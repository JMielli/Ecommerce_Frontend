import { useEffect, useState } from "react";

import "./ProductsHome.css";

import { FormatPrice } from "../../hooks/formatPrice/FormatPrice";

const RandomProducts = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:3003/products");
				const data = await response.json();

				// Embaralhar os produtos e pegar os primeiros 12
				const shuffledProducts = data.sort(() => 0.5 - Math.random());
				const selectedProducts = shuffledProducts.slice(0, 12);

				setProducts(selectedProducts);
			} catch (error) {
				console.error("Erro ao buscar produtos:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div>
			<h1>Produtos Aleatórios</h1>
			<div className="product_list">
				{products.map((product) => (
					<div key={product._id} className="product_card">
						<h2>{product.title}</h2>
						<img src={product.mainImage} alt={product.title} />
						<h1>R$ {FormatPrice(product.price)}</h1>
					</div>
				))}
			</div>
		</div>
	);
};

export default RandomProducts;
