import { parseXMLtoBlock } from '../parseXMLtoBlock';

const mjmlText = `

<mjml>
<mj-head>

<mj-html-attributes>
<mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="text-color" text-color="#000000"></mj-html-attribute>
<mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="font-family" font-family="'Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo"></mj-html-attribute>
<mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="responsive" responsive="true"></mj-html-attribute>

</mj-html-attributes>



    <mj-breakpoint width="480px" />
  <mj-attributes>

    <mj-all font-family="'Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo" />
    <mj-text color="#000000" />


  </mj-attributes>
</mj-head>
<mj-body background-color="#efeeea" css-class="mjml-body">

    <mj-wrapper padding="20px 0px 20px 0px" border="none" direction="ltr" text-align="center" background-color="rgba(255, 255, 255, 0)">

    <mj-section padding="20px 0px 0px 0px" background-repeat="repeat" background-size="auto" background-position="top center" border="none" direction="ltr" text-align="center">

    <mj-column padding="0px 0px 0px 0px" border="none" vertical-align="top">

<mj-image align="center" height="auto" padding="10px 25px 10px 25px" width="150px" src="https://i.postimg.cc/63Bzt8fw/Tabechoku-Tastin-collab.png">

</mj-image>


<mj-text font-size="13px" padding="10px 25px 10px 25px" line-height="1" align="center">
 この度は、#cookforJapn by 食べチョクのご利用ありがとうございます。<div>シェフからのメッセージをお楽しみください。</div>
</mj-text>

    </mj-column>

    </mj-section>

    </mj-wrapper>


    <mj-section padding="20px 0px 20px 0px" background-repeat="repeat" background-size="auto" background-position="top center" border="none" direction="ltr" text-align="center" background-color="rgba(255, 255, 255, 1)">

    <mj-column padding="0px 0px 0px 0px" border="none" vertical-align="top">

<mj-text font-size="16px" padding="10px 25px 10px 25px" line-height="1" align="left">
 <b>飲み物にもこだわる大切さ</b>
</mj-text>


<mj-text font-size="13px" padding="0px 25px 0px 25px" line-height="1" align="left">
 担当料理: 日本酒
</mj-text>


<mj-image align="center" height="auto" padding="10px 25px 10px 25px" width="1000px" src="https://i.postimg.cc/brF57GLv/image.png" href="https://soundcloud.com/kyle-comstock-126175966/food-podcast">

</mj-image>


<mj-text font-size="13px" padding="10px 25px 10px 25px" line-height="1" align="left">
 日本酒と日本酒を育てた方や育った場所に寄り添い、新しいことも積極的に取り入れ実験し、挑戦なさる橋野さん。そんな橋野さんの味わい深くも、モダンなお考えや想い、ストーリーをお届けします。
</mj-text>


<mj-button align="center" background-color="rgba(50, 73, 103, 1)" color="#ffffff" font-size="13px" font-weight="normal" border-radius="3px" padding="10px 25px 10px 25px" inner-padding="10px 25px 10px 25px" line-height="120%" target="_blank" vertical-align="middle" border="none" text-align="center" href="#">
 🎧視聴する
</mj-button>

    </mj-column>

    </mj-section>

</mj-body>
</mjml>

`;

const blockData = {
  type: 'page',
  data: {
    value: {
      breakpoint: '480px',
      headAttributes: '',
      headStyles: [],
      fonts: [],
      responsive: true,
      'font-family': "'Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo",
      'text-color': '#000000',
      'content-background-color': '#ffffff',
    },
  },
  attributes: {
    'background-color': '#efeeea',
    width: '600px',
    'css-class': 'mjml-body',
  },
  children: [
    {
      type: 'wrapper',
      data: {
        value: {},
      },
      attributes: {
        padding: '20px 0px 20px 0px',
        border: 'none',
        direction: 'ltr',
        'text-align': 'center',
        'background-color': 'rgba(255, 255, 255, 0)',
      },
      children: [
        {
          type: 'section',
          data: {
            value: {
              noWrap: false,
            },
          },
          attributes: {
            padding: '20px 0px 0px 0px',
            'background-repeat': 'repeat',
            'background-size': 'auto',
            'background-position': 'top center',
            border: 'none',
            direction: 'ltr',
            'text-align': 'center',
          },
          children: [
            {
              type: 'column',
              data: {
                value: {},
              },
              attributes: {
                padding: '0px 0px 0px 0px',
                border: 'none',
                'vertical-align': 'top',
              },
              children: [
                {
                  type: 'image',
                  data: {
                    value: {},
                  },
                  attributes: {
                    align: 'center',
                    height: 'auto',
                    padding: '10px 25px 10px 25px',
                    width: '150px',
                    src: 'https://i.postimg.cc/63Bzt8fw/Tabechoku-Tastin-collab.png',
                  },
                  children: [],
                },
                {
                  type: 'text',
                  data: {
                    value: {
                      content:
                        'この度は、#cookforJapn by 食べチョクのご利用ありがとうございます。<div>シェフからのメッセージをお楽しみください。</div>',
                    },
                  },
                  attributes: {
                    'font-size': '13px',
                    padding: '10px 25px 10px 25px',
                    'line-height': '1',
                    align: 'center',
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      data: {
        value: {
          noWrap: false,
        },
      },
      attributes: {
        padding: '20px 0px 20px 0px',
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'top center',
        border: 'none',
        direction: 'ltr',
        'text-align': 'center',
        'background-color': 'rgba(255, 255, 255, 1)',
      },
      children: [
        {
          type: 'column',
          data: {
            value: {},
          },
          attributes: {
            padding: '0px 0px 0px 0px',
            border: 'none',
            'vertical-align': 'top',
          },
          children: [
            {
              type: 'text',
              data: {
                value: {
                  content: '<b>飲み物にもこだわる大切さ</b>',
                },
              },
              attributes: {
                'font-size': '16px',
                padding: '10px 25px 10px 25px',
                'line-height': '1',
                align: 'left',
              },
              children: [],
            },
            {
              type: 'text',
              data: {
                value: {
                  content: '担当料理: 日本酒',
                },
              },
              attributes: {
                'font-size': '13px',
                padding: '0px 25px 0px 25px',
                'line-height': '1',
                align: 'left',
              },
              children: [],
            },
            {
              type: 'image',
              data: {
                value: {},
              },
              attributes: {
                align: 'center',
                height: 'auto',
                padding: '10px 25px 10px 25px',
                width: '1000px',
                src: 'https://i.postimg.cc/brF57GLv/image.png',
                href: 'https://soundcloud.com/kyle-comstock-126175966/food-podcast',
              },
              children: [],
            },
            {
              type: 'text',
              data: {
                value: {
                  content:
                    '日本酒と日本酒を育てた方や育った場所に寄り添い、新しいことも積極的に取り入れ実験し、挑戦なさる橋野さん。そんな橋野さんの味わい深くも、モダンなお考えや想い、ストーリーをお届けします。',
                },
              },
              attributes: {
                'font-size': '13px',
                padding: '10px 25px 10px 25px',
                'line-height': '1',
                align: 'left',
              },
              children: [],
            },
            {
              type: 'button',
              data: {
                value: {
                  content: '🎧視聴する',
                },
              },
              attributes: {
                align: 'center',
                'background-color': 'rgba(50, 73, 103, 1)',
                color: '#ffffff',
                'font-size': '13px',
                'font-weight': 'normal',
                'border-radius': '3px',
                padding: '10px 25px 10px 25px',
                'inner-padding': '10px 25px 10px 25px',
                'line-height': '120%',
                target: '_blank',
                'vertical-align': 'middle',
                border: 'none',
                'text-align': 'center',
                href: '#',
              },
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

describe('Test parseXml', () => {
  const instance = parseXMLtoBlock(mjmlText);

  it('should as expected', () => {
    expect(instance).toEqual(blockData);
  });
});
