import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import ouroPretoImage from "@/assets/tourism/ouro-preto.jpg";
import inhotimImage from "@/assets/tourism/inhotim.jpg";
import serraDoCipoImage from "@/assets/tourism/serra-do-cipo.jpg";
import tiradentesImage from "@/assets/tourism/tiradentes.jpg";
import diamantinaImage from "@/assets/tourism/diamantina.jpg";
import estradaRealImage from "@/assets/tourism/estrada-real.jpg";

interface TourismSectionProps {
  title: string;
  intro: string;
  email: string;
  placesTitle: string;
  places: Array<{
    name: string;
    description: string;
  }>;
}

const placeImages = [
  ouroPretoImage,
  inhotimImage,
  serraDoCipoImage,
  tiradentesImage,
  diamantinaImage,
  estradaRealImage,
];

export const TourismSection = ({ title, intro, email, placesTitle, places }: TourismSectionProps) => {
  return (
    <section id="turismo" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="prose prose-lg mx-auto text-foreground/90 text-left space-y-4">
            {intro.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <Mail className="h-5 w-5 text-primary" />
            <a 
              href={`mailto:${email}`}
              className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">{placesTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={placeImages[index]} 
                    alt={place.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{place.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {place.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
