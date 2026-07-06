import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-deep text-white hover:bg-navy-soft active:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-60",
  secondary:
    "border border-navy/20 bg-white text-navy-deep hover:border-gold hover:bg-gold-pale active:bg-white disabled:cursor-not-allowed disabled:opacity-60",
};

const base =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

export function Button(props: ButtonProps) {
  const { children, className = "", variant = "primary" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (typeof (props as LinkButtonProps).href === "string") {
    const { href, children: _children, variant: _variant, className: _className, ...anchorProps } =
      props as LinkButtonProps;

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { type, children: _children, variant: _variant, className: _className, ...buttonProps } =
    props as NativeButtonProps;
  const buttonType = (type ?? "button") as "button" | "submit" | "reset";

  return (
    <button type={buttonType} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
