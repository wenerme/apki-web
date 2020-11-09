import React from 'react';
import styled from 'styled-components';
import { PackageList } from '../package/PackageList';

const ContentDiv = styled.div``;
export const PackagePageContent: React.FC<{ packages? }> = ({ packages = [] }) => {
  return (
    <ContentDiv>
      <main>
        <PackageList data={packages} />
      </main>
    </ContentDiv>
  );
};
