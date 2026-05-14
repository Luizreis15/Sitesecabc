import React from 'react';
    import { Helmet } from 'react-helmet';
    import PageTransition from '@/components/PageTransition';
    import { Link } from 'react-router-dom';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ArrowRight } from 'lucide-react';

    const SedesRegionais = () => {
      const sedes = [
        { name: "Mauá", address: "Rua vereador Vicente Orlando 66, Mauá - SP", img: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/5a54305beaf128eb430fe2c8aad7558a.png", slug: "maua" },
        { name: "São Caetano", address: "Rua Niterói, 205, São Caetano do Sul - SP", img: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/b76c64f83164a42035077599bf770b6e.png", slug: "sao-caetano" },
        { name: "São Bernardo", address: "Rua Odeon, 86, São Bernardo do Campo - SP", img: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/163cec1448d5aeb0649c2cd5bdaf32cf.png", slug: "sao-bernardo" },
        { name: "Diadema", address: "Rua São Jorge, 311, Diadema - SP", img: "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/f9ad057a35869b7aa1081005b1c46606.png", slug: "diadema" },
      ];

      return (
        <PageTransition>
          <Helmet>
            <title>Sedes Regionais | SECABC</title>
            <meta name="description" content="Encontre a sede do SECABC mais próxima de você. Atendimento em Mauá, São Caetano, São Bernardo e Diadema." />
          </Helmet>
          <div className="bg-background">
            <header className="bg-primary/5 py-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-text">Nossas Sedes Regionais</h1>
                <p className="mt-4 text-lg text-brand-ui max-w-3xl mx-auto">Estamos presentes em toda a região do ABC para oferecer o melhor atendimento e suporte aos comerciários.</p>
              </div>
            </header>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sedes.map((sede) => (
                  <Card key={sede.name} className="overflow-hidden group bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
                    <div className="md:flex">
                      <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                        <img alt={`Fachada da sede regional de ${sede.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={sede.img} />
                      </div>
                      <div className="p-8 flex flex-col justify-center md:w-1/2">
                        <h2 className="text-2xl font-bold font-heading">{sede.name}</h2>
                        <p className="text-brand-ui mt-2">{sede.address}</p>
                        <Button asChild className="mt-6 self-start">
                          <Link to={`/sedes-regionais/${sede.slug}`}>
                            Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </PageTransition>
      );
    };

    export default SedesRegionais;