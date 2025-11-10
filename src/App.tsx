import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

import "react-toastify/dist/ReactToastify.css";
import ListaCategorias from "./components/categoria/listacategorias/ListaCategorias";
import Navbar from "./components/navbar/Navbar";
import ListaProdutos from "./components/produto/listaprodutos/ListaProdutos";
import Cadastro from "./pages/cadastro/Cadastro";

function App() {
    const mock = [
        {
            id: 1,
            nome: "Lanches",
            descricao: "Refrigerantes e sucos",
            foto: "https://ik.imagekit.io/rpai7bzhn/NutriJ%C3%A1/Electric%20Cycle3DIcon%2027.png?updatedAt=1762798140333",
        },
        {
            id: 2,
            nome: "Saladas",
            descricao: "Sanduíches e salgados",
            foto: "https://ik.imagekit.io/rpai7bzhn/NutriJ%C3%A1/Electric%20Cycle3DIcon%207.png?updatedAt=1762799938024",
        },
        {
            id: 3,
            nome: "Sopas",
            descricao: "Sobremesas",
            foto: "https://ik.imagekit.io/rpai7bzhn/NutriJ%C3%A1/Erwtensoep3DIcon%201.png?updatedAt=1762799938036",
        },
        {
            id: 4,
            nome: "Prato feito",
            descricao: "Produtos de limpeza",
            foto: "https://ik.imagekit.io/rpai7bzhn/NutriJ%C3%A1/image%203.png?updatedAt=1762799938115",
        },
        {
            id: 5,
            nome: "Regional",
            descricao: "Pães e bolos",
            foto: "https://ik.imagekit.io/rpai7bzhn/NutriJ%C3%A1/DutchStamppot3DIcon%201.png?updatedAt=1762800051000",
        },
        {
            id: 6,
            nome: "Padaria",
            descricao: "Pães e bolos",
            foto: "/images/padaria.jpg",
        },
        {
            id: 7,
            nome: "Padaria",
            descricao: "Pães e bolos",
            foto: "/images/padaria.jpg",
        },
        {
            id: 8,
            nome: "Padaria",
            descricao: "Pães e bolos",
            foto: "/images/padaria.jpg",
        },
        {
            id: 9,
            nome: "Padaria",
            descricao: "Pães e bolos",
            foto: "/images/padaria.jpg",
        },
        {
            id: 10,
            nome: "Padaria",
            descricao: "Pães e bolos",
            foto: "/images/padaria.jpg",
        },
        {
            id: 11,
            nome: "Padaria",
            descricao: "Pães e bolos",
            foto: "/images/padaria.jpg",
        },
    ];
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
                                <Route
                                    path="/categorias"
                                    element={
                                        <ListaCategorias categorias={mock} />
                                    }
                                />
                                <Route
                                    path="/produtos"
                                    element={<ListaProdutos />}
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
