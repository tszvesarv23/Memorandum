import Link from "next/link";
import styles from "./Tag.module.css";

interface TagProps {
  label: string;
  href?: string;
}

export function Tag({ label, href }: TagProps) {
  const className = styles.tag;
  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return <span className={className}>{label}</span>;
}
