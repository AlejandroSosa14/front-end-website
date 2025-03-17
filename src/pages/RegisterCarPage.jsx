import { useRef } from "react";
import RegisterCarForm from "../components/RegisterCar/RegisterCarForm";
import Layout from "../components/layout/Layout";
import styles from "./RegisterCarPage.module.css";
import PageTitle from "../components/pageTitle/PageTitle";

const RegisterCarPage = () => {
	const formRef = useRef(null);

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
		}
	};

	return (
		<Layout>
			<section className={styles.registerCar}>
				<PageTitle title={"Registrar Nuevo Auto"} />
				<div className="container">
					<div className={styles.registerCarContainer}>
						<div className={styles.registerCarFormContainer}>
							<RegisterCarForm onFormReady={formRef} />
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default RegisterCarPage;
