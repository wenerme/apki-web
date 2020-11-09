import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { PackagePageContent } from '../components/pages/PackagePageContent';
import { GetServerSideProps } from 'next';
import { gql } from 'graphql-request';
import { fetchGraph } from '../api/graph';

const PackagePage: React.FC<{ packages? }> = ({ packages }) => {
  return (
    <MainFrameLayout>
      <PackagePageContent packages={packages} />
    </MainFrameLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query: urlQuery }) => {
  const { arch, branch, search, cursor } = urlQuery;
  const query = gql`
    query($condition: PackageNameCondition, $cursor: Cursor) {
      packages: allPackageNames(first: 50, after: $cursor, condition: $condition) {
        edges {
          cursor
          node {
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
          }
        }
      }
    }
  `;
  const condition = {};
  const data = await fetchGraph(query, { condition });
  return {
    props: {
      packages: data.packages.edges,
    },
  };
};

export default PackagePage;
