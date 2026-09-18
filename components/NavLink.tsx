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
  const isActive = pathname === href.split("#")[0];

  const sharedStyle =
    "hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <Link
      href={href}
      className={
        isActive
          ? `text-ink underline decoration-2 underline-offset-4 ${sharedStyle}`
          : `text-ink hover:underline underline-offset-4 ${sharedStyle}`
      }
    >
      {children}
    </Link>
  );
}
