import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { MirrorPageContent } from '../components/pages/MirrorPageContent';
import { GetServerSideProps } from 'next';
import request, { gql } from 'graphql-request';

const MirrorPage: React.FC<{ data }> = ({ data = {} }) => {
  return (
    <MainFrameLayout>
      <MirrorPageContent mirrors={data.mirrors?.nodes} />
    </MainFrameLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const API = 'https://apki-graphile.herokuapp.com/graphql';
  const fetcher = (query) => request(API, query);
  const data = await fetcher(gql`
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
        }
      }
    }
  `);
  return { props: { data } };
};

export default MirrorPage;
