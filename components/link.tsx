import NextLink from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
};

export const Link = ({ children, href }: Props) => {
  return (
    <NextLink
      href={href}
      className="underline text-black block hover:bg-black hover:text-white transition-all duration-150"
    >
      {children}
    </NextLink>
  );
};
