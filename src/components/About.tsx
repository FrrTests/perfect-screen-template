import { Card, CardContent } from "@/components/ui/card";
import statsIcon1 from "@/assets/stats-icon-1.png";
import statsIcon2 from "@/assets/stats-icon-2.png";

const About = () => {
  const stats = [
    {
      title: "Atendimentos Realizados",
      value: "+ de 4 mil atendimentos",
      description: "Atendimento gratuito em parcerias contábeis e fiscais para a comunidade.",
      image: statsIcon1,
    },
    {
      title: "Declaração de IRPF",
      value: "+ de 1 mil",
      description: "Apoio completo no preenchimento e envio do documento do Imposto de Renda.",
      image: statsIcon2,
    },
    {
      title: "MEIs regularizados",
      value: "600",
      description: "Orientação e suporte para abertura e regularização de MEI.",
      image: statsIcon1,
    },
    {
      title: "Ações diferenciadas",
      value: "",
      description: "Ações que fortalecem a qualidade do atendimento e a integração com os fiscais.",
      image: statsIcon2,
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Sobre</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Criado em 2014, o Núcleo de Apoio Contábil e Fiscal (NAF) promove atendimento gratuito à população, além da capacitação, palestras e atividades que fortalecem a relação entre Universidade e Fisco.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-1">{stat.title}</h3>
                  {stat.value && (
                    <p className="text-primary font-semibold text-xl mb-2">{stat.value}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <img src={stat.image} alt="" className="w-20 h-20 object-contain" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
