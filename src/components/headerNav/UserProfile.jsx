import { useState, useEffect, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";

const UserProfile = ({ username, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = useCallback((event) => {
        event.stopPropagation(); 
        setIsMenuOpen((prev) => !prev);
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("selectedStartDate");
        localStorage.removeItem("selectedEndDate");
        onLogout();
        setIsMenuOpen(false); 
        navigate("/");
    };

    const handleProfile = () => {
        setIsMenuOpen(false); 
        navigate("/profile");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(`.${styles.userProfile}`)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className={styles.userProfile}>
            <span className={styles.userName}>{username}</span>

            <div className={styles.userIconContainer} onClick={toggleMenu} role="button" tabIndex={0} aria-haspopup="true" aria-expanded={isMenuOpen}>
                <FaUserCircle className={styles.userIcon} size={40} />
                <FaChevronDown className={styles.arrowIcon} size={16} />

                {isMenuOpen && (
                    <div className={styles.dropdownMenu}>
                        <button onClick={handleProfile} className={styles.menuItem}>
                            Mi Perfil
                        </button>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;