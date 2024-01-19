import { NavLink } from "react-router-dom";
import { IRoute, ISidebarItem, UserRole } from "../types";

export const sidebarItemsGenerator = (items: IRoute[], role: UserRole) => {
  const sidebarItems = items.reduce((acc: ISidebarItem[], curr) => {
    if (curr.name && curr.path) {
      acc.push({
        key: curr.name,
        label: <NavLink to={`/${role}/${curr.path}`}>{curr.name}</NavLink>,
      });
    }

    if (curr.children) {
      acc.push({
        key: curr.name!,
        label: curr.name,
        children: curr.children.map((child) => ({
          key: child.name!,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
