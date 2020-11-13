import React from 'react';
import { PkgName } from '../../apk/parseOriginNames';
import styled from 'styled-components';
import { PackageListAside } from '../package/PackageListAside';
import { PackageNameStats } from '../package/PackageNameStats';
import { NamedPackageList } from '../package/NamedPackageList';

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
export const PackagesPageContent: React.FC<{ names?: PkgName[]; packages? }> = ({ names, packages }) => {
  return (
    <ContentDiv>
      {Boolean(names.length) && <PackageListAside data={names} />}
      <main>
        {!packages && <PackageNameStats data={names} />}
        {packages && <NamedPackageList packages={packages} />}
      </main>
    </ContentDiv>
  );
};
