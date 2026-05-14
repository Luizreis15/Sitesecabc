import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { useParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';

const Servico = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "Funcionalidade em breve!",
      description: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo em seu próximo prompt! 🚀",
    });
  };

  const servicoData = {
    'homologacoes': { 
      name: "Agendamento de Homologação", 
      hasForm: true,
      description: "Para garantir os direitos dos trabalhadores no momento da rescisão contratual, o Sindicato dos Comerciários do ABC realiza a conferência e homologação das verbas rescisórias. O agendamento prévio é obrigatório e facilita o atendimento com mais agilidade e segurança para empregados e empregadores. Preencha o formulário e escolha a data disponível para realizar sua homologação."
    },
    'carteirinha': { 
      name: "Carteirinha / 2ª via", 
      hasForm: false,
      description: "Página do serviço em construção. Aqui você encontrará todas as informações necessárias."
    },
    'atualizar-cadastro': { 
      name: "Atualização de Cadastro", 
      hasForm: false,
      description: "É importante que suas informações estejam sempre corretas para que você receba todas as comunicações e benefícios do Sindicato.\nEntre em contato pelo WhatsApp e atualize seu cadastro de forma rápida e fácil."
    },
  };

  const servico = servicoData[slug] || { name: "Serviço não encontrado", description: "Página do serviço em construção. Aqui você encontrará todas as informações necessárias." };
  const pageTitle = `${servico.name} | Serviços | SECABC`;
  const metaDescription = `Informações sobre o serviço de ${servico.name} do SECABC.`;

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold font-heading">{servico.name}</h1>
        <div className="mt-8 prose max-w-none">
          <p>{servico.description}</p>
          
          {servico.hasForm && (
            <div className="mt-8 p-8 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-bold">Formulário de Solicitação</h2>
              <p className="mt-2">O formulário para este serviço será implementado aqui.</p>
              <Button onClick={handleNotImplemented} className="mt-4">Solicitar Agendamento</Button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Servico;