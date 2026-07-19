import { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  placeholder?: string;
  fromYear?: number;
  toYear?: number;
  className?: string;
};

// Accepts typing (dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd) and picking from calendar.
export function DateInputPicker({
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
  fromYear,
  toYear,
  className,
}: Props) {
  const [text, setText] = useState<string>(value ? format(value, "dd/MM/yyyy") : "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setText(value ? format(value, "dd/MM/yyyy") : "");
  }, [value]);

  const tryParse = (raw: string) => {
    const s = raw.trim();
    if (!s) return { ok: true, date: undefined as Date | undefined };
    const patterns = ["dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "yyyy-MM-dd", "dd.MM.yyyy"];
    for (const p of patterns) {
      const d = parse(s, p, new Date());
      if (isValid(d)) return { ok: true, date: d };
    }
    return { ok: false, date: undefined };
  };

  const commit = () => {
    const { ok, date } = tryParse(text);
    if (ok) onChange(date);
    else if (value) setText(format(value, "dd/MM/yyyy"));
    else setText("");
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Input
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
        }}
        inputMode="numeric"
        className="flex-1"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" size="icon" aria-label="Open calendar">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 pointer-events-auto" align="end">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange(d ?? undefined);
              setOpen(false);
            }}
            defaultMonth={value ?? (toYear ? new Date(toYear, 0, 1) : undefined)}
            captionLayout={fromYear || toYear ? "dropdown-buttons" : undefined}
            fromYear={fromYear}
            toYear={toYear}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}