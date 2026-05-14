import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Gavel, HeartPulse, Stethoscope, Ticket, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import PageTransition from '@/components/PageTransition';
import SimplePopup from '@/components/SimplePopup';
import { useToast } from "@/hooks/use-toast";
import { noticias } from '@/data/noticias';

const Home = () => {
  const { toast } = useToast();

  const heroPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const banners = [
    {
      desktop: '/images/Hero_Banner_1_Desktop.png',
      mobile: '/images/Hero_Banner_1_Mobile.png',
      alt: 'SECABC - Sindicato dos Empregados no Comércio do ABC',
    },
    {
      desktop: '/images/Hero_Banner_2_Desktop.png',
      mobile: '/images/Hero_Banner_2_Mobile.png',
      alt: 'Benefícios e serviços para os comerciários do ABC',
    },
    {
      desktop: '/images/Hero_Banner_3_Desktop.png',
      mobile: '/images/Hero_Banner_3_Mobile.png',
      alt: 'Homologações e assessoria jurídica para trabalhadores',
    },
  ];

  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "Funcionalidade em breve!",
      description: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo em seu próximo prompt! 🚀",
    });
  };

  const atalhos = [
    { icon: Briefcase, title: "Homologações", text: "Agende e realize sua homologação com segurança e suporte completo.", link: "/servicos/homologacoes" },
    { icon: Gavel, title: "Assessoria Jurídica", text: "Defendemos seus direitos trabalhistas com uma equipe especializada.", link: "/beneficios/juridico" },
    { icon: HeartPulse, title: "Saúde e Bem-estar", text: "Acesso a consultas médicas e odontológicas de qualidade.", link: "/beneficios/medico" },
    { icon: Ticket, title: "Centro de Lazer", text: "Diversão para toda a família em nosso espaço exclusivo.", link: "/beneficios/centro-de-lazer" },
    { icon: Stethoscope, title: "Atualizar Cadastro", text: "Mantenha seus dados em dia para não perder nenhum benefício.", link: "/servicos/atualizar-cadastro" },
  ];

  const beneficiosDestaque = [
    { title: "Centro de Lazer", items: ["Piscinas", "Quadras", "Churrasqueiras"], link: "/beneficios/centro-de-lazer" },
    { title: "Jurídico", items: ["Direito do Trabalho", "Cálculos Rescisórios", "Ações Coletivas"], link: "/beneficios/juridico" },
    { title: "Médico", items: ["Clínica Geral"], link: "/beneficios/medico" },
    { title: "Odontologia", items: ["Limpeza", "Restauração"], link: "/beneficios/odontologia" },
    { title: "Previdenciário", items: ["Aposentadoria"], link: "/beneficios/previdenciario" },
    { title: "Convênios", items: ["Descontos em faculdades", "Academias", "Lojas"], link: "/beneficios/convenios" },
  ];

  const sedes = [
    { name: "Mauá", address: "Rua vereador Vicente Orlando 66, Mauá - SP", img: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/faa01d8a359b777c0dc2d21d44247a96.png", slug: "maua" },
    { name: "São Caetano", address: "Rua Niterói, 205, São Caetano do Sul - SP", img: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/ab65032a961095c518d48b853e209b80.png", slug: "sao-caetano" },
    { name: "São Bernardo", address: "Rua Odeon, 86, São Bernardo do Campo - SP", img: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/b1b2d8106a728d0ff080224e88200cce.jpg", slug: "sao-bernardo" },
    { name: "Diadema", address: "Rua São Jorge, 311, Diadema - SP", img: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/f5f043c89a996bb6b5b69885dc3db46d.jpg", slug: "diadema" },
  ];

  const noticiasRecentes = noticias.slice(0, 3);

  return (
    <PageTransition>
      <Helmet>
        <title>Início | SECABC</title>
        <meta name="description" content="Bem-vindo ao SECABC. Conheça nossos benefícios, serviços e junte-se a nós na luta pelos direitos dos comerciários do ABC." />
      </Helmet>

      {/* Simple Popup Modal */}
      <SimplePopup />

      {/* Hero Carousel */}
      <section className="relative overflow-hidden">
        <Carousel
          plugins={[heroPlugin.current]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[500px] md:h-[600px]">
                  <picture className="w-full h-full">
                    <source media="(max-width: 767px)" srcSet={banner.mobile} />
                    <img
                      src={banner.desktop}
                      alt={banner.alt}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 border-white/60 bg-black/30 text-white hover:bg-black/50 hover:text-white" />
          <CarouselNext className="right-4 border-white/60 bg-black/30 text-white hover:bg-black/50 hover:text-white" />
        </Carousel>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pb-24 space-y-16 sm:space-y-24">
        {/* Shortcuts Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center font-heading text-brand-text">O que você resolve aqui?</h2>
          <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Acesso rápido aos serviços e benefícios mais procurados pelos nossos associados.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {atalhos.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="items-center">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <item.icon size={32} />
                    </div>
                    <CardTitle className="text-lg pt-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-brand-ui">{item.text}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="link" className="text-primary">
                      <Link to={item.link}>Saiba mais <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center font-heading text-brand-text">Benefícios em Destaque</h2>
          <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Vantagens que fazem a diferença no seu dia a dia e para sua família.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficiosDestaque.map((beneficio, index) => (
              <motion.div
                key={beneficio.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{beneficio.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-brand-ui list-disc list-inside">
                      {beneficio.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="secondary">
                      <Link to={beneficio.link}>Regras e Como Usar</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Regional Offices Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center font-heading text-brand-text">Sempre Perto de Você</h2>
          <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Nossas sedes regionais estão prontas para atender você em toda a região do ABC.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sedes.map((sede, index) => (
              <motion.div
                key={sede.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="overflow-hidden h-48">
                    <img alt={`Sede Regional de ${sede.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={sede.img} />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold font-heading">{sede.name}</h3>
                    <p className="text-brand-ui mt-1 flex-grow">{sede.address}</p>
                    <Button asChild variant="link" className="text-primary p-0 mt-4 self-start">
                      <Link to={`/sedes-regionais/${sede.slug}`}>Ver página da sede <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* President's Message Section */}
        <section className="bg-gray-50 rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            <motion.div 
              className="md:col-span-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/Presidente_Ademar.jpeg"
                alt="Presidente do SECABC"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg border-4 border-white"
              />
            </motion.div>
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold font-heading text-brand-text text-center md:text-left">Mensagem do Presidente</h2>
              <blockquote className="mt-4 text-lg text-brand-ui italic border-l-4 border-primary pl-4">
                "É com grande orgulho que lidero o SECABC, uma entidade que há décadas se dedica incansavelmente à defesa dos direitos e ao bem-estar dos comerciários do ABC. Nossa força vem da união, e cada associado é fundamental para continuarmos avançando em nossas conquistas. Contem sempre com nosso empenho e dedicação."
              </blockquote>
              <p className="mt-4 text-lg font-semibold text-brand-text text-center md:text-right">Ademar Gonçalves Ferreira</p>
              <p className="text-md text-brand-ui text-center md:text-right">Presidente do SECABC</p>
            </motion.div>
          </div>
        </section>
        
        {/* Board Section */}
        <section id="diretoria" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-text">Nossa Diretoria</h2>
          <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Conheça a equipe que trabalha diariamente para representar e fortalecer a nossa categoria.</p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/af13c4f32b96d04d72f502f2d9764948.png"
              alt="Diretoria do SECABC reunida"
              className="rounded-lg shadow-xl mx-auto"
            />
          </motion.div>
          <p className="mt-8 text-lg text-brand-ui max-w-4xl mx-auto italic">"Unidos por um propósito comum, nossa diretoria é composta por comerciários que conhecem a realidade da categoria. Trabalhamos com transparência, ética e compromisso para garantir que cada decisão tomada reflita os interesses e as necessidades de nossos associados. Estamos aqui para servir e lutar por você."</p>
        </section>

        {/* Social Feed Section Placeholder */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center font-heading text-brand-text">Fique por Dentro</h2>
          <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Acompanhe nossas novidades e ações nas redes sociais.</p>
          <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
            <p className="text-brand-ui">A integração com Instagram e Facebook será adicionada em breve.</p>
            <div className="mt-6 flex justify-center space-x-6">
              <Button onClick={handleNotImplemented} variant="outline" className="bg-white">
                <Instagram className="mr-2 h-5 w-5" /> Instagram
              </Button>
              <Button onClick={handleNotImplemented} variant="outline" className="bg-white">
                <Facebook className="mr-2 h-5 w-5" /> Facebook
              </Button>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center font-heading text-brand-text">Últimas Notícias</h2>
          <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Mantenha-se informado sobre as principais novidades do sindicato e do comércio.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {noticiasRecentes.map((noticia, index) => (
              <motion.div
                key={noticia.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="overflow-hidden h-56">
                    <img alt={noticia.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={noticia.img} />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-brand-ui mb-2">{noticia.date}</p>
                    <h3 className="text-lg font-bold font-heading flex-grow">{noticia.title}</h3>
                    <Button asChild variant="link" className="text-primary p-0 mt-4 self-start">
                      <Link to={`/noticias/${noticia.slug}`}>Ler notícia <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/noticias">Ver todas as notícias</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;