"use client"
/* 4.1 drk and lght mode setup : npm i next theme  then add theme providers from the next theme here to use the shadcn 
dark nd loght mode toggle  */
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
