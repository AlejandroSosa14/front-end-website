import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./App.css";

function App() {
	// return <h1>Proyecto Integrador Final - Certified Tech Developer</h1>;
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/about" element={<About />} /> */}
				{/* <Route path="/contact" element={<Contact />} /> */}
				{/* <Route path="/products" element={<Products />} /> */}
				{/* <Route path="/products/:productId" element={<ProductDetails />} /> */}
				{/* <Route path="*" element={<Error404 />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
