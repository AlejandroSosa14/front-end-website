import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import CarDetail from "./pages/CarDetail";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import RegisterCarPage from "./pages/RegisterCarPage";
import Login from "./pages/Login";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/detalle-autos" element={<CarDetails />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/auto/:carId" element={<CarDetail />} />
				<Route path="/registro" element={<RegisterPage />} />
				<Route path="/register-car" element={<RegisterCarPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
