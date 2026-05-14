import React from 'react';
    import { Helmet } from 'react-helmet';
    import PageTransition from '@/components/PageTransition';
    import { useParams, Link, Navigate } from 'react-router-dom';
    import { Calendar, User } from 'lucide-react';
    import { noticias } from '@/data/noticias';

    const NoticiaPost = () => {
      const { slug } = useParams();
      const noticia = noticias.find(n => n.slug === slug);

      if (!noticia) {
        return <Navigate to="/" />;
      }

      const pageTitle = `${noticia.title} | Notícias | SECABC`;
      const metaDescription = noticia.excerpt;

      return (
        <PageTransition>
          <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={metaDescription} />
          </Helmet>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <article className="max-w-4xl mx-auto">
              <header>
                <Link to="/noticias" className="text-primary hover:underline">&larr; Voltar para Notícias</Link>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold font-heading text-brand-text">{noticia.title}</h1>
                <div className="mt-4 flex items-center space-x-4 text-brand-ui text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>{noticia.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1.5" />
                    <span>{noticia.author}</span>
                  </div>
                </div>
              </header>
              <div className="my-8">
                <img className="w-full rounded-lg shadow-lg" alt={noticia.title} src={noticia.img} />
              </div>
              <div className="prose max-w-none text-brand-text text-lg" dangerouslySetInnerHTML={{ __html: noticia.content }} />
            </article>
          </div>
        </PageTransition>
      );
    };

    export default NoticiaPost;