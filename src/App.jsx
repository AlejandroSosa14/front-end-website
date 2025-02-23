import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import CarDetail from "./pages/CarDetail";

import "./App.css";

function App() {
	// return <h1>Proyecto Integrador Final - Certified Tech Developer</h1>;
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/autos" element={<CarDetails />} />
				<Route path="/auto/:carId" element={<CarDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
