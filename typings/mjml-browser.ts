
declare module 'mjml-browser' {
  const transform: (vml: string, options?: {
    beautify?: boolean;
    minify?: boolean;
    keepComments?: boolean;
    validationLevel: 'strict' | 'soft' | 'skip';
  }) => {
    json: MjmlBlockItem,
    html: string,
    error: string[];
  };
  export default transform;
}

interface MjmlBlockItem {
  file: string;
  absoluteFilePath: string;
  line: number;
  includedIn: any[];
  tagName: string;
  children: IChildrenItem[];
  attributes: IAttributes;
  content?: string;
}
interface IChildrenItem {
  file?: string;
  absoluteFilePath?: string;
  line: number;
  includedIn: any[];
  tagName: string;
  children?: IChildrenItem[];
  attributes: IAttributes;
  content?: string;
}
interface IAttributes {
  width?: string;
  'background-color'?: string;
  padding?: string;
  height?: string;
  src?: string;
  'background-url'?: string;
  align?: string;
  'font-size'?: string;
  'font-weight'?: string;
  'line-height'?: string;
  color?: string;
  'padding-top'?: string;
  'padding-left'?: string;
  'padding-right'?: string;
  'padding-bottom'?: string;
  'font-family'?: string;
  href?: string;
  'border-width'?: string;
  'border-color'?: string;
}