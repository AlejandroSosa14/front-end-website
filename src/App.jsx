import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./App.css";
import CarDetails from "./pages/CarDetails";
import CarDetail from "./pages/CarDetail";

function App() {
	// return <h1>Proyecto Integrador Final - Certified Tech Developer</h1>;
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/car-details" element={<CarDetails />} />
				<Route path="/car/:carId" element={<CarDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
