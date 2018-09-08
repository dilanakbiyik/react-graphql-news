import { request } from 'graphql-request';

const endpoint = 'https://fashionunited.com/graphql/';
const query = `
    query NewsArticles($keywords: [String]) {
      fashionunitedNlNewsArticles(keywords: $keywords) {
        title
        url
        imageUrl
      }
    }
`;

export function getNewsArticles(variables = {}) {
    return request(endpoint, query, variables);
}
