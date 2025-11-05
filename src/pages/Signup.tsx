import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('auth-signup', {
        body: {
          fullName: formData.fullName,
          cpf: formData.cpf,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Faça login para continuar",
        });
        navigate("/login");
      } else {
        toast({
          title: "Erro ao criar conta",
          description: data.error || "Tente novamente",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast({
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">Crie sua conta</h1>
            <p className="text-gray-600">Bem vindo! Por favor, preencha as informações</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-primary">Nome completo</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Lucas silva pereira"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-primary">CPF</Label>
              <Input
                id="cpf"
                name="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exampl@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-primary">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
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
            {isLoading ? "Criando conta..." : "Criar conta"}
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

export default Signup;