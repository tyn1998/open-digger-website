import Layout from '@theme/Layout';

import styles from './index.module.css'

export default (): JSX.Element => {
  return (
    <div className='no-footer'>
      <Layout>
        <iframe className={styles.container} src="https://tyn1998.github.io/ant-openrank-leaderboard/" />
      </Layout>
    </div>
  );
}
