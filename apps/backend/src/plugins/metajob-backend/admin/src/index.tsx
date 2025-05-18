export default {
  register(app: any) {
    app.addMenuLink({
      to: '/plugins/metajob-backend/theme-settings',
      icon: 'brush',
      intlLabel: {
        id: 'metajob-backend.theme-settings',
        defaultMessage: 'Theme Settings',
      },
    });