import {
    FacebookLogo,
    InstagramLogo,
    LinkedinLogo,
} from "@phosphor-icons/react";

function Footer() {
    const data = new Date().getFullYear();
    
    return (
        <footer className="w-full bg-gradient-to-br from-neutral-50 to-primary-50/30 border-t border-neutral-200 mt-20">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    
                    {/* Coluna 1 - Logo e Descrição */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                                <span className="text-2xl">🥗</span>
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="text-primary-600">Nutri</span>
                                <span className="text-neutral-800">Já</span>
                            </span>
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            Alimentação saudável e equilibrada, entregue com carinho na sua porta.
                        </p>
                    </div>

                    {/* Coluna 2 - Links Rápidos */}
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-neutral-800">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/home" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                                    Cardápio
                                </a>
                            </li>
                            <li>
                                <a href="/sobre" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                                    Sobre Nós
                                </a>
                            </li>
                            <li>
                                <a href="/contato" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                                    Contato
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Coluna 3 - Redes Sociais */}
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-neutral-800">Siga-nos</h3>
                        <div className="flex gap-3">
                            <a
                                href="https://www.linkedin.com/in/seu_usuario"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="LinkedIn"
                            >
                                <LinkedinLogo size={22} weight="bold" />
                            </a>
                            <a
                                href="https://www.instagram.com/seu_usuario"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-pink-600 hover:border-pink-300 hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="Instagram"
                            >
                                <InstagramLogo size={22} weight="bold" />
                            </a>
                            <a
                                href="https://www.facebook.com/seu_usuario"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="Facebook"
                            >
                                <FacebookLogo size={22} weight="bold" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Linha de Separação */}
                <div className="border-t border-neutral-200 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-neutral-500">
                            © {data} <span className="font-bold text-primary-600">NutriJá</span>. Todos os direitos reservados.
                        </p>
                        <p className="text-xs text-neutral-500">
                            Desenvolvido com 💚 por <span className="font-bold">UNMUTED</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;