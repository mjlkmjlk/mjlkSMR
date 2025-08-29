import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const typographyVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance",
        h2: "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-md font-semibold tracking-tight",
        span: "text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        iconSm: "size-6",
      },
    },
    defaultVariants: {
      variant: "span",
      size: "default",
    },
  }
);

interface ITypography {
  children: ReactNode;
  className?: string;
}

export function Typography({
  children,
  variant,
  className,
}: ITypography & VariantProps<typeof typographyVariants>) {
  const DynamicTag =
    (variant as "span" | "h1" | "h2" | "h3" | "h4" | "link") || "span";

  return (
    <DynamicTag className={cn(typographyVariants({ variant, className }))}>
      {children}
    </DynamicTag>
  );
}
