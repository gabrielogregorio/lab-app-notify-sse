import { ReactNode } from "react";
import { tailwindMerge } from "./tailwindMerge";

type Props = {
  type: "button" | "submit";
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export const Button = ({
  type = "button",
  onClick,
  children,
  className = undefined,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={tailwindMerge(
        "border-black border-2 text-black px-3 py-2 hover:bg-black hover:text-white transition-all duration-150",
        className
      )}
    >
      {children}
    </button>
  );
};
