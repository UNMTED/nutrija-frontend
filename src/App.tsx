import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import DefaultLayout from "./layouts/DefaultLayout";
import FullLayout from "./layouts/FullLayout";
import Home from "./pages/home/Home";
import Inicio from "./pages/inicio/Inicio";
import Login from "./pages/login/Login";

function App() {
    return (
        <AuthProvider>
            <ToastContainer />
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <FullLayout>
                                <Inicio />
                            </FullLayout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <DefaultLayout>
                                <Login />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <DefaultLayout>
                                <Home />
                            </DefaultLayout>
                        }
                    />
                </Routes>

                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
