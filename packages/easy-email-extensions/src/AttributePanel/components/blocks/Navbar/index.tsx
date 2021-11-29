import React from 'react';
import {
  ColorPickerField,
  EditTabField,
  SelectField,
  TextField,
} from '@extensions/components/Form';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import { NavbarLinkPadding } from '@extensions/AttributePanel/components/attributes/NavbarLinkPadding';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { INavbar } from 'easy-email-core';

export function Navbar() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header='Layout'>
          <Stack vertical spacing='tight'>
            <Align />
          </Stack>
        </Collapse.Item>

        <Collapse.Item
          contentStyle={{ padding: 0 }}
          name='1'
          header='Navbar links'
        >
          <EditTabField
            tabPosition='top'
            name={`${focusIdx}.data.value.links`}
            label='Links'
            labelHidden
            renderItem={(item, index) => (
              <NavbarLink item={item} index={index} />
            )}
            additionItem={{
              src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
              target: '_blank',
              content: 'New link',
              color: '#1890ff',
              'font-size': '13px',
            }}
          />
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}

function NavbarLink({
  item,
  index,
}: {
  item: INavbar['data']['value']['links'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  return (
    <Stack vertical spacing='tight'>
      <TextField
        label='Content'
        name={`${focusIdx}.data.value.links.[${index}].content`}
      />
      <Stack wrap={false}>
        <div style={{ width: 65 }}>
          <TextField
            label='Font size'
            name={`${focusIdx}.data.value.links.[${index}].font-size`}
          />
        </div>

        <Stack.Item fill>
          <ColorPickerField
            label='Color'
            name={`${focusIdx}.data.value.links.[${index}].color`}
            alignment='center'
          />
        </Stack.Item>
      </Stack>

      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            prefix={<IconLink />}
            label={<span>Href</span>}
            name={`${focusIdx}.data.value.links.[${index}].href`}
          />
        </Stack.Item>

        <SelectField
          style={{ minWidth: 65 }}
          label='Target'
          name={`${focusIdx}.data.value.links.[${index}].target`}
          options={[
            {
              value: '_blank',
              label: '_blank',
            },
            {
              value: '_self',
              label: '_self',
            },
          ]}
        />
      </Stack>

      <NavbarLinkPadding
        key={index}
        name={`${focusIdx}.data.value.links.[${index}].padding`}
      />
    </Stack>
  );
}
