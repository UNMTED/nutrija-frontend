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
            open={open} // controlado pelo pai
            modal
            position={position}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            contentStyle={{
                borderRadius: "1rem",
                padding: "0",
            }}
        >
            {
                ((close: () => void) => (
                    <div className="relative rounded-2xl p-6">
                        <button
                            type="button"
                            onClick={() => {
                                close();
                                onClose?.();
                            }}
                            aria-label="Fechar"
                            className="absolute top-2 right-4 text-3xl ring-0"
                        >
                            ×
                        </button>

                        <div className="py-4">{text}</div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    close();
                                    onClose?.();
                                }}
                                className="px-4 py-2 rounded-md"
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
                                className="px-4 py-2 rounded-md bg-red-600 text-white"
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
