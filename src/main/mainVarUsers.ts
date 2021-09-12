// этот модуль нужен, чтобы не делать циклические импорты в mainVar
// с чанками с этим могут быть проблемы
import {MediaMatcher} from 'classes/mediaMatcher';
import {ThrottledReceiver} from 'classes/notifier';
import {RoutesHistory} from 'classes/routesHistory';

export const receiverResize = new ThrottledReceiver<number>();
export const receiverMediaMatcher = new MediaMatcher(receiverResize);
export const receiverRoutes = new RoutesHistory();