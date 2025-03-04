import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Importa los estilos como módulo

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const response = await fetch("http://localhost:8181/api/user/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, password })
            });
    
            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }
    
            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("username", username);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };    

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2>Iniciar Sesión</h2>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                    <button type="submit" className={styles.submitButton}>
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
