import React from 'react';
import { H2, H3 } from '@blueprintjs/core';
import { MirrorTable } from '../mirror/MirrorTable';
import styled from 'styled-components';

const ContentDiv = styled.div`
  display: flex;

  > aside {
    flex: 1;
  }
`;
export const MirrorPageContent: React.FC<{ mirrors? }> = ({ mirrors }) => {
  return (
    <div>
      <H2 style={{ padding: 8 }}>AlpineLinux Mirrors</H2>
      <ContentDiv>
        <div>
          <main>
            <MirrorTable data={mirrors} />
          </main>
        </div>
        <aside>
          <H3>Mirror Status</H3>
        </aside>
      </ContentDiv>
    </div>
  );
};
