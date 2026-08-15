import { Helmet } from 'react-helmet-async';

export const SITE_URL = 'https://secabc.org.br';
const SITE_NAME = 'SECABC — Sindicato dos Empregados no Comércio do ABC';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

const Seo = ({ title, description, path, image = DEFAULT_IMAGE, type = 'website', noindex = false }) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!noindex && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
