import { useState } from 'react';

const PLACEHOLDER = '/images/placeholder.svg';

const Img = ({ src, alt, fallback = PLACEHOLDER, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
      {...props}
    />
  );
};

export default Img;
