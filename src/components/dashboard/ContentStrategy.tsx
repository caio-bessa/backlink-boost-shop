
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Wand2 } from "lucide-react";

// Mock data for content strategy
const mockCampaigns = [
  {
    id: "1",
    title: "Otimização para E-commerce",
    status: "Em andamento",
    created: "2023-06-15",
    anchors: ["e-commerce otimização", "melhorar vendas online", "SEO para lojas virtuais"],
    targetUrls: ["https://mysite.com/ecommerce", "https://mysite.com/vendas-online"],
    contentStrategy: [
      {
        id: "cs1",
        section: "Introdução",
        content: "O mercado de e-commerce tem crescido exponencialmente nos últimos anos, especialmente após a pandemia...",
        suggestions: "Adicionar dados estatísticos sobre crescimento do e-commerce no Brasil em 2023."
      },
      {
        id: "cs2",
        section: "Problemas comuns",
        content: "Muitas lojas virtuais enfrentam desafios como: alta taxa de abandono de carrinho, baixa conversão...",
        suggestions: "Incluir exemplos reais de problemas enfrentados por e-commerces."
      },
      {
        id: "cs3",
        section: "Soluções de otimização",
        content: "Para aumentar as vendas online, é essencial focar em: experiência do usuário, velocidade de carregamento...",
        suggestions: "Adicionar mais detalhes sobre otimização mobile e casos de sucesso."
      }
    ]
  },
  {
    id: "2",
    title: "Estratégia de Link Building B2B",
    status: "Pendente",
    created: "2023-06-20",
    anchors: ["link building B2B", "backlinks para empresas", "autoridade de domínio"],
    targetUrls: ["https://mysite.com/link-building", "https://mysite.com/b2b"],
    contentStrategy: [
      {
        id: "cs4",
        section: "O que é Link Building B2B",
        content: "Link Building B2B envolve a construção estratégica de backlinks para empresas que atuam no modelo business-to-business...",
        suggestions: "Explicar melhor a diferença entre link building B2B e B2C."
      },
      {
        id: "cs5",
        section: "Benefícios para empresas",
        content: "Empresas B2B podem se beneficiar significativamente do link building através de: aumento de autoridade, maior visibilidade...",
        suggestions: "Incluir métricas específicas que demonstrem o impacto do link building."
      }
    ]
  }
];

const ContentStrategy = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<{campaignId: string, sectionId: string} | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (campaignId: string, sectionId: string, currentValue: string) => {
    setEditingCell({ campaignId, sectionId });
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (!editingCell) return;
    
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id !== editingCell.campaignId) return campaign;
      
      return {
        ...campaign,
        contentStrategy: campaign.contentStrategy.map(section => {
          if (section.id !== editingCell.sectionId) return section;
          return { ...section, content: editValue };
        })
      };
    }));
    
    setEditingCell(null);
  };

  const handleRegenerateAI = (campaignId: string, sectionId: string) => {
    // In a real app, this would call OpenAI API
    // For the prototype we'll simulate with some improved content
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id !== campaignId) return campaign;
      
      return {
        ...campaign,
        contentStrategy: campaign.contentStrategy.map(section => {
          if (section.id !== sectionId) return section;
          
          let improvedContent = section.content;
          
          // Simulate AI improvements
          if (section.id === "cs1") {
            improvedContent = "O mercado de e-commerce no Brasil cresceu 41% em 2022, atingindo um faturamento de R$ 169,6 bilhões segundo a ABComm. Esta expansão acelerada criou tanto oportunidades quanto desafios para lojistas online...";
          } else if (section.id === "cs4") {
            improvedContent = "Link Building B2B é uma estratégia avançada de SEO focada especificamente em empresas que vendem para outras empresas, diferentemente do B2C. Esta abordagem considera o ciclo de compra mais longo e complexo do ambiente corporativo...";
          }
          
          return { ...section, content: improvedContent };
        })
      };
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-theme-text">Estratégia de conteúdo para Link Building</h1>
        <Button className="bg-theme-beige hover:bg-theme-teal text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova estratégia
        </Button>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList className="mb-6">
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="editor">Editor de conteúdo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns">
          <div className="grid grid-cols-1 gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-5 w-5 text-theme-beige" />
                        <h3 className="text-lg font-semibold text-theme-text">{campaign.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Criado em {new Date(campaign.created).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        campaign.status === "Em andamento" 
                          ? "bg-theme-teal text-white" 
                          : "bg-theme-yellow text-theme-text"
                      }`}>
                        {campaign.status}
                      </span>
                      <Button 
                        variant="outline" 
                        className="border-theme-teal text-theme-text"
                        onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
                      >
                        {selectedCampaign === campaign.id ? "Fechar" : "Ver detalhes"}
                      </Button>
                    </div>
                  </div>
                  
                  {selectedCampaign === campaign.id && (
                    <div className="mt-4 border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-medium text-theme-text mb-2">Palavras-âncora</h4>
                          <div className="flex flex-wrap gap-2">
                            {campaign.anchors.map((anchor, index) => (
                              <span key={index} className="bg-theme-light-green rounded-full px-3 py-1 text-xs">
                                {anchor}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-theme-text mb-2">URLs de destino</h4>
                          <div className="flex flex-col gap-1">
                            {campaign.targetUrls.map((url, index) => (
                              <a 
                                key={index} 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-theme-beige hover:text-theme-teal text-sm"
                              >
                                {url}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-theme-text mb-3">Estratégia de conteúdo</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2 text-left text-theme-text">Seção</th>
                              <th className="border p-2 text-left text-theme-text">Conteúdo</th>
                              <th className="border p-2 text-left text-theme-text">Sugestões</th>
                              <th className="border p-2 text-left text-theme-text">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {campaign.contentStrategy.map((section) => (
                              <tr key={section.id}>
                                <td className="border p-2 text-theme-text font-medium">
                                  {section.section}
                                </td>
                                <td className="border p-2 text-theme-text">
                                  {editingCell?.campaignId === campaign.id && editingCell?.sectionId === section.id ? (
                                    <div className="flex flex-col gap-2">
                                      <textarea 
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="w-full p-2 border border-theme-teal rounded min-h-[100px]"
                                      />
                                      <div className="flex gap-2">
                                        <Button 
                                          size="sm" 
                                          onClick={handleSave}
                                          className="bg-theme-teal hover:bg-theme-beige text-white"
                                        >
                                          Salvar
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => setEditingCell(null)}
                                          className="border-gray-300"
                                        >
                                          Cancelar
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="max-h-[100px] overflow-y-auto">
                                      {section.content}
                                    </div>
                                  )}
                                </td>
                                <td className="border p-2 text-sm text-gray-600">
                                  {section.suggestions}
                                </td>
                                <td className="border p-2">
                                  {!(editingCell?.campaignId === campaign.id && editingCell?.sectionId === section.id) && (
                                    <div className="flex gap-2">
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-xs border-theme-teal text-theme-text"
                                        onClick={() => handleEdit(campaign.id, section.id, section.content)}
                                      >
                                        Editar
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        className="text-xs bg-theme-yellow hover:bg-theme-beige text-theme-text flex items-center gap-1"
                                        onClick={() => handleRegenerateAI(campaign.id, section.id)}
                                      >
                                        <Wand2 className="h-3 w-3" />
                                        Regerar IA
                                      </Button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-theme-text">Editor Avançado de Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <p className="text-theme-text mb-4">Selecione uma campanha na aba "Campanhas" para editar seu conteúdo</p>
                <Button 
                  className="bg-theme-beige hover:bg-theme-teal text-white"
                  onClick={() => setSelectedCampaign(campaigns[0].id)}
                >
                  Ver campanhas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentStrategy;
