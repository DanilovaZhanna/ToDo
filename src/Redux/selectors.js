export const getAuth = state => state.user.login;
export const getLoadingUser = state => state.user.login;
export const getErrors = state => state.app.error
export const getTodo = id => state => state.task.todos.find((el) => (el.id === id)) 