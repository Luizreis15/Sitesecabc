import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope, Gavel, HeartPulse, Smile, Umbrella, GraduationCap, Gift, Sun, Waves } from 'lucide-react';

const Beneficios = () => {
  const beneficios = [
    { title: "Centro de Lazer", icon: Sun, slug: "centro-de-lazer", description: "Piscinas, quadras e diversão para a família." },
    { title: "Jurídico", icon: Gavel, slug: "juridico", description: "Assessoria completa para seus direitos trabalhistas." },
    { title: "Médico", icon: HeartPulse, slug: "medico", description: "Consultas e exames com preços acessíveis." },
    { title: "Odontologia", icon: Smile, slug: "odontologia", description: "Cuide do seu sorriso com nossos dentistas." },
    { title: "Previdenciário", icon: Umbrella, slug: "previdenciario", description: "Suporte para aposentadoria e auxílios." },
    { title: "Convênios", icon: GraduationCap, slug: "convenios", description: "Descontos em educação, lazer e compras." },
    { title: "Kit Escolar", icon: Gift, slug: "kit-escolar", description: "Ajuda material para a volta às aulas dos seus filhos." },
    { title: "Colônias de Férias", icon: Waves, slug: "colonias-de-ferias", description: "Opções de descanso e lazer no litoral." },
    { title: "EcoBlue Resort", icon: Stethoscope, slug: "ecoblue-resort", description: "Um paraíso aquático com condições especiais." },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Benefícios | SECABC</title>
        <meta name="description" content="Conheça todos os benefícios que o SECABC oferece aos seus associados, desde saúde e lazer até assessoria jurídica." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center font-heading">Nossos Benefícios</h1>
        <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Vantagens exclusivas pensadas para o bem-estar e a segurança dos comerciários e suas famílias.</p>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio) => (
            <Card key={beneficio.slug} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <beneficio.icon size={28} />
                </div>
                <CardTitle className="text-xl">{beneficio.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-brand-ui">{beneficio.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild>
                  <Link to={`/beneficios/${beneficio.slug}`}>Saiba Mais</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Beneficios;