import { TranslationsMap } from '@extensions/typings';
import { SimpleLayout } from '@extensions';
import { EditGridTab } from '@extensions/components/Form/EditGridTab';

export const enTranslations: TranslationsMap = {
  jsonSource: 'JSON source',
  mjmlSource: 'MJML source',
  simpleLayout: {
    configuration: 'Configuration',
    sourceCode: 'Source code',
  },
  standardLayout: {
    content: 'Content',
    layout: 'Layout',
    columns2: '2 columns',
    columns3: '3 columns',
    columns4: '4 columns',
  },
  attributePanel: {
    noMatchingComponent: 'No matching components'
  },
  configurationPanel: {
    configuration: 'Configuration',
    sourceCode: 'Source code',
  },
  editPanel: {
    block: 'Block',
    layer: 'Layer',
  },
  attributes: {
    align: 'Align',
    backgroundImage: 'Background image',
    backgroundColor: 'Background color',
    backgroundRepeat: 'Background repeat',
    backgroundSize: 'Background size',
    borderRadius: 'Border radius',
    border: 'Border',
    fontSize: 'Font size',
    fontFamily: 'Font Family',
    fontStyle: 'Font style',
    color: 'Color',
    style: 'Style',
    width: 'Width',
    className: 'Class name',
    condition: 'Condition',
    symbol: 'Symbol',
    and: 'And',
    or: 'Or',
    variablePath: 'Variable path',
    operator: 'Operator',
    right: 'Right',
    left: 'Left',
    top: 'Top',
    bottom: 'Bottom',
    containerBackgroundColor: 'Container background color',
    decoration: 'Decoration',
    opacity: 'Opacity',
    direction: 'Direction',
    height: 'Height',
    dataSource: 'Data source',
    itemName: 'Item name',
    limit: 'Limit',
    mockQuantity: 'Mock quantity',
    letterSpacing: 'Letter spacing',
    lineHeight: 'Line Height',
    href: 'Href',
    target: 'Target',
    margin: 'Margin',
    pleaseSelect: 'Please select',
    padding: 'Padding',
    textAlign: 'Text align',
    textDecoration: 'Text decoration',
    none: 'None',
    underline: 'Underline',
    overline: 'Overline',
    lineThrough: 'Line through',
    blink: 'Blink',
    inherit: 'Inherit',
    center: 'Center',
    textTransform: 'Text transform',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    verticalAlign: 'Vertical align',
    columnsMustBeInPercentage: 'Column inside a group must have a width in percentage, not in pixel',
    backgroundTextHelper: 'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
    noRepeat: 'No repeat',
    repeat: 'Repeat',
    repeatX: 'Repeat X',
    repeatY: 'Repeat Y',
    blockNameAttributes: '{{name}} attributes',
  },
  accordion: {
    setting: 'Setting',
    iconWidth: 'Icon width',
    iconHeight: 'Icon height',
    unwrappedIcon: 'Unwrapped icon',
    wrappedIcon: 'Wrapped icon',
    iconPosition: 'Icon position',
    iconAlign: 'Icon align',
    extra: 'Extra',
    padding: 'Padding',
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    middle: 'middle',
    content: 'Content',
    layout: 'Layout',
    border: 'border',
  },
  button: {
    setting: 'Setting',
    dimension: 'Dimension',
    innerPadding: 'Inner padding',
    color: 'Color',
    textColor: 'Text color',
    buttonColor: 'Button color',
    backgroundColor: 'Background color',
    typography: 'Typography',
    border: 'Border',
    extra: 'Extra'
  },
  carousel: {
    dimension: 'Dimension',
    thumbnailWidth: 'Thumbnail width',
    thumbnails: 'Thumbnails',
    images: 'Images',
    icon: 'Icon',
    leftIcon: 'Left icon',
    rightIcon: 'Right icon',
    iconWidth: 'Icon width',
    border: 'Border',
    hoveredBorder: 'Hovered border',
    selectedBorder: 'Selected Border',
    thumbnailsBorder: 'Border of the thumbnails',
    thumbnailsBorderRadius: 'Border radius of the thumbnails',
    extra: 'Extra',
    image: 'Image',
    imageHelper: 'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
    url: 'Url',
    target: 'Target',
    title: 'Title'
  },
  column: {
    background: 'Background',
    dimension: 'Dimension',
    extra: 'Extra',
    border: 'Border'
  },
  divider: {
    background: 'Background',
    dimension: 'Dimension',
    extra: 'Extra',
    border: 'Border'
  },
  group: {
    background: 'Background',
    dimension: 'Dimension',
    extra: 'Extra',
  },
  hero: {
    dimension: 'Dimension',
    mode: 'Mode',
    background: 'Background',
    src: 'src',
    srcHelper: 'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
    backgroundWidth: 'Background width',
    backgroundHeight: 'Background height',
    backgroundPosition: 'Background position',
    borderRadius: 'Border radius',
    extra: 'Extra',
    fluidHeight: 'Fluid height',
    fixedHeight: 'Fixed height'
  },
  image: {
    setting: 'Setting',
    src: 'Src',
    srcHelp: 'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
    backgroundColor: 'Background color',
    dimension: 'Dimension',
    link: 'Link',
    border: 'Border',
    extra: 'Extra',
    title: 'title',
    alt: 'alt',
    className: 'class name'
  },
  navbar: {
    layout: 'Layout',
    navbarLinks: 'Navbar links',
    extra: 'Extra',
    links: 'Links',
    content: 'Content',
    color: 'Color',
    fontSize: 'Font Size',
    target: 'Target',
    url: 'Url'
  },
  page: {
    subject: 'Subject',
    subTitle: 'SubTitle',
    width: 'Width',
    emailSettings: 'Email Settings',
    breakpoint: 'Breakpoint',
    breakpointHelper: 'Allows you to control on which breakpoint the layout should go desktop/mobile.',
    themeSettings: 'Theme Settings',
    fontSize: 'Font Size',
    lineHeight: 'Line Height',
    fontWeight: 'Font Weight',
    textColor: 'Text Color',
    background: 'Background',
    contentBackground: 'Content Background',
    userStyle: 'User Style',
  },
  addFont: {
    importFont: 'Import Font',
    importFontHelper: 'Points to a hosted css file',
    name: 'Name',
    href: 'Href',
  },
  raw: {
    htmlMode: 'Html mode',
  },
  social: {
    setting: 'Setting',
    typography: 'Typography',
    backgroundColor: 'Background color',
    socialItem: 'Social item',
    dimension: 'Dimension',
    iconWidth: 'Icon width',
    borderRadius: 'Border radius',
    iconPadding: 'Icon padding',
    textPadding: 'Text padding',
    extra: 'Extra',
    vertical: 'vertical',
    horizontal: 'horizontal',
    mode: 'Mode',
    image: 'Image',
    content: 'Content',
    link: 'Link'
  },
  spacer: {
    dimension: 'Dimension',
    background: 'Background',
    backgroundColor: 'Background color',
    extra: 'Extra'
  },
  table: {
    edit: 'Edit',
    dimension: 'Dimension',
    decoration: 'Decoration',
    typography: 'Typography',
  },
  text: {
    htmlMode: 'Html mode',
    dimension: 'Dimension',
    color: 'Color',
    backgroundColor: 'Background color',
    typography: 'Typography',
    extra: 'Extra'
  },
  wrapper: {
    dimension: 'Dimension',
    background: 'Background',
    border: 'Border',
    extra: 'extra',
    backgroundBorderRadius: 'Background border radius',
  },
  categories: {
    content: 'Content',
    text: 'Text',
    textDescription: 'This block allows you to display text in your email',
    image: 'Image',
    imageDescription: 'Displays a responsive image in your email. It is similar to the HTML "&lt;img/&gt;" tag. Note that if no width is provided, the image will use the parent column width.',
    button: 'Button',
    buttonDescription: 'Displays a customizable button.',
    hero: 'Hero',
    heroDescription:  `This block displays a hero image. It behaves like an
        'section' with a single 'column'.`,
    navbar: 'Navbar',
    navbarDescription: `Displays a menu for navigation with an optional hamburger
        mode for mobile devices.`,
    spacer: 'Spacer',
    spacerDescription: 'Displays a blank space.',
    divider: 'Divider',
    dividerDescription:  `Displays a horizontal divider that can be customized like a
        HTML border.`,
    accordion: 'Accordion',
    accordionDescription: 'Accordion is an interactive component to stack content in tabs, so the information ' +
      'is collapsed and only the titles are visible. Readers can interact by clicking on the tabs to reveal the content, providing a great experience on mobile devices where space is scarce.',
    carousel: 'Carousel',
    carouselDescription: 'This block displays a gallery of images or "carousel". Readers can interact by hovering and clicking on thumbnails depending on the email client they use.',
    social: 'Social',
    socialDescription: `Displays calls-to-action for various social networks with
        their associated logo.`,
    layout: 'Layout',
    wrapper: 'Wrapper',
    wrapperDescription: 'Wrapper enables to wrap multiple sections together. ' +
      'It\'s especially useful to achieve nested layouts with shared border or background images across sections.',
    section: 'Section',
    sectionDescription1: 'Sections are intended to be used as rows within your email. ' +
      'They will be used to structure the layout.',
    sectionDescription2: 'Sections cannot nest in sections. Columns can nest in sections; all content must be in a column.',
    group: 'Group',
    groupDescription: 'Group allows you to prevent columns from stacking on mobile. ' +
      'To do so, wrap the columns inside a group block, so they\'ll stay side by side on mobile.',
    column: 'Column',
    columnDescription1: 'Columns enable you to horizontally organize the content within your sections.' +
      ' They must be located under "Section" block in order to be considered by the engine. ' +
      'To be responsive, columns are expressed in terms of percentage.',
    columnDescription2: 'Every single column has to contain something because they are' +
      ' responsive containers, and will be vertically stacked on a mobile view.'
  },
  iconFontColor: {
    textColor: 'Text color'
  },
  addToCollection: {
    title: 'Title',
    description: 'Description',
    thumbnail: 'Thumbnail',
    thumbnailRequired: 'Thumbnail required!',
    titleRequired: 'Title required!'
  },
  colorPicker: {
    picker: 'Picker...'
  },
  imageUploader: {
    upload: 'Upload',
    preview: 'Preview',
    remove: 'Remove',
    uploadFailed: 'Upload failed',
    uploading: 'Uploading...'
  },
  richTextToolBar: {
    bold: 'Bold',
    fontFamily: 'Font Family',
    fontSize: 'Font size',
    italic: 'Italic',
    link: 'Link',
    apply: 'Apply',
    target: 'Target',
    mergeTags: 'Merge tags',
    strikethrough: 'Strikethrough',
    backgroundColor: 'Background color',
    alignLeft: 'Align left',
    alignCenter: 'Align center',
    alignRight: 'Align right',
    orderlist: 'Orderlist',
    unorderlist: 'Unorderlist',
    line: 'Line',
    removeFormat: 'Remove format',
    underline: 'Underline',
    unlink: 'Unlink'
  },
  basicTool: {
    selectParentBlock: 'Select parent block',
    copy: 'Copy',
    addToCollection: 'Add to collection',
    delete: 'Delete'
  },
  tab: {
    tab: 'Tab'
  },
  mergeTagBadgePrompt: {
    defaultValue: 'Default value',
    helperText: 'If a personalized text value isn\'t available, then a default value is shown.',
    save: 'Save'
  },
  interactivePrompt: {
    insertBefore: 'Insert before {{title}}',
    insertAfter: 'Insert after {{title}}',
    dragHere: 'Drag here',
    dragTo: 'Drag to'
  },
  editGridTab: {
    item: 'Item'
  },
  blockLayer: {
    contextMenu: {
      moveUp: 'Move up',
      moveDown: 'Move down',
      copy: 'Copy',
      addToCollection: 'Add to collection',
      delete: 'Delete'
    }
  },
  htmlEditor: {
    html: 'Html',
    save: 'Save',
    editingLoading: 'Editor Loading...'
  }
}