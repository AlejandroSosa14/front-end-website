import { useRef } from "react";
import LoginForm from "../components/UserForm/LoginForm";
import Layout from "../components/layout/Layout";
import styles from "./Login.module.css";
import PageTitle from "../components/pageTitle/PageTitle";

const Login = () => {
	const formRef = useRef(null);

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.requestSubmit(); // requestSubmit() es mejor que dispatchEvent("submit")
		}
	};

	return (
		<Layout>
			<section className={styles.loginContainer}>
				<PageTitle title={"Iniciar Sesión"} />
				<div className="container">
					<div className={styles.loginBox}>
						<div className={styles.loginFormContainer}>
							<LoginForm formRef={formRef} />
						</div>
					</div>
				</div>
				<div className={styles.buttonContainer}>
					<button className="main-btn" type="button" onClick={handleSubmit}>
						Iniciar sesión
					</button>
				</div>
			</section>
		</Layout>
	);
};

export default Login;
