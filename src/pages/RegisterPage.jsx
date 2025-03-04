import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
