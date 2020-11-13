import React from 'react';
import { PkgName } from '../../apk/parsenNames';
import styled from 'styled-components';
import { PackageListAside } from '../package/PackageListAside';

const ContentDiv = styled.div`
  min-height: 100%;
  display: flex;
  > aside {
    width: 300px;
  }
  > main {
    flex: 1;
  }
`;
export const PackagesPageContent: React.FC<{ names: PkgName[] }> = ({ names }) => {
  return (
    <ContentDiv>
      <PackageListAside data={names} />
      <main></main>
    </ContentDiv>
  );
};
