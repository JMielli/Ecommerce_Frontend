import React, { useState } from "react";
import "./Register.css"; // Importando o arquivo de estilos

const UserForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		birthDate: "",
		cpf: "",
		telephone: "",
		addresses: [
			{
				// Alterado para permitir múltiplos endereços
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
			const index = name.split(".")[1];
			const addressField = name.split(".")[2];
			const updatedAddresses = [...formData.addresses];
			updatedAddresses[index][addressField] = value;

			setFormData((prevState) => ({
				...prevState,
				addresses: updatedAddresses,
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const addAddress = () => {
		setFormData((prevState) => ({
			...prevState,
			addresses: [
				...prevState.addresses,
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
			const response = await fetch("http://localhost:3003/user/newUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Erro ao criar usuário");
			}

			const data = await response.json();
			console.log("Usuário criado com sucesso:", data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<h2>Criar Conta</h2>

				<div className="form-row">
					<label className="label">
						Nome:
						<input
							type="text"
							name="name"
							className="input-field"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</label>

					<label className="label">
						Email:
						<input
							type="email"
							name="email"
							className="input-field"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</label>
				</div>

				<div className="form-row">
					<label className="label">
						Senha:
						<input
							type="password"
							name="password"
							className="input-field"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</label>

					<label className="label">
						Data de Nascimento:
						<input
							type="date"
							name="birthDate"
							className="input-field"
							value={formData.birthDate}
							onChange={handleChange}
							required
						/>
					</label>
				</div>

				<div className="form-row">
					<label className="label">
						CPF:
						<input
							type="text"
							name="cpf"
							className="input-field"
							value={formData.cpf}
							onChange={handleChange}
							required
						/>
					</label>

					<label className="label">
						Telefone:
						<input
							type="text"
							name="telephone"
							className="input-field"
							value={formData.telephone}
							onChange={handleChange}
							required
						/>
					</label>
				</div>

				{formData.addresses.map((address, index) => (
					<div key={index} className="address-container">
						<h3>Endereço {index + 1}</h3>
						<div className="form-row">
							<label className="label">
								CEP:
								<input
									type="text"
									name={`addresses.${index}.zipCode`}
									className="input-field"
									value={address.zipCode}
									onChange={handleChange}
									required
								/>
							</label>

							<label className="label">
								Rua:
								<input
									type="text"
									name={`addresses.${index}.street`}
									className="input-field"
									value={address.street}
									onChange={handleChange}
									required
								/>
							</label>
						</div>

						<div className="form-row">
							<label className="label">
								Número:
								<input
									type="number"
									name={`addresses.${index}.number`}
									className="input-field"
									value={address.number}
									onChange={handleChange}
									required
								/>
							</label>

							<label className="label">
								Complemento:
								<input
									type="text"
									name={`addresses.${index}.complement`}
									className="input-field"
									value={address.complement}
									onChange={handleChange}
								/>
							</label>
						</div>

						<div className="form-row">
							<label className="label">
								Ponto de Referência:
								<input
									type="text"
									name={`addresses.${index}.referencePoint`}
									className="input-field"
									value={address.referencePoint}
									onChange={handleChange}
								/>
							</label>

							<label className="label">
								Apelido do Endereço:
								<input
									type="text"
									name={`addresses.${index}.nicknameAddress`}
									className="input-field"
									value={address.nicknameAddress}
									onChange={handleChange}
									required
								/>
							</label>
						</div>
					</div>
				))}

				<button type="button" onClick={addAddress}>
					Adicionar Endereço
				</button>
				<button type="submit">Criar Conta</button>
			</form>
		</div>
	);
};

export default UserForm;
