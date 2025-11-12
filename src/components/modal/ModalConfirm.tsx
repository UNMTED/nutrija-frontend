import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import type { PopupPosition } from "reactjs-popup/dist/types";

interface ModalProps {
    open: boolean;
    position?: PopupPosition | PopupPosition[] | undefined;
    text: string;
    onConfirm: () => void;
    onClose?: () => void;
}

export default function ModalConfirm({
    text,
    open,
    position = "top center",
    onConfirm,
    onClose,
}: ModalProps) {
    return (
        <Popup
            open={open}
            modal
            position={position}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            contentStyle={{
                borderRadius: "1rem",
                padding: "10px",
                minWidth: "20rem",
                maxWidth: "30rem",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                border: "1px solid #ccff92",
                marginTop: "auto",
                backgroundColor: "white",
            }}
        >
            {
                ((close: () => void) => (
                    <div className="relative rounded-2xl p-6=">
                        <button
                            type="button"
                            onClick={() => {
                                close();
                                onClose?.();
                            }}
                            aria-label="Fechar"
                            className="absolute top-0 right-0 text-3xl cursor-pointer outline-0 z-10 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-nutri-green-dark hover:bg-gray-100"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <div className="pt-8">{text}</div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    close();
                                    onClose?.();
                                }}
                                className="flex-1 py-3 px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-300"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    onConfirm();
                                    close();
                                    onClose?.();
                                }}
                                className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                )) as unknown as React.ReactNode
            }
        </Popup>
    );
}
