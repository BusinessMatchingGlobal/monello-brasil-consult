import { useEffect, useState } from "react";
import { format, isValid, parse, startOfDay } from "date-fns";
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
  minDate?: Date;
  maxDate?: Date;
};

// Accepts typing (dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd) and picking from calendar.
export function DateInputPicker({
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
  fromYear,
  toYear,
  className,
  minDate,
  maxDate,
}: Props) {
  const [text, setText] = useState<string>(value ? format(value, "dd/MM/yyyy") : "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setText(value ? format(value, "dd/MM/yyyy") : "");
  }, [value]);

  const tryParse = (raw: string) => {
    const s = raw.trim();
    if (!s) return { ok: true, date: undefined as Date | undefined };
    const pivotYear = (yy: number) => {
      const c20 = 2000 + yy;
      const c19 = 1900 + yy;
      if (maxDate) {
        if (c20 > maxDate.getFullYear()) return c19;
        return c20;
      }
      if (minDate) {
        if (c20 < minDate.getFullYear()) return c19 >= minDate.getFullYear() ? c19 : c20;
        return c20;
      }
      // No bounds: pivot at current year + 20
      const cutoff = new Date().getFullYear() + 20;
      return c20 > cutoff ? c19 : c20;
    };
    // Digits-only shortcuts: ddmmyy or ddmmyyyy
    if (/^\d{6}$/.test(s)) {
      const dd = s.slice(0, 2);
      const mm = s.slice(2, 4);
      const yy = Number(s.slice(4, 6));
      const yyyy = pivotYear(yy);
      const d = parse(`${dd}/${mm}/${yyyy}`, "dd/MM/yyyy", new Date());
      if (isValid(d)) return { ok: true, date: d };
    }
    if (/^\d{8}$/.test(s)) {
      const dd = s.slice(0, 2);
      const mm = s.slice(2, 4);
      const yyyy = s.slice(4, 8);
      const d = parse(`${dd}/${mm}/${yyyy}`, "dd/MM/yyyy", new Date());
      if (isValid(d)) return { ok: true, date: d };
    }
    // 2-digit year patterns with separators
    const yyMatch = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2})$/);
    if (yyMatch) {
      const dd = yyMatch[1].padStart(2, "0");
      const mm = yyMatch[2].padStart(2, "0");
      const yyyy = pivotYear(Number(yyMatch[3]));
      const d = parse(`${dd}/${mm}/${yyyy}`, "dd/MM/yyyy", new Date());
      if (isValid(d)) return { ok: true, date: d };
    }
    const patterns = ["dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "yyyy-MM-dd", "dd.MM.yyyy"];
    for (const p of patterns) {
      const d = parse(s, p, new Date());
      if (isValid(d)) return { ok: true, date: d };
    }
    return { ok: false, date: undefined };
  };

  const inRange = (d: Date | undefined) => {
    if (!d) return true;
    const day = startOfDay(d).getTime();
    if (minDate && day < startOfDay(minDate).getTime()) return false;
    if (maxDate && day > startOfDay(maxDate).getTime()) return false;
    return true;
  };

  const commit = () => {
    const { ok, date } = tryParse(text);
    if (ok && inRange(date)) onChange(date);
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
              if (inRange(d ?? undefined)) {
                onChange(d ?? undefined);
                setOpen(false);
              }
            }}
            defaultMonth={value ?? (toYear ? new Date(toYear, 0, 1) : undefined)}
            captionLayout={fromYear || toYear ? "dropdown-buttons" : undefined}
            fromYear={fromYear}
            toYear={toYear}
            disabled={
              minDate || maxDate
                ? { before: minDate as Date | undefined, after: maxDate as Date | undefined }
                : undefined
            }
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}