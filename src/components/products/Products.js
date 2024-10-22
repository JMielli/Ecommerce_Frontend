// src/components/UserList.js
import { useState, useEffect } from "react";
import axios from "axios";

// import styles from "./Products.module.css";

export const ProductList = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3003/products")
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the users!", error);
			});
	}, []);

	return { products };
};
