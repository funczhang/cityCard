<template>
    <div>
        <div>
            <transition name="fade">
                <ul class="card" v-show="hasCard">
                    <li v-for="item in cardList">
                        <div class="lost" v-show="item.status == '2'">
                            <p class="lost-tip">临时挂失中</p>
                        </div>
                        <div class="lost" v-show="item.status == '0'">
                            <p class="lost-tip">已正式挂失</p>
                        </div>
                        <div class="bg">
                            <img class="icon-card" v-show="item.cardType=='1'" src="../assets/img/icon-zhuka.png" />
                            <img class="icon-card" v-show="item.cardType=='2'" src="../assets/img/icon-fuka.png" />
                            <img src="../assets/img/bg.png" />
                        </div>
                        <p>{{item.userName}}</p>
                        <p>**** **** **** {{item.cardNum.substr(item.cardNum.length-4,4)}}</p>
                    </li>
                    <div class="clear"></div>
                </ul>
            </transition>
            <transition name="fade">
                <div class="btn-apply" v-show="isEmpty">
                    <a id="btnApply" href="javascript:void(null)" @click="applyCard()"></a>
                    <label>点击申请</label>
                </div>
            </transition>
            <transition name="fade">
                <ul class="btn-list" v-show="showBtn">
                    <li style="border:none;">
                        <a href="javascript:void(null)" @click="checkProgress()">
                            <img src="../assets/img/icon-jingdu.png" width="70%" height="100%" />
                        </a>
                        <span>办理进度</span>
                    </li>
                    <!--test-->
                     <li style="border:none;">
                        <router-link to="/common/showCardList">
                            <img src="../assets/img/icon-jingdu.png" width="70%" height="100%" />
                        </router-link> 
                        <span>卡片列表</span>
                    </li>
                    <!--test-->
                    <div class="clear"></div>
                </ul>
            </transition>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Mint from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            cardList: [],
            isEmpty: false,
            hasCard: false,
            showBtn: false
        }
    },
    methods: {
        applyCard() {
            var self = this;
            var isAuth = self.$store.state.user.isAuth;
            if (isAuth == '1') {
                self.$router.push('/applyCard/applyCenter');
            } else {
                var data = { "method": "jumpreturn", "params": "", "jumpType": "isAuth" };
                self.$store.dispatch('goToAuth', data);
                console.log("跳转实名认证界面！");
            }
        },
        checkProgress() {
            var self = this;
            var isAuth = self.$store.state.user.isAuth;
            var id = self.$store.state.user.idCard;
            console.log("id:" + id + "isAuth:" + isAuth);
            var data = { method: 'M0655', idCard: id };
            if (isAuth != '1') {
                Toast('请您先实名认证！');
            } else {
                this.$store.dispatch('getProgress', data).then(response => {
                    console.log("response:");
                    console.log(response);
                    var res = JSON.stringify(response);
                    var res2 = JSON.parse(res);
                    var processInfo = JSON.parse(res2.result.processInfo);
                    console.log(processInfo);
                    if (processInfo.length == 0) {
                        Toast('未检测到申请记录！');
                    } else {
                        this.$router.push('/applyCard/checkProgress');
                    }
                });
            }
        }
    },
    computed: {
        isEmpty() {
            return this.$store.state.notEmpty;
        }
    },
    created() {
        // let self = this;
        // self.$store.dispatch('initUserData').then(response => {
        //     self.$store.commit('SET_INIT', response);
        //     // 实名检测
        //     var isAuth = self.$store.state.user.isAuth;
        //     var id = self.$store.state.user.idCard;
        //     var data = { method: 'M0648', idCard: id };
        //     var user = self.$store.state.user;
        //     var data = { method: 'M0662', idCard: user.idCard, userName: user.userName };
        //     console.log("获取城市卡列表入参：");
        //     console.log(data);
        //     //获取城市卡列表信息
        //     self.$store.dispatch('getCardList', data).then(response => {
        //         if (response.result.flag == '1') {
        //             console.log("该用户有城市卡，城市卡信息列表如下：");
        //             console.log(response.result.cityCardList);
        //             self.$data.cardList = response.result.cityCardList;
        //             if (self.$data.cardList.length == 0) {
        //                 this.$store.state.isEmpty = true;
        //             }
        //         } else {
        //             console.log("没有城市卡返回值：");
        //             console.log(response);
        //             console.log("该用户没有已申请成功城市卡.");
        //         }
        //     });
        // });
    },
    mounted() {
        /* 首页任何城市令用户都可以进入，如果该用户有城市卡则展示在首页，点击申请按钮后校验是否实名认证，
         如果用户未实名认证，则跳转实名认证界面（这里安卓和ios跳转有所区别）需要做区分，
         已实名认证用户跳转下一个页面*/
        let self = this;
        self.$store.dispatch('initUserData').then(response => {
            self.$store.commit('SET_INIT', response);
            //     // 实名检测
            var isAuth = self.$store.state.user.isAuth;
            var id = self.$store.state.user.idCard;
            var data = { method: 'M0648', idCard: id };
            var user = self.$store.state.user;
            var data = { method: 'M0662', idCard: user.idCard, userName: user.userName };
            console.log("获取城市卡列表入参：");
            console.log(data);
            //获取城市卡列表信息
            self.$store.dispatch('getCardList', data).then(response => {
                if (response.result.flag == '1') {
                    console.log("该用户有城市卡，城市卡信息列表如下：");
                    console.log(response.result.cityCardList);
                    self.$data.cardList = response.result.cityCardList;
                } else {
                    console.log("没有城市卡返回值：");
                    console.log(response);
                    console.log("该用户没有已申请成功城市卡.");
                }
                if (self.$data.cardList.length != 0) {
                    this.hasCard = true;
                    this.showBtn = true;
                } else {
                    this.isEmpty = true;
                    this.showBtn = true;
                }
            });
        });


    }
} 
</script>

<style lang="stylus" scoped>
    .fade-enter-active, .fade-leave-active 
        transition all 0.7s
    .fade-enter, .fade-leave-active 
        transform translate3d(0, 0, 0)
    .clear
        clear both
    .card
        li
            position relative
            margin 1rem auto
            padding 0.5rem 1rem
            width 80%
            height 7rem
            list-style-type none
            border-radius 8px
            .lost
                position absolute
                top 0
                bottom 0
                left 0 
                right 0
                z-index 10
                background rgba(0,0,0,0.5)
                border-radius 8px
                .lost-tip
                    padding 0
                    position absolute
                    z-index 11
                    width 100%
                    font bold 0.8rem/8rem "微软雅黑"
                    color #fff
                    text-align center
                    height 100%
            .bg
                position absolute
                top 0
                bottom 0
                left 0 
                right 0
                z-index -1
                img
                    width 100%
                    height 100%
                .icon-card
                    width 1.5rem
                    height 1.5rem
                    position absolute
                    z-index 2
                    top 1rem
                    right 1rem
            p
                padding 1rem 0 0.5rem 0.5rem
                text-indent 0.2rem
                text-align left
                font-size 0.8rem
                color #fff
            button
                width 4.5rem
                height 2rem
                border 1px solid #e5e5e5
                border-radius 5px
    .btn-list
        li
            margin 2.5rem 1rem 0 1rem
            float left
            width 2.5rem
            height 2rem
            list-style-type none
            a
                display block
                width 2.5rem
                height 1.5rem
            span
                padding-right 0.1rem
                font normal 0.5rem/0.5rem "微软雅黑"
                color #000
                text-align left
    .btn-apply
        padding 0.5rem 1rem
        margin 1rem auto
        width 80%
        height 5rem
        border-radius 8px
        border 2px dotted #2db7ea
        a
            display block
            margin 1rem auto 0.5rem auto
            width 2rem
            height 2rem
            background url('../assets/img/btn-add.png') no-repeat center
            background-size 1.95rem 1.95rem
        label
            display block
            width 4rem
            margin 0 auto
            color #58b5f2 !important
    .apply
        label
            display block
            float left
            width 25% 
            color #fff !important
            vertical-align middle
            text-align left
            line-height 5rem
        img
            float left 
            width 40%
            height 70%
        button
            float right !important
            margin-top 1.5rem
            float left
            width 35%
            height 1rem
            background #fff
            color #2894eb 
        span
            font-size 0.3rem
            color #fff

</style>
