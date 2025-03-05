import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./UserForm.module.css";
import { loginUser } from "../../api/users";  // Importa el servicio

const LoginForm = ({ formRef }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        showPassword: false,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await loginUser(formData.username, formData.password);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error);
        }
    };

    return (
        <form ref={formRef} className={styles.container} onSubmit={handleLogin}>
            {error && <p className={styles.errorMessage}>{error}</p>}

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
                <div className={styles.inputGroup}>
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
            </div>
        </form>
    );
};

export default LoginForm;
