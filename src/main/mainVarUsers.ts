// этот модуль нужен, чтобы не делать циклические импорты в mainVar
// с чанками с этим могут быть проблемы
import {MediaMatcher} from 'classes/mediaMatcher';
import {ThrottledReceiver} from 'classes/notifier';

export const receiverResize = new ThrottledReceiver<number>();
export const receiverMediaMatcher = new MediaMatcher(receiverResize);