import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { ApkPageContent } from '../components/pages/ApkPageContent';

const ApkPage: React.FC = () => {
  return (
    <MainFrameLayout>
      <ApkPageContent />
    </MainFrameLayout>
  );
};

export default ApkPage;
