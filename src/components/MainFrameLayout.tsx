import React from 'react';
import styled from 'styled-components';
import { Icon, Position, Tag, Tooltip } from '@blueprintjs/core';
import { ActiveLink } from './ActiveLink';

const LayoutDiv = styled.div`
  display: flex;
  flex-flow: row;

  .logo-letter {
    font-size: 48px;
    font-family: 'Finger Paint', cursive;
    padding: 4px;
    color: #0d597f;
    filter: contrast(0.5);
  }
  a.active .logo-letter {
    filter: none;
  }

  & > aside {
    display: flex;
    flex-flow: column;
    height: 100vh;
    width: 60px;
    border-right: #dcecff 1px solid;
    // content 60px
    box-sizing: content-box;

    position: sticky;
    top: 0;

    a {
      text-decoration: none;
    }
    & > .top {
      flex: 1;
    }
    & > .top > *,
    & > .bottom > * {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      box-sizing: border-box;

      & .bp3-icon {
        color: #b6bdc8;
        transition: color ease-in-out 120ms;
      }
      a.active .bp3-icon,
      &:hover .bp3-icon {
        color: #0d597f;
      }
    }
  }
  & > main {
    flex: 1;
  }
`;

export const MainFrameLayout: React.FC<{ active? }> = ({ children }) => {
  if (typeof window !== 'undefined' && window.self !== window.top) {
    return <>{children}</>;
  }

  const topMenuItems = [
    { label: 'AlpineLinux Package Indexer', icon: <div className={'logo-letter'}>A</div>, href: '/' },
    { label: 'Packages', icon: 'box', href: '/packages' },
    { label: 'File', icon: 'folder-open', href: '/file' },
    { label: 'Mirror', icon: 'comparison', href: '/mirrors' },
  ];
  const bottomMenuItems = [{ label: 'Help', icon: 'help', href: '/about' }];

  return (
    <LayoutDiv>
      <aside>
        <div className={'top'}>
          {topMenuItems.map((v) => (
            <SideMenuItem {...v} key={v.label} />
          ))}
        </div>
        <div className={'bottom'}>
          {bottomMenuItems.map((v) => (
            <SideMenuItem {...v} key={v.label} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
          <Tag minimal>v 0.1</Tag>
        </div>
      </aside>
      <main>{children}</main>
    </LayoutDiv>
  );
};

const SideMenuItem: React.FC<{ label; icon; href }> = ({ label, icon, href }) => {
  return (
    <Tooltip key={label} content={label} position={Position.RIGHT}>
      <ActiveLink href={href}>
        <a>
          <Icon icon={icon as any} iconSize={24} />
        </a>
      </ActiveLink>
    </Tooltip>
  );
};
