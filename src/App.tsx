import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

import "react-toastify/dist/ReactToastify.css";
import Cadastro from "./pages/cadastro/Cadastro";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <>
            <AuthProvider>
                <ToastContainer />
                <BrowserRouter>
                    <div className="max-w-7xl mx-auto p-2">
                        <Navbar />
                        <div className="min-h-[80vh]">
                            <Routes>
                                <Route
                                    path="/"
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
