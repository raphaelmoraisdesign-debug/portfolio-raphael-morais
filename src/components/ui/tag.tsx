import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        accent: "bg-accent-subtle text-primary font-semibold",
        primary: "bg-primary text-primary-foreground",
        outline: "border border-border text-text-secondary hover:border-primary/40",
        muted: "bg-muted text-muted-foreground",
        gradient: "bg-gradient-to-r from-primary/10 to-accent-secondary/10 text-primary border border-primary/20",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs font-semibold",
        default: "px-3.5 py-1.5 text-sm",
        lg: "px-5 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface TagProps extends VariantProps<typeof tagVariants> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Tag({ children, variant, size, className, onClick }: TagProps) {
  const Component = onClick ? "button" : "span";
  
  return (
    <Component 
      className={cn(
        tagVariants({ variant, size }),
        onClick && "cursor-pointer hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}