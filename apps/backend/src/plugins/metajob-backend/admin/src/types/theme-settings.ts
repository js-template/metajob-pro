
export interface ThemeSettings {
  primary_color: string;
  secondary_color: string;
  font_family: string;
  is_dark_mode: boolean;
}

export interface ThemeSettingsResponse {
  data: ThemeSettings;
  error: any;
}
