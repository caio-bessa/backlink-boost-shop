
import LandingLayout from "@/layouts/LandingLayout";
import Hero from "@/components/landing/Hero";
import PricingPlans from "@/components/landing/PricingPlans";
import { useState } from "react";
import CartSlideIn from "@/components/shop/CartSlideIn";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <LandingLayout>
      {/* SEO Meta Tags (Would be in actual WordPress head) */}
      {/* These are comments for reference in the prototype */}
      {/* 
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Impulsione seus rankings SEO com backlinks de qualidade. Melhore a autoridade do seu site com nossos serviços de Link Building.">
        <link rel="canonical" href="https://seudominio.com/">
        <meta property="og:title" content="BacklinkBoost - Melhore seus Rankings com Backlinks de Qualidade">
        <meta property="og:description" content="Impulsione seus rankings SEO com backlinks de qualidade. Melhore a autoridade do seu site com nossos serviços de Link Building.">
        <meta property="og:url" content="https://seudominio.com/">
        <meta property="og:type" content="website">
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BacklinkBoost",
            "url": "https://seudominio.com/",
            "logo": "https://seudominio.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-11-1234-5678",
              "contactType": "customer service"
            }
          }
        </script>
      */}

      <Hero />
      
      <section className="py-16 bg-theme-light-green">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-text">
              Por que backlinks são essenciais?
            </h2>
            <p className="text-xl text-theme-text opacity-80 max-w-3xl mx-auto">
              Os backlinks são um dos fatores mais importantes no algoritmo do Google. 
              Eles funcionam como "votos de confiança" para o seu site.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-theme-yellow rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-theme-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-theme-text">Aumento de Autoridade</h3>
              <p className="text-theme-text opacity-80">
                Backlinks de sites confiáveis aumentam a autoridade do seu domínio, 
                fazendo o Google ver seu site como uma fonte confiável de informação.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-theme-teal rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-theme-text">Melhores Rankings</h3>
              <p className="text-theme-text opacity-80">
                Sites com backlinks de qualidade tendem a posicionar melhor nos resultados
                de busca, gerando mais tráfego orgânico e potenciais clientes.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-theme-beige rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-theme-text">Tráfego Referencial</h3>
              <p className="text-theme-text opacity-80">
                Além de melhorar o SEO, backlinks estratégicos direcionam tráfego qualificado
                diretamente para o seu site, aumentando as chances de conversão.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-text">
                Como funciona nossa plataforma
              </h2>
              <p className="text-xl text-theme-text opacity-80">
                Simplificamos o processo de link building para que você possa focar no que realmente importa: seu negócio.
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                  <div className="w-20 h-20 bg-theme-yellow rounded-full flex items-center justify-center text-theme-text text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2 text-theme-text">Selecione um plano</h3>
                  <p className="text-theme-text opacity-80">
                    Escolha entre nossos planos flexíveis, desde pequenas empresas até grandes corporações.
                    Cada plano é personalizado para atender às suas necessidades específicas de SEO.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                  <div className="w-20 h-20 bg-theme-teal rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2 text-theme-text">Defina suas palavras-chave</h3>
                  <p className="text-theme-text opacity-80">
                    Especifique as palavras-chave (âncoras) e URLs de destino que você deseja
                    promover. Nossa plataforma sugerirá as melhores oportunidades com base em sua estratégia.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                  <div className="w-20 h-20 bg-theme-beige rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2 text-theme-text">Acompanhe os resultados</h3>
                  <p className="text-theme-text opacity-80">
                    Acesse nossa plataforma para monitorar o impacto dos backlinks em tempo real.
                    Veja melhorias nos rankings, aumento de tráfego e muito mais através de relatórios detalhados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingPlans />
      
      <section className="py-16 bg-theme-light-green">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-theme-text">
            Pronto para impulsionar seus rankings?
          </h2>
          <p className="text-xl text-theme-text opacity-80 mb-8 max-w-3xl mx-auto">
            Comece hoje mesmo e veja a diferença que backlinks de qualidade podem fazer para o seu negócio.
          </p>
          <button 
            className="bg-theme-beige hover:bg-theme-teal text-white text-lg font-medium py-3 px-8 rounded-md"
            onClick={() => setIsCartOpen(true)}
          >
            Começar agora
          </button>
        </div>
      </section>
      
      <CartSlideIn isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </LandingLayout>
  );
};

export default Index;
