import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { MessageCircle, Waves, Utensils, BedDouble, PlayCircle, MapPin, Star } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ComplexoEcoPage = () => {
  const { toast } = useToast();
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const handleReserveClick = () => {
    window.open('https://wa.me/11933194304?text=Ol%C3%A1%2C+gostaria+de+fazer+uma+reserva+no+Complexo+Eco!', '_blank');
  };

  const galleryImages = [
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/d457adc003819dd37a643f6a0bf92daf.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/0fc11e469571f21d9e3b9e5361048a3f.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/1159384b5d100f86c75884d3349fa2fc.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/d6c501d908c3f0b69c4cd8c569cbf670.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/8ba40c83d9efcc8bd0c002c91f2e6817.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/4b7309424b7c7a0ae587ca8fdae60ac6.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/33aaf46e268101a5a086cfd01db871f5.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/b4720c2d5433de1483ab181ebdc9ec96.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/0c739437b69aade6578e13c1a5ea10a8.jpg",
    "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/afa02eb05654e380b315dd025da3c21d.jpg",
  ];

  const attractions = [
    { icon: Waves, text: "Praia artificial com areia branca e ondas" },
    { icon: Utensils, text: "Parque aquático e toboáguas" },
    { icon: BedDouble, text: "Rio lento para relaxar" },
    { icon: PlayCircle, text: "Restaurantes com culinária variada" },
    { icon: MapPin, text: "Hospedagem completa" },
    { icon: Star, text: "Lazer, eventos e diversão para todas as idades" },
  ];

  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "Funcionalidade em breve!",
      description: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo em seu próximo prompt! 🚀",
    });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Complexo Eco | Centro de Lazer SECABC</title>
        <meta name="description" content="Lazer, natureza e diversão para toda a família comerciária. Conheça o Complexo Eco, o paraíso dos associados SECABC." />
        <meta name="keywords" content="Centro de Lazer SECABC, Complexo Eco, Parque Aquático Comerciários, Lazer para toda a família" />
      </Helmet>

      <div className="bg-blue-50">
        <header className="relative text-center py-20 md:py-32 text-white bg-cover bg-center" style={{ backgroundImage: "url('https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/b4720c2d5433de1483ab181ebdc9ec96.jpg')" }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Complexo Eco</h1>
            <p className="mt-4 text-2xl md:text-3xl font-light">Lazer, natureza e diversão para toda a família comerciária</p>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
              Restaurantes, parque aquático, rio lento, praia artificial, toboáguas e muita alegria esperam por você!
            </p>
          </div>
        </header>

        <main>
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Conheça o Complexo Eco</h2>
              <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
                Imagine um lugar onde o sol brilha o ano inteiro, o riso das crianças se mistura ao som das ondas e a natureza acolhe cada visitante com paz e alegria. O Complexo Eco é o destino perfeito para descansar, se divertir e criar memórias com quem você ama.
              </p>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
                Composto por três espaços incríveis — <strong>EcoBlue Acqua Park</strong>, <strong>EcoResort</strong> e <strong>Espaço Eco Restaurante</strong> — o Complexo reúne lazer, gastronomia e conforto em um só lugar. É o paraíso dos comerciários associados ao SECABC.
              </p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="flex flex-col items-center">
                  <img src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/30e143aa979f26e849264118d925b9df.png" alt="EcoBlue Acqua Park Logo" className="h-20" />
                  <p className="mt-4 font-semibold text-blue-800">EcoBlue Acqua Park</p>
                  <p className="text-sm text-gray-500">Parque aquático com toboáguas, rio lento e praia de areia branca com ondas artificiais.</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/5c7dec10ebfb1d3b7163121ba5619822.png" alt="EcoResort Logo" className="h-20" />
                  <p className="mt-4 font-semibold text-green-800">EcoResort</p>
                  <p className="text-sm text-gray-500">Hospedagem completa com suítes, café da manhã e estrutura de lazer.</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/b579122f1dbe5c98f1ba21c8a90e5e86.png" alt="Espaço Eco Restaurante Logo" className="h-20" />
                  <p className="mt-4 font-semibold text-yellow-800">Espaço Eco Restaurante</p>
                  <p className="text-sm text-gray-500">Culinária diversificada em ambiente natural e familiar.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-blue-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">Clique nas imagens e descubra o que te espera!</h2>
              <Dialog>
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full max-w-5xl mx-auto mt-12"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {galleryImages.map((src, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <DialogTrigger asChild>
                            <Card className="overflow-hidden cursor-pointer">
                              <CardContent className="flex aspect-square items-center justify-center p-0">
                                <img src={src} alt={`Galeria Complexo Eco ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-12" />
                  <CarouselNext className="mr-12" />
                </Carousel>
                <DialogContent className="max-w-4xl p-0 border-0">
                  <p>A visualização em tela cheia será implementada em breve.</p>
                </DialogContent>
              </Dialog>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="480"
                  src="https://www.youtube.com/embed/r1hgLPtgTBQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-4 text-2xl font-bold text-blue-900">Assista ao vídeo e sinta a energia do Complexo Eco!</p>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Tudo o que você e sua família merecem!</h2>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {attractions.map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="bg-blue-200 text-blue-800 rounded-full p-4">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Como chegar e fazer sua reserva</h2>
                  <p className="mt-4 text-lg text-gray-600">O paraíso está mais perto do que você imagina. Venha nos visitar!</p>
                  <p className="mt-2 text-lg text-gray-600 font-semibold">Rodovia João Mellão, km 273,5 - Avaré – SP</p>
                  <div className="mt-8">
                    <Button onClick={handleReserveClick} size="lg" className="bg-green-500 hover:bg-green-600 text-white text-lg w-full sm:w-auto">
                      <MessageCircle className="mr-2 h-5 w-5" /> Reservar agora
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="rounded-lg overflow-hidden shadow-xl border-4 border-white">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.183139099575!2d-49.16016982384319!3d-23.01734894108114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c1b3c338a35555%3A0xbb75a6725475a73e!2sEcoBlue%20Acqua%20Park!5e0!3m2!1spt-BR!2sbr!4v1728364868589!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center space-x-6 md:space-x-10 mb-6">
              <img src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/30e143aa979f26e849264118d925b9df.png" alt="EcoBlue Logo" className="h-12" />
              <img src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/5c7dec10ebfb1d3b7163121ba5619822.png" alt="EcoResort Logo" className="h-12" />
              <img src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/b579122f1dbe5c98f1ba21c8a90e5e86.png" alt="Espaço Eco Logo" className="h-12" />
              <img src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/014e954008da73529bf64af84836449a.png" alt="SECABC Logo" className="h-16" />
            </div>
            <p className="text-sm text-gray-400">Sindicato dos Comerciários do ABC — Trabalhando por você dentro e fora do seu ambiente de trabalho.</p>
          </div>
        </footer>
      </div>
      <a
        href="https://wa.me/11933194304?text=Ol%C3%A1%2C+gostaria+de+informa%C3%A7%C3%B5es+sobre+o+Complexo+Eco"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Fale com a equipe de reservas"
      >
        <MessageCircle size={28} />
      </a>
    </PageTransition>
  );
};

const DefaultBeneficioPage = ({ beneficio }) => {
  const { toast } = useToast();

  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "Funcionalidade em breve!",
      description: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo em seu próximo prompt! 🚀",
    });
  };

  const hasGallery = ['colonias-de-ferias', 'ecoblue-resort'].includes(beneficio.slug);
  const pageTitle = `${beneficio.name} | Benefícios | SECABC`;
  const metaDescription = `Saiba tudo sobre o benefício ${beneficio.name} oferecido pelo SECABC.`;

  const getBeneficioDescription = (slug) => {
    switch (slug) {
      case 'juridico':
        return "O Sindicato dos Comerciais do ABC oferece aos seus associados um serviço completo de assessoria jurídica, garantindo orientação e apoio em todas as questões relacionadas ao trabalho e aos direitos dos profissionais da categoria. Nosso objetivo é proteger e defender os interesses de nossos associados, promovendo segurança e tranquilidade no dia a dia.";
      case 'medico':
        return "O Sindicato dos Comerciais do ABC oferece aos seus associados um serviço de atendimento médico de qualidade, voltado à saúde e bem-estar dos profissionais da categoria. Nosso objetivo é garantir acompanhamento médico especializado, prevenção de doenças e suporte em situações de necessidade, proporcionando mais segurança e tranquilidade no dia a dia.";
      case 'odontologia':
        return "O Sindicato dos Comerciais do ABC oferece aos seus associados um serviço de atendimento odontológico completo, voltado à saúde bucal e ao bem-estar dos profissionais da categoria. Nosso objetivo é proporcionar cuidado de qualidade, prevenção de problemas dentários e suporte em tratamentos necessários, garantindo um sorriso saudável e confiança no dia a dia.";
      case 'previdenciario':
        return "O Sindicato dos Comerciais do ABC disponibiliza aos seus associados um serviço especializado de assessoria previdenciária, oferecendo orientação completa sobre aposentadorias, benefícios e direitos junto ao INSS. Nosso compromisso é garantir que cada trabalhador da categoria tenha acesso às informações corretas e ao suporte necessário para assegurar seus direitos previdenciários.";
      default:
        return "Página do benefício em construção. Aqui você encontrará todas as informações detalhadas sobre o que é, quem tem direito, como utilizar e documentos necessários.";
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold font-heading">{beneficio.name}</h1>
        <div className="mt-12 prose max-w-none">
          <p>{getBeneficioDescription(beneficio.slug)}</p>
          
          {hasGallery && (
            <div className="mt-8 p-8 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-bold">Galeria de Imagens</h2>
              <p className="mt-2">Esta área exibirá uma galeria de fotos sobre {beneficio.name}.</p>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <img className="rounded-lg shadow-md aspect-video object-cover" alt={`Imagem 1 de ${beneficio.name}`} src="https://images.unsplash.com/photo-1695348935339-11c65b96eace" />
                <img className="rounded-lg shadow-md aspect-video object-cover" alt={`Imagem 2 de ${beneficio.name}`} src="https://images.unsplash.com/photo-1546904391-f45d9fc30ebb" />
                <img className="rounded-lg shadow-md aspect-video object-cover" alt={`Imagem 3 de ${beneficio.name}`} src="https://images.unsplash.com/photo-1635833679145-abff44d53dbd" />
                <img className="rounded-lg shadow-md aspect-video object-cover" alt={`Imagem 4 de ${beneficio.name}`} src="https://images.unsplash.com/photo-1519946713466-a84a422f7f62" />
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Button onClick={handleNotImplemented} size="lg">Agendar / Consultar</Button>
            <Button asChild size="lg" variant="outline">
              <a href={`https://wa.me/11933194304?text=Ol%C3%A1%2C+gostaria+de+informa%C3%A7%C3%B5es+sobre+o+benef%C3%ADcio+${beneficio.name}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const Beneficio = () => {
  const { slug } = useParams();

  const beneficioData = {
    'centro-de-lazer': { name: "Centro de Lazer", slug: "centro-de-lazer" },
    'juridico': { name: "Assessoria Jurídica", slug: "juridico" },
    'medico': { name: "Atendimento Médico", slug: "medico" },
    'odontologia': { name: "Atendimento Odontológico", slug: "odontologia" },
    'previdenciario': { name: "Assessoria Previdenciária", slug: "previdenciario" },
    'convenios': { name: "Convênios e Parcerias", slug: "convenios" },
    'kit-escolar': { name: "Kit Escolar", slug: "kit-escolar" },
    'colonias-de-ferias': { name: "Colônias de Férias", slug: "colonias-de-ferias" },
    'ecoblue-resort': { name: "EcoBlue Resort", slug: "ecoblue-resort" },
  };

  if (slug === 'centro-de-lazer') {
    return <ComplexoEcoPage />;
  }

  const beneficio = beneficioData[slug] || { name: "Benefício não encontrado", slug: "" };
  
  return <DefaultBeneficioPage beneficio={beneficio} />;
};

export default Beneficio;