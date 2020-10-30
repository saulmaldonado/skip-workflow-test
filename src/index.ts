import { getInput, setFailed } from '@actions/core';
import { green, red } from 'chalk';
import { getCommitMessages } from './lib/getCommitMessages';
import { searchCommitMessages } from './lib/searchCommitMessages';
import { skipWorkflow } from './lib/skipWorkflow';

const PHRASE_TO_FIND_INPUT_ID: string = 'phrase';

type Run = (inputId: string) => Promise<void>;
const run: Run = async (inputId) => {
  try {
    const phraseToFind: string = getInput(inputId);

    const commitMessages: string[] = await getCommitMessages();

    console.log(`🔎 Searching git commit messages for "${phraseToFind}"...`);

    const foundCommit = searchCommitMessages(commitMessages, phraseToFind);

    if (foundCommit) {
      green(
        `🛑 "${phraseToFind}" found in "${foundCommit}". Skipping workflow...`
      );

      await skipWorkflow();
    } else {
      green(
        `✔ "${phraseToFind}" not found in commit messages. Continuing workflow...`
      );
    }
  } catch (error) {
    setFailed(red(error.message));
  }
};

run(PHRASE_TO_FIND_INPUT_ID);
