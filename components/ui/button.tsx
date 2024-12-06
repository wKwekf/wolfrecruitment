import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-normal rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-sans border-2 border-[#121118]",
  {
    variants: {
      variant: {
        default:
          "bg-[#f25a75] text-[#121118] shadow hover:bg-[#f25a75]/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-[48px] px-3 py-2 text-base sm:text-lg leading-normal",
        sm: "min-h-[40px] rounded-md px-2 py-1 text-sm leading-normal",
        lg: "min-h-[52px] rounded-md px-4 py-2 text-lg sm:text-xl leading-normal",
        icon: "h-[48px] w-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonVariant = VariantProps<typeof buttonVariants>

type AsChildProps = {
  asChild: true;
  href?: string;
} & ButtonVariant &
  React.ComponentPropsWithoutRef<typeof Slot>;

type ButtonAsButtonProps = {
  asChild?: false;
  href?: undefined;
} & ButtonVariant &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchorProps = {
  asChild?: false;
  href: string;
} & ButtonVariant &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = AsChildProps | ButtonAsButtonProps | ButtonAsAnchorProps;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, asChild = false, href, ...props }, ref) => {
  const Comp = asChild ? Slot : href ? "a" : "button";
  const combinedClassName = cn(buttonVariants({ variant, size, className }), "flex-wrap");

  if (asChild) {
    return (
      <Slot ref={ref} className={combinedClassName} {...props} />
    );
  } else if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={combinedClassName}
        href={href}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  } else {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
});

Button.displayName = "Button";

export { Button, buttonVariants }