import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import PageTransition from '@/components/PageTransition';
    // Remove ImageIcon as it's no longer needed for placeholders
    // import { FileImage as ImageIcon } from 'lucide-react'; 
    // Remove useToast as there are no interactive elements now
    // import { useToast } from "@/components/ui/use-toast";

    const Parceiros = () => {
      // const { toast } = useToast(); // Remove if not used

      const partners = [
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/01d87122fc799cbde1eaac8d7bbee4a1.png", alt: "Logotipo Armarinhos Fernando" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/37bf91f7bc01f5083149800c5460482d.png", alt: "Logotipo Assaí Atacadista" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/0db875f343a477a0e2f979086dcc1547.png", alt: "Logotipo Bem Benefícios" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/1bba30dc6baf5b51b934f28d92f1afae.png", alt: "Logotipo BR Company" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/4525eb89743c8a610ff499bc4693441e.png", alt: "Logotipo Casas da Mamãe" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/2e8569b732d66b0d280d9200ac53c443.png", alt: "Logotipo Casa das Torneiras Santo André" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/d0a23f1d69649ec1b8be977bfb8328c1.png", alt: "Logotipo Casa das Três Meninas" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/20e5e9f7f3d0699f9c41a45c3d329196.png", alt: "Logotipo CBA Diesel" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/5015f2c9e64d71defeeda91adcba44a3.png", alt: "Logotipo Chama Supermercados" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/8aeca618979e5a8ef5ecec847e58bcca.png", alt: "Logotipo Clube de Campo" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/dbc4ecf15599730441999688fa30f3ee.png", alt: "Logotipo Construtora e Incorporadora Casa Braz" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/f012d9e700e1b50334d7668cfc0b1a72.png", alt: "Logotipo Coop" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/154bfc8556e4437f7baae9a4b7bf672d.png", alt: "Logotipo Copafer" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/70fa9287b1a719dad6ba051b17ed1080.png", alt: "Logotipo Eco Blue Acqua Park" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/26e835aba23a15f8827ee5e82e3df9e1.png", alt: "Logotipo Eco Resort" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/f2dec44ee283fd5db9537dfed86a2b77.png", alt: "Logotipo Espaço Zoo" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/536264830343a8f6c6142b6ec52778fc.png", alt: "Logotipo Fecomerciários" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/15aaf787e29623858b95b718574b1a6b.png", alt: "Logotipo Grupo Feital" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/804e11f7a21037464f8ac520794f736c.png", alt: "Logotipo G2 Atacado de Bebidas" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/438a9fe89202041165593e304112891c.png", alt: "Logotipo GPA" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/58f71cdca1413e4b98606ab3c539baed.png", alt: "Logotipo Grupo Bem Barato" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/7af226118409a319cbfec01c71834de3.png", alt: "Logotipo Grupo União de Jornais" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/cdc75aa7feba58e3258eb8604e9fc711.png", alt: "Logotipo Havan" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/232024f08c540ecd45694731c66315cc.png", alt: "Logotipo Higa's Supermercados" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/3d570febf46af00e465366c5106b7ed7.png", alt: "Logotipo Lopes Supermercados" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/7ddb72522b63f87de2a1534eb4a8c29f.png", alt: "Logotipo Nivalmix.com" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/15ee4d1e9cbaaeef901eb95cf894f60e.png", alt: "Logotipo Perfil Incorporações Construções" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/72a73b6ef97a78c5905e431a2d12cd6b.png", alt: "Logotipo Pixolé" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/369b5302a27e01c6c823044306cd9372.png", alt: "Logotipo Sagrada Família Saúde" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/92496223c011b9c1eca873c24764e854.png", alt: "Logotipo São Judas Tadeu Supermercados" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/fe527a2fcb5ef380c9e61ec2f01e643b.png", alt: "Logotipo Sonda Supermercados" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/76a59bd85fef9acf924709f4bdc00e35.png", alt: "Logotipo Stuk" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/294e0a0246999e6736f7b9ccac2e5929.png", alt: "Logotipo Supermercado Iazul" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/1c4d9c1e40f18cc07d8daa91f4777369.png", alt: "Logotipo Tenda Atacado" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/2c28529341c5c0fdd360b6c79157b43d.png", alt: "Logotipo Walter Embalagens" },
        { imgSrc: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/d1c7ae2e546a6c4f6c43198de2f293aa.png", alt: "Logotipo Yeda" },
      ];
      
      return (
        <PageTransition>
          <Helmet>
            <title>Parceiros | SECABC</title>
            <meta name="description" content="Conheça a rede de parceiros do SECABC e os benefícios exclusivos que eles oferecem para nossos associados." />
          </Helmet>
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
                    <img src={partner.imgSrc} alt={partner.alt} className="max-w-full max-h-full object-contain" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </PageTransition>
      );
    };

    export default Parceiros;