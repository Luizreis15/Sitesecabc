import React from 'react';
    import { Routes, Route, useLocation } from 'react-router-dom';
    import { AnimatePresence } from 'framer-motion';
    import { Helmet } from 'react-helmet';

    import MainLayout from '@/layouts/MainLayout';
    import Home from '@/pages/Home';
    import SedesRegionais from '@/pages/SedesRegionais';
    import SedeRegional from '@/pages/SedeRegional';
    import Beneficios from '@/pages/Beneficios';
    import Beneficio from '@/pages/Beneficio';
    import Servicos from '@/pages/Servicos';
    import Servico from '@/pages/Servico';
    import Homologacoes from '@/pages/Homologacoes';
    import Parceiros from '@/pages/Parceiros';
    import NoticiasPage from '@/pages/Noticias';
    import NoticiaPost from '@/pages/NoticiaPost';
    import Contato from '@/pages/Contato';
    import PoliticaPrivacidade from '@/pages/PoliticaPrivacidade';
    import LGPD from '@/pages/LGPD';
    import NotFound from '@/pages/NotFound';
    import OSindicato from '@/pages/OSindicato';
    import Links from '@/pages/Links';

    function App() {
      const location = useLocation();

      return (
        <>
          <Helmet>
            <title>SECABC - Sindicato dos Empregados no Comércio do ABC</title>
            <meta name="description" content="O Sindicato dos Empregados no Comércio do ABC (SECABC) luta pelos direitos e oferece benefícios exclusivos para os comerciários da região." />
          </Helmet>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/links" element={<Links />} />
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="sedes-regionais" element={<SedesRegionais />} />
                <Route path="sedes-regionais/:slug" element={<SedeRegional />} />
                <Route path="beneficios" element={<Beneficios />} />
                <Route path="beneficios/:slug" element={<Beneficio />} />
                <Route path="servicos" element={<Servicos />} />
                <Route path="servicos/homologacoes" element={<Homologacoes />} />
                <Route path="servicos/:slug" element={<Servico />} />
                <Route path="parceiros" element={<Parceiros />} />
                <Route path="noticias" element={<NoticiasPage />} />
                <Route path="noticias/:slug" element={<NoticiaPost />} />
                <Route path="o-sindicato" element={<OSindicato />} />
                <Route path="o-sindicato/:slug" element={<OSindicato />} />
                <Route path="contato" element={<Contato />} />
                <Route path="politica-de-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="lgpd" element={<LGPD />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </>
      );
    }

    export default App;