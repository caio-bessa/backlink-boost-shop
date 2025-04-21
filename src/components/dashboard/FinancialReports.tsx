
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, CreditCard, TrendingUp } from "lucide-react";

// Mock data for financial reports
const campaignReports = [
  { 
    id: "1", 
    name: "Campanha e-commerce Q2 2023", 
    investment: 1250, 
    startDate: "2023-04-01", 
    endDate: "2023-06-30",
    keywords: 8,
    urls: 5,
    roi: 2.4
  },
  { 
    id: "2", 
    name: "Blog SEO Junho 2023", 
    investment: 880, 
    startDate: "2023-06-01", 
    endDate: "2023-06-30",
    keywords: 6,
    urls: 3,
    roi: 1.8
  },
  { 
    id: "3", 
    name: "Link Building Corporativo", 
    investment: 1650, 
    startDate: "2023-05-15", 
    endDate: "2023-08-15",
    keywords: 12,
    urls: 7,
    roi: 3.1
  },
];

const paymentMethods = [
  {
    id: "1",
    type: "Cartão de Crédito",
    last4: "4242",
    brand: "Visa",
    expiryDate: "04/25",
    isDefault: true
  },
  {
    id: "2",
    type: "Cartão de Crédito",
    last4: "1234",
    brand: "Mastercard",
    expiryDate: "12/24",
    isDefault: false
  }
];

const seoFinancialData = [
  { 
    keyword: "SEO Avançado", 
    investment: 450, 
    clicks: 342, 
    impressions: 5640, 
    costPerClick: 1.32, 
    conversion: 12 
  },
  { 
    keyword: "Link Building", 
    investment: 380, 
    clicks: 287, 
    impressions: 4230, 
    costPerClick: 1.32, 
    conversion: 9 
  },
  { 
    keyword: "Backlinks de Qualidade", 
    investment: 290, 
    clicks: 195, 
    impressions: 3280, 
    costPerClick: 1.49, 
    conversion: 7 
  },
  { 
    keyword: "Marketing Digital", 
    investment: 210, 
    clicks: 178, 
    impressions: 3950, 
    costPerClick: 1.18, 
    conversion: 5 
  },
  { 
    keyword: "Análise de SEO", 
    investment: 180, 
    clicks: 156, 
    impressions: 2780, 
    costPerClick: 1.15, 
    conversion: 4 
  },
];

const FinancialReports = () => {
  const [selectedTab, setSelectedTab] = useState("campaign");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-theme-text">Relatório Financeiro</h1>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="campaign" className="flex-1">Relatório por Campanha</TabsTrigger>
          <TabsTrigger value="payment" className="flex-1">Informações Cadastradas</TabsTrigger>
          <TabsTrigger value="seoReport" className="flex-1">Report Financeiro de SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaign">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-theme-text opacity-70">Investimento Total</p>
                    <h3 className="text-2xl font-bold text-theme-text">R$ 3.780,00</h3>
                  </div>
                  <DollarSign className="h-8 w-8 text-theme-beige" />
                </div>
                <p className="text-xs text-green-600 mt-2">3 campanhas ativas</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-theme-text opacity-70">ROI Médio</p>
                    <h3 className="text-2xl font-bold text-theme-text">2.4x</h3>
                  </div>
                  <TrendingUp className="h-8 w-8 text-theme-teal" />
                </div>
                <p className="text-xs text-green-600 mt-2">↑ 0.3x em comparação ao período anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-theme-text opacity-70">Custo Médio por Clique</p>
                    <h3 className="text-2xl font-bold text-theme-text">R$ 1,28</h3>
                  </div>
                  <CreditCard className="h-8 w-8 text-theme-yellow" />
                </div>
                <p className="text-xs text-green-600 mt-2">↓ R$ 0,12 em comparação ao período anterior</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-theme-text">Campanhas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-theme-teal">
                      <th className="text-left py-3 px-4 text-theme-text">Campanha</th>
                      <th className="text-right py-3 px-4 text-theme-text">Investimento</th>
                      <th className="text-right py-3 px-4 text-theme-text">Palavras-chave</th>
                      <th className="text-right py-3 px-4 text-theme-text">URLs</th>
                      <th className="text-right py-3 px-4 text-theme-text">Data de Início</th>
                      <th className="text-right py-3 px-4 text-theme-text">Data de Término</th>
                      <th className="text-right py-3 px-4 text-theme-text">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignReports.map((campaign) => (
                      <tr key={campaign.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-theme-text">{campaign.name}</td>
                        <td className="text-right py-3 px-4 text-theme-text">
                          R$ {campaign.investment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </td>
                        <td className="text-right py-3 px-4 text-theme-text">{campaign.keywords}</td>
                        <td className="text-right py-3 px-4 text-theme-text">{campaign.urls}</td>
                        <td className="text-right py-3 px-4 text-theme-text">
                          {new Date(campaign.startDate).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="text-right py-3 px-4 text-theme-text">
                          {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="text-right py-3 px-4 text-theme-text">{campaign.roi}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-theme-text">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-theme-text opacity-70 mb-1">Nome Completo</p>
                  <p className="text-theme-text font-medium">João Silva</p>
                </div>
                <div>
                  <p className="text-sm text-theme-text opacity-70 mb-1">E-mail</p>
                  <p className="text-theme-text font-medium">joao@exemplo.com</p>
                </div>
                <div>
                  <p className="text-sm text-theme-text opacity-70 mb-1">CPF</p>
                  <p className="text-theme-text font-medium">123.456.789-00</p>
                </div>
                <div>
                  <p className="text-sm text-theme-text opacity-70 mb-1">Telefone</p>
                  <p className="text-theme-text font-medium">(11) 98765-4321</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-theme-text">Métodos de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className="p-4 border rounded-md flex items-center justify-between"
                    style={{ borderColor: method.isDefault ? '#9DCDC0' : '#e2e8f0' }}
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        {method.brand === "Visa" ? (
                          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">VISA</div>
                        ) : (
                          <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs">MASTER</div>
                        )}
                      </div>
                      <div>
                        <p className="text-theme-text font-medium">
                          {method.type} **** {method.last4}
                        </p>
                        <p className="text-sm text-theme-text opacity-70">
                          Expira em {method.expiryDate}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="text-xs bg-theme-teal text-white px-2 py-1 rounded">Padrão</span>
                    )}
                  </div>
                ))}
                
                <button className="text-theme-beige hover:text-theme-teal text-sm font-medium flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Adicionar novo método de pagamento
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seoReport">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-theme-text">Report Financeiro de SEO por Palavra-chave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-theme-teal">
                      <th className="text-left py-3 px-4 text-theme-text">Palavra-chave</th>
                      <th className="text-right py-3 px-4 text-theme-text">Investimento</th>
                      <th className="text-right py-3 px-4 text-theme-text">Cliques</th>
                      <th className="text-right py-3 px-4 text-theme-text">Impressões</th>
                      <th className="text-right py-3 px-4 text-theme-text">Custo por Clique</th>
                      <th className="text-right py-3 px-4 text-theme-text">Conversões</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoFinancialData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-theme-text">{item.keyword}</td>
                        <td className="text-right py-3 px-4 text-theme-text">
                          R$ {item.investment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </td>
                        <td className="text-right py-3 px-4 text-theme-text">{item.clicks.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 text-theme-text">{item.impressions.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 text-theme-text">
                          R$ {item.costPerClick.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </td>
                        <td className="text-right py-3 px-4 text-theme-text">{item.conversion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReports;
