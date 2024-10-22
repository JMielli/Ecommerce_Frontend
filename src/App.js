import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import LoginPage from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import ProductPage from "./components/product/ProductPage";
import UserProfile from "./pages/userProfile/UserProfile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoutes";
import Cart from "./components/cart/Cart";

export default function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Router>
					<Navbar />
					<Routes>
						{/* Rotas protegidas */}
						<Route
							path="/users/profile/:userId"
							element={
								<ProtectedRoute>
									<UserProfile />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/about"
							element={
								<ProtectedRoute>
									<About title="About page" />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/cart/:userId"
							element={
								<ProtectedRoute>
									<Cart title="Cart page" />
								</ProtectedRoute>
							}
						/>

						{/* Rotas públicas */}
						<Route
							path="/"
							element={<Home title="Home page" />}
						/>
						<Route
							path="/login"
							element={<LoginPage title="Login Page" />}
						/>
						<Route
							path="/register"
							element={<Register title="Register Page" />}
						/>
						<Route
							path="/contact"
							element={<Contact title="Contact" />}
						/>
						<Route
							path="/products/product/:id"
							element={<ProductPage title="Product page" />}
						/>
					</Routes>
					<Footer />
				</Router>
			</AuthProvider>
		</div>
	);
}
