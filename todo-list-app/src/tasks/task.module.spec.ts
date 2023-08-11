import { TaskModule } from './task.module';

describe('Task', () => {
  it('should be defined', () => {
    expect(new TaskModule()).toBeDefined();
  });
});
