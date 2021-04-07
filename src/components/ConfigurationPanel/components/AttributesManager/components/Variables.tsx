import React from 'react';
import { TreeSelectField } from '@/components/core/Form';
import { variables } from '@/config/variables';
import { getFormatVariable } from '@/utils/variables';
import { useBlock } from '@/hooks/useBlock';

const options = variables.map(item => ({
  value: item.name,
  label: item.label,
  selectable: item.name === 'none',
  options: item.variables.map(variable => ({
    value: getFormatVariable(item.name, variable.name),
    label: variable.label,
  }))
}));

export function Variables() {
  const { focusIdx } = useBlock();
  return (

    <TreeSelectField title="Variable"
      treeDefaultExpandAll
      style={{ width: '100%' }} label='Variable'
      name={`${focusIdx}.data.variable`}
      inline options={options}

    />

  );
}
