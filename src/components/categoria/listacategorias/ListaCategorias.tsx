/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Categoria } from "../../../models/Categoria";
import {
    atualizar,
    buscar,
    cadastrar,
    deletar,
} from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CategoriaModal from "../../modal/categoriamodal/CategoriaModal";
import ModalConfirm from "../../modal/ModalConfirm";
import CardCategoria from "../cardcategoria/CardCategoria";

interface Props {
    limits?: { sm?: number; md?: number; lg?: number; xl?: number };
    buscarPorCategoria: (id: number | null) => void;
}

export default function ListaCategorias({ limits, buscarPorCategoria }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [limit, setLimit] = useState<number>(5);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaId, setCategoriaId] = useState<number>(0);
    const [categoria, setCategoria] = useState<Categoria | undefined>();

    const [categoriaEdicao, setCategoriaEdicao] = useState<Categoria | null>(
        null
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            navigate("/login");
        }
    }, [token, navigate]);

    const buscarCategorias = useCallback(async () => {
        try {
            setIsLoading(true);
            await buscar("/categorias", setCategorias, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) handleLogout();
        } finally {
            setIsLoading(false);
        }
    }, [token, handleLogout]);

    const abreModalConfirm = useCallback((categoria: Categoria) => {
        setCategoria(categoria);
        setIsModalDeleteOpen(true);
    }, []);

    const abreModalEdicao = useCallback((categoria: Categoria) => {
        setCategoriaEdicao(categoria);
        setIsModalEditOpen(true);
    }, []);

    const handleBuscar = useCallback(
        (id: number) => {
            const newId = id === categoriaId ? 0 : id;
            setCategoriaId(newId);
            buscarPorCategoria(newId === 0 ? null : newId);
        },
        [buscarPorCategoria, categoriaId]
    );

    const handleRemove = useCallback(
        async (categoriaParam: Categoria | undefined) => {
            if (!categoriaParam) return;
            try {
                await deletar(`/categorias/${categoriaParam.id}`, {
                    headers: { Authorization: token },
                });

                await buscarCategorias();
                ToastAlerta("Categoria removida com sucesso", "sucesso");
            } catch (err) {
                ToastAlerta("Erro ao remover produto", "error");
            } finally {
                setIsModalDeleteOpen(false);
                setCategoria(undefined);
                handleBuscar(0);
            }
        },
        [token, buscarCategorias, handleBuscar]
    );

    const handleSaveCategoria = useCallback(
        async (categoriaAtualizada: Categoria) => {
            try {
                if (categoriaAtualizada.id && categoriaAtualizada.id > 0) {
                    await atualizar(
                        `/categorias`,
                        categoriaAtualizada,
                        () => {},
                        {
                            headers: { Authorization: token },
                        }
                    );
                    ToastAlerta("Categoria atualizada com sucesso", "sucesso");
                } else {
                    await cadastrar(
                        `/categorias`,
                        categoriaAtualizada,
                        () => {},
                        {
                            headers: { Authorization: token },
                        }
                    );
                    ToastAlerta("Categoria cadastrada com sucesso", "sucesso");
                }

                await buscarCategorias();
                setIsModalEditOpen(false);
                setIsModalCreateOpen(false);
            } catch (error) {
                ToastAlerta("Erro ao salvar categoria", "error");
            }
        },
        [token, buscarCategorias]
    );

    const onConfirm = useCallback(() => {
        void handleRemove(categoria);
    }, [handleRemove, categoria]);

    useEffect(() => {
        buscarCategorias();
    }, [buscarCategorias]);

    const cfg = useMemo(
        () => ({
            sm: limits?.sm ?? 2,
            md: limits?.md ?? 3,
            lg: limits?.lg ?? 4,
            xl: limits?.xl ?? 5,
        }),
        [limits]
    );

    useEffect(() => {
        function calcLimit() {
            const w = window.innerWidth;
            if (w >= 1280) setLimit(cfg.xl);
            else if (w >= 1024) setLimit(cfg.lg);
            else if (w >= 768) setLimit(cfg.md);
            else setLimit(cfg.sm);
        }

        calcLimit();
        window.addEventListener("resize", calcLimit);
        return () => window.removeEventListener("resize", calcLimit);
    }, [cfg]);

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-2xl text-gray-700">
                    Categorias
                </h2>

                <div>
                    {usuario.role === "admin" && (
                        <button
                            className="mr-2 md:mr-10 text-sm text-nutri-green-dark hover:underline"
                            onClick={() => setIsModalCreateOpen(true)}
                        >
                            Adicionar
                        </button>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
            ) : (
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {categorias.map((cat) => (
                            <CarouselItem
                                key={cat.id}
                                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                            >
                                <div className="p-1">
                                    <CardCategoria
                                        categoria={cat}
                                        buscar={() => handleBuscar(cat.id)}
                                        remove={() => abreModalConfirm(cat)}
                                        edit={() => abreModalEdicao(cat)}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )}

            <ModalConfirm
                text={`Tem certeza que deseja excluir a categoria ${categoria?.nome}?`}
                open={isModalDeleteOpen}
                onConfirm={onConfirm}
                onClose={() => setIsModalDeleteOpen(false)}
            />

            <CategoriaModal
                isOpen={isModalEditOpen}
                onClose={() => setIsModalEditOpen(false)}
                categoria={categoriaEdicao}
                onSave={handleSaveCategoria}
            />
            <CategoriaModal
                isOpen={isModalCreateOpen}
                onClose={() => setIsModalCreateOpen(false)}
                categoria={null}
                onSave={handleSaveCategoria}
            />
        </section>
    );
}
