import React from 'react';
    import { motion } from 'framer-motion';
    import PageTransition from '@/components/PageTransition';
    import Seo from '@/components/Seo';
    import Img from '@/components/Img';
    // Remove ImageIcon as it's no longer needed for placeholders
    // import { FileImage as ImageIcon } from 'lucide-react'; 
    // Remove useToast as there are no interactive elements now
    // import { useToast } from "@/components/ui/use-toast";

    const Parceiros = () => {
      // const { toast } = useToast(); // Remove if not used

      const partners = [
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Armarinhos Fernando" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Assaí Atacadista" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Bem Benefícios" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo BR Company" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Casas da Mamãe" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Casa das Torneiras Santo André" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Casa das Três Meninas" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo CBA Diesel" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Chama Supermercados" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Clube de Campo" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Construtora e Incorporadora Casa Braz" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Coop" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Copafer" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Eco Blue Acqua Park" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Eco Resort" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Espaço Zoo" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Fecomerciários" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Grupo Feital" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo G2 Atacado de Bebidas" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo GPA" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Grupo Bem Barato" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Grupo União de Jornais" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Havan" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Higa's Supermercados" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Lopes Supermercados" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Nivalmix.com" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Perfil Incorporações Construções" },
        { imgSrc: "/images/logo-pixole.png", alt: "Logotipo Pixolé" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Sagrada Família Saúde" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo São Judas Tadeu Supermercados" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Sonda Supermercados" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Stuk" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Supermercado Iazul" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Tenda Atacado" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Walter Embalagens" },
        { imgSrc: "/images/placeholder.svg", alt: "Logotipo Yeda" },
      ];
      
      return (
        <PageTransition>
          <Seo
            title="Parceiros | SECABC"
            description="Conheça a rede de parceiros do SECABC e os benefícios exclusivos que eles oferecem para nossos associados."
            path="/parceiros"
          />
          <div className="bg-background">
            <header className="bg-primary/5 py-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold font-heading text-brand-text"
                >
                  Nossos Parceiros
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-lg text-brand-ui max-w-3xl mx-auto"
                >
                  Conheça as empresas e instituições que oferecem vantagens e descontos exclusivos para os associados do SECABC.
                </motion.p>
              </div>
            </header>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                    className="aspect-square bg-white rounded-lg flex items-center justify-center p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Img src={partner.imgSrc} alt={partner.alt} className="max-w-full max-h-full object-contain" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </PageTransition>
      );
    };

    export default Parceiros;