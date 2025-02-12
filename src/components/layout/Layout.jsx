import HeaderNav from "../headerNav/HeaderNav";

import styles from "./Layout.module.css";

const Layout = ({ children, mainTitle }) => {
	return (
		<div className={styles.layout}>
			<HeaderNav />
			<main>
				<h1>{mainTitle}</h1>
				{children}
			</main>
		</div>
	);
};

export default Layout;
