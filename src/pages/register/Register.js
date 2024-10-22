import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";
import {
	Button,
	ButtonSucess,
} from "../../components/buttons/formButton/Button";
import Input from "../../components/inputs/formInput/Input.js";

import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		birthDate: "",
		cpf: "",
		telephone: "",
		addresses: [
			{
				zipCode: "",
				street: "",
				number: "",
				complement: "",
				referencePoint: "",
				nicknameAddress: "",
			},
		],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name.startsWith("addresses.")) {
			const [, index, field] = name.split(".");
			setFormData((prev) => ({
				...prev,
				addresses: prev.addresses.map((addr, i) =>
					i === parseInt(index) ? { ...addr, [field]: value } : addr,
				),
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const addAddress = () => {
		setFormData((prev) => ({
			...prev,
			addresses: [
				...prev.addresses,
				{
					zipCode: "",
					street: "",
					number: "",
					complement: "",
					referencePoint: "",
					nicknameAddress: "",
				},
			],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3003/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				login(data.user); // Usando o contexto para fazer login
				navigate("/about");
			} else {
				const errorData = await response.json();
				alert(errorData.message);
			}
		} catch (error) {
			console.error("Erro ao criar conta:", error);
			alert("Erro ao criar conta. Por favor, tente novamente.");
		}
	};

	return (
		<div className={styles.form_container}>
			<form onSubmit={handleSubmit}>
				<h1>Criar Conta</h1>
				<div className={styles.form_row}>
					<Input
						placeholder="Nome:"
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<Input
						placeholder="Email:"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.form_row}>
					<Input
						placeholder="Senha:"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<Input
						placeholder="Data de Nascimento:"
						type="date"
						name="birthDate"
						value={formData.birthDate}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.form_row}>
					<Input
						placeholder="CPF:"
						type="text"
						name="cpf"
						value={formData.cpf}
						onChange={handleChange}
						required
					/>
					<Input
						placeholder="Telefone:"
						type="text"
						name="telephone"
						value={formData.telephone}
						onChange={handleChange}
						required
					/>
				</div>

				{formData.addresses.map((address, index) => (
					<div
						key={index}
						className={styles.address_container}>
						<h2>Endereço {index > 0 && index + 1}:</h2>
						<div className={styles.form_row}>
							<Input
								placeholder="CEP:"
								type="text"
								name={`addresses.${index}.zipCode`}
								value={address.zipCode}
								onChange={handleChange}
								required
							/>
							<Input
								placeholder="Rua:"
								type="text"
								name={`addresses.${index}.street`}
								value={address.street}
								onChange={handleChange}
								required
							/>
						</div>

						<div className={styles.form_row}>
							<Input
								placeholder="Número:"
								type="number"
								name={`addresses.${index}.number`}
								value={address.number}
								onChange={handleChange}
							/>
							<Input
								placeholder="Complemento:"
								type="text"
								name={`addresses.${index}.complement`}
								value={address.complement}
								onChange={handleChange}
							/>
						</div>

						<div className={styles.form_row}>
							<Input
								placeholder="Ponto de Referência"
								type="text"
								name={`addresses.${index}.referencePoint`}
								value={address.referencePoint}
								onChange={handleChange}
							/>
							<Input
								placeholder="Apelido do Endereço:"
								type="text"
								name={`addresses.${index}.nicknameAddress`}
								value={address.nicknameAddress}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
				))}

				<div className={styles.buttons_container}>
					{/* Botão para adicionar mais um endereço */}
					<Button
						type="button"
						onClick={addAddress}>
						Adicionar Endereço
					</Button>
					<ButtonSucess type="submit">Criar Conta</ButtonSucess>
				</div>
				<Link to={"/login"}>Já possuí conta?</Link>
			</form>
		</div>
	);
};

export default Register;
