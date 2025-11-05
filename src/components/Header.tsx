import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">NAF Unifor</h1>
        <nav className="flex items-center gap-4">
          <a href="#agendamento" className="text-sm text-foreground hover:text-primary transition-colors">
            Agendamento
          </a>
          <Link to="/login">
            <Button size="sm">Entrar</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
