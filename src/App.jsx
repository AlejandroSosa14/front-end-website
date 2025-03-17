import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarProvider } from "./context/SearchCarContext";

import Home from "./pages/Home";

import CarDetails from "./pages/CarDetails";
import CarDetail from "./pages/CarDetail";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import RegisterCarPage from "./pages/RegisterCarPage";
import Categories from "./pages/Categories";
import Login from "./pages/Login";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<CarProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/detalle-autos" element={<CarDetails />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/auto/:carId" element={<CarDetail />} />
					<Route path="/registro" element={<RegisterPage />} />
					<Route path="/register-car" element={<RegisterCarPage />} />
				</Routes>
			</CarProvider>
		</BrowserRouter>
	);
}

export default App;
