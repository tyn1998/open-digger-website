import { LeaderboardContext, intialLeaderboardConfig, leaderboardConfigReducer } from './context';
import { BaseBoard } from './BaseBoard';
import { BoardContainer } from './BoardContainer';
import { InputArea } from './InputArea';

import { useReducer } from 'react';
import { useReactTable, createColumnHelper, getCoreRowModel } from '@tanstack/react-table';

// TODO: give each column a real renderer
export const COLUMN_TYPE_RULES = [
  {
    name: 'String',
    fieldsNeeded: 1,
    renderer: (text) => <span>{text}</span>,
  },
  {
    name: 'StringWithIcon',
    fieldsNeeded: 2,
    renderer: (icon, text) => `${icon} ${text}`,
  },
  {
    name: 'NumberWithDelta',
    fieldsNeeded: 2,
    renderer: (num, delta) => `${num} ${delta}`,
  },
]

const helper = createColumnHelper();

export default () => {
  const [leaderboardConfig, dispatch] = useReducer(leaderboardConfigReducer, intialLeaderboardConfig);
  const { inputData, title, columnOptions } = leaderboardConfig;

  const tableColumns = columnOptions.map((option, index) => {
    const { name, width, type, fields } = option;
    const column = helper.accessor(row => row, {
      id: `${index}-${name}`,
      header: () => name,
      cell: info => {
        const columnTypeRule = COLUMN_TYPE_RULES.find(rule => rule.name === type);
        const renderProps = fields.map(field => info.getValue()[field]);
        return columnTypeRule.renderer(...renderProps);
      },
      size: width,
    });
    return column;
  })

  const table = useReactTable({ columns: tableColumns, data: inputData, getCoreRowModel: getCoreRowModel() });

  return (
    <LeaderboardContext.Provider value={{ leaderboardConfig, dispatch }}>
      <InputArea />
      <BoardContainer title={title}>
        <BaseBoard table={table} />
      </BoardContainer>
    </LeaderboardContext.Provider>
  );
};
