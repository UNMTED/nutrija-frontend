import { useEffect, useRef, useState } from "react";

interface CarrosselProps {
    images: string[];
    autoplayDelay?: number;
}

export function Carrossel({ images, autoplayDelay = 4000 }: CarrosselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Autoplay
    useEffect(() => {
        if (!isHovered && images.length > 1) {
            timeoutRef.current = window.setTimeout(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, autoplayDelay);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, isHovered, autoplayDelay, images.length]);

    if (images.length === 0) return null;

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Container das Imagens com aspect ratio fixo */}
            <div className="relative w-full aspect-4/3 overflow-visible">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out lg:transform lg:scale-110 lg:translate-x-8 ${
                            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                        style={{
                            filter: "contrast(1.05) saturate(1.1)",
                        }}
                    />
                ))}
            </div>

            {/* Botões de Navegação - apenas se houver mais de 1 imagem */}
            {images.length > 1 && (
                <>
                    {/* Botão Anterior */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center z-20 group"
                        aria-label="Imagem anterior"
                    >
                        <svg
                            className="w-5 h-5 text-nutri-gray group-hover:text-nutri-green-dark transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    {/* Botão Próximo */}
                    <button
                        onClick={goToNext}
                        className="absolute -right-1 lg:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center z-20 group"
                        aria-label="Próxima imagem"
                    >
                        <svg
                            className="w-5 h-5 text-nutri-gray group-hover:text-nutri-green-dark transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    {/* Indicadores (dots) */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${
                                    index === currentIndex
                                        ? "w-8 h-2 bg-nutri-green-dark"
                                        : "w-2 h-2 bg-gray-400 hover:bg-nutri-green"
                                }`}
                                aria-label={`Ir para slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}