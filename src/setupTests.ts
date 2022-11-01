import '@testing-library/jest-dom';
import server from './__tests__/mocks/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
