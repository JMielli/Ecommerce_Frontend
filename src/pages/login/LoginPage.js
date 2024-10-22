import LoginCard from "../../components/loginCard/LoginCard";
import styles from "./LoginPage.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
	const { isAuthenticated, loading } = useAuth();

	// Mostra loading enquanto verifica autenticação
	if (loading) {
		return <div>Carregando...</div>;
	}

	// Se estiver autenticado, redireciona para home
	if (isAuthenticated) {
		return <Navigate to="/users/profile/:user._id" />;
	}

	// Se não estiver autenticado, mostra o formulário de login
	return (
		<div className={styles.background}>
			<LoginCard title="Faça seu Login" />
		</div>
	);
}
