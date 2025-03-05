import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { createUser } from "../../api/users";
import styles from "./UserForm.module.css";

const RegisterForm = ({ onFormReady }) => {
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
    <form className={styles.container} onSubmit={handleSubmit} ref={onFormReady}>
      <div>
        <label>Nombre:</label>
        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>
      </div>

      <div>
        <label>Correo:</label>
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo"
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

export default RegisterForm;
