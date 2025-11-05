import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('auth-reset-password', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Email enviado!",
        description: data.message || "Verifique sua caixa de entrada",
      });
      
      setEmail("");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast({
        title: "Erro",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">Esqueceu a senha?</h1>
            <p className="text-gray-600">Bem vindo! Por favor, preencha as informações</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exampl@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Recuperar senha"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;