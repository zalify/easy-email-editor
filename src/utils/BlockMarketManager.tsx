import {
  AccordionBlockItem,
  ButtonBlockItem,
  CarouselBlockItem,
  ColumnBlockItem,
  GroupBlockItem,
  HeroBlockItem,
  ImageBlockItem,
  SpacerBlockItem,
  NavbarBlockItem,
  SectionBlockItem,
  SocialBlockItem,
  TextBlockItem,
  DividerBlockItem,
  WrapperBlockItem,
  BasicType,
} from '@/components/EmailEditor/components/BlocksPanel/presetTemplate';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BlockType } from '@/constants';
import React from 'react';

export enum CategoryName {
  CONTENT = 'CONTENT',
  LAYOUT = 'LAYOUT',
}

const defaultCategories = [
  {
    title: 'Content',
    name: CategoryName.CONTENT,
    blocks: [
      {
        type: BasicType.TEXT,
        title: 'Text',
        description: 'This block allows you to display text in your email.',
        ExampleComponent: TextBlockItem,
      },
      {
        type: BasicType.IMAGE,
        title: 'Image',
        description: (
          <Stack vertical spacing='none'>
            <TextStyle>
              Displays a responsive image in your email. It is similar to the
              HTML "&lt;img/&gt;" tag. Note that if no width is provided, the
              image will use the parent column width.
            </TextStyle>
          </Stack>
        ),
        ExampleComponent: ImageBlockItem,
      },
      {
        type: BasicType.BUTTON,
        title: 'Button',
        description: 'Displays a customizable button.',
        ExampleComponent: ButtonBlockItem,
      },
      {
        type: BasicType.HERO,
        title: 'Hero',
        description: `This block displays a hero image. It behaves like an
        'section' with a single 'column'.`,
        ExampleComponent: HeroBlockItem,
      },
      {
        type: BasicType.NAVBAR,
        title: 'Navbar',
        description: `Displays a menu for navigation with an optional hamburger
        mode for mobile devices.`,
        ExampleComponent: NavbarBlockItem,
      },
      {
        type: BasicType.SPACER,
        title: 'Spacer',
        description: 'Displays a blank space.',
        ExampleComponent: SpacerBlockItem,
      },
      {
        type: BasicType.DIVIDER,
        title: 'Divider',
        description: `Displays a horizontal divider that can be customized like a
        HTML border.`,
        ExampleComponent: DividerBlockItem,
      },
      {
        type: BasicType.ACCORDION,
        title: 'Accordion',
        description: `Accordion is an interactive component to stack content in
        tabs, so the information is collapsed and only the titles
        are visible. Readers can interact by clicking on the tabs
        to reveal the content, providing a great experience on
        mobile devices where space is scarce.`,
        ExampleComponent: AccordionBlockItem,
      },
      {
        type: BasicType.CAROUSEL,
        title: 'Carousel',
        description: `This block displays a gallery of images or "carousel".
        Readers can interact by hovering and clicking on
        thumbnails depending on the email client they use.`,
        ExampleComponent: CarouselBlockItem,
      },
      {
        type: BasicType.SOCIAL,
        title: 'Social',
        description: `Displays calls-to-action for various social networks with
        their associated logo.`,
        ExampleComponent: SocialBlockItem,
      },
    ],
  },
  {
    title: 'Layout',
    name: CategoryName.LAYOUT,
    blocks: [
      {
        type: BasicType.WRAPPER,
        title: 'Wrapper',
        description: `Wrapper enables to wrap multiple sections together. It's especially useful to achieve nested layouts with shared border or background images across sections.
        `,
        ExampleComponent: WrapperBlockItem,
      },
      {
        type: BasicType.SECTION,
        title: 'Section',
        description: (
          <Stack vertical spacing='none'>
            <TextStyle>
              Sections are intended to be used as rows within your email. They
              will be used to structure the layout.
            </TextStyle>
            <TextStyle>
              Sections cannot nest in sections. Columns can nest in sections;
              all content must be in a column.
            </TextStyle>
          </Stack>
        ),
        ExampleComponent: SectionBlockItem,
      },
      {
        type: BasicType.GROUP,
        title: 'Group',
        description: `Group allows you to prevent columns from stacking on
          mobile. To do so, wrap the columns inside a group
          block, so they'll stay side by side on mobile.`,
        ExampleComponent: GroupBlockItem,
      },
      {
        type: BasicType.COLUMN,
        title: 'Column',
        description: (
          <Stack vertical spacing='none'>
            <TextStyle>
              Columns enable you to horizontally organize the content within
              your sections. They must be located under "Section" block in order
              to be considered by the engine. To be responsive, columns are
              expressed in terms of percentage.
            </TextStyle>
            <TextStyle>
              Every single column has to contain something because they are
              responsive containers, and will be vertically stacked on a mobile
              view.
            </TextStyle>
          </Stack>
        ),
        ExampleComponent: ColumnBlockItem,
      },
    ],
  },
];

export interface BlockMarketCategory {
  name: string;
  title: string;
  blocks: {
    type: BlockType;
    title: string;
    description?: React.ReactNode;
    thumbnail?: string;
    ExampleComponent: () => JSX.Element;
  }[];
}

export class BlockMarketManager {
  private static category: BlockMarketCategory[] = [...defaultCategories];

  public static getCategory(name: string) {
    return this.category.find(item => item.name === name);
  }

  public static getCategories() {
    return this.category;
  }

  public static addCategory(
    name: string,
    title: string,
    blocks: {
      type: BlockType;
      title: string;
      description?: string;
      ExampleComponent: () => JSX.Element;
    }[]
  ) {
    const index = this.category.findIndex(item => item.name === name);
    if (index !== -1) {
      this.category.splice(index, 1);
    }

    this.category.push({
      name,
      title,
      blocks,
    });
  }

  public static removeCategory(name: string) {
    this.category = this.category.filter(item => item.name !== name);
  }
}
