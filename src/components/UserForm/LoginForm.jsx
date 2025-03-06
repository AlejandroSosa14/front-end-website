import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import styles from "./UserForm.module.css";
import { loginUser } from "../../api/users";

const LoginForm = ({ formRef }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        showPassword: false,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateField = (name, value) => {
        let error = "";
        if (name === "password") {
            if (!value) {
                error = "La contraseña es obligatoria";
            } else if (value.length < 8) {
                error = "Debe tener al menos 8 caracteres";
            }
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (key !== "showPassword") {
                newErrors[key] = validateField(key, formData[key]);
            }
        });

        setErrors(newErrors);
        if (Object.values(newErrors).some((error) => error)) return;

        const result = await loginUser(formData.username, formData.password);

        if (result.success) {
            navigate("/");
        } else {
            Swal.fire({
                title: "Error de autenticación",
                text: "Usuario o contraseña incorrectos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <form ref={formRef} className={styles.container} onSubmit={handleLogin}>
            <div>
                <label>Usuario:</label>
                <div className={styles.inputGroup}>
                    <FaUser className={styles.icon} />
                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Usuario"
                        required
                    />
                </div>
            </div>

            <div>
                <label>Contraseña:</label>
                <div className={`${styles.inputGroup} ${errors.password ? styles.errorBorder : ""}`}>
                    <FaLock className={styles.icon} />
                    <input
                        className={styles.input}
                        type={formData.showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                    />
                    <button type="button" className={styles.showButton} onClick={togglePasswordVisibility}>
                        {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>
        </form>
    );
};

export default LoginForm;
