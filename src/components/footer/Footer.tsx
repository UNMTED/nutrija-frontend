import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Footer() {
    const { usuario } = useContext(AuthContext);

    let component: ReactNode;

    if (usuario.token !== "") {
        component = <footer>Footer</footer>;
    }
    return <>{component}</>;
}
