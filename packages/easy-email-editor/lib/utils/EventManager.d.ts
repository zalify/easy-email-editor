import { ActiveTabKeys } from '../components/Provider/BlocksProvider';
export declare class EventManager {
    private static events;
    static on(type: EventType.ACTIVE_TAB_CHANGE, callback: (payload: {
        currentTab: ActiveTabKeys;
        nextTab: ActiveTabKeys;
    }) => boolean): void;
    static off(type: EventType, handler: (...args: any[]) => any): void;
    static exec(type: EventType.ACTIVE_TAB_CHANGE, payload: {
        currentTab: ActiveTabKeys;
        nextTab: ActiveTabKeys;
    }): boolean;
}
export declare enum EventType {
    FOCUS_IDX_CHANGE = "focusIdxChange",
    ADD_BLOCK = "addBlock",
    REMOVE_BLOCK = "removeBlock",
    ACTIVE_TAB_CHANGE = "activeTabChange"
}
