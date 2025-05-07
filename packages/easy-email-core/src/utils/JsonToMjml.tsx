import { html } from 'js-beautify';
import { renderToStaticMarkup } from 'react-dom/server';
import { BlockManager } from '@core/utils';
import { JsonToMjmlOption } from './isProductionMode';
import React, { useContext } from 'react';
import { IBlockData } from '@core/typings';
import { unescape } from 'he';

type EmailRenderProps = {
  children?: React.ReactNode;
  context?: IBlockData;
  dataSource?: Record<string, any>;
  mode: 'production' | 'testing';
};

const EmailRenderContext = React.createContext<EmailRenderProps>({} as any);

const EmailRenderProvider: React.FC<EmailRenderProps> = props => {
  return (
    <EmailRenderContext.Provider value={props}>
      {props.children}
    </EmailRenderContext.Provider>
  );
};

export function JsonToMjml(options: JsonToMjmlOption): string {
  const { data, beautify } = options;
  const block = BlockManager.getBlockByType(data.type);
  if (!block) {
    throw new Error(`Block ${data.type} not found`);
  }
  const mjmlString = unescape(
    renderToStaticMarkup(
      <EmailRenderProvider
        dataSource={options.dataSource}
        mode={options.mode}
        context={options.context}
      >
        {block.render(options)}
      </EmailRenderProvider>,
    ),
  );
  if (beautify) {
    return html(mjmlString, { indent_size: 2 });
  }
  return mjmlString;
}

export const useEmailRenderContext = () => {
  return useContext(EmailRenderContext);
};
