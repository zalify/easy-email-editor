interface Options {
    limit?: number;
    accept?: string;
    minSize?: number;
    maxSize?: number;
    autoUpload?: boolean;
}
export declare type UploadItem = {
    idx: string;
    url: string;
    status: 'pending' | 'done' | 'error';
};
export declare type UploaderEventMap = {
    start: (data: UploadItem[]) => void;
    progress: (data: UploadItem[]) => void;
    end: (data: UploadItem[]) => void;
};
export declare type UploaderServer = (file: File) => Promise<string>;
export declare class Uploader {
    private options;
    private el;
    private uploadServer;
    private handler;
    constructor(uploadServer: UploaderServer, options: Options);
    private createInput;
    uploadFiles(files: File[]): Promise<void>;
    private uploadFile;
    private checkFile;
    private checkTypes;
    private checkSize;
    chooseFile(): void;
    on<K extends keyof UploaderEventMap>(event: K, fn: UploaderEventMap[K]): void;
    off<K extends keyof UploaderEventMap>(event: K, fn: UploaderEventMap[K]): void;
}
export {};
