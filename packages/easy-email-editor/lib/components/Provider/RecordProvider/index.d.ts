import { IEmailTemplate } from '../../../typings';
import React from 'react';
export declare type RecordStatus = 'add' | 'redo' | 'undo' | undefined;
export declare const RecordContext: React.Context<{
    records: Array<IEmailTemplate>;
    redo: () => void;
    undo: () => void;
    reset: () => void;
    redoable: boolean;
    undoable: boolean;
}>;
export declare const RecordProvider: React.FC<{}>;
