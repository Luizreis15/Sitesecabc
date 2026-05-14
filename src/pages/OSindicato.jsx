import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { useParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const OSindicato = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "Funcionalidade em breve!",
      description: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo em seu próximo prompt! 🚀",
    });
  };

  let content;
  let pageTitle = "O Sindicato | SECABC";
  let metaDescription = "Conheça a história, a diretoria e o presidente do SECABC.";

  switch (slug) {
    case 'sede-central':
      pageTitle = "Sede Central | SECABC";
      content = (
        <div>
          <h1 className="text-4xl font-bold font-heading">Sede Central</h1>
          <p className="mt-4 text-lg">Página da Sede Central em construção.</p>
        </div>
      );
      break;
    case 'presidente':
      pageTitle = "Presidente | SECABC";
      content = (
        <div>
          <h1 className="text-4xl font-bold font-heading">Presidente</h1>
          <p className="mt-4 text-lg">Página do Presidente em construção.</p>
          <div className="mt-8 p-8 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold">Bloco de Imagem do Presidente</h2>
            <p className="mt-2">Esta área exibirá a foto e biografia do presidente.</p>
            <img className="mt-4 rounded-lg shadow-md w-full max-w-sm mx-auto" alt="Foto do Presidente do SECABC" src="https://images.unsplash.com/photo-1673690718215-c1e05069f92b" />
          </div>
        </div>
      );
      break;
    case 'diretoria':
      pageTitle = "Diretoria | SECABC";
      content = (
        <div>
          <h1 className="text-4xl font-bold font-heading">Diretoria</h1>
          <p className="mt-4 text-lg">Página da Diretoria em construção.</p>
           <div className="mt-8 p-8 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold">Galeria da Diretoria</h2>
            <p className="mt-2">Esta área exibirá as fotos dos membros da diretoria.</p>
            <img className="mt-4 rounded-lg shadow-md w-full" alt="Foto de grupo da diretoria do SECABC" src="https://images.unsplash.com/photo-1673690715973-b5974f3fb847" />
          </div>
        </div>
      );
      break;
    default:
      content = (
        <div>
          <h1 className="text-4xl font-bold font-heading">O Sindicato</h1>
          <p className="mt-4 text-lg">Página sobre o sindicato em construção.</p>
        </div>
      );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {content}
      </div>
    </PageTransition>
  );
};

export default OSindicato;