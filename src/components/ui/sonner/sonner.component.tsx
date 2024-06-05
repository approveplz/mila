"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group rounded-full w-[328px] gap-2 toast group-[.toaster]:bg-[#D1FAE5] group-[.toaster]:text-fatal group-[.toaster]:text-base group-[.toaster]:border-[#D1FAE5] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[muted-foreground] text-[#D1FAE5]",
          actionButton:
            "group-[.toast]:bg-green group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-green group-[.toast]:text-muted-foreground",
          icon: "group-[.toast]",
          error: "group-[.toaster]:bg-destructive"
        },
      }}
      {...props}
    />
  )
}

export { Toaster }