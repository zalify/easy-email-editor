import { blocks } from '../components/blocks';
import { ReactNode } from 'react';
import { DefaultAttributePanel } from '../components/blocks/dummy';

type ObjectComponent = { [key: string]: (...args: any) => ReactNode; };

export class BlockAttributeConfigurationManager {
  private static map: ObjectComponent = { ...blocks };

  public static add(componentMap: ObjectComponent) {
    Object.keys(componentMap).forEach(name => {
      this.map[name] = componentMap[name];
    });
  }

  public static get<T extends ObjectComponent>(name: keyof T): () => JSX.Element | null {
    if (!(this.map as any)[name]) {
      return DefaultAttributePanel;
    }
    return (this.map as any)[name];
  }

  public static getMap() {
    return this.map;
  }
}
