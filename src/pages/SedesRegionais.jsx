import React from 'react';
    import PageTransition from '@/components/PageTransition';
    import Seo from '@/components/Seo';
    import Img from '@/components/Img';
    import { Link } from 'react-router-dom';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ArrowRight } from 'lucide-react';

    const SedesRegionais = () => {
      const sedes = [
        { name: "Mauá", address: "Rua vereador Vicente Orlando 66, Mauá - SP", img: "/images/placeholder.svg", slug: "maua" },
        { name: "São Caetano", address: "Rua Niterói, 205, São Caetano do Sul - SP", img: "/images/placeholder.svg", slug: "sao-caetano" },
        { name: "São Bernardo", address: "Rua Odeon, 86, São Bernardo do Campo - SP", img: "/images/placeholder.svg", slug: "sao-bernardo" },
        { name: "Diadema", address: "Rua São Jorge, 311, Diadema - SP", img: "/images/placeholder.svg", slug: "diadema" },
      ];

      return (
        <PageTransition>
          <Seo
            title="Sedes Regionais | SECABC"
            description="Encontre a sede do SECABC mais próxima de você. Atendimento em Mauá, São Caetano, São Bernardo e Diadema."
            path="/sedes-regionais"
          />
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
                        <Img alt={`Fachada da sede regional de ${sede.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={sede.img} />
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