import styled from 'styled-components';
import { AnchorButton, Colors, Intent } from '@blueprintjs/core';
import React from 'react';
import { Package } from './interfaces';
import Link from 'next/link';
import { format } from 'date-fns';
import { usePrefer } from '../prefers';
import { prettyBytes } from '../../utils/pretty-bytes';

const DetailStyle = styled.div`
  padding-top: 20px;
  .info-table {
    tr td:nth-child(1) {
      background: ${Colors.GRAY5} !important;
      font-weight: bold;
      vertical-align: middle;
    }
  }
`;
export const PackageDetailPanel: React.FC<{ pkg: Package }> = ({ pkg }) => {
  if (!pkg) {
    return <div>N/A</div>;
  }
  // https://pkgs.alpinelinux.org/package/edge/main/x86_64/libpq
  const [pref] = usePrefer();
  const rows = [
    {
      name: 'Download',
      cell: (
        <AnchorButton icon={'download'} download href={`${pref.mirror}${pkg.path}`} minimal intent={Intent.PRIMARY}>
          {pref.mirror}
          {pkg.path}
        </AnchorButton>
      ),
    },
    { name: 'Version', cell: pkg.version },
    { name: 'Description', cell: pkg.description },
    { name: 'Project', cell: <a href={pkg.url}>{pkg.url}</a> },
    { name: 'License', cell: pkg.license },
    { name: 'Branch', cell: pkg.branch },
    { name: 'Repository', cell: pkg.repo },
    { name: 'Architecture', cell: pkg.arch },
    {
      name: 'Size',
      cell: (
        <span>
          {prettyBytes(pkg.size)} / {String(pkg.size)}
        </span>
      ),
    },
    {
      name: 'Installed size',
      cell: (
        <span>
          {prettyBytes(pkg.installSize)} / {String(pkg.installSize)}
        </span>
      ),
    },
    {
      name: 'Origin',
      cell: (
        <Link href={`/packages/${pkg.origin}`}>
          <a title={`package ${pkg.name} origin ${pkg.origin}`}>{pkg.origin}</a>
        </Link>
      ),
    },
    { name: 'Maintainer', cell: pkg.maintainerName },
    { name: 'Build time', cell: format(new Date(pkg.buildTime), 'yyyy-MM-dd hh:mm:ss') },
    {
      name: 'Commit',
      cell: (
        <a href={`https://gitlab.alpinelinux.org/alpine/aports/-/commit/${pkg.commit}`} target="_blank">
          {pkg.commit}
        </a>
      ),
    },
    {
      name: 'Build log',
      cell: (
        <a
          href={`http://build.alpinelinux.org/buildlogs/build-${pkg.branch}-${pkg.arch}/${pkg.repo}/${pkg.name}/${pkg.name}-${pkg.version}.log`}
        >
          Build log
        </a>
      ),
    },
    {
      name: 'Contents',
      cell: (
        <a
          href={`https://pkgs.alpinelinux.org/contents?branch=${pkg.branch}&name=${pkg.name}&arch=${pkg.arch}&repo=${pkg.repo}`}
        >
          Contents of package
        </a>
      ),
    },
  ];
  return (
    <DetailStyle style={{}}>
      <table className={'info-table bp3-html-table bp3-html-table-striped '}>
        <tbody>
          {rows.map(({ name, cell }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{cell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DetailStyle>
  );
};
