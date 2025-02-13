import HeaderNav from "../headerNav/HeaderNav";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
	return (
		<div className={styles.layout}>
			<HeaderNav />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
