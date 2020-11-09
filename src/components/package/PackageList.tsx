import React from 'react';
import { Button, Divider, H2, Icon, InputGroup, Intent, Text } from '@blueprintjs/core';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ContentDiv = styled.div`
  max-width: 400px;
  > header {
    position: sticky;
    top: 0;
    background: white;
    padding: 8px 8px 12px;
    box-sizing: border-box;
    box-shadow: 0 2px 5px -2px #888;
  }
  table.package-list {
  }
`;

export const PackageList: React.FC<{ data }> = ({ data }) => {
  const router = useRouter();
  const doGotoDetail = ({ name }) => {
    router.push({
      pathname: `/package/${name}`,
      search: location.search,
    });
  };

  return (
    <ContentDiv>
      <header className={''}>
        <H2 style={{ padding: 8 }}>AlpineLinux Packages</H2>
        <div>
          <InputGroup
            leftIcon={'search'}
            placeholder={'Search'}
            rightElement={<Button intent={Intent.PRIMARY} minimal icon={'arrow-right'} />}
          />
        </div>
      </header>
      <main>
        <table className="package-list bp3-html-table bp3-html-table-striped bp3-interactive">
          <tbody>
            {data.map((v) => {
              const { name, description, version, branch, repo, license, commit, url } = v.node;
              return (
                <tr
                  key={name}
                  onClick={() => {
                    doGotoDetail({ name });
                  }}
                >
                  <td>
                    <div style={{ maxWidth: 400 - 22 }}>
                      <div style={{ display: 'flex' }}>
                        <div className={'bp3-text-large'} style={{ flex: 1 }}>
                          {name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }} className={'bp3-text-disabled'}>
                          <small style={{ fontSize: 8, padding: 4 }}>
                            {branch}/{repo}
                          </small>
                          <small style={{ padding: 4 }}>
                            <span style={{ fontSize: 10 }}>v</span>
                            {version}
                          </small>
                        </div>
                      </div>
                      <div>
                        <PrettyLink value={url} />
                      </div>
                      <Text ellipsize title={description} className={'bp3-text-muted'}>
                        {description}
                      </Text>
                      <Divider />
                      <div className={'bp3-text-disabled bp3-text-overflow-ellipsis bp3-text-small'}>{license}</div>
                      <div style={{ display: 'flex' }} className={'bp3-text-disabled bp3-text-small'}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Icon icon={'git-commit'} style={{ paddingRight: 4 }} />
                          <a href={`https://gitlab.alpinelinux.org/alpine/aports/-/commit/${commit}`} target="_blank">
                            {commit.substr(0, 10)}
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>Next Pre</div>
      </main>
    </ContentDiv>
  );
};

const PrettyLink: React.FC<{ value: string }> = ({ value }) => {
  if (!value) {
    return null;
  }
  let text = value;
  text = text.replace(/^https?:\/\/(www.)?/, '');
  return (
    <a href={value} target="_blank">
      {text}
    </a>
  );
};
