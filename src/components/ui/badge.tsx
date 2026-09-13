import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-[#A91917]/20 bg-[#A91917]/10 text-[#A91917] dark:bg-[#A91917]/25 dark:text-red-300 dark:border-[#A91917]/40",
        outline:
          "border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/50",
        blue:
          "border-[#0180ff]/25 dark:border-[#0180ff]/35 bg-[#0180ff]/10 text-[#006bd8] dark:bg-[#0180ff]/20 dark:text-sky-300 font-medium",
        ruby:
          "border-[#A91917]/20 dark:border-[#A91917]/35 bg-[#A91917]/10 dark:bg-[#A91917]/20 text-[#A91917] dark:text-rose-300 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
