// src/components/loginCard/LoginCard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginCard.module.css";
import { Link } from "react-router-dom";
import { ButtonSucess } from "../buttons/formButton/Button";
import Input from "../inputs/formInput/Input";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginCard({ title }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { login, isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) navigate("/users/profile/:userId");
	}, [isAuthenticated, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3003/users/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				login(data.user);
				navigate("/users/profile/:userId");
			} else {
				const errorData = await response.json();
				alert(errorData.message);
			}
		} catch (error) {
			console.error("Erro ao fazer login:", error);
			alert("Erro ao fazer login. Por favor, tente novamente.");
		}
	};

	return (
		<div className={styles.card}>
			<form
				className={styles.form}
				onSubmit={handleSubmit}>
				<h1>{title}</h1>
				<Input
					type="email"
					placeholder="Digite seu E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Input
					type="password"
					placeholder="Digite sua Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<div className={styles.links_container}>
					<Link to="/register">Não possui conta?</Link>
					<Link to="/recovery">Esqueceu a senha?</Link>
				</div>
				<ButtonSucess type="submit">Entrar</ButtonSucess>
			</form>
		</div>
	);
}
