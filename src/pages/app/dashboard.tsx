
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Campanhas Ativas",
      value: "3",
      change: "+1 este mês",
      positive: true,
      link: "/app/campaign-results"
    },
    {
      title: "Backlinks Criados",
      value: "27",
      change: "+8 este mês",
      positive: true,
      link: "/app/campaign-results"
    },
    {
      title: "Cliques Orgânicos",
      value: "1,248",
      change: "+14.5% vs. mês anterior",
      positive: true,
      link: "/app/campaign-results"
    },
    {
      title: "ROI Médio",
      value: "2.4x",
      change: "+0.3x vs. mês anterior",
      positive: true,
      link: "/app/financial-reports"
    },
  ];

  const recentActivity = [
    {
      type: "Campanha criada",
      name: "Link Building Corporativo",
      date: "Hoje, 10:23",
    },
    {
      type: "Relatório atualizado",
      name: "Relatório SEO - Junho 2023",
      date: "Ontem, 15:45",
    },
    {
      type: "Backlink publicado",
      name: "technews.com.br",
      date: "3 dias atrás",
    },
    {
      type: "Pagamento processado",
      name: "Fatura #12345",
      date: "1 semana atrás",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-theme-text">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-sm text-theme-text opacity-70">{stat.title}</p>
                  <div className="flex justify-between items-end mt-2">
                    <h3 className="text-2xl font-bold text-theme-text">{stat.value}</h3>
                    <span className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-theme-text">Ações rápidas</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/app/new-campaign">
                    <div className="border rounded-md p-4 hover:border-theme-teal hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-theme-text">Nova campanha de Link Building</h3>
                        <ArrowRight className="h-5 w-5 text-theme-beige" />
                      </div>
                      <p className="text-sm text-theme-text opacity-70 mt-1">
                        Crie uma nova campanha com parceiros selecionados
                      </p>
                    </div>
                  </Link>
                  
                  <Link to="/app/campaign-results">
                    <div className="border rounded-md p-4 hover:border-theme-teal hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-theme-text">Ver resultados de campanhas</h3>
                        <ArrowRight className="h-5 w-5 text-theme-beige" />
                      </div>
                      <p className="text-sm text-theme-text opacity-70 mt-1">
                        Acompanhe o desempenho dos seus backlinks
                      </p>
                    </div>
                  </Link>
                  
                  <Link to="/app/financial-reports">
                    <div className="border rounded-md p-4 hover:border-theme-teal hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-theme-text">Relatório financeiro</h3>
                        <ArrowRight className="h-5 w-5 text-theme-beige" />
                      </div>
                      <p className="text-sm text-theme-text opacity-70 mt-1">
                        Analise o retorno sobre investimento das suas campanhas
                      </p>
                    </div>
                  </Link>
                  
                  <Link to="/app/content-strategy">
                    <div className="border rounded-md p-4 hover:border-theme-teal hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-theme-text">Estratégia de conteúdo</h3>
                        <ArrowRight className="h-5 w-5 text-theme-beige" />
                      </div>
                      <p className="text-sm text-theme-text opacity-70 mt-1">
                        Desenvolva conteúdo otimizado para seus backlinks
                      </p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-theme-text">Progresso das Campanhas</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-theme-text">Campanha e-commerce Q2 2023</span>
                      <span className="text-sm text-theme-text">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-theme-teal h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-theme-text">Blog SEO Junho 2023</span>
                      <span className="text-sm text-theme-text">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-theme-beige h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-theme-text">Link Building Corporativo</span>
                      <span className="text-sm text-theme-text">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-theme-yellow h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-theme-text">Atividade recente</h2>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="bg-theme-light-green w-2 h-2 rounded-full mt-1.5 mr-2"></div>
                      <div>
                        <span className="text-sm font-medium block text-theme-text">{activity.type}</span>
                        <span className="text-sm block text-theme-text">{activity.name}</span>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="text-theme-beige hover:text-theme-teal text-sm font-medium">
                    Ver todo histórico
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-theme-text">Dicas de SEO</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <h3 className="font-medium text-theme-text mb-1">Atualize seu conteúdo regularmente</h3>
                    <p className="text-sm text-theme-text opacity-70">
                      Manter seu conteúdo atualizado pode melhorar significativamente seus rankings.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <h3 className="font-medium text-theme-text mb-1">Diversifique seus backlinks</h3>
                    <p className="text-sm text-theme-text opacity-70">
                      Um perfil de backlinks diversificado é mais natural aos olhos do Google.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <h3 className="font-medium text-theme-text mb-1">Foque em backlinks de qualidade</h3>
                    <p className="text-sm text-theme-text opacity-70">
                      Poucos backlinks de alta qualidade são mais valiosos que muitos de baixa qualidade.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
