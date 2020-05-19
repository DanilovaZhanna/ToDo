import { ERROR } from './constants';
import { logoutSet } from './userActionCreators'

export const throwError = (error) => {
    return {
        type:ERROR,
        error
    }
}

// пыталась сделать обработчик ошибок, в catch каждой санки идет dispatch функции обработчика ошибок:
// .catch(err => { dispatch(errorHandler(err, { hider:offLoad, 
//                                      method: () => dispatch(edit(id, title, description)), count:errorEdit}));
// куда я передаю информацию об ошибке, action, который останавливает флажок загрузки,
// саму санку, чтобы вызвать еще раз и conter чтобы на случай 500 ошибки вызвать повторно еще два раза
export function errorHandler(err, data) {
    return dispatch => {
        const {status} = err.response;
        const {count, hider} = data;
        switch(status) {
            // записываем ошибку 
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
            // что делать с недостаточно прав
            case 403: 
                dispatch(hider());  
                count.reset();
                break;
            // 500 - еще 2 раза пытаемся, если все равно не получилось записываем 500 ошибку,
            // чтобы потом попросить обновить страницу 
            case 500:             
                if (count.count) {
                    console.log(count.count)
                    count.dec()
                    data.method();
                } else 
                    dispatch(throwError('500'));
                return; 
            default: alert("Непредвиденная ошибка")
        }            
    }
}

// это счетчик для 500 ошибки 
export function ErrorCount(times=2) {
    this.count = times;
    this.dec = () => this.count--;
    this.reset = () => this.count = times;
}