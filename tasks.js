import release from 'start-release';
import { start } from 'start-start-preset';

export * from 'start-start-preset';

export const deploy = () => start(
  release()
);
