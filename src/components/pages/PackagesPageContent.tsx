import React, { PureComponent, useMemo } from 'react';
import { PkgName } from '../../apk/parsenNames';
import styled from 'styled-components';
import { H2, InputGroup, Switch, Tag } from '@blueprintjs/core';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Fuse from 'fuse.js';
import { useImmer } from 'use-immer';

const ContentDiv = styled.div`
  min-height: 100%;
  display: flex;
  > main {
    flex: 1;
  }

  > aside {
    max-width: 300px;
    min-height: 100%;
    border-right: 1px solid lightblue;

    display: flex;
    flex-flow: column;
    > main {
      flex: 1;
    }
  }
  > aside > header {
    padding: 8px 16px;

    box-shadow: 0 2px 5px -2px #888;
  }

  .package-name-item {
    padding: 8px;
    height: 64px;

    display: flex;
    justify-content: space-around;
    flex-flow: column;

    > div:first-child {
      display: flex;
      align-items: center;

      > :first-child {
        flex: 1;
      }
    }

    > .name {
      color: #0d597f;
    }

    &.odd {
      background: rgba(191, 204, 214, 0.15);
    }
    cursor: pointer;
    &:hover {
      // interactive
      background-color: rgba(191, 204, 214, 0.3);
    }
  }
`;
export const PackagesPageContent: React.FC<{ names: PkgName[] }> = ({ names }) => {
  return (
    <ContentDiv>
      <PackageListAside data={names} />
      <main></main>
    </ContentDiv>
  );
};

const PackageListAside: React.FC<{ data: PkgName[] }> = ({ data }) => {
  const [state, update] = useImmer({ search: '', originOnly: false });
  const filter = useMemo(() => {
    let f = (v: PkgName) => true;
    if (state.originOnly) {
      let last = f;
      f = (v) => last(v) && v.origin == v.name;
    }
    return f;
  }, [state.originOnly]);
  return (
    <aside>
      <header>
        <H2>Packages</H2>
        <div>
          <InputGroup
            leftIcon={'search'}
            type={'search'}
            placeholder={'Searching...'}
            value={state.search}
            onChange={(v) =>
              update((s) => {
                s.search = v.target.value;
              })
            }
          />
          <div style={{ paddingTop: 12 }}>
            <Switch
              inline
              label={'Origin Only'}
              checked={state.originOnly}
              onChange={(v) =>
                update((s) => {
                  s.originOnly = v.target['checked'];
                })
              }
            />
          </div>
        </div>
      </header>
      <main>
        <PackageNameList data={data} search={state.search} filter={filter} />
      </main>
    </aside>
  );
};

const PackageNameList: React.FC<{ data: PkgName[]; search?: string; filter?: (PkgName) => boolean }> = ({
  data,
  search,
  filter,
}) => {
  const fuse = useMemo(() => {
    return new Fuse(data, { keys: ['name', 'origin'], threshold: 0.4 });
  }, [data]);
  const result = useMemo(() => {
    const f = filter || ((v) => true);
    let rows = data;
    if (search) {
      rows = fuse.search(search).map((v) => v.item);
    }
    rows = rows.filter(f);
    return rows;
  }, [search, filter]);
  return (
    <FixedSizeList height={360} width={300} itemCount={result.length} itemSize={64} itemData={result}>
      {PackageNameItemRenderer}
    </FixedSizeList>
  );
};

class PackageNameItemRenderer extends PureComponent<ListChildComponentProps> {
  render() {
    const item: PkgName = this.props.data[this.props.index];
    const origin = item.name === item.origin ? '' : item.origin;

    return (
      <div className={`package-name-item ${this.props.index % 2 == 0 ? 'odd' : ''}`} style={this.props.style}>
        <div>
          <span className={'name'}>{item.name}</span>
          <div>
            {/*{origin && (*/}
            {/*  <Tag minimal round>*/}
            {/*    <span className={'bp3-text-muted'}>{origin}</span>*/}
            {/*  </Tag>*/}
            {/*)}*/}
            {['doc', 'dev', 'lib', 'lang', 'openrc', 'dbg', 'completion']
              .filter((v) => item[v])
              .map((v) => (
                <Tag key={v} minimal round>
                  <span className={'bp3-text-muted'}>{v}</span>
                </Tag>
              ))}
          </div>
        </div>
        {origin && (
          <div style={{ textAlign: 'left' }}>{origin && <small className={'bp3-text-muted'}>{origin}</small>}</div>
        )}
      </div>
    );
  }
}
