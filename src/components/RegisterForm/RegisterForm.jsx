import { useState } from "react";
import { createUser } from "../../api/users";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		showPassword: false,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const togglePasswordVisibility = () => {
		setFormData({ ...formData, showPassword: !formData.showPassword });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
			type: "customer",
			active: true,
		};

		const result = await createUser(newUser);
		if (result) {
			alert("Usuario registrado con éxito");
			setFormData({ name: "", email: "", password: "", showPassword: false });
		} else {
			alert("Error al registrar usuario");
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h2 className={styles.title}>Registro</h2>

			<label className={styles.label}>
				Nombre:
				<input
					className={styles.input}
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</label>

			<label className={styles.label}>
				Correo:
				<input
					className={styles.input}
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</label>

			<label className={styles.label}>
				Contraseña:
				<div className={styles.passwordContainer}>
					<input
						className={styles.input}
						type={formData.showPassword ? "text" : "password"}
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<button type="button" className={styles.toggleButton} onClick={togglePasswordVisibility}>
						{formData.showPassword ? "Ocultar" : "Mostrar"}
					</button>
				</div>
			</label>

			<button className={styles.submitButton} type="submit">
				Registrarse
			</button>
		</form>
	);
};

export default RegisterForm;
