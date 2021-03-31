
declare module 'mjml-browser' {
  const transform: (vml: string, options?: { [key: string]: any; }) => {
    json: MjmlBlockItem,
    html: string,
    error: string[];
  };
  export default transform;
}

interface MjmlBlockItem {
  file: string;
  absoluteFilePath: string;
  line: number; includedIn: any[];
  tagName: string;
  children: IChildrenItem[];
  attributes: IAttributes;
}
interface IChildrenItem {
  file: string;
  absoluteFilePath: string;
  line: number;
  includedIn: any[];
  tagName: string;
  children?: IChildrenItem[];
  attributes: IAttributes;
}
interface IAttributes {
  width?: string;
}