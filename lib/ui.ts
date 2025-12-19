// /lib/ui.ts
export function isRTL(locale: string) {
    return locale === "ar" || locale === "ku";
  }
  
  // very small className helper (no extra deps)
  export function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
  }
  