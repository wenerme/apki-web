import React from 'react';
import { MainFrameLayout } from '../components/MainFrameLayout';
import { IndexPageContent } from '../components/pages/IndexPageContent';
import { CenterPageContent } from '../components/CenterPageContent';

const IndexPage: React.FC<{ name; data }> = ({ name, data }) => {
  return (
    <MainFrameLayout>
      <CenterPageContent>
        <IndexPageContent />
      </CenterPageContent>
    </MainFrameLayout>
  );
};

// const API = 'https://apki-graphile.herokuapp.com/graphql';
// const fetcher = (query) => request(API, query);
//
// export const getServerSideProps: GetServerSideProps = async ({}) => {
//   const data = await fetcher(gql`
//     {
//       mirrors: allMirrors {
//         nodes {
//           name
//           url
//           urls
//           lastUpdated
//           location
//           lastError
//           lastRefreshDuration
//           bandwidth
//         }
//       }
//     }
//   `);
//   return { props: { name: 'hello', data } };
// };

export default IndexPage;
