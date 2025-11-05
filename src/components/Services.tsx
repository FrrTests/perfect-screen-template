import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Laptop, Smartphone, FileText } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Orientação para emissão do CNPJ",
      description: "Apoio na tutela e fornecemos de novos negócios.",
      icon: Monitor,
    },
    {
      title: "Regularização do MEI",
      description: "Suporte para regularizar e manter o MEI em dia.",
      icon: Laptop,
    },
    {
      title: "Declaração do Imposto de Renda Pessoa Física (IRPF)",
      description: "Auxílio no preenchimento e envio da declaração.",
      icon: Smartphone,
    },
    {
      title: "Suporte fiscal em geral (Receita Federal, Sefaz e Sefin)",
      description: "Orientação sobre serviços e dúvidas junto às três fiscais.",
      icon: FileText,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nossos Serviços</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            O NAF oferece atendimento contábil e fiscal gratuito, auxiliando contribuintes e MEIs no cumprimento dos principais fiscais. Conheça os serviços disponíveis para ajudar você com segurança e responsabilidade:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
