import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Logo from "../../assets/logo.png";
import Cart from "../cart/Cart";
import Search from "../search/Search";

function Navbar() {
	return (
		<div className={styles.navContainer}>
			<nav>
				<div className={styles.logoContainer}>
					<Link to="/">
						<img src={Logo} alt="imagem logo da Lapshop" />
					</Link>
					<span>LapShop</span>
				</div>
				<div className={styles.links}>
					<Link to="/contact">Contato</Link>
					<Link to="/about">Quem Somos</Link>
				</div>
				<div className={styles.authLinks}>
					<Link to="/login">Login</Link>
					<Link to="/register">Cadastre-se</Link>
				</div>
				<Search />
				<div className={styles.cart}>
					<Cart />
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
