import React, { useEffect, useMemo } from 'react';
import { Divider, H3, H4, Tab, Tabs } from '@blueprintjs/core';
import _ from 'lodash';
import { orders } from '../../apk/sorts';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import { Package } from './interfaces';
import { PackageDetailPanel } from './PackageDetailPanel';
import { usePrefer } from '../prefers';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ContentDiv = styled.div`
  padding: 0 8px;
  > header {
    padding: 8px 12px 12px;
    display: flex;

    .bp3-heading {
      margin: 0;
    }
  }
`;
export const NamedPackageList: React.FC<{ packages: any[]; branch?; arch? }> = ({ packages }) => {
  const pkg = useMemo(() => parseNamedPackages(packages), [packages]);
  const [pref, updatePref] = usePrefer();
  const router = useRouter();

  const [state, update] = useImmer<{ branch: string; arch: string }>(() => {
    return {
      branch: String(router.query.branch || pref.branch || pkg.branch),
      arch: String(router.query.arch || pref.arch || pkg.arch),
    };
  });

  useEffect(() => {
    const { arch, branch } = state;
    updatePref({ arch, branch });
  }, [state.branch, state.arch]);

  return (
    <ContentDiv>
      <header>
        <H3>{pkg.name}</H3>
        <Divider />
      </header>
      <main>
        <div>
          <H4>Package Matrix</H4>
          <Divider />
          <div style={{ paddingLeft: 65 }}>
            <Tabs
              selectedTabId={state.arch}
              onChange={(v) => {
                update((s) => {
                  s.arch = String(v);
                });
              }}
              large
            >
              {pkg.arches.map((v) => {
                return (
                  <Tab
                    id={v}
                    key={v}
                    title={
                      <Link href={`/packages/${pkg.name}/${state.branch}/${v}`}>
                        <a>{v}</a>
                      </Link>
                    }
                    disabled={!Boolean(pkg.byBranchArch[`${state.branch}/${v}`])}
                  />
                );
              })}
            </Tabs>
          </div>
          <Tabs
            vertical
            selectedTabId={state.branch}
            onChange={(v) => {
              update((s) => {
                s.branch = String(v);
              });
            }}
            large
          >
            {pkg.branches.map((v) => {
              return (
                <Tab
                  id={v}
                  key={v}
                  title={
                    <Link href={`/packages/${pkg.name}/${v}/${state.arch}`}>
                      <a>{v}</a>
                    </Link>
                  }
                  disabled={!Boolean(pkg.byBranchArch[`${v}/${state.arch}`])}
                  panel={<PackageDetailPanel pkg={pkg.byBranchArch[`${state.branch}/${state.arch}`]} />}
                />
              );
            })}
          </Tabs>
        </div>
      </main>
    </ContentDiv>
  );
};

function parseNamedPackages(pkgs: Package[]): PackageProcessed {
  const pkg = {
    ...pkgs[0],
    branches: _.sortBy(_.uniq(pkgs.map((v) => v.branch)), [(v: string) => orders.branch[v]]),
    arches: _.uniq(pkgs.map((v) => v.arch)).sort(),
    byBranchArch: Object.fromEntries(pkgs.map((v) => [`${v.branch}/${v.arch}`, v])),
  };

  return pkg;
}

interface PackageProcessed extends Package {
  branches: string[];
  arches: string[];
  byBranchArch: Record<string, Package>;
}
