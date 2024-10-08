import styles from "./Home.module.css";

import CrashedImg1 from "../../assets/crashed_img_1.png";

import Carousel from "../../components/carousel/Carousel";

const Home = () => {
	return (
		<div className={styles.container}>
			<section className={styles.hero}>
				<div className={styles.img1}>
					<img
						src={CrashedImg1}
						alt="Homem com raiva porque seu laptop quebrou"
					/>
					<div className={styles.textImg1}>
						<h1>Seu laptop caiu e quebrou?</h1>
						<p>A LapShop tem os melhores preços e a entrega é super rapida!</p>
						<p>
							Confira nossos produtos, e as super ofertas que aguardam por você
						</p>
					</div>
				</div>
			</section>
			<section className={styles.products}>
				<div className={styles.highlights_products}>
					<Carousel />
				</div>
			</section>
		</div>
	);
};

export default Home;
