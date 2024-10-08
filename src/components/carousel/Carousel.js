import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Importando os módulos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./Carousel.css";
import { FormatPrice } from "../../hooks/formatPrice/FormatPrice";

const Carousel = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:3003/products");
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<Swiper
			// Usando os módulos importados
			modules={[Navigation, Pagination, Autoplay]}
			navigation
			pagination={{ clickable: true }}
			autoplay={{ delay: 3500, disableOnInteraction: true }}
			spaceBetween={50}
			slidesPerView={1}
			centeredSlides={true}
      shadown={true}
		>
			{products.map((product) => (
				<SwiperSlide key={product._id}>
					<div className="slide-content">
						<h1>{product.title}</h1>
						<img src={product.mainImage} alt={product.title} />
						<h1>R$ {FormatPrice(product.price)}</h1>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Carousel;
