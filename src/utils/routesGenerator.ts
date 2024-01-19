import { IPath, IRoute } from "../types";

export const routesGenerator = (routes: IRoute[]) => {
  const generatedRoutes = routes.reduce((acc: IPath[], curr) => {
    if (curr.index) {
      acc.push({
        index: curr.index,
        element: curr.element,
      });
    }

    if (curr.path && curr.element) {
      acc.push({
        path: curr.path,
        element: curr.element,
      });
    }

    if (curr.children) {
      curr.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);

  return generatedRoutes;
};
