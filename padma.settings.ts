export const settings = {
  activeTheme: "@metajob/metajob-theme", // Default active theme
};

export const themeResolver: Record<string, () => Promise<any>> = {
  // @ts-ignore
  "@metajob/metajob-theme": () => import("@metajob/metajob-theme"),
};
