# Easy-email-core

## Usage

```sh
$ npm install --save easy-email-core
```

or

```sh
$ yarn add easy-email-core
```

## transform json to mjml

```ts
import { JsonToMjml } from 'easy-email-core';

const xml = JsonToMjml({
  data: json,
  context: null,
  mode: 'production',
});

console.log(xml);
```

// output

```html
<mjml>
  <mj-head>
    <mj-html-attributes>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="text-color"
        text-color="#000000"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="font-family"
        font-family="lucida Grande,Verdana,Microsoft YaHei"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="font-size"
        font-size="14px"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="line-height"
        line-height="1.7"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="responsive"
        responsive="true"
      ></mj-html-attribute>
    </mj-html-attributes>

    <mj-breakpoint width="480px" />
    <mj-attributes>
      <mj-all font-family="lucida Grande,Verdana,Microsoft YaHei" />
      <mj-text font-size="14px" />
      <mj-text color="#000000" />
      <mj-text line-height="1.7" />
    </mj-attributes>
  </mj-head>
  <mj-body
    background-color="#efeeea"
    width="600px"
    css-class="mjml-body"
  >
    <mj-hero
      padding="100px 0px 100px 0px"
      border="none"
      direction="ltr"
      text-align="center"
      background-color="#2a3448"
      background-position="center center"
      mode="fluid-height"
      vertical-align="top"
      background-url="https://cloud.githubusercontent.com/assets/1830348/15354890/1442159a-1cf0-11e6-92b1-b861dadf1750.jpg"
      background-width="600px"
      background-height="469px"
    >
      <mj-text
        padding="20px 20px 20px 20px"
        align="center"
        color="#ffffff"
        font-size="45px"
        line-height="45px"
        font-family="Helvetica"
        font-weight="900"
      >
        GO TO SPACE
      </mj-text>

      <mj-button
        align="center"
        background-color="#414141"
        color="#ffffff"
        font-weight="normal"
        border-radius="3px"
        padding="10px 25px 10px 25px"
        inner-padding="10px 25px 10px 25px"
        line-height="120%"
        target="_blank"
        vertical-align="middle"
        border="none"
        text-align="center"
        href="https://mjml.io/"
      >
        ORDER YOUR TICKET NOW
      </mj-button>
    </mj-hero>
  </mj-body>
</mjml>
```

```tsx
// Then transform to mjml
console.log(
  JsonToMjml({
    data: blockData,
    mode: 'production',
  }),
);
```

// output

```html
<mjml>
  <mj-head>
    <mj-html-attributes>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="text-color"
        text-color="#000000"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="font-family"
        font-family="lucida Grande,Verdana,Microsoft YaHei"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="font-size"
        font-size="14px"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="line-height"
        line-height="1.7"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="responsive"
        responsive="true"
      ></mj-html-attribute>
    </mj-html-attributes>

    <mj-breakpoint width="480px" />
    <mj-attributes>
      <mj-all font-family="lucida Grande,Verdana,Microsoft YaHei" />
      <mj-text font-size="14px" />
      <mj-text color="#000000" />
      <mj-text line-height="1.7" />
    </mj-attributes>
  </mj-head>
  <mj-body
    background-color="#efeeea"
    width="600px"
    css-class="mjml-body"
  >
    <mj-section
      padding="20px 0px 20px 0px"
      border="none"
      direction="ltr"
      text-align="center"
      background-repeat="repeat"
      background-size="auto"
      background-position="top center"
    >
      <mj-column
        padding="0px 0px 0px 0px"
        border="none"
        vertical-align="top"
      >
        <mj-text
          padding="20px"
          align="center"
          color="#ffffff"
          font-family="Helvetica"
          font-size="45px"
          line-height="45px"
          font-weight="900"
        >
          GO TO SPACE
        </mj-text>

        <mj-button
          align="center"
          background-color="#414141"
          color="#ffffff"
          font-weight="normal"
          border-radius="3px"
          padding="10px 25px 10px 25px"
          inner-padding="10px 25px 10px 25px"
          line-height="120%"
          target="_blank"
          vertical-align="middle"
          border="none"
          text-align="center"
          href="https://mjml.io/"
        >
          ORDER YOUR TICKET NOW
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

## Customize your block

```tsx
import { merge } from 'lodash';
import {
  createCustomBlock,
  IBlockData,
  components,
  BasicType,
  JsonToMjml,
  BasicType,
  BlockManager,
} from 'easy-email-core';
const { Section, Column, Image, Button } = components;

type IMyFirstBlock = IBlockData<
  {
    'background-color': string;
    'text-color': string;
  },
  {
    buttonText: string;
    imageUrl: string;
  }
>;

const myFirstBlock = createCustomBlock({
  name: 'My first block',
  type: 'MY_FIRST_BLOCK',
  create(payload) {
    const defaultData: IMyFirstBlock = {
      type: 'MY_FIRST_BLOCK',
      data: {
        value: {
          buttonText: 'Got it',
          imageUrl:
            'http://res.cloudinary.com/dwkp0e1yo/image/upload/v1665841616/pn7npfspxaqfzxiensue.png',
        },
      },
      attributes: {
        'background-color': '#4A90E2',
        'text-color': '#ffffff',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
  render(
    data: IMyFirstBlock,
    idx: string | null,
    mode: 'testing' | 'production',
    context?: IPage,
    dataSource?: { [key: string]: any },
  ) {
    const { imageUrl, buttonText } = data.data.value;
    const attributes = data.attributes;

    const instance = (
      <Section padding='20px'>
        <Column>
          <Image
            padding='0px 0px 0px 0px'
            width='100px'
            src={imageUrl}
          />
          <Button
            background-color={attributes['background-color']}
            color={attributes['text-color']}
            href='#'
          >
            {buttonText}
          </Button>
        </Column>
      </Section>
    );
    return instance;
  },
});

BlockManager.registerBlocks({ myFirstBlock });

const pageBlock = BlockManager.getBlockByType(BasicType.PAGE);

console.log(
  JsonToMjml({
    data: pageBlock.create({
      children: [myFirstBlock.create()],
    }),
    mode: 'production',
  }),
);
```

// output

```html
<mjml>
  <mj-head>
    <mj-html-attributes>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="text-color"
        text-color="#000000"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="font-family"
        font-family="lucida Grande,Verdana,Microsoft YaHei"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="font-size"
        font-size="14px"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="line-height"
        line-height="1.7"
      ></mj-html-attribute>
      <mj-html-attribute
        class="easy-email"
        multiple-attributes="false"
        attribute-name="responsive"
        responsive="true"
      ></mj-html-attribute>
    </mj-html-attributes>

    <mj-breakpoint width="480px" />
    <mj-attributes>
      <mj-all font-family="lucida Grande,Verdana,Microsoft YaHei" />
      <mj-text font-size="14px" />
      <mj-text color="#000000" />
      <mj-text line-height="1.7" />
    </mj-attributes>
  </mj-head>
  <mj-body
    background-color="#efeeea"
    width="600px"
    css-class="mjml-body"
  >
    <mj-section
      padding="20px"
      background-repeat="repeat"
      background-size="auto"
      background-position="top center"
      border="none"
      direction="ltr"
      text-align="center"
    >
      <mj-column
        padding="0px 0px 0px 0px"
        border="none"
        vertical-align="top"
      >
        <mj-image
          align="center"
          height="auto"
          padding="0px 0px 0px 0px"
          src="http://res.cloudinary.com/dwkp0e1yo/image/upload/v1665841616/pn7npfspxaqfzxiensue.png"
          width="100px"
        >
        </mj-image>

        <mj-button
          align="center"
          background-color="#4A90E2"
          color="#ffffff"
          font-weight="normal"
          border-radius="3px"
          padding="10px 25px 10px 25px"
          inner-padding="10px 25px 10px 25px"
          line-height="120%"
          target="_blank"
          vertical-align="middle"
          border="none"
          text-align="center"
          href="#"
        >
          Got it
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```
