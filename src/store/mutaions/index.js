import * as constant from '../constants/index.js'
export default {
    [constant.SET_INIT](state, data) {
        if (data) {
            state.user.userId = data.userId;
            state.user.idCard = data.idCard;
            state.user.phoneNum = data.phoneNum;
            state.user.userName = data.userName;
            state.user.isAuth = data.isAuth;
            state.user.source = data.source;
        }
    },
    [constant.SET_DICT](state, data) {

    }
}