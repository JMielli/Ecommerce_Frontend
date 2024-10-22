import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const storedUser = localStorage.getItem("user");

				if (storedUser) {
					// Opcionalmente, verificar com o backend se o token ainda é válido
					const response = await fetch(
						"http://localhost:3003/users/check-auth",
						{
							credentials: "include",
						},
					);

					if (response.ok) {
						setUser(JSON.parse(storedUser));
					} else {
						// Se o token não for válido, limpa o localStorage
						localStorage.removeItem("user");
						setUser(null);
					}
				}
			} catch (error) {
				console.error("Erro ao verificar autenticação:", error);
				localStorage.removeItem("user");
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);

	const login = (userData) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = async () => {
		try {
			const response = await fetch("http://localhost:3003/users/logout", {
				method: "POST",
				credentials: "include",
			});

			if (response.ok) {
				setUser(null);
				localStorage.removeItem("user");
			} else {
				throw new Error("Erro ao fazer logout");
			}
		} catch (error) {
			console.error("Erro ao fazer logout:", error);
			// Mesmo com erro, limpa os dados locais
			setUser(null);
			localStorage.removeItem("user");
		}
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				isAuthenticated,
				loading,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
