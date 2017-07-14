<template lang="jade">
    .container
        .icon-success 
        p 您的申请已经提交成功，请等待审核
        button(@click="checkProgress()") 查看申请进度
        button(@click="goHomePage()") 返回主页
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        checkProgress() {
           this.$router.push('/applyCard/checkProgress');
        },
        goHomePage() {
             this.$router.push('/');
        }
    }
}
</script>
<style lang="stylus" scoped>
    .icon-success
        margin 1.5rem auto
        padding 0.5rem 1rem
        height 4rem
        background url(../../assets/img/icon-success.png) no-repeat center
        background-size 4rem 4rem
    p
        font bold 0.8rem/1rem "微软雅黑"
        text-align center
    button 
        margin 3rem 0.5rem
        width 8.25rem
        height 2.5rem
        background #ff0055
        border none
        outline none
        border-radius 5px
        font bold 0.8rem/2.5rem "微软雅黑"
        color #fff
</style>
