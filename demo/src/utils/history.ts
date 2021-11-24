import { createBrowserHistory } from 'history';
import { ConfirmBeforeLeavePage } from './ConfirmBeforeLeavePage';

export const history = createBrowserHistory({
  getUserConfirmation(message, callback) {
    if (ConfirmBeforeLeavePage.confirmBeforeLeave) {
      ConfirmBeforeLeavePage.confirmBeforeLeave(message, callback);
    } else {
      callback(window.confirm(message));
    }
  },
});