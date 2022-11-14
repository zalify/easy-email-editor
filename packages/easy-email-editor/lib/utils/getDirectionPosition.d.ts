export declare type DirectionPosition = {
    horizontal: {
        direction: string;
        isEdge: boolean;
    };
    vertical: {
        direction: string;
        isEdge: boolean;
    };
};
export declare function getDirectionPosition(ev: {
    target: EventTarget | null;
    clientY: number;
    clientX: number;
}, deviation?: number): DirectionPosition;
