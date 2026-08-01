import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanonical } from "@/lib/useCanonical";
import { BeforeYouProceed } from "@/components/BeforeYouProceed";
import { CALLIPHORA_LOGO, type UILang } from "@/pages/Fly";
import { UILangSwitcher } from "@/components/UILangSwitcher";
import { useState } from "react";


type Block = { type: "h2"; text: string } | { type: "p"; text: string; italic?: boolean };

const blocksIt: Block[] = [
  { type: "h2", text: "Servizio di Biglietteria Aerea" },
  { type: "p", text: "Non vi offriamo un biglietto per volare da A a B: vi offriamo un'esperienza di viaggio senza attriti, prima, durante e dopo. È la nostra filosofia dal 2004, anno in cui è nato il marchio Calliphora — allora sotto altra ragione sociale, dal 2008 con l'attuale CAVALLINODIECI S.r.l. — e da allora operiamo nell'organizzazione e intermediazione di viaggi e nella biglietteria aerea con le regolari autorizzazioni di legge.", italic: true },
  { type: "p", text: "Il nostro è un desk unico, che vi segue dalla prima richiesta al ritorno a casa: biglietteria aerea, sistemazioni alberghiere, noleggio auto, trasferimenti, coperture assicurative." },

  { type: "h2", text: "Tariffe negoziate e confidenziali" },
  { type: "p", text: "Vent'anni di rapporti con i vettori si traducono in qualcosa di molto concreto: l'accesso a tariffe negoziate e confidenziali. Il nome dice già tutto: per definizione non possono essere pubblicate. Non le trovate sulle OTA — le Online Travel Agency, i grandi portali di prenotazione su cui si confrontano i prezzi — non le trovate sugli IBT, gli Internet Booking Tool con cui molte aziende prenotano in autonomia, e non le trovate nemmeno sui siti delle compagnie aeree." },
  { type: "p", text: "Il vantaggio più immediato è il prezzo, spesso molto competitivo rispetto alle tariffe pubbliche. Ma non è l'unico: le tariffe VFR (Visiting Friends and Relatives), per esempio, accanto a un prezzo più basso prevedono in genere una franchigia bagaglio più generosa e regole di cambio più flessibili." },

  { type: "h2", text: "Non vi vendiamo un biglietto. Vi costruiamo un viaggio senza attriti." },
  { type: "p", text: "Il nostro lavoro non finisce con l'emissione: comincia prima e si chiude quando siete rientrati a casa." },
  { type: "p", text: "Prima della partenza anticipiamo tutto ciò che può compromettere la serenità del viaggio: documenti e requisiti d'ingresso, tempi minimi di connessione, coincidenze fragili, regole bagaglio, coperture assicurative adeguate al percorso." },
  { type: "p", text: "Durante il viaggio gestiamo in modo proattivo gli imprevisti — cancellazioni, overbooking, riprotezioni: quello che in gergo si chiama IROPS, irregular operations — per ridurre al minimo il disagio. Non aspettiamo che ci chiamiate dall'aeroporto." },

  { type: "h2", text: "Non tutti gli aerei vi trattano allo stesso modo" },
  { type: "p", text: "Potete volare in Business class, sulla poltrona più confortevole disponibile sul mercato, e scendere comunque a destinazione sentendovi uno straccio. Spesso non è colpa della poltrona. È la fusoliera." },
  { type: "p", text: "Un aereo con fusoliera in alluminio non può essere pressurizzato oltre un certo limite: la cabina viaggia a un'altitudine equivalente di circa 2.400 metri, con un'umidità che sulle lunghe percorrenze scende spesso sotto il 10% — più secca di molti deserti. Il risultato: meno ossigeno nel sangue, disidratazione, mal di testa, jet lag più lungo." },
  { type: "p", text: "Una fusoliera in materiale composito — è il caso di Boeing 787 e Airbus A350 — regge pressioni maggiori e non teme la corrosione. Risultato: cabina equivalente a circa 1.800 metri, umidità fino al 15-20%, rumorosità inferiore, filtrazione dell'aria migliore e sistemi che attenuano le turbolenze prima che le sentiate. Sullo stesso volo di dieci ore, la differenza allo sbarco è tangibile." },
  { type: "p", text: "Il punto è che questa variabile non compare in nessun motore di ricerca e non entra in nessun confronto di prezzo. Sulla stessa rotta, nello stesso giorno, con la stessa classe di servizio e a parità di tariffa, potete trovare macchine completamente diverse a seconda del numero di volo." },
  { type: "p", text: "Noi vi sappiamo consigliare anche su questo: tipo di aeromobile effettivamente operato, configurazione della cabina, posizione della poltrona, orario di partenza e struttura delle coincidenze rispetto al vostro fuso e ai vostri impegni all'arrivo." },
  { type: "p", text: "Perché il viaggio non finisce quando atterrate. Finisce quando siete in grado di fare quello per cui siete partiti.", italic: true },

  { type: "h2", text: "Il valore del denaro che spendete" },
  { type: "p", text: "Da subito. Vi apriamo l'accesso a tariffe competitive con molti vettori e verso molte destinazioni nel mondo." },
  { type: "p", text: "Se volate molto. Quando nei vostri spostamenti emergono compagnie e rotte ricorrenti, negoziamo per voi accordi dedicati sui vostri flussi reali." },
  { type: "p", text: "Se siete una PMI senza grandi volumi. Gestiamo la vostra iscrizione ai programmi aziendali delle compagnie: programmi che maturano un credito a ogni volo, riutilizzabile per l'acquisto di altri biglietti. La partecipazione non esclude l'accumulo di punti sui frequent flyer individuali: i due binari corrono in parallelo." },
  { type: "p", text: "Sui frequent flyer. Vi affianchiamo anche qui, per accumulare più in fretta dove è possibile e per trasformare i punti in viaggi premio effettivamente prenotabili — che è la parte in cui la maggior parte dei viaggiatori si arrende." },

  { type: "h2", text: "Anche quando non viaggiate per lavoro" },
  { type: "p", text: "Lo stesso impegno e la stessa esperienza valgono per i viaggi di piacere. E non solo sul volo: disponiamo di tariffe negoziate e confidenziali anche con hotel e autonoleggi, e sappiamo individuare le coperture assicurative con il miglior rapporto tra costo e protezione effettiva per il vostro prossimo viaggio." },

  { type: "h2", text: "L'operatore umano resta al centro" },
  { type: "p", text: "Al centro del servizio c'è una persona. Sempre." },
  { type: "p", text: "Ai nostri operatori stiamo affiancando IVA — Intelligent Vacation Assistant, che potete vedere all'opera nel video in questa pagina: non un sostituto, ma una sorta di esoscheletro che amplifica le capacità di chi lavora sulla vostra pratica. Human in the loop: la tecnologia lavora dietro le quinte, la responsabilità e la relazione restano di chi vi risponde." },

  { type: "h2", text: "Provateci, senza impegno" },
  { type: "p", text: "Compilate il modulo qui sotto per mettere alla prova il servizio: nessun vincolo da parte vostra." },
  { type: "p", text: "Le informazioni richieste possono sembrare molte. In realtà sono esattamente quelle che ci servono — e nulla di più — per costruire la soluzione migliore già alla prima proposta: cosa desiderate, ma anche cosa potete ottenere in base a cittadinanza, residenza e documenti. È il primo passo per rendere il vostro viaggio il più possibile frictionless." },
];


const blocksEs: Block[] = [
  { type: "h2", text: "Servicio de Emisión de Pasajes Aéreos" },
  { type: "p", text: "No le vendemos un pasaje para volar del punto A al punto B: le ofrecemos una experiencia de viaje sin fricciones — antes, durante y después. Esta es nuestra filosofía desde 2004, año en que nació la marca Calliphora — al principio bajo otra razón social y, desde 2008, bajo la actual CAVALLINODIECI S.r.l. — y, desde entonces, operamos en la organización e intermediación de viajes y en la emisión de pasajes aéreos con todas las autorizaciones legales exigidas.", italic: true },
  { type: "p", text: "Somos una ventanilla única, que lo acompaña desde la primera solicitud hasta el regreso a casa: pasajes aéreos, alojamiento, alquiler de autos, traslados, seguros de viaje." },

  { type: "h2", text: "Tarifas negociadas y confidenciales" },
  { type: "p", text: "Más de veinte años de relación con las aerolíneas se traducen en algo muy concreto: el acceso a tarifas negociadas y confidenciales. El nombre lo dice todo: por definición, no pueden publicarse. No las encuentra en las OTA — las Online Travel Agencies, los grandes portales de reserva donde se comparan precios —, no las encuentra en los IBT, los Internet Booking Tools con los que muchas empresas reservan por su cuenta, y tampoco las encuentra en los sitios web de las propias aerolíneas." },
  { type: "p", text: "La ventaja más inmediata es el precio, muchas veces muy competitivo frente a las tarifas públicas. Pero no es la única: las tarifas VFR (Visiting Friends and Relatives), por ejemplo, además de un precio más bajo, suelen ofrecer una franquicia de equipaje más generosa y reglas de cambio de fecha más flexibles." },

  { type: "h2", text: "No le vendemos un pasaje. Le construimos un viaje sin fricciones." },
  { type: "p", text: "Nuestro trabajo no termina con la emisión: empieza antes y se cierra recién cuando usted está de vuelta en casa." },
  { type: "p", text: "Antes de la partida, anticipamos todo lo que puede comprometer la tranquilidad del viaje: documentos y requisitos de ingreso, tiempos mínimos de conexión, conexiones riesgosas, reglas de equipaje, seguros adecuados a su itinerario." },
  { type: "p", text: "Durante el viaje, gestionamos los imprevistos de manera proactiva — cancelaciones, sobreventa, reprotecciones: lo que en la jerga del sector se llama IROPS, irregular operations — para reducir al mínimo las molestias. No esperamos a que nos llame desde el aeropuerto." },

  { type: "h2", text: "No todos los aviones lo tratan igual" },
  { type: "p", text: "Usted puede volar en clase ejecutiva, en el asiento más cómodo del mercado, y aun así bajar en destino hecho un trapo. Muchas veces la culpa no es del asiento. Es del fuselaje." },
  { type: "p", text: "Un avión con fuselaje de aluminio no puede presurizarse más allá de cierto límite: la cabina vuela a una altitud equivalente de unos 2.400 metros, con una humedad que en los vuelos de larga distancia baja con frecuencia del 10% — más seco que muchos desiertos. El resultado: menos oxígeno en la sangre, deshidratación, dolor de cabeza, un jet lag más largo." },
  { type: "p", text: "Un fuselaje de material compuesto — es el caso del Boeing 787 y del Airbus A350 — soporta presiones mayores y no sufre corrosión. El resultado: una cabina equivalente a unos 1.800 metros, humedad que puede llegar al 15–20%, menos ruido, mejor filtrado del aire y sistemas que atenúan las turbulencias antes de que usted las sienta. En el mismo vuelo de diez horas, la diferencia al desembarcar es palpable." },
  { type: "p", text: "La cuestión es que esta variable no aparece en ningún buscador y no entra en ninguna comparación de precios. En la misma ruta, el mismo día, en la misma clase de servicio y con la misma tarifa, puede encontrar aeronaves completamente distintas según el número de vuelo." },
  { type: "p", text: "Nosotros sabemos asesorarlo también en esto: el tipo de aeronave efectivamente operado, la configuración de la cabina, la posición del asiento, el horario de salida y la estructura de las conexiones en relación con su huso horario y sus compromisos a la llegada." },
  { type: "p", text: "Porque el viaje no termina cuando usted aterriza. Termina cuando está en condiciones de hacer aquello para lo que viajó.", italic: true },

  { type: "h2", text: "El valor del dinero que gasta" },
  { type: "p", text: "Desde el primer día. Le abrimos el acceso a tarifas competitivas con muchas aerolíneas y hacia muchos destinos del mundo." },
  { type: "p", text: "Si vuela mucho. Cuando en sus desplazamientos aparecen aerolíneas y rutas recurrentes, negociamos para usted acuerdos dedicados, sobre la base de sus flujos reales." },
  { type: "p", text: "Si es una pyme sin grandes volúmenes. Gestionamos su adhesión a los programas corporativos de las aerolíneas: programas que generan un crédito con cada vuelo, reutilizable en la compra de otros pasajes. La participación no excluye la acumulación de puntos en los programas de viajero frecuente individuales: las dos vías corren en paralelo." },
  { type: "p", text: "En los programas de viajero frecuente. También aquí lo acompañamos — para acumular más rápido donde sea posible y transformar los puntos en pasajes de premio que realmente se puedan reservar, que es la parte en la que la mayoría de los viajeros se rinde." },

  { type: "h2", text: "También cuando no viaja por trabajo" },
  { type: "p", text: "El mismo compromiso y la misma experiencia valen para los viajes de placer. Y no solo en el vuelo: disponemos de tarifas negociadas y confidenciales también con hoteles y empresas de alquiler de autos, y sabemos identificar los seguros con la mejor relación entre costo y protección efectiva para su próximo viaje." },

  { type: "h2", text: "El operador humano sigue en el centro" },
  { type: "p", text: "En el centro del servicio hay una persona. Siempre." },
  { type: "p", text: "Estamos incorporando junto a nuestros operadores a nuestro asistente inteligente IVA — Intelligent Vacation Assistant (sí, como el impuesto, pero este trabaja para usted) —, que puede ver en acción en el video de esta página: no un sustituto, sino una especie de exoesqueleto que amplifica las capacidades de quien atiende su caso. Human in the loop: la tecnología trabaja tras bambalinas; la responsabilidad y la relación siguen siendo de quien le responde." },

  { type: "h2", text: "Pruébenos, sin compromiso" },
  { type: "p", text: "Complete el formulario de abajo para poner el servicio a prueba: ninguna obligación de su parte." },
  { type: "p", text: "La información solicitada puede parecer mucha. En realidad, es exactamente la que necesitamos — y nada más — para construir la mejor solución ya en la primera propuesta: qué desea, pero también qué puede obtener según su ciudadanía, residencia y documentos. Es el primer paso para hacer que su viaje sea lo más libre de fricciones posible." },
];

const blocksEn: Block[] = [
  { type: "h2", text: "Air Ticketing Service" },
  { type: "p", text: "We don't sell you a ticket to fly from A to B: we offer a frictionless travel experience — before, during and after your trip. This has been our philosophy since 2004, the year the Calliphora brand was born — under a different corporate name at first, and since 2008 under the current CAVALLINODIECI S.r.l. — and ever since, we have operated in travel organization and intermediation and in air ticketing with all the required legal authorizations.", italic: true },
  { type: "p", text: "We are a single desk that follows you from your first request to your return home: air ticketing, hotel accommodation, car rental, transfers, insurance coverage." },

  { type: "h2", text: "Negotiated, confidential fares" },
  { type: "p", text: "Twenty years of relationships with carriers translate into something very concrete: access to negotiated, confidential fares. The name says it all: by definition, they cannot be published. You won't find them on OTAs — the Online Travel Agencies, the big booking portals where prices are compared — you won't find them on IBTs, the Internet Booking Tools many companies use to book on their own, and you won't find them on the airlines' own websites either." },
  { type: "p", text: "The most immediate advantage is the price, often highly competitive compared with published fares. But it's not the only one: VFR fares (Visiting Friends and Relatives), for instance, typically combine a lower price with a more generous baggage allowance and more flexible change rules." },

  { type: "h2", text: "We don't sell you a ticket. We build you a frictionless journey." },
  { type: "p", text: "Our work doesn't end with ticket issuance: it starts earlier and closes only when you're back home." },
  { type: "p", text: "Before departure, we anticipate everything that could compromise the peace of mind of your trip: documents and entry requirements, minimum connection times, fragile connections, baggage rules, insurance coverage suited to your itinerary." },
  { type: "p", text: "During the trip, we proactively manage disruptions — cancellations, overbooking, rebooking: what the industry calls IROPS, irregular operations — to keep your inconvenience to a minimum. We don't wait for you to call us from the airport." },

  { type: "h2", text: "Not all aircraft treat you the same way" },
  { type: "p", text: "You can fly Business class, in the most comfortable seat on the market, and still arrive at your destination feeling like a wreck. Often it's not the seat's fault. It's the fuselage." },
  { type: "p", text: "An aircraft with an aluminium fuselage cannot be pressurized beyond a certain limit: the cabin flies at an equivalent altitude of about 2,400 metres, with humidity that on long-haul routes often drops below 10% — drier than many deserts. The result: less oxygen in your blood, dehydration, headaches, longer jet lag." },
  { type: "p", text: "A composite fuselage — as on the Boeing 787 and Airbus A350 — withstands higher pressures and doesn't fear corrosion. The result: a cabin equivalent to about 1,800 metres, humidity of up to 15–20%, lower noise, better air filtration, and systems that dampen turbulence before you feel it. On the same ten-hour flight, the difference when you disembark is tangible." },
  { type: "p", text: "The point is that this variable doesn't appear in any search engine and never enters any price comparison. On the same route, on the same day, in the same class of service and at the same fare, you can find completely different machines depending on the flight number." },
  { type: "p", text: "We can advise you on this too: the aircraft type actually operated, cabin configuration, seat position, departure time, and the structure of your connections relative to your time zone and your commitments on arrival." },
  { type: "p", text: "Because the journey doesn't end when you land. It ends when you're able to do what you travelled for.", italic: true },

  { type: "h2", text: "The value of the money you spend" },
  { type: "p", text: "From day one. We open access to competitive fares with many carriers and to many destinations worldwide." },
  { type: "p", text: "If you fly a lot. When recurring airlines and routes emerge in your travel patterns, we negotiate dedicated agreements for you, based on your actual flows." },
  { type: "p", text: "If you're an SME without large volumes. We manage your enrolment in the airlines' corporate programmes: schemes that earn a credit on every flight, which you can reuse to purchase further tickets. Participation doesn't exclude earning points on individual frequent-flyer accounts: the two tracks run in parallel." },
  { type: "p", text: "On frequent-flyer programmes. We support you here as well — helping you accrue faster where possible and turn points into award trips that are actually bookable, which is where most travellers give up." },

  { type: "h2", text: "Even when you're not travelling for business" },
  { type: "p", text: "The same commitment and the same experience apply to leisure travel. And not just on the flight: we also hold negotiated, confidential rates with hotels and car rental companies, and we know how to identify the insurance coverage with the best ratio of cost to actual protection for your next trip." },

  { type: "h2", text: "The human operator stays at the centre" },
  { type: "p", text: "At the centre of the service there is a person. Always." },
  { type: "p", text: "Alongside our operators, we are introducing IVA — the Intelligent Vacation Assistant, which you can see at work in the video on this page: not a replacement, but a kind of exoskeleton that amplifies the capabilities of the person handling your file. Human in the loop: the technology works behind the scenes; the responsibility and the relationship remain with the person who answers you." },

  { type: "h2", text: "Try us, with no commitment" },
  { type: "p", text: "Fill in the form below to put the service to the test: no obligation on your part." },
  { type: "p", text: "The information requested may seem like a lot. In fact, it is exactly what we need — and nothing more — to build the best solution with our very first proposal: what you want, but also what you can obtain based on citizenship, residency and documents. It's the first step towards making your trip as frictionless as possible." },
];

const blocksPt: Block[] = [
  { type: "h2", text: "Serviço de Passagens Aéreas" },
  { type: "p", text: "Não vendemos uma passagem para voar do ponto A ao ponto B: oferecemos uma experiência de viagem sem atritos — antes, durante e depois. Essa é a nossa filosofia desde 2004, ano em que nasceu a marca Calliphora — no início sob outra razão social e, desde 2008, sob a atual CAVALLINODIECI S.r.l. — e, desde então, atuamos na organização e intermediação de viagens e na emissão de passagens aéreas com todas as autorizações legais exigidas.", italic: true },
  { type: "p", text: "Somos um ponto único de contato, que acompanha você do primeiro pedido até a volta para casa: passagens aéreas, hospedagem, aluguel de carro, traslados, seguros de viagem." },

  { type: "h2", text: "Tarifas negociadas e confidenciais" },
  { type: "p", text: "Mais de vinte anos de relacionamento com as companhias aéreas se traduzem em algo muito concreto: o acesso a tarifas negociadas e confidenciais. O nome já diz tudo: por definição, elas não podem ser publicadas. Você não as encontra nas OTAs — as Online Travel Agencies, os grandes portais de reserva onde se comparam preços —, não as encontra nos IBTs, os Internet Booking Tools com que muitas empresas reservam por conta própria, e não as encontra nem mesmo nos sites das companhias aéreas." },
  { type: "p", text: "A vantagem mais imediata é o preço, muitas vezes bem competitivo em relação às tarifas públicas. Mas não é a única: as tarifas VFR (Visiting Friends and Relatives), por exemplo, além de um preço mais baixo, costumam oferecer franquia de bagagem mais generosa e regras de remarcação mais flexíveis." },

  { type: "h2", text: "Não vendemos uma passagem. Construímos uma viagem sem atritos." },
  { type: "p", text: "Nosso trabalho não termina com a emissão: começa antes e só se encerra quando você está de volta em casa." },
  { type: "p", text: "Antes da partida, antecipamos tudo o que pode comprometer a tranquilidade da viagem: documentos e requisitos de entrada, tempos mínimos de conexão, conexões arriscadas, regras de bagagem, seguros adequados ao seu roteiro." },
  { type: "p", text: "Durante a viagem, gerenciamos os imprevistos de forma proativa — cancelamentos, overbooking, reacomodações: o que no jargão do setor se chama IROPS, irregular operations — para reduzir ao mínimo o seu transtorno. Não esperamos você nos ligar do aeroporto." },

  { type: "h2", text: "Nem todos os aviões tratam você da mesma forma" },
  { type: "p", text: "Você pode voar na classe executiva, na poltrona mais confortável do mercado, e mesmo assim desembarcar no destino se sentindo um caco. Muitas vezes a culpa não é da poltrona. É da fuselagem." },
  { type: "p", text: "Um avião com fuselagem de alumínio não pode ser pressurizado além de certo limite: a cabine voa a uma altitude equivalente de cerca de 2.400 metros, com umidade que, nos voos de longa distância, cai com frequência abaixo de 10% — mais seco que muitos desertos. O resultado: menos oxigênio no sangue, desidratação, dor de cabeça, jet lag mais longo." },
  { type: "p", text: "Uma fuselagem de material composto — é o caso do Boeing 787 e do Airbus A350 — suporta pressões maiores e não sofre com corrosão. O resultado: cabine equivalente a cerca de 1.800 metros, umidade que pode chegar a 15–20%, menos ruído, melhor filtragem do ar e sistemas que atenuam as turbulências antes que você as sinta. No mesmo voo de dez horas, a diferença no desembarque é palpável." },
  { type: "p", text: "A questão é que essa variável não aparece em nenhum buscador e não entra em nenhuma comparação de preços. Na mesma rota, no mesmo dia, na mesma classe de serviço e com a mesma tarifa, você pode encontrar aeronaves completamente diferentes dependendo do número do voo." },
  { type: "p", text: "Nós sabemos orientar você também nisso: o tipo de aeronave efetivamente operado, a configuração da cabine, a posição da poltrona, o horário de partida e a estrutura das conexões em relação ao seu fuso horário e aos seus compromissos na chegada." },
  { type: "p", text: "Porque a viagem não termina quando você pousa. Termina quando você está em condições de fazer aquilo para que viajou.", italic: true },

  { type: "h2", text: "O valor do dinheiro que você gasta" },
  { type: "p", text: "Desde o primeiro pedido. Abrimos para você o acesso a tarifas competitivas com muitas companhias e para muitos destinos no mundo." },
  { type: "p", text: "Se você voa muito. Quando companhias e rotas recorrentes aparecem nos seus deslocamentos, negociamos para você acordos dedicados, com base nos seus fluxos reais." },
  { type: "p", text: "Se você é uma PME sem grandes volumes. Cuidamos da sua adesão aos programas corporativos das companhias aéreas: programas que geram um crédito a cada voo, reutilizável na compra de outras passagens. A participação não exclui o acúmulo de pontos nos programas de fidelidade individuais: os dois trilhos correm em paralelo." },
  { type: "p", text: "Nos programas de fidelidade. Também aqui estamos ao seu lado — para acumular mais rápido onde for possível e transformar os pontos em passagens-prêmio que possam de fato ser reservadas, que é a parte em que a maioria dos viajantes desiste." },

  { type: "h2", text: "Mesmo quando você não viaja a trabalho" },
  { type: "p", text: "O mesmo empenho e a mesma experiência valem para as viagens de lazer. E não só no voo: dispomos de tarifas negociadas e confidenciais também com hotéis e locadoras de veículos, e sabemos identificar os seguros com a melhor relação entre custo e proteção efetiva para a sua próxima viagem." },

  { type: "h2", text: "O operador humano permanece no centro" },
  { type: "p", text: "No centro do serviço há uma pessoa. Sempre." },
  { type: "p", text: "Estamos colocando ao lado dos nossos operadores o IVA — Intelligent Vacation Assistant, que você pode ver em ação no vídeo desta página: não um substituto, mas uma espécie de exoesqueleto que amplifica as capacidades de quem cuida do seu atendimento. Human in the loop: a tecnologia trabalha nos bastidores; a responsabilidade e o relacionamento continuam com quem responde a você." },

  { type: "h2", text: "Experimente, sem compromisso" },
  { type: "p", text: "Preencha o formulário abaixo para colocar o serviço à prova: sem nenhum compromisso da sua parte." },
  { type: "p", text: "As informações solicitadas podem parecer muitas. Na verdade, são exatamente as que precisamos — e nada mais — para construir a melhor solução já na primeira proposta: o que você deseja, mas também aquilo a que você tem direito com base em cidadania, residência e documentos. É o primeiro passo para tornar a sua viagem a mais livre de atritos possível." },
];


const footer: Record<UILang, { line1: string; line2: string }> = {
  es: {
    line1: "Calliphora Travel — marca de Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Italia",
    line2: "IVA (VAT) IT01416950051 · Licencia n.º 2/08 (Municipio de Asti) · REA AT-113765",
  },
  it: {
    line1: "Calliphora Travel — marchio di Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Italia",
    line2: "P.IVA IT01416950051 · Licenza n. 2/08 (Comune di Asti) · REA AT-113765",
  },
  en: {
    line1: "Calliphora Travel — a brand of Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Italy",
    line2: "VAT IT01416950051 · Licence no. 2/08 (Municipality of Asti) · REA AT-113765",
  },
  pt: {
    line1: "Calliphora Travel — marca da Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Itália · CNPJ não aplicável — empresa italiana",
    line2: "VAT IT01416950051 · Licença n.º 2/08 (Município de Asti) · REA AT-113765",
  },
};

const ui: Record<UILang, { h1: string; cta: string }> = {
  es: { h1: "Servicio de Emisión de Pasajes Aéreos", cta: "Solicitar cotización" },
  it: { h1: "Servizio di Biglietteria Aerea", cta: "Richiedi un preventivo" },
  en: { h1: "Air Ticketing Service", cta: "Request a quote" },
  pt: { h1: "Serviço de Bilheteria Aérea", cta: "Solicitar uma cotação" },
};

const blocksByLang: Record<UILang, Block[]> = {
  es: blocksEs,
  it: blocksIt as Block[],
  en: blocksEn as Block[],
  pt: blocksPt as Block[],
};

export default function Voli() {
  useCanonical("/voli", {
    title: "Vuelos y gestión de viajes — Calliphora Travel",
    description:
      "Tarifas aéreas negociadas y confidenciales, hoteles, traslados, alquiler de autos y asistencia proactiva en viaje. Agencia italiana habilitada desde 2004.",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [lang, setLang] = useState<UILang>("es");
  const t = ui[lang];
  const blocks = blocksByLang[lang];

  return (
    <div className="theme-calliphora min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="https://www.calliphora.travel" className="flex items-center" aria-label="Calliphora Travel">
            <img src={CALLIPHORA_LOGO} alt="Calliphora Travel" className="h-10 w-auto" />
          </a>
          <div className="flex items-center gap-3">
          <UILangSwitcher value={lang} onChange={setLang} />
          <Button asChild size="sm" className="rounded-full">
            <Link to={`/formfly?lang=${lang}`}>
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl pt-28 md:pt-36 pb-16 md:pb-24">
        <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-3">
          Calliphora Travel
        </span>
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
            <Link to={`/formfly?lang=${lang}`}>
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <BeforeYouProceed lang={lang} className="mt-10" />

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground text-center space-y-1">
          <p>{footer[lang].line1}</p>
          <p>{footer[lang].line2}</p>
        </footer>
      </main>
    </div>
  );
}
