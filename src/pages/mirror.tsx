import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { MirrorPageContent } from '../components/pages/MirrorPageContent';

const MirrorPage: React.FC = () => {
  return (
    <MainFrameLayout>
      <MirrorPageContent />
    </MainFrameLayout>
  );
};

export default MirrorPage;
