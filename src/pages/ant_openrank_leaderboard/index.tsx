import Layout from '@theme/Layout';

import Board from './Board';

export default (): JSX.Element => {
  return (
    <div className="no-footer">
      <Layout>
        <Board />
      </Layout>
    </div>
  );
};
