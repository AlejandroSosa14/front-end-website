import { useRef, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PageTitle from "../components/pageTitle/PageTitle";
import ProfileForm from "../components/UserForm/ProfileForm";
import { getUserByName, updateUser } from "../api/users";
import styles from "./Profile.module.css";
import Swal from 'sweetalert2';

const Profile = () => {
    const formRef = useRef(null);
    const [profileData, setProfileData] = useState({ name: "", email: "" });
    const [editedData, setEditedData] = useState({ name: "", email: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const storedUserId = localStorage.getItem("userId");
                if (storedUserId) {
                    setUserId(storedUserId);
                    const profile = await getUserByName();
                    if (profile) {
                        setProfileData({ name: profile.name, email: profile.email });
                        setEditedData({ name: profile.name, email: profile.email });
                        setIsDataLoaded(true);
                    }
                }
            } catch (error) {
                console.error("Error al obtener el perfil:", error);
            }
        };
    
        // Escuchar el evento pageshow para manejar BFCache
        const handlePageShow = () => {
            fetchUserProfile();
        };
    
        window.addEventListener("pageshow", handlePageShow);
    
        fetchUserProfile();
    
        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []);
    

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(profileData); // Restore original values
    };

    const handleSave = async () => {
        try {
            if (userId) {
                const response = await updateUser(userId, editedData); 
    
                if (response && response.status === 200) { 
                    setProfileData(editedData);
                    setIsEditing(false);
    
                    // Show success alert
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'El perfil se ha actualizado correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                } else {
                    throw new Error('No autorizado o fallo en la actualización');
                }
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
    
            Swal.fire({
                title: '¡Error!',
                text: `No se pudo actualizar el perfil: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'Intentar nuevamente',
            });
        }
    };

    return (
        <Layout>
            <PageTitle title="Mi Perfil" />
            <section className={styles.profileContainer}>
                <div className="container">
                    <div className={styles.profileBox}>
                        <div className={styles.profileFormContainer}>
                            <ProfileForm
                                formRef={formRef}
                                profileData={isEditing ? editedData : profileData}
                                setProfileData={setEditedData}
                                isEditing={isEditing}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    {isDataLoaded && !isEditing && (
                        <button className="main-btn" onClick={handleEdit}>
                            Editar Perfil
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button className="main-btn save" onClick={handleSave}>
                                Guardar
                            </button>
                            <button className="main-btn cancel" onClick={handleCancel}>
                                Cancelar
                            </button>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Profile;
