declare module '*.svg' {
  const content: { src: string };
  export default content;
}

declare module '*.less' {
  const classes: { [className: string]: string };
  export default classes;
}
declare module '!!raw-loader!*.css' {
  const content: string;
  export default content;
}

declare module '*/settings.json' {
  const value: {
    colorWeek: boolean;
    navbar: boolean;
    menu: boolean;
    footer: boolean;
    themeColor: string;
    menuWidth: number;
  };

  export default value;
}
