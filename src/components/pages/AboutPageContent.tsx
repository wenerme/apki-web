import React from 'react';
import { H2 } from '@blueprintjs/core';

export const AboutPageContent: React.FC = () => {
  return (
    <div>
      <H2 style={{ padding: 8, color: '#bbb' }}>
        <small>About</small>{' '}
        <span className={'logo-font logo-color'}>
          A<small>lpine</small>
        </span>{' '}
        <small>Indexer</small>
      </H2>
      <article>
        <section>
          <ul>
            <li>
              Github <a href="https://github.com/wenerme/tools">wenerme/tools</a>{' '}
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
};
