<template lang="jade">
  div.container
    .head()
        p 
          label 申请人
          span {{userInfo.applyname}}
        p 
          label 联系方式 
          span {{userInfo.applylinktel}}
        p 
          label 申请时间 
          span {{userInfo.applyTime}}
    .content()
        ul
            template(v-for="item in processInfo")
                li
                    span(class="state") {{item.hj}}
                    span {{item.jgsm}}
                    br
                    span {{item.sj}}
                    router-link(to="/applyCard/applyCenter",v-if="item.hj == '异常办结'")
                        button(class="apply",style="background:#fff;") 重新申请
       .footer
            p 咨询QQ: 3125134343  

</template>
<script>
export default {
    data() {
        return {
            userInfo: {},
            processInfo: [],
            reApply: false
        }
    },
    mounted() {
        var data1 = { valueType: 'openLoadWait' };
        this.$store.dispatch('showRobot', data1).then(response => {
        });
        /*该页面展示用户申请城市卡进度，获取城市卡进度和用户信息展示即可*/
        var self = this;
        var id = self.$store.state.user.idCard;
        var data = { method: 'M0655', idCard: id };
        self.$store.dispatch('getProgress', data).then(response => {
            var res = JSON.stringify(response);
            var res2 = JSON.parse(res);
            console.log("当前办事进度：");
            console.log(response);
            self.$data.processInfo = JSON.parse(res2.result.processInfo);
            self.$data.userInfo = JSON.parse(res2.result.userInfo);
            var data2 = { valueType: 'closeLoadWait' };
            self.$store.dispatch('showRobot', data2).then(response => {
                console.log("close robot");
            });

        });


    },
    computed: {

    },
    created() {
        var data = { valueType: 'openLoadWait' };
        this.$store.dispatch('showRobot', data).then(response => {
        });
    }
}
</script>
<style lang="stylus" scoped>
    .container
        .head
            padding 1rem
            margin-top -0.2rem
            height 5.5rem
            background url(../../assets/img/bg-blue2.png) no-repeat center
            background-size 100%
            p
                text-align left
                span
                    display block
                    float left
                    font normal 0.8rem/1.5rem "微软雅黑"
                    color #fff
                    width 60%
                label
                    display block
                    float left
                    font normal 0.8rem/1.5rem "微软雅黑"
                    color #fff !important
                    width 25%             
        .content
            padding-bottom 4rem
            background #fff
            ul
                margin-top -3px
                li
                    padding 0.5rem 1rem 0 1.5rem
                    margin-left 1.05rem
                    height 3rem
                    background url(../../assets/img/bg-line.png) no-repeat left
                    list-style none
                    text-align left
                    font-size 0.6rem
                    color #999
                    border none
                    .state
                        margin-right 0.5rem
                        font-size 0.8rem
                        font-weight bolder
                        color #000
                    .apply
                        float right
                        width 3rem
                        height 1.1rem
                        border 1px solid #ff0055
                        border-radius 5px
                        font normal 0.6rem/1.1rem "微软雅黑"
                        text-align center
                        color #ff0055
         .footer
            p 
                width 100%
                position fixed
                bottom 0
                height 2rem
                text-align center
                font normal 0.65rem/2rem "微软雅黑"
                color #999

</style>
