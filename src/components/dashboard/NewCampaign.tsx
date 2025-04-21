
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Search, Filter, ArrowRight } from "lucide-react";

// Mock partner data (would come from Ahrefs API in a real app)
const mockPartners = [
  {
    id: "1",
    name: "SEO Masters Blog",
    url: "https://seomasters.blog",
    region: "Brasil",
    category: "Marketing Digital",
    trafficEstimate: 45000,
    dr: 62,
    price: 250
  },
  {
    id: "2",
    name: "Tech News Portal",
    url: "https://technews.com.br",
    region: "Brasil",
    category: "Tecnologia",
    trafficEstimate: 87000,
    dr: 74,
    price: 380
  },
  {
    id: "3",
    name: "Mundo do Marketing",
    url: "https://mundodomarketing.com.br",
    region: "Brasil",
    category: "Marketing Digital",
    trafficEstimate: 63000,
    dr: 69,
    price: 320
  },
  {
    id: "4",
    name: "Portal Empreendedor",
    url: "https://portalempreendedor.com.br",
    region: "Brasil",
    category: "Negócios",
    trafficEstimate: 52000,
    dr: 65,
    price: 290
  },
  {
    id: "5",
    name: "Blog Ecommerce",
    url: "https://blogecommerce.com.br",
    region: "Brasil",
    category: "E-commerce",
    trafficEstimate: 38000,
    dr: 58,
    price: 210
  }
];

const NewCampaign = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minDR, setMinDR] = useState<number>(0);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const regions = ["Brasil", "Portugal", "EUA", "Europa", "América Latina"];
  const categories = ["Marketing Digital", "Tecnologia", "Negócios", "E-commerce", "Saúde"];

  const filteredPartners = mockPartners.filter((partner) => {
    return (
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === "" || partner.region === selectedRegion) &&
      (selectedCategory === "" || partner.category === selectedCategory) &&
      partner.dr >= minDR
    );
  });

  const handlePartnerSelect = (partnerId: string) => {
    if (selectedPartners.includes(partnerId)) {
      setSelectedPartners(selectedPartners.filter(id => id !== partnerId));
    } else {
      setSelectedPartners([...selectedPartners, partnerId]);
    }
  };

  const totalPrice = selectedPartners.reduce((total, partnerId) => {
    const partner = mockPartners.find(p => p.id === partnerId);
    return total + (partner?.price || 0);
  }, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-theme-text">Nova campanha de Link Building</h1>
        <Button 
          className="bg-theme-beige hover:bg-theme-teal text-white flex items-center gap-2"
          onClick={() => setCartOpen(true)}
          disabled={selectedPartners.length === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Carrinho ({selectedPartners.length})</span>
          <span className="ml-2 bg-white text-theme-beige rounded-full px-2 py-0.5 text-xs font-medium">
            R$ {totalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar parceiros por nome..."
              className="pl-10 bg-white border-theme-teal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button 
            variant="outline" 
            className="w-full border-theme-teal text-theme-text flex justify-between"
            onClick={() => document.getElementById('filterDropdown')?.classList.toggle('hidden')}
          >
            <span>Filtros</span>
            <Filter className="h-4 w-4" />
          </Button>
          <div id="filterDropdown" className="hidden absolute z-10 mt-2 w-64 bg-white shadow-lg rounded-md p-4 border border-theme-teal">
            <div className="mb-4">
              <Label>Região</Label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Todas as regiões</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <Label>Categoria</Label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <Label>DR Mínimo</Label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="w-full mt-1"
                value={minDR}
                onChange={(e) => setMinDR(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span>{minDR}</span>
                <span>100</span>
              </div>
            </div>
            <Button 
              className="w-full bg-theme-teal hover:bg-theme-beige text-white"
              onClick={() => document.getElementById('filterDropdown')?.classList.toggle('hidden')}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className={`border ${selectedPartners.includes(partner.id) ? 'border-theme-teal' : 'border-gray-200'}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-start gap-4 mb-4 md:mb-0">
                  <Checkbox 
                    id={`partner-${partner.id}`}
                    checked={selectedPartners.includes(partner.id)}
                    onCheckedChange={() => handlePartnerSelect(partner.id)}
                    className="h-5 w-5 mt-1 accent-theme-teal"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-theme-text">{partner.name}</h3>
                    <a 
                      href={partner.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-theme-beige hover:text-theme-teal text-sm mb-2 inline-block"
                    >
                      {partner.url}
                    </a>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-theme-light-green rounded-full px-3 py-1 text-xs">
                        {partner.region}
                      </span>
                      <span className="bg-theme-yellow rounded-full px-3 py-1 text-xs">
                        {partner.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm text-theme-text">Tráfego estimado:</span>
                      <span className="font-medium text-theme-text">{partner.trafficEstimate.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm text-theme-text">DR:</span>
                      <span className="font-medium text-theme-text">{partner.dr}</span>
                    </div>
                  </div>
                  <div className="text-center bg-gray-100 px-4 py-2 rounded-md">
                    <p className="text-sm text-theme-text">Preço por publicação</p>
                    <p className="text-xl font-bold text-theme-beige">
                      R$ {partner.price.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Cart Slide-in Panel */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setCartOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-theme-text">Seu Carrinho</h2>
                <button className="text-gray-500" onClick={() => setCartOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {selectedPartners.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-theme-text">Seu carrinho está vazio</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-4 mb-6">
                    {selectedPartners.map(partnerId => {
                      const partner = mockPartners.find(p => p.id === partnerId);
                      if (!partner) return null;
                      return (
                        <div key={partner.id} className="flex justify-between border-b pb-4">
                          <div>
                            <h3 className="font-medium text-theme-text">{partner.name}</h3>
                            <p className="text-sm text-gray-500">{partner.url}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-theme-beige">
                              R$ {partner.price.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </p>
                            <button 
                              className="text-xs text-red-500 hover:text-red-700"
                              onClick={() => handlePartnerSelect(partner.id)}
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <Label>Âncoras (palavras-chave)</Label>
                      <textarea 
                        className="w-full mt-1 p-2 border border-gray-300 rounded h-20"
                        placeholder="Digite uma palavra-chave por linha"
                      ></textarea>
                    </div>
                    <div>
                      <Label>URLs de destino</Label>
                      <textarea 
                        className="w-full mt-1 p-2 border border-gray-300 rounded h-20"
                        placeholder="Digite uma URL por linha"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Data de início</Label>
                        <Input type="date" className="mt-1" />
                      </div>
                      <div>
                        <Label>Nome da campanha</Label>
                        <Input type="text" placeholder="Ex: Blog Q2 2023" className="mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-theme-text">Subtotal</span>
                      <span className="font-medium text-theme-text">
                        R$ {totalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-theme-text">Total</span>
                      <span className="font-bold text-xl text-theme-text">
                        R$ {totalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                    </div>
                    <Button className="w-full bg-theme-beige hover:bg-theme-teal text-white py-6 flex items-center justify-center gap-2">
                      Finalizar Pedido
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCampaign;
