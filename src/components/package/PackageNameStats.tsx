import styled from 'styled-components';
import React, { useMemo } from 'react';
import { PkgName, PkgNameTags } from '../../apk/parseOriginNames';
import { Card, Colors, Divider, H2, H3, H5, H6 } from '@blueprintjs/core';

const StatsContentDiv = styled.div`
  min-height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    gap: 12px;
    flex-flow: column;

    > div {
      display: flex;
      gap: 12px;
    }
  }
`;
export const PackageNameStats: React.FC<{ data: PkgName[] }> = ({ data }) => {
  const stats = useMemo(() => createNameStats(data), [data]);
  return (
    <StatsContentDiv>
      <div>
        <div>
          <H3>
            <a>Package Statistics</a>
          </H3>
        </div>
        <Divider />
        <div>
          <Card>
            <H5 style={{ color: Colors.BLUE3 }}>Total</H5>
            <H2 style={{ color: Colors.BLUE5 }}>{stats.total}</H2>
          </Card>
          <Card>
            <H5>
              <a>Origins</a>
            </H5>
            <H2 style={{ color: Colors.BLUE5 }}>{stats.totalOrigin}</H2>
          </Card>
        </div>
        <div className={'tags'}>
          {stats.tags.map(({ name, total }) => (
            <Card key={name}>
              <H6>
                <a>{name}</a>
              </H6>
              <H3 style={{ color: Colors.BLUE4 }}>{total}</H3>
            </Card>
          ))}
        </div>
      </div>
    </StatsContentDiv>
  );
};

interface PkgNameStat {
  total: number;
  totalOrigin: number;
  tags: Array<{ name; total }>;
}

function createNameStats(names: PkgName[]): PkgNameStat {
  return {
    total: names.length,
    totalOrigin: names.filter((v) => v.name === v.origin).length,
    tags: PkgNameTags.map((name) => ({
      name,
      total: names.filter((vv) => vv[name]).length,
    })).sort((a, b) => b.total - a.total),
  };
}
