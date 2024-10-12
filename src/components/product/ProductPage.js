// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ProductPage.css";

// const ProductPage = ({ productId }) => {
// 	const [product, setProduct] = useState(null);

// 	useEffect(() => {
// 		const fetchProduct = async () => {
// 			try {
// 				const response = await axios.get(
// 					`http://localhost:3003/products/${productId}`
// 				);
// 				setProduct(response.data);
// 			} catch (error) {
// 				console.error("Error fetching product:", error);
// 			}
// 		};

// 		fetchProduct();
// 	}, [productId]);

// 	if (!product) return <div>Loading...</div>;

// 	return (
// 		<div className="product-page">
// 			<div className="carousel">
// 				<img
// 					src={product.mainImage}
// 					alt={product.title}
// 					className="main-image"
// 				/>
// 				<div className="thumbnail-container">
// 					{product.images.map((image, index) => (
// 						<img
// 							key={index}
// 							src={image}
// 							alt={`Thumbnail ${index}`}
// 							className="thumbnail"
// 						/>
// 					))}
// 				</div>
// 			</div>

// 			<h1 className="product-title">{product.title}</h1>
// 			<p className="product-price">
// 				R$ {product.price.toFixed(2).replace(".", ",")}
// 			</p>
// 			<p className="stock-info">Estoque: {product.quantityStock}</p>

// 			<h2>Detalhes do Produto</h2>
// 			<ul className="details-list">
// 				{Object.entries(product.details).map(([key, value]) => (
// 					<li key={key}>
// 						<strong>{key}:</strong> {value}
// 					</li>
// 				))}
// 			</ul>

// 			<a
// 				href={product.link}
// 				target="_blank"
// 				rel="noopener noreferrer"
// 				className="buy-button"
// 			>
// 				Comprar na Amazon
// 			</a>
// 		</div>
// 	);
// };

// export default ProductPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Importando useParams
import "./ProductPage.css";

const ProductPage = () => {
	const { id } = useParams(); // Obtendo o ID da URL
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3003/products/${id}`
				);
				setProduct(response.data);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};

		fetchProduct();
	}, [id]);

	if (!product) return <div>Loading...</div>;

	return (
		<div className="product-page">
			<div className="carousel">
				<img
					src={product.mainImage}
					alt={product.title}
					className="main-image"
				/>
				<div className="thumbnail-container">
					{product.images.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Thumbnail ${index}`}
							className="thumbnail"
						/>
					))}
				</div>
			</div>

			<h1 className="product-title">{product.title}</h1>
			<p className="product-price">
				R$ {product.price.toFixed(2).replace(".", ",")}
			</p>
			<p className="stock-info">Estoque: {product.quantityStock}</p>

			<h2>Detalhes do Produto</h2>
			<ul className="details-list">
				{Object.entries(product.details).map(([key, value]) => (
					<li key={key}>
						<strong>{key}:</strong> {value}
					</li>
				))}
			</ul>

			<a
				href={product.link}
				target="_blank"
				rel="noopener noreferrer"
				className="buy-button"
			>
				Comprar na Amazon
			</a>
		</div>
	);
};

export default ProductPage;
