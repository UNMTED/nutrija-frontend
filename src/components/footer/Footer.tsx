import { FacebookLogoIcon,InstagramLogoIcon,LinkedinLogoIcon,} from "@phosphor-icons/react";

function Footer() {
    const data = new Date().getFullYear();
    return (
        <div className="w-full text-white flex justify-center py-4 border-t border-white">
            <div className="container flex flex-col items-center p-1">
                <p className="text-sm font-bold">
                    NutriJá | Copyright: {data}
                </p>
                <p className='text-lg'>Acesse nossas redes sociais</p>
                <div className='flex gap-2'>
                    <a href="https://www.linkedin.com/in/seu_usuario" target="_blank" rel="noopener noreferrer">
                        <LinkedinLogoIcon size={46} weight='bold' />
                    </a>
                    <a href="https://www.instagram.com/seu_usuario" target="_blank" rel="noopener noreferrer">
                        <InstagramLogoIcon size={46} weight='bold' />
                    </a>
                    <a href="https://www.facebook.com/seu_usuario" target="_blank" rel="noopener noreferrer">
                        <FacebookLogoIcon size={46} weight='bold' />
                    </a>
                </div>
                <p className="text-xs">
                    &copy; Todos os direitos reservados a UNMUTED{" "}
                </p>
            </div>
        </div>
    );
}
export default Footer;

