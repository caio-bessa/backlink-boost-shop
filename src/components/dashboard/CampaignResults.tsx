
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChart2, TrendingUp, Globe, Search } from "lucide-react";

// Mock data for charts (in a real app, this would come from an API)
const mockChartData = {
  keywords: [
    { name: "SEO Avançado", clicks: 342, impressions: 5640, ctr: 6.1, position: 3.2 },
    { name: "Link Building", clicks: 287, impressions: 4230, ctr: 6.8, position: 4.1 },
    { name: "Backlinks de Qualidade", clicks: 195, impressions: 3280, ctr: 5.9, position: 5.7 },
    { name: "Marketing Digital", clicks: 178, impressions: 3950, ctr: 4.5, position: 7.3 },
    { name: "Análise de SEO", clicks: 156, impressions: 2780, ctr: 5.6, position: 6.2 },
  ],
  pages: [
    { url: "/blog/seo-avancado", clicks: 432, impressions: 7650, ctr: 5.6, position: 2.9 },
    { url: "/servicos/link-building", clicks: 367, impressions: 5840, ctr: 6.3, position: 3.7 },
    { url: "/blog/backlinks-2023", clicks: 289, impressions: 4930, ctr: 5.9, position: 4.2 },
    { url: "/casos-de-sucesso", clicks: 245, impressions: 4120, ctr: 5.9, position: 5.1 },
    { url: "/ferramentas-seo", clicks: 198, impressions: 3560, ctr: 5.6, position: 5.8 },
  ],
};

const CampaignResults = () => {
  const [isConnectedToGoogle, setIsConnectedToGoogle] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("30d");

  const campaigns = [
    { id: "1", name: "Campanha e-commerce Q2 2023" },
    { id: "2", name: "Blog SEO Junho 2023" },
    { id: "3", name: "Link Building Corporativo" },
  ];

  const handleConnect = () => {
    // In a real app, this would trigger OAuth flow
    setIsConnectedToGoogle(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-theme-text">Resultados por campanha</h1>
      
      {!isConnectedToGoogle ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center p-8">
              <Search className="h-12 w-12 text-theme-beige mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-theme-text">Conecte suas contas Google</h2>
              <p className="text-theme-text opacity-80 mb-6">
                Para visualizar os resultados completos, conecte sua conta do Google Search Console e Google Analytics.
              </p>
              <Button 
                className="bg-theme-beige hover:bg-theme-teal text-white" 
                onClick={handleConnect}
              >
                Conectar contas Google
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <select 
                className="w-full p-2 border border-theme-teal rounded bg-white text-theme-text"
                value={selectedCampaign || ""}
                onChange={(e) => setSelectedCampaign(e.target.value)}
              >
                <option value="">Todas as campanhas</option>
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/3">
              <select 
                className="w-full p-2 border border-theme-teal rounded bg-white text-theme-text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="6m">Últimos 6 meses</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-theme-text opacity-70">Cliques Totais</p>
                    <h3 className="text-2xl font-bold text-theme-text">1,248</h3>
                  </div>
                  <BarChart className="h-8 w-8 text-theme-beige" />
                </div>
                <p className="text-xs text-green-600 mt-2">↑ 14.5% em comparação ao período anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-theme-text opacity-70">Impressões</p>
                    <h3 className="text-2xl font-bold text-theme-text">24,380</h3>
                  </div>
                  <BarChart2 className="h-8 w-8 text-theme-yellow" />
                </div>
                <p className="text-xs text-green-600 mt-2">↑ 8.2% em comparação ao período anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-theme-text opacity-70">CTR Médio</p>
                    <h3 className="text-2xl font-bold text-theme-text">5.1%</h3>
                  </div>
                  <TrendingUp className="h-8 w-8 text-theme-teal" />
                </div>
                <p className="text-xs text-green-600 mt-2">↑ 0.8% em comparação ao período anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-theme-text opacity-70">Posição Média</p>
                    <h3 className="text-2xl font-bold text-theme-text">4.2</h3>
                  </div>
                  <Globe className="h-8 w-8 text-theme-light-green" />
                </div>
                <p className="text-xs text-green-600 mt-2">↑ 1.3 posições em comparação ao período anterior</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="keywords">
            <TabsList className="mb-4">
              <TabsTrigger value="keywords">Palavras-chave (Âncoras)</TabsTrigger>
              <TabsTrigger value="pages">Páginas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="keywords">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-theme-text">Desempenho por Palavras-chave</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-theme-teal">
                          <th className="text-left py-3 px-4 text-theme-text">Palavra-chave</th>
                          <th className="text-right py-3 px-4 text-theme-text">Cliques</th>
                          <th className="text-right py-3 px-4 text-theme-text">Impressões</th>
                          <th className="text-right py-3 px-4 text-theme-text">CTR</th>
                          <th className="text-right py-3 px-4 text-theme-text">Posição</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockChartData.keywords.map((keyword, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-theme-text">{keyword.name}</td>
                            <td className="text-right py-3 px-4 text-theme-text">{keyword.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 text-theme-text">{keyword.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 text-theme-text">{keyword.ctr.toFixed(1)}%</td>
                            <td className="text-right py-3 px-4 text-theme-text">{keyword.position.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pages">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-theme-text">Desempenho por Páginas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-theme-teal">
                          <th className="text-left py-3 px-4 text-theme-text">URL</th>
                          <th className="text-right py-3 px-4 text-theme-text">Cliques</th>
                          <th className="text-right py-3 px-4 text-theme-text">Impressões</th>
                          <th className="text-right py-3 px-4 text-theme-text">CTR</th>
                          <th className="text-right py-3 px-4 text-theme-text">Posição</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockChartData.pages.map((page, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-theme-text truncate max-w-[200px]">{page.url}</td>
                            <td className="text-right py-3 px-4 text-theme-text">{page.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 text-theme-text">{page.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 text-theme-text">{page.ctr.toFixed(1)}%</td>
                            <td className="text-right py-3 px-4 text-theme-text">{page.position.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default CampaignResults;
