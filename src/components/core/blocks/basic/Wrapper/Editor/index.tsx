import React from 'react';
import { ISection } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';
import mhmlHtml from 'mjml-browser';

console.log(mhmlHtml(
  `

  <mjml>
  <mj-head>
    <mj-breakpoint width="0px" />
  </mj-head>
  <mj-body background-color="#f0f0f0">
    <!-- Header begin -->
    <mj-section padding="0">
      <mj-column>
        <mj-image width="275px" height="40px" src="https://assets.aftership.com/img/logos/traffic_logo_main.png" />
      </mj-column>
    </mj-section>
    <!-- Header end -->
    <!-- main content header begin -->
    <mj-section padding="30px 0px" background-color="#fff" background-url="https://assets.aftership.com/img/trafficreport.png">
      <mj-column width="100%">
        <mj-text align="center" padding="0" font-size="32px" font-weight="bold" line-height="40px"> Your weekly report </mj-text>
      </mj-column>
      <mj-column width="100%">
        <mj-spacer height="10px" />
      </mj-column>
      <mj-column width="100%">
        <mj-text align="center" padding="0" color="#212b36" font-size="18px" line-height="27px"> Hi {username}, here’s your weekly summary for </mj-text>
        <mj-text align="center" padding="0" font-size="18px" font-weight="bold" line-height="27px" color="#ff2368"> Nov 12 - Nov 19 </mj-text>
      </mj-column>
    </mj-section>
    <!-- main content header end -->
    <!-- data report  begin -->
    <mj-section padding-top="54px" background-color="#fff">
      <mj-group>
        <mj-column>
          <mj-text align="center" padding="0" font-size="25px" line-height="35px" color="#181818" font-weight="bold">2,320,908</mj-text>
          <mj-text align="center" padding="0" font-size="14px" line-height="21px" color="#999999">Impressions </mj-text>
        </mj-column>
        <mj-column>
          <mj-text align="center" padding="0" font-size="25px" line-height="35px" color="#181818" font-weight="bold">2,369,627</mj-text>
          <mj-text align="center" padding="0" font-size="14px" line-height="21px" color="#999999">Clicks </mj-text>
        </mj-column>
        <mj-column>
          <mj-text align="center" padding="0" font-size="25px" line-height="35px" color="#181818" font-weight="bold">0.03%</mj-text>
          <mj-text align="center" padding="0" font-size="14px" line-height="21px" color="#999999">Click through rate </mj-text>
        </mj-column>
      </mj-group>
    </mj-section>
    <!-- data report  end -->
    <!-- view data  begin -->
    <mj-section padding-top="0" padding-left="0" padding-right="0" padding-bottom="30px" background-color="#fff">
      <mj-column width="100%">
        <mj-button width="240px" font-family="Helvetica" background-color="#ff2368" color="white" href="https://release-incy-admin.automizelyads.io/?utm_source=weeklyport&utm_medium=email"> View data </mj-button>
        <mj-spacer height="18px" />
      </mj-column>
      <mj-column width="100%">
        <mj-text align="center" padding="0" font-size="16px" line-height="24px" color="#222222"> Feel free to contact our support ream available 24/7 via <a href="https://go.crisp.chat/chat/embed/?website_id=2f96bb7a-9efb-4b7c-983a-e9e8c65d6d46" style="color:#0e70bc">live chat</a> if </mj-text>
        <mj-text align="center" padding="0" font-size="16px" line-height="24px" color="#222222"> you have any questions. </mj-text>
      </mj-column>
    </mj-section>
    <!-- view data  end -->
    <mj-section background-color="#fff">
      <mj-column width="100%">
        <mj-divider padding="0" border-width="1px" border-color="lightgrey" />
      </mj-column>
    </mj-section>
    <mj-section background-color="#fff">
      <mj-column width="100%">
        <mj-text align="center" padding="0" font-size="16px" line-height="24px" color="#222222"> How's your experience with our app? Share your feedback with us </mj-text>
        <mj-text align="center" padding="0" font-size="16px" line-height="24px" color="#222222"> now 😊 </mj-text>
      </mj-column>
    </mj-section>
    <!-- feedback  begin -->
    <mj-section background-color="#fff" padding="0" padding-bottom="60px">
      <mj-group width="200px">
        <mj-column>
          <mj-image padding="0" width="40px" height="40px" src="https://assets.aftership.com/img/logos/pink-star.png" href="https://help.automizely.com/hc/en-us/requests/new#_ga=2.139742519.528131699.1616404755-1211566553.1615362269" />
        </mj-column>
        <mj-column>
          <mj-image padding="0" width="40px" height="40px" src="https://assets.aftership.com/img/logos/pink-star.png" href="https://help.automizely.com/hc/en-us/requests/new#_ga=2.139742519.528131699.1616404755-1211566553.1615362269" />
        </mj-column>
        <mj-column>
          <mj-image padding="0" width="40px" height="40px" src="https://assets.aftership.com/img/logos/pink-star.png" href="https://help.automizely.com/hc/en-us/requests/new#_ga=2.139742519.528131699.1616404755-1211566553.1615362269" />
        </mj-column>
        <mj-column>
          <mj-image padding="0" width="40px" height="40px" src="https://assets.aftership.com/img/logos/pink-star.png" href="https://help.automizely.com/hc/en-us/requests/new#_ga=2.139742519.528131699.1616404755-1211566553.1615362269" />
        </mj-column>
        <mj-column>
          <mj-image padding="0" width="40px" height="40px" src="https://assets.aftership.com/img/logos/pink-star.png" href="https://apps.shopify.com/automizely-ads#modal-show=ReviewListingModal&utm_source=cv&utm_medium=leavereview" />
        </mj-column>
      </mj-group>
    </mj-section>
    <!-- feedback  end -->
    <!-- footer  begin -->
    <!-- social media  begin -->
    <mj-section padding-bottom="0" padding-top="42px">
      <mj-group width="160px">
        <mj-column>
          <mj-image padding="0" width="14px" src="https://assets.aftership.com/img/facebook.png" href="http://click.aftership.com/ls/click?upn=JYWWYj-2FtEr6I-2BBxW8lsoCBZsldvyOz9-2FJx9he2T27i72dnIM6zhlW-2BMjQ7Re9d9xvLRJ_LbjaBT0g9oqDxRrz27jZzGrgHRt-2BcqaohLvSGaG9KdKxIizlNuhP2UaiC-2BcXMezQ9aYoSO7jV3WDsaPlhSHzGyn2usN8pxf3py0hd18Y3aaWJpmSnE-2FJ9hKwlWjTBXPAcTTE5CRB-2F12XTEed8TSSiuU-2FIrVdLFT0ycjgYR8MdpB96ubrkIQQ-2FdIZVWU8x8UJ0mPvZwJ3fA9zDw2KTa7GYHyApzJ3ruuXhdRRMRurSs0-3D" />
        </mj-column>
        <mj-column>
          <mj-image padding="0" width="32px" src="https://assets.aftership.com/img/twitter.png" href="http://click.aftership.com/ls/click?upn=JYWWYj-2FtEr6I-2BBxW8lsoCIcOhV-2Ba-2FT2APJVu6jnqYs6ftN-2BdqUNfdJZUTpRQNKjAyKQL_LbjaBT0g9oqDxRrz27jZzGrgHRt-2BcqaohLvSGaG9KdKxIizlNuhP2UaiC-2BcXMezQ9aYoSO7jV3WDsaPlhSHzG8MAMGDAj1KvOZ-2FLzehmihKTyEPfgAwbSk1sd8Ipx-2F8MjmNH66c9YCFDwR4HbEHf5wQu52fMmKbqLECBCTBIhRMjac9U76YcjKEcLa5aBusBm-2FRaLFOyPErmWMr0lc5f3DBfqQvs3pxqgs23-2BA78BrU-3D" />
        </mj-column>
        <mj-column>
          <mj-image padding="0" width="28px" src="https://assets.aftership.com/img/instagram.png" href="http://click.aftership.com/ls/click?upn=JYWWYj-2FtEr6I-2BBxW8lsoCCkk4zBfwe8w2aqe4NXG5QnMdVkwevMPiTB3hOTdjCX1fz70_LbjaBT0g9oqDxRrz27jZzGrgHRt-2BcqaohLvSGaG9KdKxIizlNuhP2UaiC-2BcXMezQ9aYoSO7jV3WDsaPlhSHzGyIv6dkkYdWsqoOWLk4HwAPmvqrnoVfwGy1ADMH0IxccpwSgRJk-2FUVaHPHhglKkOcjZ1HtXBagSN30lfmMFxrohO1XXlUILsaBmlQTc9rVEQVCq9RnQ-2BZICSGDVWXpM45h4IrgVrCoKYEQ6ph3BFGu4-3D" />
        </mj-column>
      </mj-group>
    </mj-section>
    <!-- social media  end -->
    <!-- copyright  begin -->
    <mj-section>
      <mj-column>
        <mj-text align="center" padding="0" font-size="14px" line-height="20px" color="#212b36">
          <a href="https://go.crisp.chat/chat/embed/?website_id=2f96bb7a-9efb-4b7c-983a-e9e8c65d6d46" style="color: #212b36; text-decoration: none">Contact us</a>
          |
          <a href="[unsubscribe]" style="color: #212b36; text-decoration: none">Unsubscribe</a>
        </mj-text>
        <mj-text align="center" padding="0" font-size="14px" line-height="20px" color="#212b36">
          © 2021 Automizely
        </mj-text>
      </mj-column>
    </mj-section>
    <!-- copyright  end -->
    <!-- footer  end -->
  </mj-body>
</mjml>
  `
));

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value, value: { attribute } }] = useField<ISection>(props.idx);
  return (
    <EditBlockWrapper idx={props.idx}>
      <div style={{
        backgroundColor: attribute['background-color'],
        backgroundRepeat: attribute['background-repeat'],
        backgroundPosition: attribute['background-position'],
        backgroundSize: attribute['background-size'],
        backgroundImage: attribute['background-url'] ? `url(${attribute['background-url']})` : undefined,
        maxWidth: attribute['max-width'],
      }}
      >
        <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{
                direction: attribute.direction,
                fontSize: '0px',
                paddingTop: attribute['padding-top'],
                paddingBottom: attribute['padding-bottom'],
                paddingLeft: attribute['padding-left'],
                paddingRight: attribute['padding-right'],
                textAlign: attribute['text-align'],
                border: attribute.border,
                borderRadius: attribute['border-radius']
              }}
              >
                {value.children.map((item, index) => {
                  const childIndex = `${props.idx}.children.[${index}]`;
                  return <EditorItem key={childIndex} idx={childIndex} />;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </EditBlockWrapper>
  );
}
