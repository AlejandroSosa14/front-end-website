import WhatsApp from '../svgIcons/WhatsApp'
import styles from './WhatsAppChat.module.css'

function WhatsAppChat() {
    return (
        <>
            <a className={styles.whatsappChat} href={`https://wa.me/${51987654321}?text=Hola,%20quiero%20más%20información%20sobre%20el%20servicio.`} target='_blank' rel='noreferrer'>
                <WhatsApp />
            </a>
        </>
    )
}

export default WhatsAppChat