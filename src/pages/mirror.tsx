import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { MirrorPageContent } from '../components/pages/MirrorPageContent';
import { GetStaticProps } from 'next';
import { gql } from 'graphql-request';
import { fetchGraph } from '../api/graph';

const MirrorPage: React.FC<{ data }> = ({ data = {} }) => {
  return (
    <MainFrameLayout>
      <MirrorPageContent mirrors={data.mirrors} />
    </MainFrameLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({}) => {
  const query = gql`
    {
      mirrors: allMirrors {
        nodes {
          nodeId
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
  const data = await fetchGraph(query);
  // const data = require('./mocks/mirrors.json');
  return {
    props: {
      data: {
        mirrors: data.mirrors?.nodes,
      },
    },
    // 15m
    revalidate: 15 * 60,
  };
};

export default MirrorPage;
