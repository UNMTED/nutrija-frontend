import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import type { PopupPosition } from "reactjs-popup/dist/types";

interface ModalProps {
    trigger?: React.ReactNode;
    children: React.ReactNode;
    position?: PopupPosition | PopupPosition[] | undefined;
    open?: boolean;
    onClose?: () => void;
}

export default function Modal({
    children,
    trigger,
    open,
    onClose,
    position = "top center",
}: ModalProps) {
    return (
        <Popup
            trigger={trigger}
            open={open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            modal
            position={position}
            contentStyle={{
                borderRadius: "1rem",
                padding: "0",
                marginTop: "3rem",
                minWidth: "20rem",
                maxWidth: "100rem",
            }}
        >
            {
                ((close: any) => (
                    <div className="relative rounded-2xl p-0">
                        <button
                            type="button"
                            onClick={() => {
                                close();
                                onClose?.();
                            }}
                            aria-label="Fechar"
                            className="absolute top-2 right-4 text-3xl cursor-pointer outline-0 z-10 "
                        >
                            ×
                        </button>
                        {children}
                    </div>
                )) as any
            }
        </Popup>
    );
}
