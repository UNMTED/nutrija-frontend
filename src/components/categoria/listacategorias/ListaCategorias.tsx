import { useEffect, useMemo, useState } from "react";
import type { Categoria } from "../../../models/Categoria";
import CardCategoria from "../cardcategoria/CardCategoria";

interface Props {
    categorias: Categoria[];
    // opcional: forçar limites personalizados
    limits?: { sm?: number; md?: number; lg?: number; xl?: number };
}

export default function ListaCategorias({ categorias, limits }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [limit, setLimit] = useState<number>(3);

    // default responsive limits (you can override via props.limits)
    const cfg = useMemo(
        () => ({
            sm: limits?.sm ?? 2, // <640
            md: limits?.md ?? 3, // >=640
            lg: limits?.lg ?? 4, // >=768
            xl: limits?.xl ?? 7, // >=1024
        }),
        [limits]
    );

    // determina limite a partir do innerWidth
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

    // slice dos itens quando colapsado
    const visible = expanded ? categorias : categorias.slice(0, limit);

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Categorias</h2>

                <button
                    type="button"
                    onClick={() => setExpanded((s) => !s)}
                    className="text-sm text-nutri-green-dark hover:underline"
                    aria-expanded={expanded}
                >
                    {expanded
                        ? "Mostrar menos"
                        : `Ver todos (${categorias.length})`}
                </button>
            </div>

            {!expanded ? (
                <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
                    {visible.map((cat) => (
                        <div
                            key={cat.id}
                            className="shrink-0"
                        >
                            {/* CardCategoria deve aceitar largura fixa (ex: w-[190px]) */}
                            <CardCategoria categoria={cat} />
                        </div>
                    ))}
                    {/* se houver menos itens que o limite, opcional: show placeholders */}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {visible.map((cat) => (
                        <CardCategoria
                            key={cat.id}
                            categoria={cat}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
