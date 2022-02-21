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
  name: 'condition';
  templateGenerateFn: typeof generateConditionTemplate;
}

export class TemplateEngineManager {
  private static tags = {
    iteration: generateIterationTemplate,
    condition: generateConditionTemplate,
  };

  public static setTag(option: IterationTemplate | ConditionTemplate) {
    this.tags[option.name] = option.templateGenerateFn as any;
  }

  public static generateTagTemplate<
    T extends keyof typeof TemplateEngineManager['tags']
  >(name: T): typeof TemplateEngineManager['tags'][T] {
    return this.tags[name];
  }
}
