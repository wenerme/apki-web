import React from 'react';
import { H2, H4 } from '@blueprintjs/core';
import { Alpine } from '../Alpine';

export const AboutPageContent: React.FC = () => {
  return (
    <div>
      <div>
        <H2 style={{ padding: 8, color: '#bbb' }}>
          <small>About</small> <Alpine /> <small>Indexer</small>
        </H2>
        <article>
          <section>
            <ul>
              <li>
                Indexer backend <a href="https://github.com/wenerme/tools">wenerme/tools</a>{' '}
              </li>
              <li>
                Indexer Frontend <a href="https://github.com/wenerme/apki-web">wenerme/apki-web</a>{' '}
              </li>
            </ul>
          </section>
        </article>
      </div>
      <div>
        <H4>About AlpineLinux</H4>
        <article>
          <section>
            <ul>
              <li>
                <a href="https://alpinelinux.org/" target="_blank">
                  AlpineLinux.org
                </a>
              </li>
              <li>
                <a href="https://pkgs.alpinelinux.org/packages" target="_blank">
                  pkgs.alpinelinux.org
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};
