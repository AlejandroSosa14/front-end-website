import Facebook from "../../components/svgIcons/Facebook";
import WhatsApp from "../../components/svgIcons/WhatsApp";
import Instagram from "../../components/svgIcons/Instagram";

import styles from "./ShareSocialMedia.module.css";

const ShareSocialMedia = () => {
	return (
		<div className={styles.shareSocial_wrapper}>
			<a
				href="https://www.whatsapp.com/"
				target="_blank"
				rel="noopener noreferrer"
				title="Compartir en WhatsApp">
				<WhatsApp />
			</a>
			<a
				href="https://www.facebook.com/"
				target="_blank"
				rel="noopener noreferrer"
				title="Compartir en Facebook">
				<Facebook />
			</a>
			<a
				href="https://www.instagram.com/"
				target="_blank"
				rel="noopener noreferrer"
				title="Compartir en Instagram">
				<Instagram />
			</a>
		</div>
	);
};

export default ShareSocialMedia;
