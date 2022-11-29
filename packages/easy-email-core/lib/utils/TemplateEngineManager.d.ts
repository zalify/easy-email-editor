import { AdvancedBlock } from '../blocks/advanced/generateAdvancedBlock';
import React from 'react';
declare function generateIterationTemplate(option: NonNullable<AdvancedBlock['data']['value']['iteration']>, content: React.ReactElement): JSX.Element;
declare function generateConditionTemplate(option: NonNullable<AdvancedBlock['data']['value']['condition']>, content: React.ReactElement): JSX.Element;
interface IterationTemplate {
    name: 'iteration';
    templateGenerateFn: typeof generateIterationTemplate;
}
interface ConditionTemplate {
    name: 'condition';
    templateGenerateFn: typeof generateConditionTemplate;
}
export declare class TemplateEngineManager {
    private static tags;
    static setTag(option: IterationTemplate | ConditionTemplate): void;
    static generateTagTemplate<T extends keyof typeof TemplateEngineManager['tags']>(name: T): typeof TemplateEngineManager['tags'][T];
}
export {};
