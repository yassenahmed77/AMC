import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "AMC Medical Equipment | شركة أي ام سي للأجهزة الطبية", 
  description = "مستلزمات وأجهزة طبية عالية الجودة في مصر، أجهزة تنفس ومكثفات أكسجين، شاشات رعاية مركزة، تجهيز عيادات ومستشفيات، المقطم القاهرة.", 
  image = "/logo.png", 
  url 
}) {
  const siteTitle = title.includes("AMC") ? title : `${title} | AMC Medical`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* OpenGraph Meta Tags for Social & WhatsApp Sharing */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url} />}

      {/* Twitter Card Meta Tags */}
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
