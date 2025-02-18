import HeaderNav from "../headerNav/HeaderNav";
import Footer from "../footer/Footer";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
	return (
		<div className={styles.layout}>
			<HeaderNav />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
