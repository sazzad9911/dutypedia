

export class Color {
  primaryColor = "#ffffff";
  secondaryColor = "#fbfbfb";
  textColor = "#000000";
  assentColor = "#808080";
  backgroundColor = "#4ADE80";

  constructor(isDark) {
    if (isDark) {
      this.primaryColor = "#2E2E2E";
      this.secondaryColor = "#202020";
      this.textColor = "#ffff";
      this.assentColor = "#E2E2E2";
      this.backgroundColor = "#4ADE80";
    } else {
      this.primaryColor = "#ffffff";
      this.secondaryColor = "#ffff";
      this.textColor = "#000000";
      this.assentColor = "#4A4A4A";
      this.backgroundColor = "#4ADE80";
    }
  }
  getPrimaryColor() {
    return this.primaryColor;
  }
  getSecondaryColor() {
    return this.secondaryColor;
  }
  getTextColor() {
    return this.textColor;
  }
  getBackgroundColor() {
    return this.backgroundColor;
  }
  getAssentColor() {
    return this.assentColor;
  }
}

export const primaryColor = "#ffffff";
export const secondaryColor = "#fbfbfb";
export const textColor = "#333333";
export const assentColor = "#808080";
export const backgroundColor = "#DA1E37";