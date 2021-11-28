
type ObjectString = { [key: string]: string; };

export class ImageManager {
  private static map: ObjectString = {};
  private static overrideMap: { [key: string]: boolean; } = {};

  public static add(imgMap: ObjectString) {
    Object.keys(imgMap).forEach(name => {
      if (this.map[name]) {
        this.overrideMap[name] = true;
      }
      this.map[name] = imgMap[name];
    });
  }

  public static get<T extends ObjectString>(name: keyof T): string {
    return (this.map as any)[name];
  }

  public static getOverrideMap() {
    return this.overrideMap;
  }

}

