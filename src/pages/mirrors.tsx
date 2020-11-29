import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { MirrorPageContent } from '../components/pages/MirrorPageContent';
import { GetStaticProps } from 'next';
import { api } from '../api/api';

const MirrorPage: React.FC<{ data }> = ({ data = {} }) => {
  return (
    <MainFrameLayout>
      <MirrorPageContent mirrors={data.mirrors} />
    </MainFrameLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await api(`mirrors`);
  return {
    props: {
      data: {
        mirrors: data,
      },
    },
    // 15m
    revalidate: 15 * 60,
  };
};

export default MirrorPage;
