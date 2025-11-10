import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaProdutos() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [produtos, setProdutos] = useState<Produto[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }
    }, [token, navigate]);

    const buscarProdutos = useCallback(async () => {
        try {
            setIsLoading(true);
            await buscar("/produtos", setProdutos, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) handleLogout();
        } finally {
            setIsLoading(false);
        }
    }, [token, handleLogout, setIsLoading]);

    useEffect(() => {
        buscarProdutos();
    }, [produtos.length, buscarProdutos]);

    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader size={32} />
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    {!isLoading && produtos.length === 0 && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Produto foi encontrado!
                        </span>
                    )}

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8"
                    >
                        {produtos.map((produtos) => (
                            <div>{produtos.nome}</div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ListaProdutos;
