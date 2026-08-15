import React from 'react';
import PageTransition from '@/components/PageTransition';
import Seo from '@/components/Seo';
import ContactSection from '@/components/ContactSection';

const Contato = () => {
  return (
    <PageTransition>
      <Seo
        title="Contato | SECABC"
        description="Fale conosco. Tire suas dúvidas, envie sugestões ou entre em contato com o SECABC."
        path="/contato"
      />
      <ContactSection />
    </PageTransition>
  );
};

export default Contato;