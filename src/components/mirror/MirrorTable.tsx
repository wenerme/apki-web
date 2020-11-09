import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { InputGroup } from '@blueprintjs/core';
import { formatDistanceToNow } from 'date-fns';
import Fuse from 'fuse.js';
import { useImmer } from 'use-immer';

function processMirror(v) {
  // add host
  if (/^[-0-9a-z.]+$/.test(v.name)) {
    v.host = v.name;
  } else {
    v.host = new URL(v.url).host;
  }
  // golang zero time
  if (v.lastUpdated?.startsWith('0001-')) {
    v.lastUpdated = null;
  }
  if (v.lastUpdated) {
    v.syncDelay = formatDistanceToNow(new Date(v.lastUpdated));
  }
  return v;
}

export const MirrorTable: React.FC<{ data? }> = ({ data: originData = [] }) => {
  const data = React.useMemo(() => originData.map(processMirror), [originData]);
  const fuse = React.useMemo(() => new Fuse(originData, { keys: ['name', 'host', 'location'] }), [data]);
  const [state, update] = useImmer({ search: '' });
  const finalData = useMemo(() => (!state.search ? data : fuse.search(state.search).map((v) => v.item)), [
    state.search,
  ]);
  const columns: Array<Column<any>> = React.useMemo(
    () => [
      {
        Header: 'Host',
        accessor: 'host',
        Cell: ({ value, row }) => {
          return <span title={row.original.name}>{value}</span>;
        },
      },
      {
        Header: 'Bandwidth',
        accessor: 'bandwidth',
      },
      {
        Header: 'Sync',
        accessor: 'syncDelay',
      },
    ],
    [],
  );
  const getRowId = React.useMemo(() => (r) => r.nodeId, []);
  const tableInstance = useTable({
    columns,
    data: finalData,
    getRowId,
    defaultColumn: {
      Cell: ({ value }) => {
        switch (value) {
          case undefined:
          case null:
          case '':
            return <span style={{ color: '#ccc' }}>N/A</span>;
        }
        return String(value);
      },
    },
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <div>
      <div style={{ padding: 8 }}>
        <InputGroup
          leftIcon={'filter'}
          placeholder={'Filtering mirrors'}
          type="search"
          value={state.search}
          onChange={(e) =>
            update((s) => {
              s.search = e.target.value;
            })
          }
        />
      </div>
      <div>
        <table className={'bp3-html-table bp3-html-table-striped bp3-interactive'} {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
