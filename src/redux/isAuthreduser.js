const initialState = {
    isAuth: false
}

export const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH": {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        default: {
            return state
        }
    }
};

export const setAuth = (isAuth) => ({type: "AUTH", isAuth});