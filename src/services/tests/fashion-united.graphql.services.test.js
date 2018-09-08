/**
 * fashion united graphl services tests
 */

import { getNewsArticles } from '../fashion-united.graphql.services';

describe("fashion united graphql", () => {
    it(`should return articles`, async () => {
        const result = await getNewsArticles();
        expect(typeof result).toBe('object');
        expect(typeof result.fashionunitedNlNewsArticles).toBe('object');
        expect(result.fashionunitedNlNewsArticles.length).toBeGreaterThan(0);
    });
});