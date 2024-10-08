import { FaSearch } from "react-icons/fa";

import styles from "./Search.module.css";

const Search = () => {
	return (
		<div className={styles.searchContainer}>
			<form>
				<input type="text"
					className={styles.searchBar}
					placeholder="Digite aqui o que você procura :)"
				></input>
			</form>
			<FaSearch className={styles.search} />
		</div>
	);
};

export default Search;
