// UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fetchProfile } from "../../utils/authUtils";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
	const [profile, setProfile] = useState(null); // Alterado de "" para null
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null); // Alterado de "" para null
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const { user } = useAuth();

	useEffect(() => {
		const loadProfile = async () => {
			if (!user?.id) {
				setError("Usuário não autenticado");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const data = await fetchProfile(user.id);
				setProfile(data);
				if (data.profileImage) {
					setImagePreview(data.profileImage);
				}
			} catch (err) {
				setError(err.message || "Erro ao carregar perfil");
			} finally {
				setLoading(false);
			}
		};

		loadProfile();
	}, [user]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageUpload = async () => {
		if (!imageFile) return;

		const formData = new FormData();
		formData.append("profileImage", imageFile);

		try {
			const response = await fetch(
				`http://localhost:3003/users/profile/${user.id}/image`,
				{
					method: "POST",
					credentials: "include",
					body: formData,
				},
			);

			if (!response.ok) throw new Error("Erro ao enviar imagem");

			const data = await response.json();
			setImagePreview(data.profileImage);
			setImageFile(null);
		} catch (err) {
			setError("Erro ao enviar imagem: " + err.message);
		}
	};

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.loader}>Carregando...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.container}>
				<div className={styles.error}>
					<h2>Erro ao carregar perfil</h2>
					<p>{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.profileCard}>
				<h1>Perfil do Usuário</h1>
				<div className={styles.imageSection}>
					<div className={styles.profileImageContainer}>
						{imagePreview ? (
							<img
								src={imagePreview}
								alt="Foto de perfil"
								className={styles.profileImage}
							/>
						) : (
							<div className={styles.profileImagePlaceholder}>
								<span>Sem foto</span>
							</div>
						)}
					</div>
					<div className={styles.imageUploadControls}>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className={styles.fileInput}
							id="profile-image-input"
						/>
						<label
							htmlFor="profile-image-input"
							className={styles.fileInputLabel}>
							Escolher Imagem
						</label>
						{imageFile && (
							<button
								onClick={handleImageUpload}
								className={styles.uploadButton}>
								Enviar Imagem
							</button>
						)}
					</div>
				</div>

				{profile && (
					<div className={styles.profileInfo}>
						<div className={styles.infoRow}>
							<label>Nome:</label>
							<span>{profile.name}</span>
						</div>
						<div className={styles.infoRow}>
							<label>Email:</label>
							<span>{profile.email}</span>
						</div>
						{profile.telephone && (
							<div className={styles.infoRow}>
								<label>Telefone:</label>
								<span>{profile.telephone}</span>
							</div>
						)}
						{profile.cpf && (
							<div className={styles.infoRow}>
								<label>CPF:</label>
								<span>{profile.cpf}</span>
							</div>
						)}
						{profile.birthDate && (
							<div className={styles.infoRow}>
								<label>Data de Nascimento:</label>
								<span>
									{new Date(profile.birthDate).toLocaleDateString("pt-BR")}
								</span>
							</div>
						)}
						{profile.addresses && profile.addresses.length > 0 && (
							<div className={styles.addressSection}>
								<h2>Endereços</h2>
								{profile.addresses.map((address, index) => (
									<div
										key={index}
										className={styles.addressCard}>
										<h3>
											{address.nicknameAddress || `Endereço ${index + 1}`}
										</h3>
										<p>
											{address.street}, {address.number}
										</p>
										{address.complement && (
											<p>Complemento: {address.complement}</p>
										)}
										<p>CEP: {address.zipCode}</p>
										{address.referencePoint && (
											<p>Ponto de Referência: {address.referencePoint}</p>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
