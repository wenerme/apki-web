import React from 'react';
import styled from 'styled-components';

const ContentDiv = styled.div`
  max-width: 960px;
  margin: 0 auto;
  border: #99bbc1 1px solid;
  border-top: none;
  border-bottom: none;
  padding: 8px 16px 16px;
`;

export const CenterPageContent: React.FC = ({ children }) => {
  return <ContentDiv className={'bp3-elevation-1'}>{children}</ContentDiv>;
};
