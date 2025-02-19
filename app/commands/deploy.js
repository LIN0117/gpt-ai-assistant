import config from '../../config/index.js';
import { COMMAND_DEPLOY } from '../../constants/command.js';
import { deploy } from '../../services/vercel.js';
import Context from '../context.js';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const isDeployCommand = (context) => context.isCommand(COMMAND_DEPLOY);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const execDeployCommand = async (context) => {
  if (!config.VERCEL_DEPLOY_HOOK_URL) context.pushText('Missing environment variable: VERCEL_DEPLOY_HOOK_URL');
  try {
    await deploy();
    context.pushText(COMMAND_DEPLOY.reply);
  } catch (err) {
    context.pushError(err);
  }
  return context;
};

export {
  isDeployCommand,
  execDeployCommand,
};
