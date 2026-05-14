import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Menu, X, Instagram, Facebook, Youtube, ChevronDown, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import ContactSection from '@/components/ContactSection';

const Dropdown = ({ item, isMobile, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (closeMenu) {
      closeMenu();
    }
  };

  if (isMobile) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center text-xl font-semibold text-primary hover:text-accent transition-colors py-2"
        >
          {item.label}
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pl-4"
            >
              <div className="flex flex-col space-y-3 pt-3 pb-2">
                {item.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `text-lg font-medium text-brand-text/80 hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative group">
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `font-semibold text-primary px-3 py-2 rounded-md transition-colors duration-200 flex items-center
           ${isActive
             ? 'bg-highlight text-accent'
             : 'hover:bg-highlight hover:text-accent'}`
        }
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 ml-1 transition-colors duration-200 ${'group-hover:text-accent'}`} />
      </NavLink>
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-10">
        <div className="bg-white rounded-md shadow-lg border w-48">
          <div className="p-2">
            {item.children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-2 text-sm rounded-md font-semibold text-primary transition-colors
                   ${isActive
                     ? 'bg-highlight text-accent'
                     : 'hover:bg-highlight hover:text-accent'}`
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    {
      to: '/sedes-regionais', label: 'Sedes Regionais', children: [
        { to: '/sedes-regionais/maua', label: 'Mauá' },
        { to: '/sedes-regionais/sao-caetano', label: 'São Caetano' },
        { to: '/sedes-regionais/sao-bernardo', label: 'São Bernardo' },
        { to: '/sedes-regionais/diadema', label: 'Diadema' },
      ]
    },
    {
      to: '/beneficios', label: 'Benefícios', children: [
        { to: '/beneficios/centro-de-lazer', label: 'Centro de Lazer' },
        { to: '/beneficios/juridico', label: 'Jurídico' },
        { to: '/beneficios/medico', label: 'Médico' },
        { to: '/beneficios/odontologia', label: 'Odontologia' },
        { to: '/beneficios/previdenciario', label: 'Previdenciário' },
        { to: '/beneficios/convenios', label: 'Convênios' },
      ]
    },
    {
      to: '/servicos', label: 'Serviços', children: [
        { to: '/servicos/homologacoes', label: 'Homologações' },
        { to: '/servicos/atualizar-cadastro', label: 'Atualizar Cadastro' },
      ]
    },
    { to: '/parceiros', label: 'Parceiros' },
    { to: '/noticias', label: 'Notícias' },
    { to: '/contato', label: 'Contato' },
  ];

  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "Funcionalidade em breve!",
      description: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo em seu próximo prompt! 🚀",
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        navigate('/');
        setTimeout(() => {
          const homeSection = document.getElementById(sectionId);
          if (homeSection) {
              homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
    }
  };
  
  const showContactSection = !['/contato'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-background relative">

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center min-h-[40px] py-1.5 md:py-1">
            <div className="flex items-center space-x-4">
              <a href="https://wa.me/11933194304" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center text-sm hover:text-accent transition-colors">
                <MessageCircle size={14} className="mr-1.5" />
                (11) 93319-4304
              </a>
              <a href="mailto:adm@secabc.org.br" className="flex items-center text-xs sm:text-sm hover:text-accent transition-colors">
                <Mail size={14} className="mr-1.5" />
                adm@secabc.org.br
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild size="sm" variant="outline" className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white whitespace-nowrap">
                <a href="https://www.veramo.com.br/login" target="_blank" rel="noopener noreferrer">
                  Homologar Online
                </a>
              </Button>
              <Button asChild size="sm" className="bg-success text-white hover:bg-success/90 animate-pulse whitespace-nowrap">
                <a href="https://portal.afsys.com.br/secabc/login" target="_blank" rel="noopener noreferrer">
                  Painel do Contribuinte
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[68px] md:h-20">
            <Link to="/" className="flex items-center">
              <img alt="Logo SECABC" className="h-12 md:h-16 w-auto" src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/014e954008da73529bf64af84836449a.png" />
            </Link>
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-1">
              {navLinks.map((item) =>
                item.children ? (
                  <Dropdown key={item.label} item={item} />
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `font-semibold text-primary px-3 py-2 rounded-md transition-colors duration-200
                       ${isActive
                         ? 'bg-highlight text-accent'
                         : 'hover:bg-highlight hover:text-accent'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>
            <div className="flex items-center lg:hidden">
              <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon">
                <Menu />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-background p-6 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img alt="Logo SECABC" className="h-16 w-auto" src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/014e954008da73529bf64af84836449a.png" />
              </Link>
              <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon">
                <X />
              </Button>
            </div>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((item) =>
                item.children ? (
                  <Dropdown key={item.label} item={item} isMobile={true} closeMenu={() => setIsMenuOpen(false)} />
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-xl font-semibold text-primary hover:text-accent transition-colors py-2
                       ${isActive ? 'text-accent' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>
            <div className="mt-8 flex flex-col space-y-4">
              <Button asChild size="mobile" variant="outline">
                <a href="https://www.veramo.com.br/login" target="_blank" rel="noopener noreferrer">
                  Homologar Online
                </a>
              </Button>
              <Button asChild size="mobile">
                <a href="https://portal.afsys.com.br/secabc/login" target="_blank" rel="noopener noreferrer">
                  Painel do Contribuinte
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pb-24">
        <Outlet />
      </main>

      {showContactSection && <ContactSection />}

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="font-heading font-semibold text-lg mb-3 text-white">O Sindicato</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/o-sindicato" className="text-gray-300 hover:text-white transition-colors">Nossa História</Link></li>
                <li><button onClick={() => scrollToSection('diretoria')} className="text-gray-300 hover:text-white transition-colors text-left">Diretoria</button></li>
                <li><Link to="/noticias" className="text-gray-300 hover:text-white transition-colors">Notícias</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-heading font-semibold text-lg mb-3 text-white">Links Úteis</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/beneficios" className="text-gray-300 hover:text-white transition-colors">Benefícios</Link></li>
                <li><Link to="/servicos" className="text-gray-300 hover:text-white transition-colors">Serviços</Link></li>
                <li><Link to="/contato" className="text-gray-300 hover:text-white transition-colors">Fale Conosco</Link></li>
                <li><Link to="/politica-de-privacidade" className="text-gray-300 hover:text-white transition-colors">Política de Privacidade</Link></li>
                <li><Link to="/lgpd" className="text-gray-300 hover:text-white transition-colors">LGPD</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-heading font-semibold text-lg mb-3 text-white">Redes Sociais</p>
              <div className="flex space-x-4">
                <a href="#" onClick={handleNotImplemented} aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors"><Facebook size={24} /></a>
                <a href="#" onClick={handleNotImplemented} aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors"><Instagram size={24} /></a>
                <a href="#" onClick={handleNotImplemented} aria-label="YouTube" className="text-gray-300 hover:text-white transition-colors"><Youtube size={24} /></a>
              </div>
            </div>
            <div>
              <p className="font-heading font-semibold text-lg mb-3 text-white">Endereço</p>
              <div className="flex items-start text-sm text-gray-300">
                <MapPin size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Rua Padre Manoel de Paiva, 55 – Jardim, Santo André – São Paulo | Brasil – CEP 09070-230</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 py-3">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
            <span>© {new Date().getFullYear()} SECABC. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
      
      <a
        href="https://wa.me/11933194304"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco via WhatsApp"
        className="fixed bottom-4 right-4 z-40 flex items-center shadow-lg hover:scale-105 transition-transform"
      >
        <div className="hidden sm:flex bg-white rounded-l-full py-2 pl-5 pr-4 flex-col items-start leading-none shadow-md">
          <span className="text-gray-800 text-sm font-semibold">Precisa de ajuda?</span>
          <span className="text-success text-base font-bold">WhatsApp</span>
        </div>
        <div className="bg-success text-white rounded-full sm:rounded-l-none sm:rounded-r-full p-4 shadow-md">
          <MessageCircle size={28} />
        </div>
      </a>
    </div>
  );
};

export default MainLayout;