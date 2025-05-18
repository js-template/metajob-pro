const plugin = {
  name: pluginId,
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}/theme-settings`,
      icon: "brush",
      intlLabel: {
        id: `${pluginId}.theme.settings`,
        defaultMessage: "Theme Settings",
      },
      Component: async () => {
        const component = await import("./pages/theme-settings");
        return component;
      },
    });