import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from '../routers';
import { createCallerFactory } from '@trpc/server';

describe('Life Experiments Router', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    // Create a caller with a mock context for a logged-in user
    const createCaller = createCallerFactory(appRouter);
    caller = createCaller({
      user: {
        id: 1,
        openId: 'test-user',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        loginMethod: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: {} as any,
      res: {} as any,
    });
  });

  it('should get all life experiments', async () => {
    const experiments = await caller.lifeExperiments.getAll();
    expect(Array.isArray(experiments)).toBe(true);
    expect(experiments.length).toBeGreaterThan(0);
  });

  it('should start an experiment', async () => {
    // Get all experiments first
    const experiments = await caller.lifeExperiments.getAll();
    expect(experiments.length).toBeGreaterThan(0);

    // Start the first experiment
    const experimentId = experiments[0].id;
    const result = await caller.lifeExperiments.startExperiment({ experimentId });
    
    expect(result).toBeDefined();
    expect(result.logId).toBeDefined();
    expect(result.success).toBe(true);
  });

  it('should get user experiment logs', async () => {
    const logs = await caller.lifeExperiments.getUserLogs();
    expect(Array.isArray(logs)).toBe(true);
  });
});
