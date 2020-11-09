import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { IndexPageContent } from '../components/pages/IndexPageContent';
import { CenterPageContent } from '../components/CenterPageContent';

const IndexPage: React.FC<{ name; data }> = ({ name, data }) => {
  return (
    <MainFrameLayout>
      <CenterPageContent>
        <IndexPageContent />
      </CenterPageContent>
    </MainFrameLayout>
  );
};

export default IndexPage;
