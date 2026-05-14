import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';

const LGPD = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>LGPD | SECABC</title>
        <meta name="description" content="Saiba como o SECABC se adequa à Lei Geral de Proteção de Dados (LGPD) e como você pode exercer seus direitos." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-4xl mx-auto">
          <h1>Lei Geral de Proteção de Dados (LGPD)</h1>
          <p>O SECABC respeita sua privacidade e está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
          
          <h2>Seus Direitos</h2>
          <p>Como titular dos dados, você tem o direito de:</p>
          <ul>
            <li>Confirmar a existência de tratamento de seus dados;</li>
            <li>Acessar seus dados;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>Solicitar a portabilidade dos dados a outro fornecedor de serviço ou produto.</li>
          </ul>

          <h2>Encarregado de Dados (DPO)</h2>
          <p>Para exercer seus direitos ou para qualquer dúvida sobre o tratamento de seus dados, entre em contato com nosso Encarregado de Proteção de Dados:</p>
          <p><strong>E-mail:</strong> <a href="mailto:dpo@secabc.org.br">dpo@secabc.org.br</a></p>

          <p>O conteúdo completo sobre a LGPD será adicionado aqui.</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default LGPD;