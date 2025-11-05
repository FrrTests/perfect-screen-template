import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Serviços Contábeis e Fiscais da Unifor
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              O Núcleo de Apoio Contábil e Fiscal (NAF) da Unifor oferece orientação especializada em serviços da Receita Federal, assuntos tributários e orientações para alunos suplementaristas. O NAF é referência na Nordeste para qualidade e compromisso com a população.
            </p>
            <Button size="lg">Agendar atendimento</Button>
          </div>
          <div className="flex justify-center">
            <img 
              src={heroIllustration} 
              alt="Ilustração de atendimento online" 
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
