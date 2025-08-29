import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export default function LinkButton({
  href,
  className,
  variant = "link",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
} & VariantProps<typeof buttonVariants>) {
  return (
    <Link
      className={cn(buttonVariants({ variant, className }))}
      /*   className={clsx(
        cStyles,
        "cursor-pointer inline-flex items-center justify-center gap-2 rounded-md px-1.5 py-1.5 text-sm/6 font-semibold",
        "text-white shadow-inner shadow-white/10",
        "focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700",
        "data-disabled:cursor-not-allowed data-disabled:text-gray-500 data-disabled:bg-gray-800 text-xs"
      )} */
      href={href}
    >
      {children}
    </Link>
  );
}
