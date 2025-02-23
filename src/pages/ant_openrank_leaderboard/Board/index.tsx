import { Table } from 'antd';
import React from 'react';

import { ProjectData } from '../types';

interface BoardProps {
  projectData: ProjectData;
}

const Board: React.FC<BoardProps> = ({ projectData }) => {
  return (
    <Table
      columns={[
        {
          title: '排名',
          dataIndex: 'r',
        },
        {
          title: 'GitHub ID',
          dataIndex: 'l',
        },
        {
          title: '影响力',
          dataIndex: 'o',
        },
      ]}
      dataSource={projectData.details}
    />
  );
};

export default Board;
