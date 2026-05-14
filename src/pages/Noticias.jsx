import React from 'react';
    import { Helmet } from 'react-helmet';
    import PageTransition from '@/components/PageTransition';
    import { Link } from 'react-router-dom';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ArrowRight } from 'lucide-react';
    import { noticias } from '@/data/noticias';

    const NoticiasPage = () => {
      return (
        <PageTransition>
          <Helmet>
            <title>Notícias | SECABC</title>
            <meta name="description" content="Fique por dentro de todas as novidades, ações e conquistas do SECABC e da categoria dos comerciários." />
          </Helmet>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold text-center font-heading">Últimas Notícias</h1>
            <p className="mt-4 text-center text-lg text-brand-ui max-w-3xl mx-auto">Acompanhe o trabalho do seu sindicato e as informações mais importantes para o comerciário.</p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((noticia) => (
                <Card key={noticia.slug} className="overflow-hidden group flex flex-col">
                  <div className="h-56 overflow-hidden">
                    <img alt={noticia.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={noticia.img} />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-brand-ui mb-2">{noticia.date}</p>
                    <h2 className="text-xl font-bold font-heading flex-grow">{noticia.title}</h2>
                    <p className="text-brand-ui mt-2 text-sm">{noticia.excerpt}</p>
                    <Button asChild variant="link" className="text-primary p-0 mt-4 self-start">
                      <Link to={`/noticias/${noticia.slug}`}>Ler notícia completa <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </PageTransition>
      );
    };

    export default NoticiasPage;