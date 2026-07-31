import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanonical } from "@/lib/useCanonical";
import { BeforeYouProceed } from "@/components/BeforeYouProceed";
import { CALLIPHORA_LOGO } from "@/pages/Fly";

type Block = { type: "h2"; text: string } | { type: "p"; text: string; italic?: boolean };

const blocks: Block[] = [
  { type: "h2", text: "El precio de un vuelo no existe" },
  { type: "p", text: "Existen al menos cuatro. El mismo asiento, el mismo avión, el mismo día. Lo único que cambia es la puerta por la que se entra." },
  { type: "p", text: "Está la tarifa publicada, la que se ve en el sitio de la aerolínea. Están las tarifas negociadas y confidenciales, que por definición no se publican en ninguna parte. Están los contratos corporativos, reservados a quien mueve volúmenes serios. Y están los programas que las aerolíneas dedican a las pequeñas y medianas empresas — sin volumen mínimo, y que casi ninguna pyme sabe que existen." },
  { type: "p", text: "En el corredor Sudamérica–Europa, quien paga menos rara vez es quien buscó más. Es quien tuvo acceso.", italic: true },

  { type: "h2", text: "De dónde viene el acceso" },
  { type: "p", text: "Calliphora Travel es la marca comercial de CAVALLINODIECI S.r.l., empresa que opera desde 2004 en organización de viajes, intermediación y emisión de boletos aéreos — con su denominación actual desde 2008 — con todas las licencias exigidas por la ley italiana." },
  { type: "p", text: "Un único interlocutor, desde la primera consulta hasta el regreso a casa: vuelos, hoteles, alquiler de autos, traslados y seguro de viaje." },

  { type: "h2", text: "Tarifas negociadas y confidenciales" },
  { type: "p", text: "Veinte años de relación con las aerolíneas se traducen en algo concreto: acceso a tarifas negociadas y confidenciales. El nombre lo dice todo — por definición no pueden publicarse. No las va a encontrar en las OTAs, las agencias online donde se comparan precios. No las va a encontrar en los IBT, las herramientas de autorreserva que usan muchas empresas. Y tampoco en los sitios de las propias aerolíneas." },
  { type: "p", text: "El precio es la ventaja más visible, pero no la única. Las tarifas VFR (visita a familiares y amigos), por ejemplo, suelen incluir una franquicia de equipaje más generosa y reglas de cambio más flexibles que las tarifas publicadas, además de un precio menor." },

  { type: "h2", text: "No le vendemos un boleto. Le armamos un viaje sin fricciones." },
  { type: "p", text: "Nuestro trabajo no termina con la emisión. Empieza mucho antes y se cierra cuando usted ya está de vuelta." },
  { type: "p", text: "Antes de la salida anticipamos lo que puede arruinar un viaje: documentación y requisitos de ingreso, tiempos mínimos de conexión, conexiones frágiles, reglas de equipaje, coberturas de seguro ajustadas al itinerario real." },
  { type: "p", text: "En tránsito gestionamos las contingencias de forma proactiva — cancelaciones, denegación de embarque, reprogramaciones: lo que la industria llama IROPS, irregular operations — para que el daño a su agenda sea el menor posible. No esperamos a que nos llame desde el aeropuerto." },

  { type: "h2", text: "No todos los aviones lo tratan igual" },
  { type: "p", text: "Se puede volar en clase ejecutiva, en el asiento más cómodo del mercado, y aterrizar destrozado. Muchas veces no es el asiento. Es el fuselaje." },
  { type: "p", text: "Un fuselaje de aluminio sólo admite cierta presurización: la cabina equivale a unos 2.400 metros de altitud, con una humedad que en tramos largos baja del 10% — más seco que muchos desiertos. Menos oxígeno en sangre, deshidratación, dolor de cabeza, un jet lag más largo." },
  { type: "p", text: "Un fuselaje de material compuesto — el Boeing 787 y el Airbus A350 — soporta mayores diferenciales de presión y no se corroe. El resultado: una cabina equivalente a unos 1.800 metros, humedad del 15–20%, menos ruido, mejor filtrado del aire y sistemas que amortiguan la turbulencia antes de que usted la sienta. Diez horas después, la diferencia se siente en el cuerpo." },
  { type: "p", text: "Esta variable no aparece en ningún buscador ni en ningún comparador de precios. En la misma ruta, el mismo día, en la misma clase y con la misma tarifa, el avión puede ser una máquina completamente distinta según el número de vuelo." },
  { type: "p", text: "También asesoramos sobre esto: qué avión opera realmente, configuración de cabina, ubicación del asiento, horario de salida y estructura de conexiones en relación con su huso horario y con lo que tiene que hacer al llegar." },
  { type: "p", text: "Porque el viaje no termina cuando aterriza. Termina cuando usted puede hacer aquello por lo que viajó.", italic: true },

  { type: "h2", text: "Que su dinero rinda" },
  { type: "p", text: "Desde el primer viaje. Acceso a tarifas competitivas con una amplia gama de aerolíneas y destinos." },
  { type: "p", text: "Si vuela seguido. Cuando ciertas aerolíneas y rutas se repiten en su patrón de viaje, negociamos acuerdos dedicados construidos sobre sus flujos reales." },
  { type: "p", text: "Si es una pyme sin volumen. Gestionamos su inscripción en los programas corporativos de las aerolíneas: esquemas que acumulan un crédito en cada vuelo, canjeable contra boletos futuros. La inscripción no anula la acumulación individual de viajero frecuente — las dos corren en paralelo." },
  { type: "p", text: "Sobre los programas de viajero frecuente. También lo acompañamos aquí: acumular más rápido donde es posible, y convertir los puntos en boletos premio efectivamente reservables — la etapa donde la mayoría se rinde." },

  { type: "h2", text: "No sólo para negocios" },
  { type: "p", text: "El mismo compromiso vale para los viajes de placer. Y no sólo en el aire: tenemos tarifas negociadas y confidenciales con hoteles y rentadoras de autos, y podemos identificar la cobertura de seguro con la mejor relación entre costo y protección real para su próximo viaje." },

  { type: "h2", text: "Siempre hay una persona a cargo" },
  { type: "p", text: "Hay alguien con nombre y apellido en su expediente. Siempre." },
  { type: "p", text: "Estamos equipando a nuestros consultores con IVA — Intelligent Vacation Assistant: no un reemplazo, sino un exoesqueleto que amplía la capacidad de las personas que gestionan su reserva. Human in the loop: la tecnología trabaja detrás de escena, el criterio y la relación quedan en manos de quien le responde." },

  { type: "h2", text: "Pruébenos, sin compromiso" },
  { type: "p", text: "Complete el formulario para poner el servicio a prueba. Nada lo obliga a nada." },
  { type: "p", text: "La información que pedimos puede parecer mucha. Es exactamente la que necesitamos — y nada más — para acercarle la solución correcta en la primera propuesta: lo que usted quiere, pero también aquello a lo que tiene derecho según nacionalidad, residencia y documentos. Es el primer paso hacia un viaje realmente sin fricciones." },
];

export default function Voli() {
  useCanonical("/voli", {
    title: "Vuelos y gestión de viajes — Calliphora Travel",
    description:
      "Tarifas aéreas negociadas y confidenciales, hoteles, traslados, alquiler de autos y asistencia proactiva en viaje. Agencia italiana habilitada desde 2004.",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="theme-calliphora min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="https://www.calliphora.travel" className="flex items-center" aria-label="Calliphora Travel">
            <img src={CALLIPHORA_LOGO} alt="Calliphora Travel" className="h-10 w-auto" />
          </a>
          <Button asChild size="sm" className="rounded-full">
            <Link to="/formfly">
              Solicitar cotización
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-3xl pt-28 md:pt-36 pb-16 md:pb-24">
        <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-3">
          Calliphora Travel
        </span>
        <h1 className="text-4xl md:text-5xl leading-tight mb-6">Vuelos y gestión de viajes</h1>
        <article className="space-y-6">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="text-2xl md:text-3xl mt-10 mb-2 text-foreground">
                {b.text}
              </h2>
            ) : (
              <p
                key={i}
                className={`text-base md:text-lg leading-relaxed text-muted-foreground text-justify${b.italic ? " italic" : ""}`}
              >
                {b.text}
              </p>
            ),
          )}
        </article>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/formfly">
              Solicitar cotización
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <BeforeYouProceed lang="es" className="mt-10" />

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground text-center space-y-1">
          <p>Calliphora Travel — marca de Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Italia</p>
          <p>IVA IT01416950051 · Licencia n.º 2/08 (Municipio de Asti) · REA AT-113765</p>
        </footer>
      </main>
    </div>
  );
}
