import Facebook from "../../components/svgIcons/Facebook";
import WhatsApp from "../../components/svgIcons/WhatsApp";
import Telegram from "../svgIcons/Telegram";

import styles from "./ShareSocialMedia.module.css";

const ShareSocialMedia = ({ id }) => {
	return (
		<div className={styles.shareSocial_wrapper}>
			<a
				href={`https://api.whatsapp.com/send?text=Hello%21+I%27d+like+to+share+this+car+with+you.+%20https%3A%2F%2Fwww.rapidride.com%2Fauto%2F${id}`}
				target="_blank"
				rel="noopener noreferrer"
				title="Compartir en WhatsApp">
				<WhatsApp />
			</a>
			<a
				href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.rapidride.com%2Fauto%2F${id}`}
				target="_blank"
				rel="noopener noreferrer"
				title="Compartir en Facebook">
				<Facebook />
			</a>
			<a
				href={`https://t.me/share/url?url=https%3A%2F%2Fwww.rapidride.com%2Fauto%2F${id}&text=Hello%21+I%27d+like+to+share+this+car+with+you.`}
				target="_blank"
				rel="noopener noreferrer"
				title="Compartir en Telegram">
				<Telegram />
			</a>
		</div>
	);
};

export default ShareSocialMedia;
