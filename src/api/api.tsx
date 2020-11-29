let baseUrl = process.env.API_URL || 'http://localhost:8080/api/';

export function setApiEndpoint(s: string) {
  baseUrl = s;
}

export function api(input: Partial<Request> | string, init?: RequestInit & Partial<{ json: any }>): Promise<any> {
  if (baseUrl) {
    let u = input['url'] || input;
    if (typeof u === 'string') {
      u = new URL(u, baseUrl).toString();
      if (typeof input === 'string') {
        input = u;
      } else {
        input = { ...input, url: u };
      }
    }
  }
  if (init) {
    if (init.json) {
      init.body = JSON.stringify(init.json);
      const h = (init.headers = new Headers(init.headers));
      h.set('Content-Type', 'application/json');
    }
  }
  console.debug(`api`, input);
  return fetch(input as any, init).then(async (v) => {
    if (v.status < 400) {
      if ((v.headers.get('Content-Type') || '').includes('text/plain')) {
        return v.text();
      }
      return v.json();
    }

    const err = new Error(`错误请求: ${v.status} - ${v.statusText}`);
    try {
      const r = await v.json();
      Object.assign(err, r);
    } catch (e) {
      //
    }
    throw err;
  });
}
