import React from 'react';
import { MainFrameLayout } from '../../components/MainFrameLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from '../../api/api';
import { PackagesPageContent } from '../../components/pages/PackagesPageContent';
import { getPkgOrigins } from '../../components/locals';

const PackageDetailPage: React.FC<{ packages? }> = ({ packages }) => {
  return (
    <MainFrameLayout>
      <PackagesPageContent names={getPkgOrigins()} packages={packages} />
    </MainFrameLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: { name } }) => {
  const data = await api(`packages/${name}`);
  return {
    props: {
      packages: data,
    },
    // 15m
    revalidate: 15 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['libpq', 'mariadb', 'go'], // demo only
    fallback: 'blocking',
  };
};

export default PackageDetailPage;
