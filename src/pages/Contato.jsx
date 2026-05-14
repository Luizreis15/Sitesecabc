import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import ContactSection from '@/components/ContactSection';

const Contato = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Contato | SECABC</title>
        <meta name="description" content="Fale conosco. Tire suas dúvidas, envie sugestões ou entre em contato com o SECABC." />
      </Helmet>
      <ContactSection />
    </PageTransition>
  );
};

export default Contato;