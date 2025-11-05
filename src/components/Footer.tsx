const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-6">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <p className="text-sm text-foreground font-semibold">NAF Unifor</p>
        <a href="#agendamento" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          Agendamento
        </a>
      </div>
    </footer>
  );
};

export default Footer;
