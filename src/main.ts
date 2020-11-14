import { getInput, setFailed, setOutput } from '@actions/core';
import { getOctokit } from '@actions/github';
import { context } from '@actions/github/lib/utils';
import { getCommitMessages } from './lib/getCommitMessages';
import { searchCommitMessages } from './lib/searchCommitMessages';
import { actionConfig } from './config';

type Main = () => Promise<void>;
const main: Main = async () => {
  try {
    const {
      GITHUB_TOKEN_ID,
      SKIP_JOB_OUTPUT_ID,
      PHRASE_TO_FIND_INPUT_ID,
    } = actionConfig;
    // change
    const githubToken: string = getInput(GITHUB_TOKEN_ID);
    const octokit = getOctokit(githubToken);

    const phraseToFind: string = getInput(PHRASE_TO_FIND_INPUT_ID);

    const commitMessages: string[] = await getCommitMessages(octokit, context);

    console.log(`🔎 Searching all commit messages for "${phraseToFind}"...`);

    const foundCommit = searchCommitMessages(commitMessages, phraseToFind);

    if (foundCommit) {
      console.log(
        `⏭ "${phraseToFind}" found in "${foundCommit}". Skipping workflow...`
      );

      setOutput(SKIP_JOB_OUTPUT_ID, 'true');
    } else {
      console.log(
        `✔ "${phraseToFind}" not found in commit messages. Continuing workflow...`
      );
      setOutput(SKIP_JOB_OUTPUT_ID, '');
    }
  } catch (error) {
    setFailed(error);
  }
};

main();
// change
// change
