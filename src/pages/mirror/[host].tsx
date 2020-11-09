import React from 'react';
import { MainFrameLayout } from '../../components/MainFrameLayout';
import { MirrorPageContent } from '../../components/pages/MirrorPageContent';
import { GetStaticPaths, GetStaticProps } from 'next';
import { gql } from 'graphql-request';
import { fetchGraph } from '../../api/graph';

const MirrorDetailPage: React.FC<{ data }> = ({ data = {} }) => {
  return (
    <MainFrameLayout>
      <MirrorPageContent mirrors={data.mirrors} mirror={data.mirror} />
    </MainFrameLayout>
  );
};

// getServerSideProps
export const getStaticProps: GetStaticProps = async ({ params: { host } }) => {
  const query = gql`
    query($host: String) {
      mirrors: allMirrors {
        nodes {
          name
          url
          urls
          lastUpdated
          location
          lastError
          lastRefreshDuration
          bandwidth
          host
        }
      }
      mirror: allMirrors(condition: { host: $host }) {
        nodes {
          name
          url
          urls
          lastUpdated
          location
          lastError
          lastRefreshDuration
          bandwidth
          host
        }
      }
    }
  `;
  const data = await fetchGraph(query, { host });
  return {
    props: {
      data: {
        mirror: data.mirror.nodes?.[0],
        mirrors: data.mirrors?.nodes,
      },
    },
    // 30m
    revalidate: 30 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    {
      mirrors: allMirrors {
        nodes {
          host
        }
      }
    }
  `;
  const data = await fetchGraph(query);
  const hosts = data.mirrors.nodes.map((v) => v.host);

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
