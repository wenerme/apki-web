export interface Package {
  branch: string;
  repo: string;
  arch: string;
  name: string;
  version: string;
  size;
  installSize;
  description: string;
  url: string;
  license: string;
  origin: string;
  buildTime: string;
  commit: string;

  key;
  path;
  depends: string[];
  provides: string[];
  installIf: string[];

  maintainerName;
}
