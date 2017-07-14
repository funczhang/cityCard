<template>
    <div>
        <div>
            <ul class="card apply">
                <li>
                    <div class="bg">
                        <img src="../../assets/img/bg.png" />
                    </div>
                    <label>主卡申请</label>
                    <img class="icon-card" src="../../assets/img/icon-cityCard.png" />
                    <button @click="applyMainCard()">立即申请</button>
                </li>
            </ul>
        </div>
    
    </div>
</template>
<script>
export default {
    data() {
        return {
            state: ''
        }
    },
    methods: {
        applyMainCard() {
            var self = this;
            if (self.$data.state == '0') {
                self.$router.push('/applyCard/ApplyForm');
            } else {
                self.$router.push('/applyCard/failed');
            }
            //  self.$router.push('/applyCard/ApplyForm');
        }
    },
    computed: {

    },
    mounted() {
        /* 此页面用于已实名认证进入后申请主卡和辅卡选择页面(目前一期开发只能看见主卡申请按钮)，
        点击主卡申请需要校验用户是否成年，是否已有主卡,校验不通过跳转相应的页面*/
        var self = this;
        var data = { method: 'M0648', idCard: self.$store.state.user.idCard };
        console.log("能否申请城市卡接口参数:");
        console.log(data);
        var data1 = { valueType: 'openLoadWait' };
        this.$store.dispatch('showRobot', data1).then(response => {
        });
        self.$store.dispatch('canApplyCityCard', data).then(response => {
            console.log('用户能否申请城市卡返回值：');
            console.log(response);
            var data2 = { valueType: 'closeLoadWait' };
            self.$data.state = response.result.state;
            if (self.$data.state != '0') {
                self.$store.state.wrongMsg = response.result.msg;
            }
            self.$store.dispatch('showRobot', data2).then(response => {
                console.log("close robot");
            });
        });
    }
} 
</script>

<style lang="stylus" scoped>
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
            p
                padding 0.5rem 0
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
            margin 0.5rem 1rem 0 1rem
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
        margin 0 auto
        width 85%
        height 5rem
        border-radius 8px
        border 2px dotted #2db7ea
        a
            display block
            margin 1rem auto 0.5rem auto
            width 2rem
            height 2rem
            background url('../../assets/img/btn-add.png') no-repeat center
            background-size 2rem 2rem
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
            line-height 7rem
            font-weight bold
        .icon-card
            float left 
            width 40%
            height 55%
            margin-top 1.5rem
        button
            float right !important
            margin-top 2.5rem
            float left
            width 35%
            height 1rem
            background #fff
            color #2894eb 
        span
            font-size 0.3rem
            color #fff

</style>
