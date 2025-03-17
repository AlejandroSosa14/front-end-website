import { useRef } from "react";
import RegisterForm from "../components/UserForm/RegisterForm";
import Layout from "../components/layout/Layout";
import styles from "./RegisterPage.module.css";
import PageTitle from "../components/pageTitle/PageTitle";

const RegisterPage = () => {
	const formRef = useRef(null);

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
		}
	};

	return (
		<Layout>
			<section className={styles.register}>
				<PageTitle title={"Crear Cuenta"} />
				<div className="container">
					<div className={styles.registerContainer}>
						<div className={styles.registerFormContainer}>
							<RegisterForm onFormReady={formRef} />
						</div>
					</div>
				</div>

				<div className={styles.buttonContainer}>
					<button className="main-btn" type="button" onClick={handleSubmit}>
						Crear Cuenta
					</button>
				</div>
			</section>
		</Layout>
	);
};

export default RegisterPage;
