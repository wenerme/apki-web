import React, { useEffect, useMemo } from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { GetStaticProps } from 'next';
import { api } from '../api/api';
import { PackagesPageContent } from '../components/pages/PackagesPageContent';
import { parseOriginNames } from '../apk/parseOriginNames';

const PackagePage: React.FC<{ names?: string }> = ({ names = '' }) => {
  const pkgs = useMemo(() => {
    return parseOriginNames(
      names
        .trim()
        .split('\n')
        .map((v) => v.split(',')),
    );
  }, [names]);
  useEffect(() => {
    window['_pkgs'] = pkgs;
  }, [names]);
  return (
    <MainFrameLayout>
      <PackagesPageContent names={pkgs} />
    </MainFrameLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const names = await api('packages/origins.txt');
  return {
    props: {
      names,
    },
  };
};

export default PackagePage;
