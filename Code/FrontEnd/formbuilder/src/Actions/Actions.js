/**
 * Defines Form Builder actions
 */
export const Login = 'onLogin';
export const LoginAction = (value) => {
    return {
        actionName: Login,
        payload: value
    }
};

export const OnSuccessfulLogin = 'onSuccessfulLogin';
export const OnSuccessfulLoginAction = (value) => {
    return {
        actionName: OnSuccessfulLogin,
        payload: value
    }
};