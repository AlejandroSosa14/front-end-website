import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { createUser } from "../../api/users";
import styles from "./UserForm.module.css";
import Swal from "sweetalert2";

const RegisterForm = ({ onFormReady }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "El nombre es obligatorio";
        break;
      case "email":
        if (!value.trim()) {
          error = "El correo es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Correo inválido";
        }
        break;
      case "password":
        if (!value) {
          error = "La contraseña es obligatoria";
        } else if (value.length < 8) {
          error = "Debe tener al menos 8 caracteres";
        }
        break;
      default:
        break;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "showPassword") {
        newErrors[key] = validateField(key, formData[key]);
      }
    });
  
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;
  
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      type: "customer",
      active: true,
    };
  
    try {
      await createUser(newUser);
      Swal.fire("Éxito", "Usuario registrado con éxito", "success").then(() => {
        navigate("/login");
      });
  
      setFormData({ name: "", email: "", password: "", showPassword: false });
      setErrors({});
    } catch (error) {
  
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  
  return (
    <form className={styles.container} onSubmit={handleSubmit} ref={onFormReady}>
      <div>
        <label>Nombre:</label>
        <div className={`${styles.inputGroup} ${errors.name ? styles.errorBorder : styles.successBorder}`}>
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
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div>
        <label>Correo:</label>
        <div className={`${styles.inputGroup} ${errors.email ? styles.errorBorder : styles.successBorder}`}>
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
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div>
        <label>Contraseña:</label>
        <div className={`${styles.inputGroup} ${errors.password ? styles.errorBorder : styles.successBorder}`}>
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

export default RegisterForm;
