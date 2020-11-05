import { getInput, setOutput } from '@actions/core';
import { getCommitMessages } from './lib/getCommitMessages';
import { searchCommitMessages } from './lib/searchCommitMessages';
// import { skipWorkflow } from './lib/skipWorkflow';
import { actionConfig } from './config';
import { skipWorkflow } from './lib/skipWorkflow';

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

      skipWorkflow();
      setOutput('match', true);
    } else {
      console.log(
        `✔ "${phraseToFind}" not found in commit messages. Continuing workflow...`
      );
    }
  } catch (error) {
    setOutput('match', false);
  }
};

main(actionConfig.PHRASE_TO_FIND_INPUT_ID);
