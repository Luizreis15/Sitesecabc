import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Briefcase, Gavel, Stethoscope, Smile, Landmark, User, Calendar } from 'lucide-react';

const SedeRegional = () => {
  const { slug } = useParams();

  const sedeData = {
    maua: { 
      name: "Mauá", 
      address: "Rua vereador Vicente Orlando 66, Mauá - SP, 09370-140", 
      phone: "(11) 4549-5900",
      heroImg: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/91fb64d1d80f379f421a6044747657ff.png",
      mapQuery: "Rua vereador Vicente Orlando 66, Mauá - SP",
      images: [
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
      ],
      presidente: {
        nome: "Marcílio Costa",
        gestao: "01/03/2010",
        foto: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/a04952a95498c515fd9fccc0e389890a.png",
        text: "Estou no Sindicato desde 2010, me dedicando e me empenhando todos os dias para a melhoria e fortalecimento da nossa categoria."
      },
      additionalText: "Sede regional de Mauá é responsável por Ribeirão Pires e Rio Grande da Serra"
    },
    'sao-caetano': { 
      name: "São Caetano", 
      address: "Rua Niterói, 205, Centro, São Caetano do Sul - SP, 09510-200", 
      phone: "(11) 4228-2428",
      heroImg: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/dc8c1bff438b68e4a14ba224908f80d4.png",
      mapQuery: "Rua Niterói, 205, São Caetano do Sul - SP",
      images: [
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
      ],
       presidente: {
        nome: "Nome do Presidente",
        gestao: "2024 - 2028",
        foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        text: "Estou trabalhando com dedicação e compromisso para fortalecer e valorizar nossos associados."
      }
    },
    'sao-bernardo': { 
      name: "São Bernardo", 
      address: "Rua Odeon, 86, Centro, São Bernardo do Campo - SP, 09720-290", 
      phone: "(11) 4127-1464",
      heroImg: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/01360390e6f7685cf75fc1ea4ba08f77.png",
      mapQuery: "Rua Odeon, 86, São Bernardo do Campo - SP",
      images: [
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
        "https://images.unsplash.com/photo-1656424426915-42c4eec4d621",
      ],
       presidente: {
        nome: "Nome do Presidente",
        gestao: "2024 - 2028",
        foto: "https://images.unsplash.com/photo-1534528741775-539mmy4a69daeb",
        text: "Atuo com empenho e dedicação constante para o avanço e bem-estar da categoria."
      }
    },
    diadema: { 
      name: "Diadema", 
      address: "Rua São Jorge, 311, Centro, Diadema - SP, 09911-070", 
      phone: "(11) 4048-2121",
      heroImg: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/c8058177e375ab899b85ca4edcef0c6f.png",
      mapQuery: "Rua São Jorge, 311, Diadema - SP",
      images: [
        "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/4a51ee20f79638b5823592abe4c6ad9c.jpg",
        "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/1e63d9f0623b7c562dda01d349d1782a.jpg",
        "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/b386bdc31e0129792e5164f807031996.jpg",
      ],
       presidente: {
        nome: "José Eloilton Rodrigues",
        gestao: "01/11/2010",
        foto: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/ff04ad827be91b005a2a085b73c8dbc9.jpg",
        text: "Integrante do Sindicato desde 2010, sigo todos os dias comprometido em buscar melhorias e conquistas para nossos trabalhadores."
      }
    },
  };

  const servicosDisponiveis = [
    { name: "Homologações", icon: Briefcase },
    { name: "Jurídico", icon: Gavel },
    { name: "Médico", icon: Stethoscope },
    { name: "Odontologia", icon: Smile },
    { name: "Previdenciário", icon: Landmark },
  ];

  const sede = sedeData[slug] || { name: "Sede não encontrada", address: "", phone: "", heroImg: "", mapQuery: "São Paulo", images: [], presidente: null };
  const pageTitle = `Sede Regional ${sede.name} | SECABC`;
  const metaDescription = `Informações, serviços e contato da sede regional do SECABC em ${sede.name}.`;

  const scrollToAssociateForm = () => {
    const section = document.getElementById('associe-se');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      
      <div className="relative bg-gray-800 h-80 flex items-center justify-center text-white overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover" alt={`Imagem de destaque da sede de ${sede.name}`} src={sede.heroImg} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold font-heading mb-6">Informações da Sede</h2>
              <ul className="space-y-4 text-brand-text">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <div>
                    <span>{sede.address}</span>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sede.mapQuery)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-primary hover:underline block"
                    >
                      Ver rota no Google Maps
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <span>{sede.phone}</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <span>Segunda a Sexta, das 8h às 17h</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-col space-y-3">
                 <Button onClick={scrollToAssociateForm} size="lg">Fale Conosco</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <section>
              <h2 className="text-3xl font-bold font-heading">Serviços Disponíveis</h2>
              <p className="mt-2 text-brand-ui">Confira os principais serviços que você pode realizar nesta sede.</p>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {servicosDisponiveis.map((servico) => (
                  <div key={servico.name} className="flex items-center p-4 bg-gray-100 rounded-lg">
                    <servico.icon className="h-6 w-6 mr-3 text-primary" /> {servico.name}
                  </div>
                ))}
              </div>
            </section>

            {sede.additionalText && (
              <p className="mt-12 text-lg font-semibold text-gray-700">{sede.additionalText}</p>
            )}

            <section className="mt-12">
              <h2 className="text-3xl font-bold font-heading">Galeria da Sede</h2>
              <p className="mt-2 text-brand-ui">Um pouco do nosso espaço em {sede.name}.</p>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {sede.images && sede.images.map((imgSrc, index) => (
                  <img key={index} className="rounded-lg shadow-md aspect-square object-cover" alt={`Imagem ${index + 1} da sede de ${sede.name}`} src={imgSrc} />
                ))}
              </div>
            </section>
            
            {sede.presidente && (
              <section className="mt-12">
                <h2 className="text-3xl font-bold font-heading">Diretor Responsável</h2>
                <div className="mt-6 bg-gray-50 rounded-lg p-8 flex flex-col sm:flex-row items-center gap-8 shadow-sm">
                  <div className="flex-shrink-0">
                    <img className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white" alt="Foto do Presidente" src={sede.presidente.foto} />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start">
                      <User className="mr-2 h-6 w-6 text-primary" />
                      {sede.presidente.nome}
                    </p>
                    <p className="text-md text-gray-600 mt-2 flex items-center justify-center sm:justify-start">
                      <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                      {sede.presidente.gestao}
                    </p>
                    <p className="mt-4 text-gray-500 italic">{sede.presidente.text}</p>
                  </div>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SedeRegional;