import create from 'zustand';

type TimeoutHandle = ReturnType<typeof setTimeout>;

export type UIMessage = { message: string; type: 'error' | 'notification' };

export type NotificationState = {
  showMessage(message: UIMessage, showTimeSeconds?: number): void;
  notify(message: string, showTimeSeconds?: number): void;
  error(message: string, showTimeSeconds?: number): void;
  clearMessage(): void;
  message?: UIMessage;
  messageTimeout?: TimeoutHandle;
};

export const useNotifications = create<NotificationState>((set, get) => ({
  message: undefined,
  messageTimeout: undefined,

  showMessage: (message, showTimeSeconds) => {
    const handle = get().messageTimeout;
    if (handle) clearTimeout(handle);
    const messageTimeout =
      message.type === 'notification' || showTimeSeconds
        ? setTimeout(
            () => useNotifications.getState().clearMessage(),
            (showTimeSeconds || 3) * 1000
          )
        : undefined;
    set({ message, messageTimeout });
  },

  notify: (message, showTimeSeconds) =>
    get().showMessage({ message, type: 'notification' }, showTimeSeconds),
  error: (message, showTimeSeconds) =>
    get().showMessage({ message, type: 'error' }, showTimeSeconds),

  clearMessage: () => {
    const handle = get().messageTimeout;
    if (handle) clearTimeout(handle);
    set({ message: undefined, messageTimeout: undefined });
  },
}));
