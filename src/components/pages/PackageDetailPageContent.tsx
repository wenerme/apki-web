import React, { useMemo } from 'react';
import { H3 } from '@blueprintjs/core';
import styled from 'styled-components';
import _ from 'lodash';

const ContentDiv = styled.div`
  > header {
    padding: 8px;
  }
`;

const orders = {
  branch: Object.fromEntries(
    [
      'edge',
      'v3.12',
      'v3.11',
      'v3.10',
      'v3.9',
      'v3.8',
      'v3.7',
      'v3.6',
      'v3.5',
      'v3.4',
      'v3.3',
      'v3.2',
      'v3.1',
      'v3.0',
    ].map((v, i) => [v, i]),
  ),
};

export const PackageDetailPageContent: React.FC<{ packages }> = ({ packages: originPackages }) => {
  const packages = useMemo(() => {
    return _.sortBy(originPackages, [({ branch }) => orders.branch[branch] || -1, ({ arch }) => arch]);
  }, [originPackages]);
  const name = packages[0].name;
  return (
    <ContentDiv>
      <header>
        <H3>{name}</H3>
      </header>
      <main>
        <table className="bp3-html-table bp3-interactive bp3-html-table-striped">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Arch</th>
              <th>Repository</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((v) => {
              const { key, branch, arch, repo, version } = v;
              return (
                <tr key={key}>
                  <td>{branch}</td>
                  <td>{arch}</td>
                  <td>{repo}</td>
                  <td>{version}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </ContentDiv>
  );
};
