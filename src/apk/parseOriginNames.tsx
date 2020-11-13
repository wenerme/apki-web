export interface PkgName {
  name: string;
  doc: boolean;
  dev: boolean;
  lib: boolean;
  lang: boolean;
  openrc: boolean;
  dbg: boolean;
  completion: boolean;
  origin: string;
}

export const PkgNameTags = ['doc', 'dev', 'lib', 'lang', 'openrc', 'dbg', 'completion'];

export function parseOriginNames(names: Array<string[]>): PkgName[] {
  const all = [];
  const len = names.length;
  for (let i = 0; i < len; i++) {
    const origin = names[i];
    for (const name of origin) {
      const p = {
        name,
        doc: name.endsWith('-doc'),
        dev: name.endsWith('-dev'),
        lib: name.endsWith('-libs') || name.endsWith('-libs-static'),
        lang: name.endsWith('-lang'),
        openrc: name.endsWith('-openrc'),
        dbg: name.endsWith('-dbg'),
        completion: name.endsWith('-bash-completion'),
        origin: origin[0],
      };
      all.push(p);
    }
  }
  return all;
}
