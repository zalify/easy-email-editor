import { render } from 'react-dom';
import React from 'react';
import App from './App';
import { UserStorage } from './utils/user-storage';
import { message } from 'antd';
import 'antd/dist/antd.css';

UserStorage.getAccount()
  .then(() => {
    render(<App />, document.getElementById('root'));
  })
  .catch((err) => message.error(err.message));

import {
  JsonToMjml,
  components,
  parseReactBlockToBlockData,
} from 'easy-email-core';

const { Page, Section, Column, Text, Button } = components;

const blockData = parseReactBlockToBlockData(
  <Page>
    <Section>
      <Column>
        <Text
          padding='20px'
          color='#ffffff'
          font-family='Helvetica'
          align='center'
          font-size='45px'
          line-height='45px'
          font-weight='900'
        >
          GO TO SPACE
        </Text>
        <Button href='https://mjml.io/' align='center'>
          ORDER YOUR TICKET NOW
        </Button>
      </Column>
    </Section>
  </Page>
);

console.log(blockData);
console.log(
  JsonToMjml({
    data: blockData,
    mode: 'production',
  })
);
