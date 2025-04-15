import Layout from '@theme/Layout';
import { useEffect, useRef } from 'react';

import { COMMUNITY_OPENRANK_LEADERBOARDS_URL_PATH } from '../../../constants';

import styles from './styles.module.css';

const PREFIX_PATH = '/community-openrank-leaderboard/';

export default function CommunityOpenRankLeaderboards({ location }): JSX.Element {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // communicate with the iframe
  useEffect(() => {
    const handleIframeRouteChange = (event) => {
      if (event.data.type === 'COMMUNITY_OPENRANK_LEADERBOARD_ROUTE_CHANGE') {
        // route is something like "community-openrank-leaderboard?locale=zh&organization=xlab&project=open_digger&timeUnit=month&timeValue=1738393242809"
        // and we just need the "?locale..." part to construct the new url for the main window
        const newPath = `${COMMUNITY_OPENRANK_LEADERBOARDS_URL_PATH}/${event.data.route.split(PREFIX_PATH)[1]}`;
        window.history.replaceState(null, '', newPath);
        // tell the iframe current window's url since the iframe has no access to the main window.location
        iframeRef.current?.contentWindow?.postMessage({
          type: 'MAIN_WINDOW_URL_CHANGE', url: window.location.href 
        }, '*');
      }
    };
    window.addEventListener('message', handleIframeRouteChange, false);
    return () => {
      window.removeEventListener('message', handleIframeRouteChange);
    };
  }, []);

  const iframeUrl = `http://localhost:5173${PREFIX_PATH}${window.location.search}`;

  return (
    <div className='no-footer'>
      <Layout>
        <iframe ref={iframeRef} className={styles.mainRankingList} src={iframeUrl}></iframe>
      </Layout>
    </div>
  );
}
