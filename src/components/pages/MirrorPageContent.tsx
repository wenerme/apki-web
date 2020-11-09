import React from 'react';
import { H2 } from '@blueprintjs/core';
import { MirrorTable } from '../mirror/MirrorTable';
import styled from 'styled-components';
import { MirrorDetail } from '../mirror/MirrorDetail';

const ContentDiv = styled.div`
  display: flex;

  > main {
    border-right: 1px solid #dcecff;
  }
  > aside {
    flex: 1;
  }
`;
export const MirrorPageContent: React.FC<{ mirrors?; mirror? }> = ({ mirrors = [], mirror }) => {
  return (
    <ContentDiv>
      <main>
        <H2 style={{ padding: 8 }}>AlpineLinux Mirrors</H2>
        <MirrorTable data={mirrors} />
      </main>
      <aside>{mirror && <MirrorDetail data={mirror} />}</aside>
    </ContentDiv>
  );
};
