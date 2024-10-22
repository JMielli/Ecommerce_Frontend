import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./ProductPage.css";

const ProductPage = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [mainImage, setMainImage] = useState("");
	const { user, token } = useAuth(); // Adicione o token ao destructuring
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3003/products/${id}`,
				);
				setProduct(response.data);
				setMainImage(response.data.mainImage);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};

		fetchProduct();
	}, [id]);

	// Função modificada para incluir o token de autorização
	const addToCart = async () => {
		if (!user) {
			navigate("/login");
			return;
		}

		try {
			await axios.post(
				`http://localhost:3003/cart/${user.id}/add`,
				{
					userId: user.id,
					productId: product.id, // Certifique-se de usar productId ao invés de product
				},
				{
					headers: {
						"Authorization": `Bearer ${token}`, // Adiciona o token no cabeçalho
						"Content-Type": "application/json",
					},
				},
			);
			alert("Produto adicionado ao carrinho!");
		} catch (error) {
			if (error.response?.status === 401) {
				alert("Sua sessão expirou. Por favor, faça login novamente.");
				navigate("/login");
			} else {
				console.error("Erro ao adicionar produto ao carrinho:", error);
				alert("Erro ao adicionar produto ao carrinho. Tente novamente.");
			}
		}
	};

	if (!product) return <div>Loading...</div>;

	return (
		<div className="product-page">
			<div className="top-section">
				<div className="carousel">
					<img
						src={mainImage}
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
								onClick={() => setMainImage(image)} // Trocar a imagem principal ao clicar
							/>
						))}
					</div>
				</div>

				{/* Seção dos botões */}
				<div className="buttons-section">
					<a
						href={product.link}
						target="_blank"
						rel="noopener noreferrer"
						className="buy-button">
						Comprar na Amazon
					</a>
					<button
						className="add-to-cart-button"
						onClick={addToCart}>
						Adicionar ao Carrinho
					</button>
				</div>
			</div>

			<h1 className="product-title">{product.title}</h1>
			<p className="product-price">
				R$ {product.price.toFixed(2).replace(".", ",")}
			</p>
			<p className="stock-info">Estoque: {product.quantityStock}</p>

			<h2>Detalhes do Produto</h2>
			<table className="details-table">
				<tbody>
					{Object.entries(product.details).map(([key, value]) => (
						<tr key={key}>
							<td>
								<strong>{key}</strong>
							</td>
							<td>{value}</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>Informações Adicionais</h2>
			<table className="details-table">
				<tbody>
					{Object.entries(product.additionalInfo).map(([key, value]) => (
						<tr key={key}>
							<td>
								<strong>{key}</strong>
							</td>
							<td>{value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductPage;
