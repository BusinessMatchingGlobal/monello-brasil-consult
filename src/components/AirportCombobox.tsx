import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AIRPORTS } from "@/lib/airports";

type Props = {
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
  emptyLabel?: string;
  searchLabel?: string;
  ariaLabel?: string;
};

export function AirportCombobox({
  value,
  onChange,
  placeholder = "Aeroporto",
  emptyLabel = "Nessun risultato",
  searchLabel = "Cerca codice o città…",
  ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => AIRPORTS.find((a) => a.code === value), [value]);

  const normalize = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const formatLabel = (a: typeof AIRPORTS[number]) => {
    if (a.city && a.uf) return `${a.city} (${a.uf}) — ${a.name}`;
    if (a.city && a.country) return `${a.city} (${a.country}) — ${a.name}`;
    return a.name;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel ?? placeholder}
          className="w-full justify-between font-normal"
        >
          <span className="flex items-center gap-2 truncate">
            <Plane className="h-4 w-4 shrink-0 opacity-60" />
            {selected ? (
              <span className="truncate">
                <span className="font-semibold">{selected.code}</span>{" "}
                <span className="text-muted-foreground">— {formatLabel(selected)}</span>
              </span>
            ) : (
              <span className="text-muted-foreground truncate">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 pointer-events-auto" align="start">
        <Command
          filter={(itemValue, search) => {
            if (!search) return 1;
            return itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
          }}
        >
          <CommandInput placeholder={searchLabel} />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {AIRPORTS.map((a) => {
                const itemValue = `${a.code} ${a.name} ${a.city ?? ""} ${a.uf ?? ""} ${a.country ?? ""}`;
                const region = a.uf || a.country;
                return (
                  <CommandItem
                    key={a.code}
                    value={itemValue}
                    onSelect={() => {
                      onChange(a.code);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === a.code ? "opacity-100" : "opacity-0")} />
                    <span className="font-semibold w-12 shrink-0">{a.code}</span>
                    {a.city && region ? (
                      <span className="truncate">
                        <span className="font-medium">{a.city}</span>{" "}
                        <span className="text-muted-foreground">({region})</span>{" "}
                        <span className="text-muted-foreground">— {a.name}</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground truncate">{a.name}</span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
