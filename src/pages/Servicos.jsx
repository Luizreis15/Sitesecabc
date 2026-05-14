import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, CreditCard, UserCheck } from 'lucide-react';

const Servicos = () => {
  const servicos = [
    { title: "Homologações", icon: Briefcase, slug: "homologacoes", description: "Agende sua homologação com o suporte de nossa equipe." },
    { title: "Carteirinha / 2ª via", icon: CreditCard, slug: "carteirinha", description: "Solicite sua carteirinha de associado ou uma segunda via." },
    { title: "Atualizar Cadastro", icon: UserCheck, slug: "atualizar-cadastro", description: "Mantenha seus dados sempre atualizados para não perder benefícios." },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Serviços | SECABC</title>
        <meta name="description" content="Conheça os serviços oferecidos pelo SECABC, como homologações, emissão de carteirinha e atualização cadastral." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center font-heading">Nossos Serviços</h1>
        <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Facilidades para o seu dia a dia profissional, com a confiança e o suporte do seu sindicato.</p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicos.map((servico) => (
            <Card key={servico.slug} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                <div className="bg-primary/10 text-primary p-4 rounded-full">
                  <servico.icon size={32} />
                </div>
                <CardTitle className="text-xl pt-4">{servico.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-brand-ui">{servico.description}</p>
              </CardContent>
              <div className="p-6 pt-0 text-center">
                <Button asChild>
                  <Link to={`/servicos/${servico.slug}`}>Acessar Serviço</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Servicos;