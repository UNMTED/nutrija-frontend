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
                            className="absolute top-0 right-0 text-3xl outline-0"
                        >
                            ×
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
