import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import CarDetail from "./pages/CarDetail";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage"; 

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/detalle-autos" element={<CarDetails />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/auto/:carId" element={<CarDetail />} />
				<Route path="/registro" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
