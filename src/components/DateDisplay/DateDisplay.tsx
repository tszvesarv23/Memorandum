import { formatDate, formatRelative } from "@/lib/format";

interface DateDisplayProps {
  iso: string;
  relative?: boolean;
  className?: string;
}

export function DateDisplay({ iso, relative = false, className }: DateDisplayProps) {
  return (
    <time dateTime={iso} className={className ?? "meta"}>
      {relative ? formatRelative(iso) : formatDate(iso)}
    </time>
  );
}
