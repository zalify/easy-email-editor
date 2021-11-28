import { blocks } from '../components/blocks';

type ObjectComponent = { [key: string]: () => JSX.Element | null; };

export class BlockAttributeConfigurationManager {
  private static map: ObjectComponent = { ...blocks };

  public static add(componentMap: ObjectComponent) {
    Object.keys(componentMap).forEach(name => {
      this.map[name] = componentMap[name];
    });
  }

  public static get<T extends ObjectComponent>(name: keyof T): string {
    return (this.map as any)[name];
  }

  public static getMap() {
    return this.map;
  }

}

