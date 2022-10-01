import { MaybePromise } from 'shared/types';
import { useNotifications } from 'client/game/notifications';

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
      useNotifications.getState().notify(options.progress);
    }
    const res: T = await (typeof f === 'function' ? f() : f);

    // Post-process
    if (options.postProcess) {
      await options.postProcess(res);
    }

    // Show success notification
    if (options.success) {
      useNotifications
        .getState()
        .notify(
          typeof options.success === 'function'
            ? options.success(res)
            : options.success
        );
    }

    return res;
  } catch (e: any) {
    // Show error notification
    useNotifications.getState().error(`Hups! Joku meni vikaan`);

    if (options.throw) {
      throw e;
    }
    return undefined;
  }
}
