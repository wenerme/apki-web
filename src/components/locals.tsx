import { parseOriginNames, PkgName } from '../apk/parseOriginNames';

export function getPkgOrigins(): PkgName[] {
  if (typeof window === 'undefined') {
    return [];
  }
  if (window['_pkgs']) {
    return window['_pkgs'];
  }
  if (localStorage['names']) {
    return (window['_pkgs'] = parseOriginNames(
      localStorage['names']
        .trim()
        .split('\n')
        .map((v) => v.split(',')),
    ));
  }
  return [];
}

export function setPkgOrigins({ pkgs, names }) {
  window['_pkgs'] = pkgs;
  localStorage['names'] = names;
}
