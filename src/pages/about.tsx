import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';

import 'normalize.css/normalize.css';
import { AboutPageContent } from '../components/pages/AboutPageContent';
import { CenterPageContent } from '../components/CenterPageContent';

const AboutPage: React.FC = () => {
  return (
    <MainFrameLayout>
      <CenterPageContent>
        <AboutPageContent />
      </CenterPageContent>
    </MainFrameLayout>
  );
};

export default AboutPage;
