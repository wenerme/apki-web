import { useEffect, useMemo, useState } from 'react';

export interface Preference {
  branch?: string;
  arch?: string;
  mirror?: string;
}

export function getPrefer(): Preference {
  const def = {
    mirror: 'http://dl-cdn.alpinelinux.org/alpine/',
  };
  try {
    return Object.assign(def, JSON.parse(localStorage['_prefer'] || '{}'));
  } catch (e) {
    return def;
  }
}

export function usePrefer(): [Preference, (o: Partial<Preference>) => void] {
  const [state, set] = useState(getPrefer);
  useEffect(() => {
    // ssr
    set(getPrefer());
  }, []);
  return useMemo(() => {
    return [
      state,
      (v) => {
        const neo = Object.assign({}, state, v);
        setPrefer(neo);
        set(neo);
      },
    ];
  }, [state]);
}

function setPrefer(o: Partial<Preference>) {
  localStorage['_prefer'] = JSON.stringify(Object.assign(getPrefer(), o || {}));
}
