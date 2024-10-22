// utils/cartUtils.js

export const fetchUserCart = async (userId) => {
	const response = await fetch(`http://localhost:3003/cart/${userId}`, {
		method: "GET",
		credentials: "include", // Inclui cookies para autenticação
	});

	if (!response.ok) {
		throw new Error("Erro ao buscar o carrinho");
	}

	return await response.json();
};
