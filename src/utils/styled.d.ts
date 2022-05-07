// import original module declarations
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {
    isDark: boolean;
    primary: string;
    primaryOnHover: string;
    secondary: string;
    text: string;
    textSecondary: string;
    link: string;
    background: string;
    backgroundVariant: string;
    backgroundSub?: string;
    border: string;
    borderLight: string;
    borderRadius: string;
    backgroundBtnPrimary: string;
    backgroundBtnSecondary: string;
    error: string;

    borderItem: string;

    borderDashed: string;

    borderSearch: string;
    close: string;
    gray1: string;
    gray2: string;
    gray3: string;
    gray4: string;
    gray5: string;
    gray6: string;
    gray7: string;
    gray8: string;
    mintTime: string;
    backgroundDetail: string;
    price: string;
    borderFilter: string;
    backgroundCopy?: string;
    colors: {
      dark: string;
      dark2: string;
      dark3?: string;
      mint: string;
      grey: string;
      white: string;
      white2?: string;
      white3?: string;
      purple?: string;
      black?: string;
      background: string;
      input: string;
      inputDark: string;
      body: string;
      text: string;
      navItem: string;
      graphBorderColor: string;
      graphBackground: string;
      error: string;
      historyTime: string;
      iconSearch: string;
      placeholder: string;
      backgroundModal: string;
      borderLine: string;
      select: string;
      exchangeBackground: string;
      inputBackground: string;
      backgroundHeader: string;
    };
    mode: string;
  }
}
