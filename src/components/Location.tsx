const Location = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Localização</h2>
          <p className="text-muted-foreground">
            Av. Washington Soares, 1321 - Edson Queiroz - CEP 60811-905<br />
            Fortaleza / CE - Brasil, Bloco B | Sala 1A | Sob. agendamento
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.286236706373!2d-38.476856!3d-3.774214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c748f2b0f8f0f9%3A0x5f7f7f7f7f7f7f7f!2sUniversidade%20de%20Fortaleza%20-%20UNIFOR!5e0!3m2!1sen!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização NAF Unifor"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
