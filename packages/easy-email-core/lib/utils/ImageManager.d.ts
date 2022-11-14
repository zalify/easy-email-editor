declare type ObjectString = {
    [key: string]: string;
};
export declare class ImageManager {
    private static map;
    private static overrideMap;
    static add(imgMap: ObjectString): void;
    static get<T extends ObjectString>(name: keyof T): string;
    static getOverrideMap(): {
        [key: string]: boolean;
    };
}
export {};
