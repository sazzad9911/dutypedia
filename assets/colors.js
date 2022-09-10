

export class Color {
  primaryColor = "#ffffff";
  secondaryColor = "#fbfbfb";
  textColor = "#333333";
  assentColor = "#808080";
  backgroundColor = "#DA1E37";

  constructor(isDark) {
    if (isDark) {
      this.primaryColor = "#808080";
      this.secondaryColor = "#101010";
      this.textColor = "#f5f5f5";
      this.assentColor = "#808080";
      this.backgroundColor = "#DA1E78";
    } else {
      this.primaryColor = "#ffffff";
      this.secondaryColor = "#fbfbfb";
      this.textColor = "#333333";
      this.assentColor = "#808080";
      this.backgroundColor = "#DA1E37";
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
}

export const primaryColor = "#ffffff";
export const secondaryColor = "#fbfbfb";
export const textColor = "#333333";
export const assentColor = "#808080";
export const backgroundColor = "#DA1E37";