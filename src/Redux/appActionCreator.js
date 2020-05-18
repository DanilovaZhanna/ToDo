import { ERROR } from './constants';
import { logoutSet } from './userActionCreators'

export const throwError = (error) => {
    return {
        type:ERROR,
        error
    }
}

export function errorHandler(err, data) {
    return dispatch => {
        const {status} = err.response;
        const {count, hider} = data;
        count.dec()
        switch(status) {
            // выведет
            case 400:                
                dispatch(hider()); 
                dispatch(throwError(err.response.data.message));
                count.reset();
                break;
            // если 401 просто кидаем на логин 
            case 401: 
                dispatch(logoutSet());
                dispatch(hider());                 
                count.reset();
                return;
            // че делать с недостаточно прав
            case 403: 
                dispatch(hider());  
                count.reset();
                break;
            // 500 - 2 раза пытаемся
            case 500:             
                if (count.count) {
                    console.log(count.count)
                    data.method();
                } else 
                    dispatch(throwError('500'));
                return; 
            default: alert("Непредвиденная ошибка")
        }            
    }
}

export function ErrorCount(times=3) {
    this.count = times;
    this.dec = () => this.count--;
    this.reset = () => this.count = times;
}