// src/components/AppNavLink.tsx
import React from "react";
import { Link, LinkProps } from "react-router-dom";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
};

export default function AppNavLink({ to, children, className, onClick, ...rest }: Props) {
  const handleClick = (e?: React.MouseEvent) => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    if (onClick) onClick(e);
  };

  return (
    <Link to={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
