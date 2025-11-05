import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('auth-login', {
        body: { email, password }
      });

      if (error) throw error;

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${data.user.fullName}!`,
        });
        
        navigate("/");
      } else {
        toast({
          title: "Erro ao fazer login",
          description: data.error || "Email ou senha incorretos",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos",
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
            <h1 className="text-3xl font-bold text-primary">Entre na sua conta</h1>
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

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="text-right">
              <Link to="/recuperar-senha" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-primary font-medium hover:underline">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;