import { AdvancedBlock } from '@core/blocks/advanced/generateAdvancedContentBlock';
import { Template, Raw } from '@core/components';
import React from 'react';

function generateIterationTemplate(
  option: AdvancedBlock['data']['value']['iteration'],
  content: React.ReactElement
) {
  return (
    <Template>
      <Raw>{`{% for ${option.itemName} in ${option.dataSource} ${
        option.limit ? `limit:${option.limit}` : ''
      } %}`}</Raw>
      {content}
      <Raw>{`{% endfor %}`}</Raw>
    </Template>
  );
}

function generateConditionTemplate(
  option: AdvancedBlock['data']['value']['condition'],
  content: React.ReactElement
) {
  return (
    <Template>
      <Raw>{`{% if ${option} %}`}</Raw>
      {content}
      <Raw>{`{% endif %}`}</Raw>
    </Template>
  );
}

interface IterationTemplate {
  name: 'iteration';
  templateGenerateFn: typeof generateIterationTemplate;
}

interface ConditionTemplate {
  name: 'iteration';
  templateGenerateFn: typeof generateIterationTemplate;
}

export class TemplateEngineManager {
  private static tags = {
    iteration: generateIterationTemplate,
    condition: generateIterationTemplate,
  };

  public static setTag(option: IterationTemplate | ConditionTemplate) {
    this.tags[option.name] = option.templateGenerateFn;
  }

  public static generateTagTemplate(
    name: keyof typeof TemplateEngineManager['tags']
  ) {
    return this.tags[name];
  }
}
