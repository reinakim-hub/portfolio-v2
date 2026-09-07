"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "text-ink underline decoration-2 underline-offset-4"
          : "text-ink hover:underline"
      }
    >
      {children}
    </Link>
  );
}
