import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, Mail, PiggyBank, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const sedeData = {
  maua: {
    mapQuery: "Rua vereador Vicente Orlando 66, Mauá, SP, Brasil",
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.488344585143!2d-46.46359562382148!3d-23.62254396443425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce691f1b20349f%3A0x7d28e7d23d8c1c91!2sR.%20Ver.%20Vicente%20Orlando%2C%2066%20-%20Vila%20Bocaina%2C%20Mau%C3%A1%20-%20SP%2C%2009370-140!5e0!3m2!1spt-BR!2sbr!4v1728362678683!5m2!1spt-BR!2sbr"
  },
  'sao-caetano': {
    mapQuery: "Rua Niterói, 205, São Caetano do Sul, SP, Brasil",
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.228551403061!2d-46.56455132382121!3d-23.63183596467098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5d3419515555%3A0x2f0e0839e247481b!2sR.%20Niter%C3%B3i%2C%20205%20-%20Centro%2C%20S%C3%A3o%20Caetano%20do%20Sul%20-%20SP%2C%2009510-200!5e0!3m2!1spt-BR!2sbr!4v1728362758110!5m2!1spt-BR!2sbr"
  },
  'sao-bernardo': {
    mapQuery: "Rua Odeon, 86, São Bernardo do Campo, SP, Brasil",
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.0967389656405!2d-46.55050852382218!3d-23.59966106362548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5d1f8f3f8753%3A0xe5a3740263f3c837!2sR.%20Odeon%2C%2086%20-%20Centro%2C%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP%2C%2009720-290!5e0!3m2!1spt-BR!2sbr!4v1728362804253!5m2!1spt-BR!2sbr"
  },
  diadema: {
    mapQuery: "Rua São Jorge, 311, Diadema, SP, Brasil",
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.197995393527!2d-46.62124502382025!3d-23.66896246633633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a9dc5997237%3A0x7d6c6e7f1f964049!2sR.%20S%C3%A3o%20Jorge%2C%20311%20-%20Centro%2C%20Diadema%20-%20SP%2C%2009911-070!5e0!3m2!1spt-BR!2sbr!4v1728362846995!5m2!1spt-BR!2sbr"
  }
};
const mainHeadquartersData = {
  mapQuery: "Rua Padre Manoel de Paiva, 55 – Jardim, Santo André – São Paulo | Brasil – CEP 09070-230",
  embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.8596001099687!2d-46.54133482382195!3d-23.609939963952445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c9c991eb9c5%3A0xf646873a0e1c8d45!2sR.%20Padre%20Manoel%20de%20Paiva%2C%2055%20-%20Jardim%2C%20Santo%20Andr%C3%A9%20-%20SP%2C%2009070-230!5e0!3m2!1spt-BR!2sbr!4v1728362629618!5m2!1spt-BR!2sbr"
};
const ContactSection = () => {
  const { toast } = useToast();
  const location = useLocation();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const payload = {
      nome: form.name.value,
      email: form.email.value,
      telefone: form.phone.value,
      assunto: form.subject.value,
      mensagem: form.message.value,
    };

    const { error } = await supabase.from('contatos').insert(payload);

    if (error) {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua mensagem. Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Solicitação Enviada!",
        description: "Agradecemos seu contato. Em breve, nossa equipe retornará.",
      });
      form.reset();
    }

    setIsSubmitting(false);
  };
  let embedSrc = mainHeadquartersData.embedSrc;
  if (location.pathname.startsWith('/sedes-regionais/') && params.slug && sedeData[params.slug]) {
    embedSrc = sedeData[params.slug].embedSrc;
  }
  return <section id="associe-se" className="bg-primary text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <PiggyBank className="mx-auto h-12 w-12 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl font-bold mt-4">Conheça o Sindicato e aproveite todos os benefícios</h2>
          <p className="mt-4 text-xl text-blue-200">Fale conosco agora mesmo!</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center mb-12">
          <a href="https://wa.me/11933194304" target="_blank" rel="noopener noreferrer" className="border border-white/50 rounded-lg px-6 py-3 flex items-center gap-4 hover:bg-white/10 transition-colors w-full md:w-auto justify-center">
            <MessageCircle size={24} className="text-green-400" />
            <span>(11) 93319-4304</span>
          </a>
          <a href="mailto:adm@secabc.org.br" className="border border-white/50 rounded-lg px-6 py-3 flex items-center gap-4 hover:bg-white/10 transition-colors w-full md:w-auto justify-center">
            <Mail size={24} />
            <span>adm@secabc.org.br</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="w-full">
            <iframe className="w-full h-96 md:h-[500px] rounded-lg shadow-lg border-4 border-white" src={embedSrc} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome <span className="text-red-400">*</span></label>
                <Input id="name" type="text" placeholder="Digite seu nome" required className="bg-white text-black" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail <span className="text-red-400">*</span></label>
                <Input id="email" type="email" placeholder="Digite seu E-mail" required className="bg-white text-black" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone / Whatsapp <span className="text-red-400">*</span></label>
                <Input id="phone" type="tel" placeholder="Digite seu Telefone ou Whatsapp" required className="bg-white text-black" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Escolha o assunto</label>
                <select id="subject" className="w-full p-2 rounded-md bg-white text-black h-10 border border-input">
                  <option>Dúvidas Gerais</option>
                  <option>Associação</option>
                  <option>Homologação</option>
                  <option>Benefícios</option>
                  <option>Jurídico</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
              <textarea id="message" rows="5" placeholder="Digite aqui sua dúvida." className="w-full p-2 rounded-md bg-white text-black border border-input"></textarea>
            </div>
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/80 text-white font-bold text-lg">
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</>
              ) : (
                'Enviar solicitação'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>;
};
export default ContactSection;