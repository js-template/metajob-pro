export const settings = {
  activeTheme: "@jstemplate/metajob-theme", // Default active theme
};

export const themeResolver: Record<string, () => Promise<any>> = {
  "@jstemplate/metajob-theme": () => import("@jstemplate/metajob-theme"),
};
