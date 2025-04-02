import { FaUser, FaEnvelope } from "react-icons/fa";
import styles from "./UserForm.module.css";

const ProfileForm = ({ formRef, profileData, setProfileData, isEditing }) => {
    return (
        <form ref={formRef} className={styles.container}>
            <div>
                <label>Nombre:</label>
                <div className={isEditing ? styles.inputGroup : styles.inputGroupBlock}>
                    <FaUser className={styles.icon} />
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                    />
                </div>
            </div>

            <div>
                <label>Email:</label>
                <div className={isEditing ? styles.inputGroup : styles.inputGroupBlock}>
                    <FaEnvelope className={styles.icon} />
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                    />
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;
