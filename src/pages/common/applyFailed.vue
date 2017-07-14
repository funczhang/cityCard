<template lang="jade">
    .container
        .icon-success 
        p 抱歉，您当前无法申请主卡
        span 原因：{{wrongMsg}}
        //- button(@click="checkProgress()") 查看申请进度
        //- button(@click="goHomePage()") 返回主页
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {

    },
    computed:{
        wrongMsg(){
            return this.$store.state.wrongMsg;
        }
    }
}
</script>
<style lang="stylus" scoped>
    .icon-success
        margin 1.5rem auto
        padding 0.5rem 1rem
        height 4rem
        background url(../../assets/img/icon-failed.png) no-repeat center
        background-size 4rem 4rem
    p
        margin-bottom 0.8rem
        font bold 0.8rem/1rem "微软雅黑"
        text-align center
    span 
        font-size 0.65rem
        color #999
</style>
