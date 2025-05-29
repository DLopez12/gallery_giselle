// src/utils/lazyRoute.js
export function lazyRoute(routeImport) {
  return {
    lazy: async () => {
      const { default: Component, ...rest } = await routeImport();
      return { Component, ...rest };
    }
  };
}