import { IEmailTemplate } from '../typings';
export declare function useEditorContext(): {
    formState: import("final-form").FormState<IEmailTemplate, Partial<IEmailTemplate>>;
    formHelpers: import("final-form").FormApi<Record<string, any>, Partial<Record<string, any>>>;
    initialized: boolean;
    setInitialized: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    pageData: import("../easy-email-core/lib").IPage;
};
