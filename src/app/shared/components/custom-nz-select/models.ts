export interface GroupedOption {
  label: string;
  options: {
    label: string;
    value: any;
    disabled?: boolean;
  }[];
}
