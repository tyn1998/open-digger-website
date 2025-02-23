import Layout from '@theme/Layout';
import { useRequest } from 'ahooks';
import { Flex, Select, Spin } from 'antd';
import React from 'react';

import { fetchIndexData, fetchProjectData } from './api';
import Board from './Board';
import useProjectDataParams from './useProjectDataParams';

const AntOpenRankLeaderboard: React.FC = () => {
  const { loading: loadingIndexData, data: indexData } = useRequest(fetchIndexData);
  const { projectDataParams, setProjectDataParams } = useProjectDataParams({ indexData });
  const { loading: loadingProjectData, data: projectData } = useRequest(
    () => fetchProjectData(projectDataParams),
    {
      refreshDeps: [
        projectDataParams?.project,
        projectDataParams?.timeUnit,
        projectDataParams?.timeValue,
      ],
      ready: !!projectDataParams,
    },
  );

  if (!indexData) {
    return null;
  }

  const selectOptions = indexData.repos.map((repo) => ({
    label: repo.text,
    value: repo.name,
  }));

  return (
    <div className="no-footer">
      <Layout>
        <Select
          options={selectOptions}
          value={projectDataParams?.project}
          onChange={(value) => {
            setProjectDataParams({
              ...projectDataParams,
              project: value,
            });
          }}
          loading={loadingIndexData}
        />
        <Flex gap={4}>
          <h4>{projectDataParams.project}</h4>
          {loadingProjectData && <Spin spinning={loadingProjectData} />}
        </Flex>
        {projectData ? <Board projectData={projectData} /> : null}
      </Layout>
    </div>
  );
};

export default AntOpenRankLeaderboard;
