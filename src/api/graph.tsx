import request from 'graphql-request';
import { RequestDocument, Variables } from 'graphql-request/dist/types';

export function getGraphApi() {
  let api = process.env.GRAPHQL_URL;
  if (!api && window !== undefined) {
    api = window.location.origin + '/graphql';
  }
  if (!api) {
    console.trace(`Missing GraphQL API`);
  }
  return api;
}

export function fetchGraph<T = any, V = Variables>(document: RequestDocument, variables?: V): Promise<T> {
  return request(getGraphApi(), document, variables);
}
