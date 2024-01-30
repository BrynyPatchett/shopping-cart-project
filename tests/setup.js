import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import '@testing-library/jest-dom'
// src/setupTests.js

import { setupServer } from 'msw/node';
import { handlers } from './apiMocks/handlers';
// Set up a Mock Service Worker server with the provided request handlers
const server = setupServer(...handlers);
// Start the server before running your tests
beforeAll(() => server.listen());
// Reset and stop the server after all tests finish
afterAll(() => server.resetHandlers(), server.close());

expect.extend(matchers);

afterEach(() => {
  cleanup();
});