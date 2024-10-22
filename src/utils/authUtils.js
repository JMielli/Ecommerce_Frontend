// src/utils/authUtils.js
export const fetchProfile = async (userId) => {
	// Função para buscar o perfil do usuário autenticado.
	const response = await fetch(
		`http://localhost:3003/users/profile/${userId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error(`Erro ao carregar perfil:${response.statusText}`);
	}

	return response.json();
};
