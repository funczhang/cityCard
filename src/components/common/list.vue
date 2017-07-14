<template>
    <div>
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <!--<img src="../../assets/img/right-arrow.png">-->
                <label class="weui-label">{{title}}</label>
            </div>
            <!--<div class="weui-cell__bd">
            </div>-->
            </div>
        <ul class="m-list">
            <li v-for="item in items">{{item}}<a href="javascript:void(null)">删除</a></li>
            <!--<li>1111111111<a href="javascript:void(null)">删除</a></li>
            <li>11111111111<a href="javascript:void(null)">删除</a></li>
            <li>11111111111<a href="javascript:void(null)">删除</a></li>-->
        </ul>
    </div>
</template>
<script>
export default {
    name: 'list',
    props: ['title','items'],
    data() {
        return {

        }
    },
    computed:{

    }
}
</script>
<style lang="stylus" scoped>
    .weui-cell
        .weui-cell__hd
            background url('../../assets/img/right-arrow.png') no-repeat left
            background-size 0.5rem
    li 
        padding-left 1.5rem
        padding-right 1.5rem
        height 1.625rem
        background #fff
        list-style-type none
        text-align left 
        a
            float right
            color #999

</style>

