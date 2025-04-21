
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart, Trash2, ChevronRight } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartSlideInProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSlideIn = ({ isOpen, onClose }: CartSlideInProps) => {
  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Pacote Backlinks Premium - 10 links",
      price: 590,
      quantity: 1
    },
    {
      id: "2",
      name: "Relatório de Análise de Backlinks",
      price: 290,
      quantity: 1
    }
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto transform transition-transform">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-theme-beige mr-2" />
              <h2 className="text-xl font-bold text-theme-text">Seu Carrinho</h2>
            </div>
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg text-theme-text mb-2">Seu carrinho está vazio</p>
              <p className="text-theme-text opacity-70 mb-6">
                Adicione alguns itens para continuar com sua compra
              </p>
              <Button 
                className="bg-theme-beige hover:bg-theme-teal text-white"
                onClick={onClose}
              >
                Continuar comprando
              </Button>
            </div>
          ) : (
            <>
              <div className="divide-y space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0">
                    <div className="flex justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="font-medium text-theme-text">{item.name}</h3>
                        <p className="text-theme-beige font-semibold mt-1">
                          R$ {item.price.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center border rounded mr-2">
                          <button 
                            className="px-2 py-1 text-gray-500 hover:text-theme-beige"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-gray-500 hover:text-theme-beige"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-theme-text">Subtotal</span>
                  <span className="font-medium text-theme-text">
                    R$ {subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-theme-text">Total</span>
                  <span className="font-bold text-xl text-theme-text">
                    R$ {subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-theme-beige hover:bg-theme-teal text-white py-6 flex items-center justify-center">
                Finalizar Compra
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>

              <button 
                className="w-full text-center mt-4 text-theme-text hover:text-theme-beige"
                onClick={onClose}
              >
                Continuar comprando
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSlideIn;
