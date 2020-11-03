import { actionConfig } from '../config';

const { EXIT_CODES } = actionConfig;
type SkipWorkflow = () => never;

export const skipWorkflow: SkipWorkflow = () =>
  process.exit(EXIT_CODES.NEUTRAL);
