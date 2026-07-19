import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AIRPORTS } from "@/lib/airports";

function AirportMap({
  lat,
  lon,
  name,
}: {
  lat: number;
  lon: number;
  name: string;
}) {
  const mapRef = (node: HTMLDivElement | null) => {
    if (!node) return;
    const map = L.map(node).setView([lat, lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(name)
      .openPopup();
    return () => {
      map.remove();
    };
  };

  return <div ref={mapRef} className="h-[300px] w-full rounded-md" />;
}

export function AirportMapDialog({
  code,
  label,
}: {
  code?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const airport = useMemo(() => AIRPORTS.find((a) => a.code === code), [code]);
  const hasCoords = !!airport?.lat && !!airport?.lon;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0"
          disabled={!hasCoords}
          aria-label={label || "View on map"}
          title={label || "View on map"}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {hasCoords && airport && (
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {airport.code} — {airport.city || airport.name}
            </DialogTitle>
          </DialogHeader>
          {open && (
            <AirportMap
              lat={airport.lat!}
              lon={airport.lon!}
              name={airport.name}
            />
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
