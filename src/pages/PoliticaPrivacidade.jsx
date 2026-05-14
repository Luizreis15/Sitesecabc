import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';

const PoliticaPrivacidade = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Política de Privacidade | SECABC</title>
        <meta name="description" content="Conheça nossa Política de Privacidade e saiba como o SECABC trata e protege seus dados." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-4xl mx-auto">
          <h1>Política de Privacidade</h1>
          <p><em>Última atualização: 02 de Outubro de 2025</em></p>
          <p>O Sindicato dos Empregados no Comércio do ABC ("SECABC", "nós", "nosso") está comprometido em proteger a privacidade e a segurança dos dados pessoais de seus associados, visitantes e usuários ("você").</p>
          
          <h2>1. Coleta de Dados</h2>
          <p>Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone, etc., ao preencher formulários em nosso site.</p>

          <h2>2. Uso dos Dados</h2>
          <p>Utilizamos seus dados para:</p>
          <ul>
            <li>Prestar e gerenciar nossos serviços e benefícios;</li>
            <li>Processar suas solicitações e inscrições;</li>
            <li>Comunicar-nos com você sobre notícias, eventos e informações relevantes;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>

          <h2>3. Compartilhamento de Dados</h2>
          <p>Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para a prestação de um serviço solicitado por você (ex: convênios) ou por exigência legal.</p>

          <p>O conteúdo completo da Política de Privacidade será adicionado aqui.</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default PoliticaPrivacidade;