// import { green } from 'chalk';
// import { checkHeadCommit } from './lib/checkHeadCommit';

type Post = () => Promise<void>;

const post: Post = async () => {
  console.log('☑ Creating check...');

  // const sha = await checkHeadCommit();

  // console.log(green(`✅ Head commit sha: ${sha} checked as "success"`));
};

post();
