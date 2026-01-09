import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        accent: "bg-accent-subtle text-accent",
        outline: "border border-border text-text-secondary",
        muted: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
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
