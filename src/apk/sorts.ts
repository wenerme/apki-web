export const orders = {
  branch: Object.fromEntries(
    [
      'edge',
      'v3.12',
      'v3.11',
      'v3.10',
      'v3.9',
      'v3.8',
      'v3.7',
      'v3.6',
      'v3.5',
      'v3.4',
      'v3.3',
      'v3.2',
      'v3.1',
      'v3.0',
    ].map((v, i) => [v, i]),
  ),
};
