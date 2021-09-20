import React from 'react';
import { Stack } from '@/components/UI/Stack';
import {
  ColorPickerField,
  EditTabField,
  SelectField,
  TextField,
} from '@/components/core/Form';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { LinkOutlined } from '@ant-design/icons';
import { INavbar } from '.';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';
import { NavbarLinkPadding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/NavbarLinkPadding';

export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2']}>

        <Collapse.Panel key="0" header="Layout">
          <Stack vertical spacing="tight">
            <Align />
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key="1" header="Navbar links">
          <EditTabField
            tabPosition="left"
            name={`${focusIdx}.data.value.links`}
            label='Links'
            renderItem={(item, index) => <NavbarLink item={item} index={index} />}
            additionItem={{
              src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
              target: '_blank',
              content: 'New link',
              color: '#1890ff',
              'font-size': '13px',
            }}
          />
        </Collapse.Panel>

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
    <Stack vertical spacing="tight">
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
            prefix={<LinkOutlined />}
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
