import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Logo from "../../assets/logo.png";
import Search from "../search/Search";
import CartStyles from "../cart/Cart.module.css";

import { FaShoppingCart } from "react-icons/fa";

// Contexto de autenticação
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
	const { user } = useAuth(); // Obter o usuário logado

	return (
		<div className={styles.navContainer}>
			<nav>
				<div className={styles.logoContainer}>
					<Link to="/">
						<img
							src={Logo}
							alt="imagem logo da Lapshop"
						/>
					</Link>
					<span>LapShop</span>
				</div>
				<div className={styles.links}>
					<Link to="/about">Quem Somos</Link>
					<Link to="/contact">Contato</Link>
				</div>
				<div className={styles.authLinks}>
					<Link to="/login">Login</Link>
					<Link to="/register">Cadastre-se</Link>
					<Link to={`/users/profile/${user?.id}`}>Perfil</Link>
				</div>
				<Search />
				<div className={styles.cart}>
					<Link to={`/cart/${user?.id}`}>
						<FaShoppingCart className={CartStyles.cart} />
					</Link>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
