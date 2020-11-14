import React, { useEffect, useMemo } from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { GetStaticProps } from 'next';
import { api } from '../api/api';
import { PackagesPageContent } from '../components/pages/PackagesPageContent';
import { parseOriginNames } from '../apk/parseOriginNames';
import { setPkgOrigins } from '../components/locals';

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
    setPkgOrigins({ pkgs, names });
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
