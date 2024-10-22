import styles from "./Button.module.css";

export function Button({ children, ...props }) {
	return (
		<button
			className={styles.default}
			{...props}>
			{children}
		</button>
	);
}

export function ButtonSucess({ children, ...props }) {
	return (
		<button
			className={styles.sucess}
			{...props}>
			{children}
		</button>
	);
}
export function ButtonDanger({ children, ...props }) {
	return (
		<button
			className={styles.danger}
			{...props}>
			{children}
		</button>
	);
}
