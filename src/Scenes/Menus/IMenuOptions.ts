export interface IMenuOption {
    key: string;
    label: string;
    focused: boolean;
    action: () => void;
}