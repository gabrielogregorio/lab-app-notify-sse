import { tailwindMerge } from "./tailwindMerge";
import { ReactNode } from "react";

type Props = {
  as: "p" | "h1" | "h2" | "h3" | "h4" | "h5";
  className?: string;
  children: ReactNode;
};

export const Text = ({ as, className = undefined, children }: Props) => {
  const Tag = as;

  return (
    <Tag className={tailwindMerge("text-[#353535]", className)}>{children}</Tag>
  );
};
