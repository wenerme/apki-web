import React from 'react';
import { MainFrameLayout } from '../../components/MainFrameLayout';
import { MirrorPageContent } from '../../components/pages/MirrorPageContent';
import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from '../../api/api';

const MirrorDetailPage: React.FC<{ data }> = ({ data = {} }) => {
  return (
    <MainFrameLayout>
      <MirrorPageContent mirrors={data.mirrors} mirror={data.mirror} />
    </MainFrameLayout>
  );
};

// getServerSideProps
export const getStaticProps: GetStaticProps = async ({ params: { host } }) => {
  const mirrors = await api('mirrors');
  const mirror = await api(`mirrors/${host}`);

  return {
    props: {
      data: {
        mirror,
        mirrors,
      },
    },
    // 30m
    revalidate: 30 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await api('mirrors');
  const hosts = data.map((v) => v.host);

  return {
    paths: hosts.map((v) => ({
      params: {
        host: v,
      },
    })),
    fallback: true,
  };
};

export default MirrorDetailPage;
