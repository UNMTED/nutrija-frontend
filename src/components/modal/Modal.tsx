import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import type { PopupPosition } from "reactjs-popup/dist/types";

interface ModalProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    position?: PopupPosition | PopupPosition[] | undefined;
}

export default function Modal({
    children,
    trigger,
    position = "top center",
}: ModalProps) {
    return (
        <Popup
            trigger={trigger}
            modal
            position={position}
            contentStyle={{
                borderRadius: "1rem",
                padding: "0",
                marginTop: "3rem",
            }}
        >
            {
                ((close: any) => (
                    <div className="relative rounded-2xl p-6">
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Fechar"
                            className="absolute top-2 right-4 text-3xl"
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
