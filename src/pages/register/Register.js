import React, { useState } from "react";
import axios from "axios"; // Importando Axios
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
				// Inicializa com um endereço
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
			const index = name.split(".")[1]; // Pega o índice do endereço
			const addressField = name.split(".")[2]; // Pega o campo específico do endereço
			setFormData((prevState) => ({
				...prevState,
				addresses: prevState.addresses.map((address, i) =>
					i === parseInt(index)
						? { ...address, [addressField]: value } // Atualiza o campo correto
						: address
				),
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value, // Atualiza outros campos do formData
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
			const response = await axios.post("http://localhost:3003/user", formData);
			alert("Usuário criado com sucesso:\n", response.data);
		} catch (error) {
			console.error(
				"Erro ao criar usuário:",
				error.response ? error.response.data : error.message
			);
		}

		console.log(formData); // Para verificar os dados antes do envio
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

				<h3>Endereços</h3>
				{formData.addresses.map((address, index) => (
					<div key={index} className="address-container">
						<div className="form-row">
							<label className="label">
								CEP:
								<input
									type="text"
									name={`addresses.${index}.zipCode`} // Nome correto para o campo CEP
									className="input-field"
									value={address.zipCode} // Valor correto do state
									onChange={handleChange} // Chama handleChange corretamente
									required
								/>
							</label>

							<label className="label">
								Rua:
								<input
									type="text"
									name={`addresses.${index}.street`} // Nome correto para o campo rua
									className="input-field"
									value={address.street} // Valor correto do state
									onChange={handleChange} // Chama handleChange corretamente
									required
								/>
							</label>
						</div>

						<div className="form-row">
							<label className="label">
								Número:
								<input
									type="number"
									name={`addresses.${index}.number`} // Nome correto para o campo número
									className="input-field"
									value={address.number} // Valor correto do state
									onChange={handleChange} // Chama handleChange corretamente
									required
								/>
							</label>

							<label className="label">
								Complemento:
								<input
									type="text"
									name={`addresses.${index}.complement`} // Nome correto para o campo complemento
									className="input-field"
									value={address.complement} // Valor correto do state
									onChange={handleChange} // Chama handleChange corretamente
								/>
							</label>
						</div>

						<div className="form-row">
							<label className="label">
								Ponto de Referência:
								<input
									type="text"
									name={`addresses.${index}.referencePoint`} // Nome correto para o campo ponto de referência
									className="input-field"
									value={address.referencePoint} // Valor correto do state
									onChange={handleChange} // Chama handleChange corretamente
								/>
							</label>

							<label className="label">
								Apelido do Endereço:
								<input
									type="text"
									name={`addresses.${index}.nicknameAddress`} // Nome correto para o campo apelido do endereço
									className="input-field"
									value={address.nicknameAddress} // Valor correto do state
									onChange={handleChange} // Chama handleChange corretamente
									required
								/>
							</label>
						</div>
					</div>
				))}

				{/* Botão para adicionar mais um endereço */}
				<button type="button" onClick={addAddress}>
					Adicionar Endereço
				</button>

				<button type="submit">Criar Conta</button>
			</form>
		</div>
	);
};

export default UserForm;
