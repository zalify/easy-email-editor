declare type ObjectComponent = {
    [key: string]: () => JSX.Element | null;
};
export declare class BlockAttributeConfigurationManager {
    private static map;
    static add(componentMap: ObjectComponent): void;
    static get<T extends ObjectComponent>(name: keyof T): () => JSX.Element | null;
    static getMap(): ObjectComponent;
}
export {};
