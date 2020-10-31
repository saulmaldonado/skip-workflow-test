import { checkHeadCommit } from './lib/checkHeadCommit';

const post = async () => {
  await checkHeadCommit();
};

post();
