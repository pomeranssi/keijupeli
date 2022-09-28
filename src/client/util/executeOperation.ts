import { MaybePromise } from 'shared/types';
import { useGameState } from 'client/game/state';

type ExecutionOptions<T> = {
  progress?: string;
  success?: string | ((v: T) => string);
  throw?: boolean;
  confirm?: string;
  confirmTitle?: string;
  postProcess?: (t: T) => MaybePromise<any>;
};

export async function executeOperation<T>(
  f: (() => Promise<T>) | Promise<T>,
  options: ExecutionOptions<T> = {}
) {
  try {
    if (options.confirm) {
      if (!confirm(options.confirm)) return;
    }

    // Show notification during operation
    if (options.progress) {
      useGameState
        .getState()
        .showMessage({ message: options.progress, type: 'notification' });
    }
    const res: T = await (typeof f === 'function' ? f() : f);

    // Post-process
    if (options.postProcess) {
      await options.postProcess(res);
    }

    // Show success notification
    if (options.success) {
      useGameState.getState().showMessage({
        message:
          typeof options.success === 'function'
            ? options.success(res)
            : options.success,
        type: 'notification',
      });
    }

    return res;
  } catch (e: any) {
    // Show error notification
    useGameState.getState().showMessage({
      message: `Hups! Joku meni vikaan`,
      type: 'error',
    });

    if (options.throw) {
      throw e;
    }
    return undefined;
  }
}
