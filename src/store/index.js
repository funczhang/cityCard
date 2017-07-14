import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutaions'
import * as getters from './getters'
const state = {
    platform: (navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPad') != -1) ?
        true : false, //设备识别 IOS true 其它 false
    selectData1: '请选择',
    user: {
        userId: '',
        idCard: '',
        phoneNum: '',
        userName: '',
        isAuth: '',
        source: ''
    },
    ZMZ: {
        base64: '',
        id: '',
        zzKey: ''
    }, //正面照片
    BMZ: {
        base64: '',
        id: '',
        zzKey: ''
    }, //背面照片
    YCZHP: {
        base64: '',
        id: ''
    },
    isEmpty: false,
    time: '60',
    gender: '',
    aoid: '',
    verifyCode: '',
    choosedZZK: false,
    choosedLocal: false,
    bankList: [],
    childBankList: [],
    nation: [],
    getCardBank: [],
    material: [], //材料
    processInfo: [],
    userInfo: {},
    wrongMsg: '',
    hasZZK: '',
    ZMZ_TIP: '', //1显示电子证照提示 其他不显示
    BMZ_TIP: '', //2显示电子证照提示 其他不显示
    form: {
        userId: '',
        id: '', //办事项id uuid
        applyName: '', //申请人姓名
        applyCardNum: '', //申请人证件号码
        sex: '', //性别
        nation: '', //民族
        cardSValidDate: '', //证件有效期开始日期 yyyy-MM-dd
        cardEValidDate: '', //证件有效期结束日期 yyyy-MM-dd
        phone: '', //电话
        bankCode: '', //银行编码
        bankAreaCode: '', //银行网点所属区域
        address: '', //联系地址
        addressCode: '', //详细地址,
        bankAddr: '',
        bankId: '',
        childBankId: '',
        childBankAddr: '',
        province: '',
        city: '',
        area: ''
    },
    ZZK: {}

};
Vue.use(Vuex);
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})