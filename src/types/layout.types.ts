import { ReactNode } from "react";

export interface IPath {
  index?: boolean;
  path?: string;
  element: ReactNode;
}

export interface IRoute {
  index?: boolean;
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: IRoute[];
}

export interface ISidebarItem {
  key: string;
  label: ReactNode;
  children?: ISidebarItem[];
}
