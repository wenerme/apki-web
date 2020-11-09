import React from 'react';
import { Button, Divider, H3, H4, Popover, Position, Tag, Tooltip } from '@blueprintjs/core';
import styled from 'styled-components';
import ms from 'ms';

const NormalTable = styled.table`
  min-width: 400px;
  td {
    vertical-align: middle !important;
  }
`;

const ContentDiv = styled.div`
  padding: 8px;
  position: sticky;
  top: 0;
  > .wrapper {
    max-height: 100vh;
    overflow-y: scroll;

    > h3 {
      padding: 16px;
    }

    > section {
      padding-top: 16px;
    }
  }
`;

const spanNa = <span style={{ color: '#ccc' }}>N/A</span>;

export const MirrorDetail: React.FC<{ data? }> = ({ data = {} }) => {
  const { host, location, name, urls, lastUpdated, bandwidth, lastError, lastRefreshDuration } = data;
  return (
    <ContentDiv>
      <div className={'wrapper'}>
        <H3>
          {name} {location ? ` - ${location}` : ''}
        </H3>
        <Divider />
        <section>
          <NormalTable className="bp3-html-table bp3-html-table-striped bp3-interactive">
            <thead>
              <tr>
                <th>Mirror Info.</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{location || spanNa}</td>
              </tr>
              <tr>
                <td>Last Update Time</td>
                <td>{lastUpdated}</td>
              </tr>
              <tr>
                <td>Bandwidth</td>
                <td>{bandwidth || spanNa}</td>
              </tr>
            </tbody>
          </NormalTable>
        </section>
        <section>
          <H4>Mirror URLs</H4>
          <NormalTable className="bp3-html-table bp3-html-table-striped bp3-interactive">
            <thead>
              <tr>
                <th>Protocol</th>
                <th>URL</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {urls.map((v) => {
                const url = new URL(v);
                return (
                  <tr key={v}>
                    <td>
                      <Tag minimal>{url.protocol.replace(':', '')}</Tag>
                    </td>
                    <td>
                      <a href={v} target="_blank">
                        {v}
                      </a>
                    </td>
                    <td>
                      <Popover content={<div style={{ padding: 8 }}> Copied </div>} position={Position.RIGHT}>
                        <Tooltip content={'Copy'} position={Position.RIGHT}>
                          <Button
                            minimal
                            icon={'duplicate'}
                            onClick={() => {
                              navigator.clipboard?.writeText(v);
                            }}
                          />
                        </Tooltip>
                      </Popover>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </NormalTable>
        </section>

        <section>
          <NormalTable className="bp3-html-table bp3-html-table-striped bp3-interactive">
            <thead>
              <tr>
                <th>Sync Info.</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Host</td>
                <td>{host}</td>
              </tr>
              <tr>
                <td>Last sync error</td>
                <td>{lastError || spanNa}</td>
              </tr>
              <tr>
                <td>Last refresh time</td>
                <td>{ms((lastRefreshDuration * 1) / 1000 / 1000)}</td>
              </tr>
            </tbody>
          </NormalTable>
        </section>
      </div>
    </ContentDiv>
  );
};
