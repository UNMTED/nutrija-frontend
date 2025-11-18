import {
    InstagramLogo,
    LinkedinLogo,
    GithubLogo,
} from "@phosphor-icons/react";

function Footer() {
    const data = new Date().getFullYear();

    return (
<<<<<<< HEAD
        <footer className="w-full bg-gradient-to-br from-neutral-50 to-primary-50/30 border-t border-neutral-200">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Coluna 1 - Logo e Descrição */}
=======
        <footer className="w-full bg-gradient-to-br from-gray-50 to-nutri-green-light/30 border-t border-gray-200 mt-20">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    
                    {/* Coluna 1 - Logo (Ícone com Texto) e Descrição */}
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">

                            <div className="w-12 h-12 rounded-full bg-nutri-gray flex items-center justify-center shadow-lg">
                                <span className="text-3xl">🥗</span>
                            </div>

                            <span className="text-2xl font-bold">
                                <span className="text-nutri-green-dark">Nutri</span>
                                <span className="text-nutri-gray">Já</span>
                            </span>
                        </div>
<<<<<<< HEAD
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            Alimentação saudável e equilibrada, entregue com
                            carinho na sua porta.
=======
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Alimentação saudável e equilibrada, entregue com carinho na sua porta.
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                        </p>
                    </div>

                    <div className="space-y-4">
<<<<<<< HEAD
                        <h3 className="text-base font-bold text-neutral-800">
                            Links Rápidos
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/home"
                                    className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                                >
=======
                        <h3 className="text-base font-bold text-nutri-gray">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/home" className="text-sm text-gray-600 hover:text-nutri-green-dark transition-colors">
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                                    Cardápio
                                </a>
                            </li>
                            <li>
<<<<<<< HEAD
                                <a
                                    href="/sobre"
                                    className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                                >
                                    Sobre Nós
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contato"
                                    className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                                >
                                    Contato
                                </a>
                            </li>
=======
                                <a href="/sobre" className="text-sm text-gray-600 hover:text-nutri-green-dark transition-colors">
                                    Sobre Nós
                                </a>
                            </li>
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                        </ul>
                    </div>

                    <div className="space-y-4">
<<<<<<< HEAD
                        <h3 className="text-base font-bold text-neutral-800">
                            Siga-nos
                        </h3>
=======
                        <h3 className="text-base font-bold text-nutri-gray">Siga-nos</h3>
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                        <div className="flex gap-3">
                            <a
                                href="https://www.linkedin.com/in/seu_usuario"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-nutri-green-dark hover:border-nutri-green-light hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="LinkedIn"
                            >
                                <LinkedinLogo
                                    size={22}
                                    weight="bold"
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/seu_usuario"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="Instagram"
                            >
                                <InstagramLogo
                                    size={22}
                                    weight="bold"
                                />
                            </a>
                            <a
                                href="https://github.com/UNMTED"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#7dd3fc] hover:border-[#6ee7b7]/50 hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="GitHub"
                            >
<<<<<<< HEAD
                                <FacebookLogo
                                    size={22}
                                    weight="bold"
                                />
=======
                                <GithubLogo size={22} weight="bold" />
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                            </a>
                        </div>
                    </div>
                </div>

                {/* Linha de Separação */}
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
<<<<<<< HEAD
                        <p className="text-xs text-neutral-500">
                            © {data}{" "}
                            <span className="font-bold text-primary-600">
                                NutriJá
                            </span>
                            . Todos os direitos reservados.
                        </p>
                        <p className="text-xs text-neutral-500">
                            Desenvolvido com 💚 por{" "}
                            <span className="font-bold">UNMUTED</span>
=======
                        <p className="text-xs text-gray-500">
                            © {data} <span className="font-bold text-nutri-green-dark">NutriJá</span>. Todos os direitos reservados.
                        </p>
                        <p className="text-xs text-gray-500">
                            Desenvolvido com 💚 por <span className="font-bold">UNMUTED</span>
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
