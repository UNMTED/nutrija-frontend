import type { ReactNode } from "react";

interface DefaultLayoutProps {
    children: ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <div className="max-w-7xl mx-auto p-2 px-3">
            <div className="min-h-[80vh]">{children}</div>
        </div>
    );
};

export default DefaultLayout;
