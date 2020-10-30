import { getInput, setFailed } from '@actions/core';
import { green, red } from 'chalk';
import { getCommitMessages } from './lib/getCommitMessages';
import { searchCommitMessages } from './lib/searchCommitMessages';
import { skipWorkflow } from './lib/skipWorkflow';
import { actionConfig } from './config';

type Main = (inputId: string) => Promise<void>;
const main: Main = async (inputId) => {
  try {
    const phraseToFind: string = getInput(inputId);

    const commitMessages: string[] = await getCommitMessages();

    console.log(`🔎 Searching all commit messages for "${phraseToFind}"...`);

    const foundCommit = searchCommitMessages(commitMessages, phraseToFind);

    if (foundCommit) {
      console.log(
        green(
          `⏭ "${phraseToFind}" found in "${foundCommit}". Skipping workflow...`
        )
      );

      await skipWorkflow();
    } else {
      console.log(
        green(
          `✔ "${phraseToFind}" not found in commit messages. Continuing workflow...`
        )
      );
    }
  } catch (error) {
    setFailed(red(error.message));
  }
};

(async () => {
  await main(actionConfig.PHRASE_TO_FIND_INPUT_ID);
})();
