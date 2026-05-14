import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';

const NotFound = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>404 - Página Não Encontrada | SECABC</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-bold font-heading">Página Não Encontrada</h2>
        <p className="mt-4 text-lg text-brand-ui">Desculpe, a página que você está procurando não existe ou foi movida.</p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/">Voltar para a Página Inicial</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;