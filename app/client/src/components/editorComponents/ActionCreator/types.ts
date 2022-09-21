import { SwitcherProps, TreeDropdownOption } from "design-system";
import React from "react";
import { FieldType, ViewTypes, Actions } from "./constants";

export type GenericFunction = (...args: any[]) => unknown;

export type Switch = {
  id: string;
  text: string;
  action: () => void;
};

export type ActionType = typeof Actions[keyof typeof Actions];

export type ViewType = typeof ViewTypes[keyof typeof ViewTypes];

export type ViewProps = {
  label: string;
  get: GenericFunction;
  set: GenericFunction;
  value: string;
};

export type SelectorViewProps = ViewProps & {
  options: TreeDropdownOption[];
  defaultText: string;
  getDefaults?: (value?: any) => any;
  displayValue?: string;
  selectedLabelModifier?: (
    option: TreeDropdownOption,
    displayValue?: string,
  ) => React.ReactNode;
  index?: number;
};

export type KeyValueViewProps = ViewProps;

export type TextViewProps = ViewProps & {
  index?: number;
  additionalAutoComplete?: Record<string, Record<string, unknown>>;
};

export type TabViewProps = Omit<ViewProps, "get" | "set"> & SwitcherProps;

export type FieldConfig = {
  getter: GenericFunction;
  setter: GenericFunction;
  view: ViewType;
};

export type FieldConfigs = Partial<Record<FieldType, FieldConfig>>;

export type ActionCreatorProps = {
  value: string;
  onValueChange: (newValue: string, isUpdatedViaKeyboard: boolean) => void;
  additionalAutoComplete?: Record<string, Record<string, unknown>>;
  pageDropdownOptions: TreeDropdownOption[];
};
