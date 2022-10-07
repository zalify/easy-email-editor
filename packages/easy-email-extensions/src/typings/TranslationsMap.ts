export type TranslationsMap = Partial<{
  jsonSource: string;
  mjmlSource: string;
  simpleLayout: {
    configuration: string;
    sourceCode: string;
  },
  standardLayout: {
    content: string;
    layout: string;
    columns2: string;
    columns3: string;
    columns4: string;
  },
  attributePanel: {
    noMatchingComponent: string;
  },
  configurationPanel: {
    configuration: string;
    sourceCode: string;
  }
  editPanel: {
    block: string;
    layer: string;
  },
  attributes: {
    align: string;
    backgroundImage: string;
    backgroundColor: string;
    backgroundRepeat: string;
    backgroundSize: string;
    borderRadius: string;
    border: string;
    fontSize: string;
    fontFamily: string;
    fontStyle: string;
    color: string;
    style: string;
    width: string;
    className: string;
    condition: string;
    symbol: string;
    and: 'And',
    or: 'Or',
    variablePath: string;
    operator: string;
    right: string;
    left: string;
    top: string;
    bottom: string;
    containerBackgroundColor: string;
    decoration: string;
    opacity: string;
    direction: string;
    height: string;
    dataSource: string;
    itemName: string;
    limit: string;
    mockQuantity: string;
    letterSpacing: string;
    lineHeight: string;
    href: string;
    target: string;
    margin: string;
    pleaseSelect: string;
    padding: string;
    textAlign: string;
    textDecoration: string;
    none: string;
    underline: string;
    overline: string;
    lineThrough: string;
    blink: string;
    inherit: string;
    center: string;
    textTransform: string;
    uppercase: string;
    lowercase: string;
    capitalize: string;
    verticalAlign: string;
    columnsMustBeInPercentage: string;
  }
  accordion: {
    setting: string;
    iconWidth: string;
    iconHeight: string;
    unwrappedIcon: string;
    wrappedIcon: string;
    iconPosition: string;
    iconAlign: string;
    extra: string;
    padding: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
    middle: string;
    content: string;
    layout: string;
    border: string;
  },
  button: {
    setting: string;
    dimension: string;
    innerPadding: string;
    color: string;
    textColor: string;
    buttonColor: string;
    backgroundColor: string;
    typography: string;
    border: string;
    extra: string;
  },
  carousel: {
    dimension: string;
    thumbnailWidth: string;
    thumbnails: string;
    images: string;
    icon: string;
    leftIcon: string;
    rightIcon: string;
    iconWidth: string;
    border: string;
    hoveredBorder: string;
    selectedBorder: string;
    thumbnailsBorder: string;
    thumbnailsBorderRadius: string;
    extra: string;
    image: string;
    imageHelper: string;
    url: string;
    target: string;
    title: string;
  },
  column: {
    background: string;
    dimension: string;
    extra: string;
    border: string;
  },
  divider: {
    background: string;
    dimension: string;
    extra: string;
    border: string;
  },
  group: {
    background: string;
    dimension: string;
    extra: string;
  },
  hero: {
    dimension: string;
    mode: string;
    background: string;
    src: string;
    srcHelper: string;
    backgroundWidth: string;
    backgroundHeight: string;
    backgroundPosition: string;
    borderRadius: string;
    extra: string;
    fluidHeight: string;
    fixedHeight: string;
  },
  image: {
    setting: string;
    src: string;
    srcHelp: string;
    backgroundColor: string;
    dimension: string;
    link: string;
    border: string;
    extra: string;
    title: string;
    alt: string;
    className: string;
  },
  navbar: {
    layout: string;
    navbarLinks: string;
    extra: string;
    links: string;
    content: string;
    color: string;
    fontSize: string;
    target: string;
    url: string;
  },
  page: {
    subject: string;
    subTitle: string;
    width: string;
    emailSettings: string;
    breakpoint: string;
    breakpointHelper: string;
    themeSettings: string;
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    textColor: string;
    background: string;
    contentBackground: string;
    userStyle: string;
  },
  addFont: {
    importFont: string;
    importFontHelper: string;
    name: string;
    href: string;
  },
  raw: {
    htmlMode: string;
  }
  social: {
    setting: string;
    typography: string;
    backgroundColor: string;
    socialItem: string;
    dimension: string;
    iconWidth: string;
    borderRadius: string;
    iconPadding: string;
    textPadding: string;
    extra: string;
    vertical: string;
    horizontal: string;
    mode: string;
    image: string;
    content: string;
    link: string;
  },
  spacer: {
    dimension: string;
    background: string;
    backgroundColor: string;
    extra: string;
  },
  table: {
    edit: string;
    dimension: string;
    decoration: string;
    typography: string;
  },
  text: {
    htmlMode: string;
    dimension: string;
    color: string;
    backgroundColor: string;
    typography: string;
    extra: string;
  },
  wrapper: {
    dimension: string;
    background: string;
    border: string;
    extra: string;
    backgroundBorderRadius: string;
  },
  categories: {
    content: string;
    text: string;
    textDescription: string;
    image: string;
    imageDescription: string;
    button: string;
    buttonDescription: string;
    hero: string;
    heroDescription: string;
    navbar: string;
    navbarDescription: string;
    spacer: string;
    spacerDescription: string;
    divider: string;
    dividerDescription: string;
    accordion: string;
    accordionDescription: string;
    carousel: string;
    carouselDescription: string;
    social: string;
    socialDescription: string;
    layout: string;
    wrapper: string;
    wrapperDescription: string;
    section: string;
    sectionDescription1: string;
    sectionDescription2: string;
    group: string;
    groupDescription: string;
    column: string;
    columnDescription1: string;
    columnDescription2: string;
  },
  iconFontColor: {
    textColor: string;
  },
  addToCollection: {
    title: string;
    description: string;
    thumbnail: string;
    thumbnailRequired: string;
    titleRequired: string;
  },
  colorPicker: {
    picker: string;
  },
  imageUploader: {
    upload: string;
    preview: string;
    remove: string;
    uploadFailed: string;
    uploading: string;
  },
  richTextToolBar: {
    bold: string;
    fontFamily: string;
    fontSize: string;
    italic: string;
    link: string;
    apply: string;
    target: string;
    mergeTags: string;
    strikethrough: string;
    backgroundColor: string;
    alignLeft: string;
    alignCenter: string;
    alignRight: string;
    orderlist: string;
    unorderlist: string;
    line: string;
    removeFormat: string;
    underline: string;
    unlink: string;
  },
  basicTool: {
    selectParentBlock: string;
    copy: string;
    addToCollection: string;
    delete: string;
  },
  tab: {
    tab: string;
  },
  mergeTagBadgePrompt: {
    defaultValue: string;
    helperText: string;
    save: string;
  },
  interactivePrompt: {
    insertBefore: string;
    insertAfter: string;
    dragHere: string;
    dragTo: string;
  }
}>;