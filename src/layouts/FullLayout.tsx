import type { ReactNode } from "react";

interface FullLayoutProps {
    children: ReactNode;
}
const FullLayout = ({ children }: FullLayoutProps) => {
    return <>{children}</>;
};

export default FullLayout;
