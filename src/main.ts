import { getInput, setFailed } from '@actions/core';
import { red } from 'chalk';
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
        `⏭ "${phraseToFind}" found in "${foundCommit}". Skipping workflow...`
      );

      const result = await skipWorkflow();
      console.log(result.data);
    } else {
      console.log(
        `✔ "${phraseToFind}" not found in commit messages. Continuing workflow...`
      );
    }
  } catch (error) {
    setFailed(red(error.message));
  }
};

main(actionConfig.PHRASE_TO_FIND_INPUT_ID);
