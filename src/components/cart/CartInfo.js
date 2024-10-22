import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./CartInfo.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { fetchUserCart } from "../../utils/CartUtils";

const CartInfo = () => {
	const [, setCart] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { user } = useAuth();

	useEffect(() => {
		const loadCart = async () => {
			if (!user.id) return setError("Usuário não autenticado");

			try {
				const data = await fetchUserCart(user.id);
				setCart(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadCart();
	}, [user]);

	if (loading)
		return <div className={styles.loader}>Carregando carrinho...</div>;

	if (error)
		return (
			<div className={styles.error}>
				<h2>Erro ao carregar o carrinho</h2>
				<p>{error}</p>
			</div>
		);

	return (
		<div className={styles.cartContainer}>
			<FaShoppingCart className={styles.cartIcon} />
			{/* Renderizar produtos do carrinho */}
		</div>
	);
};

export default CartInfo;
