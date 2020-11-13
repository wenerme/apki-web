import React from 'react';

export const IndexPageContent: React.FC = () => {
  return (
    <div>
      <h2>AlpineLinux Package Indexer</h2>
      <article>
        <p>Indexing all alpinelinux's packages, mirrors, files for easy access.</p>
      </article>
      <section>
        <ul>
          <li>
            apkindexer <a href="https://github.com/wenerme/tools">wenerme/tools</a>
          </li>
          <li>
            <a href="https://github.com/wenerme/tools">wenerme/apki-web</a>
          </li>
        </ul>
      </section>
    </div>
  );
};
