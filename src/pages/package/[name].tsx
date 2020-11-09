import React from 'react';
import { MainFrameLayout } from '../../components/MainFrameLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PackageDetailPageContent } from '../../components/pages/PackageDetailPageContent';
import { gql } from 'graphql-request';
import { fetchGraph } from '../../api/graph';

const PackageDetailPage: React.FC<{ packages? }> = ({ packages }) => {
  return (
    <MainFrameLayout>
      <PackageDetailPageContent packages={packages} />
    </MainFrameLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: { name } }) => {
  const query = gql`
    query($name: String) {
      packages: allPackageIndices(condition: { name: $name }) {
        nodes {
          arch
          branch
          buildTime
          name
          origin
          repo
          version
          url
          maintainer
          license
          description
          commit
          key
        }
      }
    }
  `;
  const data = await fetchGraph(query, { name });

  return {
    props: {
      packages: data.packages.nodes,
    },
    // 30m
    revalidate: 30 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default PackageDetailPage;
