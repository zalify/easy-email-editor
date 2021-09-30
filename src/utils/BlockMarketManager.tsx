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
} from '@/components/EmailEditor/components/BlocksPanel/presetTemplate';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import React from 'react';

const defaultCategories = [
  {
    title: 'Content',
    name: 'contentBlocks',
    blocks: [
      {
        title: 'Text',
        description: 'This block allows you to display text in your email.',
        ExampleComponent: TextBlockItem,
      },
      {
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
        title: 'Button',
        description: 'Displays a customizable button.',
        ExampleComponent: ButtonBlockItem,
      },
      {
        title: 'Hero',
        description: `This block displays a hero image. It behaves like an
        'section' with a single 'column'.`,
        ExampleComponent: HeroBlockItem,
      },
      {
        title: 'Navbar',
        description: `Displays a menu for navigation with an optional hamburger
        mode for mobile devices.`,
        ExampleComponent: NavbarBlockItem,
      },
      {
        title: 'Spacer',
        description: 'Displays a blank space.',
        ExampleComponent: SpacerBlockItem,
      },
      {
        title: 'Divider',
        description: `Displays a horizontal divider that can be customized like a
        HTML border.`,
        ExampleComponent: DividerBlockItem,
      },
      {
        title: 'Accordion',
        description: `Accordion is an interactive component to stack content in
        tabs, so the information is collapsed and only the titles
        are visible. Readers can interact by clicking on the tabs
        to reveal the content, providing a great experience on
        mobile devices where space is scarce.`,
        ExampleComponent: AccordionBlockItem,
      },
      {
        title: 'Carousel',
        description: `This block displays a gallery of images or "carousel".
        Readers can interact by hovering and clicking on
        thumbnails depending on the email client they use.`,
        ExampleComponent: CarouselBlockItem,
      },
      {
        title: 'Social',
        description: `Displays calls-to-action for various social networks with
        their associated logo.`,
        ExampleComponent: SocialBlockItem,
      },
    ],
  },
  {
    title: 'Layout',
    name: 'layoutBlocks',
    blocks: [
      {
        title: 'Wrapper',
        description: `Wrapper enables to wrap multiple sections together. It's especially useful to achieve nested layouts with shared border or background images across sections.
        `,
        ExampleComponent: WrapperBlockItem,
      },
      {
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
        title: 'Group',
        description: `Group allows you to prevent columns from stacking on
          mobile. To do so, wrap the columns inside a group
          block, so they'll stay side by side on mobile.`,
        ExampleComponent: GroupBlockItem,
      },
      {
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
  title: string;
  name: string;
  blocks: {
    title: string;
    description?: React.ReactNode;
    ExampleComponent: () => JSX.Element;
  }[];
}

export class BlockMarketManager {
  private static category: BlockMarketCategory[] = [...defaultCategories];

  public static getCategories() {
    return this.category;
  }

  public static addCategory(
    name: string,
    title: string,
    blocks: {
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
