export const getRouteI18nName = (path: string) => {
  return `nav.${path.replace(/\//g, ".")}`;
};

export const getRouteComponentName = (path: string) => {
  const removeSlash = path.replace("/", "");
  return `${removeSlash.replace(/\//g, "-")}`;
};
