import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../component/Layout';

const EventName = () => {
  const router = useRouter();
  console.log(router);
  return (
    <Layout title="even">
      <h1>evennnnn</h1>
    </Layout>
  );
};

export default EventName;
