import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
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
import { COUNTRIES } from "@/lib/countries";

type Props = {
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
  emptyLabel?: string;
  searchLabel?: string;
  ariaLabel?: string;
  allowClear?: boolean;
  clearLabel?: string;
};

export function CountryCombobox({
  value,
  onChange,
  placeholder = "Country",
  emptyLabel = "No results",
  searchLabel = "Search country…",
  ariaLabel,
  allowClear = false,
  clearLabel = "— None —",
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => COUNTRIES.find((c) => c.code === value), [value]);

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
            <Globe className="h-4 w-4 shrink-0 opacity-60" />
            {selected ? (
              <span className="truncate">
                <span className="font-semibold">{selected.code}</span>{" "}
                <span className="text-muted-foreground">— {selected.name}</span>
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
              {allowClear && (
                <CommandItem
                  value="__clear__"
                  onSelect={() => {
                    onChange("");
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", !value ? "opacity-100" : "opacity-0")} />
                  <span className="text-muted-foreground italic">{clearLabel}</span>
                </CommandItem>
              )}
              {COUNTRIES.map((c) => {
                const itemValue = `${c.code} ${c.name}`;
                return (
                  <CommandItem
                    key={c.code}
                    value={itemValue}
                    onSelect={() => {
                      onChange(c.code);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === c.code ? "opacity-100" : "opacity-0")} />
                    <span className="font-semibold w-10">{c.code}</span>
                    <span className="text-muted-foreground truncate">{c.name}</span>
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