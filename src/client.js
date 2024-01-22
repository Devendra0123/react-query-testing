import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'hslx7t7o',
    dataset: 'production',
    apiVersion: '2024-01-22',
    useCdn: false,
    token: 'skpulycdAsIax5zmcOY7MjcdaCaiHLfQBfIEPRFU9i1UQxhkcaqB0FUoVu69Zl7ZuKyGMZgHKpMyFXnzRVIOJdVdUFQXgzIrVffMujk8vVLP1AetyVGx2XArEoTQieopon9XsC5WS1jIHHgd3GkuW959eejH1H3bAZNRxOj4FTqYM7oacd3A'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);