import supertest from 'supertest';
import { app } from '../client/src/App';
// use supertest as API
const api = supertest(app);

import { Character } from '../server/models/character.model';

test('GET call', async () => {
    await api
        .get('/api/items')
        .expect(200);
});