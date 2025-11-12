/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Categoria } from "../../../models/Categoria";
import { atualizar, buscar, deletar } from "../../../services/Service";
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
  const [limit, setLimit] = useState<number>(3);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [categoria, setCategoria] = useState<Categoria>();

  const [categoriaEdicao, setCategoriaEdicao] = useState<Categoria | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
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


  // função para abrir modal de edição

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
    async (categoria: Categoria | undefined) => {
      if (!categoria) return;
      try {
        await deletar(`/categorias/${categoria.id}`, {
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
    [token, buscarCategorias, setCategoria, handleBuscar]
  );


  const handleSaveCategoria = useCallback(
    async (categoriaAtualizada: Categoria) => {
      try {
        await atualizar(`/categorias`, categoriaAtualizada, setCategorias, {
          headers: { Authorization: token },
        });

        ToastAlerta("Categoria atualizada com sucesso", "sucesso");
        await buscarCategorias(); 
      } catch (error) {
        ToastAlerta("Erro ao atualizar categoria", "error");
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
      lg: limits?.lg ?? 5,
      xl: limits?.xl ?? 9,
    }),
    [limits]
  );

  useEffect(() => {
    function calcLimit() {
      const w = window.innerWidth;
      if (w >= 1024) setLimit(cfg.xl);
      else if (w >= 768) setLimit(cfg.lg);
      else if (w >= 640) setLimit(cfg.md);
      else setLimit(cfg.sm);
    }

    calcLimit();
    window.addEventListener("resize", calcLimit);
    return () => window.removeEventListener("resize", calcLimit);
  }, [cfg]);

  const visible = expanded ? categorias : categorias.slice(0, limit);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl text-gray-700">Categorias</h2>

        <div>
          {usuario.role === "admin" && (
            <button className="mr-2 md:mr-10 text-sm text-nutri-green-dark hover:underline">
              Adicionar
            </button>
          )}

          <button
            type="button"
            onClick={() => setExpanded((s) => !s)}
            className="text-sm text-nutri-green-dark hover:underline"
            aria-expanded={expanded}
          >
            {expanded
              ? "Mostrar menos"
              : `Ver todos ${
                  categorias.length >= limit
                    ? "(" + categorias.length + ")"
                    : ""
                }`}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Carregando...</div>

      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {visible.map((cat) => (
            <div key={cat.id} className="shrink-0">
              <CardCategoria
                categoria={cat}
                buscar={() => handleBuscar(cat.id)}
                remove={() => abreModalConfirm(cat)}
                edit={() => abreModalEdicao(cat)}
              />
            </div>
          ))}
        </div>

      )}

 Stashed changes
      <ModalConfirm
        text={`Tem certeza que deseja excluir a categoria ${categoria?.nome}?`}
        open={isModalDeleteOpen}
        onConfirm={onConfirm}
        onClose={() => setIsModalDeleteOpen(false)}
      />


Stashed changes
      <CategoriaModal
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        categoria={categoriaEdicao}
        onSave={handleSaveCategoria}
      />
    </section>
  );

}
