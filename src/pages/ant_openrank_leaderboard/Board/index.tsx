import React from 'react';
import { Table } from 'antd';

const Board: React.FC = () => {
  return (
    <Table
      columns={[
        {
          title: '排名',
          dataIndex: 'rank',
        },
        {
          title: '公司',
          dataIndex: 'company',
        },
        {
          title: 'OpenRank',
          dataIndex: 'openrank',
        },
      ]}
      dataSource={[
        {
          rank: 1,
          company: 'Alibaba',
          openrank: 100,
        },
      ]}
    />
  );
};

export default Board;
