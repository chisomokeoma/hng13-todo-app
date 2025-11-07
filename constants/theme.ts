import { Platform } from "react-native";

export const Colors = {
  light: {
    background: "#FFFFFF",
    backgroundGradient: ["#FFFFFF", "#F5F5F5"],
    container: "#FFFFFF",
    text: "#494C6B",
    textSecondary: "#9495A5",
    textCompleted: "#D1D2DA",
    border: "#E3E4F1",
    accent: "#3A7BFD",
    checkbox: "#E3E4F1",
    checkboxChecked: "#3A7BFD",
    icon: "#494C6B",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  dark: {
    background: "#000000",
    backgroundGradient: ["#7B53E6", "#1A1A2E"],
    container: "#25273C",
    text: "#C8CBE7",
    textSecondary: "#5B5E7E",
    textCompleted: "#4D5067",
    border: "#393A4B",
    accent: "#3A7BFD",
    checkbox: "#393A4B",
    checkboxChecked: "#3A7BFD",
    icon: "#5B5E7E",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
