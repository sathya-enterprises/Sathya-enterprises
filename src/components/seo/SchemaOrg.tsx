/** Structured data for Organization schema */
export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sathya Enterprises",
    url: "https://www.sathyaenterprises.com",
    slogan: "BUILD. MARKET. AUTOMATE. GROW.",
    logo: "https://www.sathyaenterprises.com/apple-icon.png",
    sameAs: [
      "https://instagram.com/",
      "https://linkedin.com/",
      "https://facebook.com/",
      "https://wa.me/910000000000",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-00000-00000",
        contactType: "customer service",
        email: "hello@sathyaenterprises.com",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
