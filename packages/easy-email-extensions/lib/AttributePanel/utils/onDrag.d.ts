export declare const isMouseEvent: (event: MouseEvent | TouchEvent) => event is MouseEvent;
/**
 *
 * @param event
 */
export declare const onDrag: ({ event, onMove, onEnd, }: {
    event: TouchEvent | MouseEvent;
    onMove: (x: number, y: number) => void;
    onEnd?: (() => void) | undefined;
}) => void;
