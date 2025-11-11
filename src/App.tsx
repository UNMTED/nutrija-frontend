import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import Cadastro from "./pages/cadastro/Cadastro";
import Inicio from "./pages/inicio/Inicio";

function App() {
    return (
        <>
            <AuthProvider>
                <ToastContainer />
                <BrowserRouter>
                    <Navbar />
                    <div className="max-w-7xl mx-auto p-2">
                        <div className="min-h-[80vh]">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Inicio />}
                                />
                                <Route
                                    path="/login"
                                    element={<Login />}
                                />
                                <Route
                                    path="/home"
                                    element={<Home />}
                                />
                                <Route
                                    path="/cadastro"
                                    element={<Cadastro />}
                                />
                            </Routes>
                        </div>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
