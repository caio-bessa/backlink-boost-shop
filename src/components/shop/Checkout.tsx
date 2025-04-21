
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, CheckCircle2 } from "lucide-react";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [saveCard, setSaveCard] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment and complete order
      setOrderComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!orderComplete ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-theme-text mb-2">Checkout</h1>
            <p className="text-theme-text opacity-80">Complete sua compra em poucos passos simples</p>
          </div>

          <div className="flex mb-8">
            <div className={`flex-1 text-center py-2 ${step >= 1 ? 'bg-theme-beige text-white' : 'bg-gray-100 text-gray-400'}`}>
              Informações
            </div>
            <div className={`flex-1 text-center py-2 ${step >= 2 ? 'bg-theme-beige text-white' : 'bg-gray-100 text-gray-400'}`}>
              Pagamento
            </div>
            <div className={`flex-1 text-center py-2 ${step >= 3 ? 'bg-theme-beige text-white' : 'bg-gray-100 text-gray-400'}`}>
              Confirmação
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {step === 1 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-theme-text">Informações Pessoais</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor="first-name">Nome</Label>
                        <Input 
                          id="first-name" 
                          placeholder="Seu nome" 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Sobrenome</Label>
                        <Input 
                          id="last-name" 
                          placeholder="Seu sobrenome" 
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="seu@email.com" 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input 
                          id="phone" 
                          placeholder="(00) 00000-0000" 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="document">CPF/CNPJ</Label>
                        <Input 
                          id="document" 
                          placeholder="000.000.000-00" 
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-theme-text">Método de Pagamento</h2>
                    
                    <div className="flex border-b mb-6">
                      <button
                        className={`py-2 px-4 font-medium ${
                          paymentMethod === "credit-card" 
                            ? "border-b-2 border-theme-beige text-theme-beige" 
                            : "text-gray-500"
                        }`}
                        onClick={() => setPaymentMethod("credit-card")}
                      >
                        Cartão de Crédito
                      </button>
                      <button
                        className={`py-2 px-4 font-medium ${
                          paymentMethod === "boleto" 
                            ? "border-b-2 border-theme-beige text-theme-beige" 
                            : "text-gray-500"
                        }`}
                        onClick={() => setPaymentMethod("boleto")}
                      >
                        Boleto
                      </button>
                      <button
                        className={`py-2 px-4 font-medium ${
                          paymentMethod === "pix" 
                            ? "border-b-2 border-theme-beige text-theme-beige" 
                            : "text-gray-500"
                        }`}
                        onClick={() => setPaymentMethod("pix")}
                      >
                        PIX
                      </button>
                    </div>
                    
                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-name">Nome no Cartão</Label>
                          <Input 
                            id="card-name" 
                            placeholder="Nome como aparece no cartão" 
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="card-number">Número do Cartão</Label>
                          <div className="relative mt-1">
                            <Input 
                              id="card-number" 
                              placeholder="0000 0000 0000 0000" 
                              className="pl-10"
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Data de Validade</Label>
                            <Input 
                              id="expiry" 
                              placeholder="MM/AA" 
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              placeholder="123" 
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="save-card" 
                            checked={saveCard} 
                            onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                          />
                          <label 
                            htmlFor="save-card" 
                            className="text-sm text-theme-text"
                          >
                            Salvar este cartão para compras futuras
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === "boleto" && (
                      <div className="text-center py-6">
                        <div className="bg-gray-100 p-4 rounded mb-4">
                          <p className="text-theme-text">
                            Ao confirmar, você receberá um boleto para pagamento. Após compensação do pagamento (1-3 dias úteis), seu pedido será processado.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === "pix" && (
                      <div className="text-center py-6">
                        <div className="bg-gray-100 p-4 rounded mb-4">
                          <p className="text-theme-text">
                            Finalize sua compra com PIX! Após a confirmação, exibiremos um QR Code para pagamento instantâneo.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-theme-text">Revisão do Pedido</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-medium text-theme-text mb-2">Informações Pessoais</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Nome:</p>
                            <p className="text-theme-text">João Silva</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Email:</p>
                            <p className="text-theme-text">joao@exemplo.com</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Telefone:</p>
                            <p className="text-theme-text">(11) 98765-4321</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Documento:</p>
                            <p className="text-theme-text">123.456.789-00</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-medium text-theme-text mb-2">Método de Pagamento</h3>
                        <p className="text-theme-text">
                          {paymentMethod === "credit-card" && "Cartão de Crédito terminando em 4242"}
                          {paymentMethod === "boleto" && "Boleto Bancário"}
                          {paymentMethod === "pix" && "PIX"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center border-t pt-4">
                      <Checkbox id="terms" />
                      <label 
                        htmlFor="terms" 
                        className="ml-2 text-sm text-theme-text"
                      >
                        Concordo com os <a href="#" className="text-theme-beige hover:text-theme-teal">Termos e Condições</a> e <a href="#" className="text-theme-beige hover:text-theme-teal">Política de Privacidade</a>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    className="border-theme-teal text-theme-text"
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button
                  className="bg-theme-beige hover:bg-theme-teal text-white"
                  onClick={handleContinue}
                >
                  {step === 3 ? "Finalizar Pedido" : "Continuar"}
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-theme-text">Resumo do Pedido</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-theme-text">Pacote Backlinks Premium</span>
                      <span className="font-medium text-theme-text">R$ 590,00</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-theme-text">Relatório de Análise</span>
                      <span className="font-medium text-theme-text">R$ 290,00</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-theme-text">Subtotal</span>
                      <span className="font-medium text-theme-text">R$ 880,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text">Total</span>
                      <span className="font-bold text-xl text-theme-text">R$ 880,00</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p className="text-theme-text opacity-80">
                      Sua compra é protegida por criptografia SSL de 256 bits.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="bg-green-50 inline-block p-4 rounded-full mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-theme-text mb-4">Pedido Confirmado!</h1>
          <p className="text-lg text-theme-text opacity-80 mb-8 max-w-lg mx-auto">
            Seu pedido #12345 foi recebido e está sendo processado. Você receberá um email de confirmação em breve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-theme-beige hover:bg-theme-teal text-white">
              Ver Detalhes do Pedido
            </Button>
            <Button variant="outline" className="border-theme-teal text-theme-text">
              Voltar para a Loja
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
