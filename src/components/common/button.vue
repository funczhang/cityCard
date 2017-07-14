<template>
  <a href="javascript:;" class="weui-btn" @click="submitInfo()" :style='{width:width,height:height,color:color}'>
    {{text}}</a>
</template>
<script>
import Vue from 'vue'
import Mint from 'mint-ui';
import { MessageBox, Toast } from 'mint-ui';
export default {
  props: ['width', 'height', 'color', 'text'],
  methods: {
    submitInfo() {
      var info = {
        method: 'A0107',
        phoneNum: this.$store.state.user.phoneNum,
        verifyCode: this.$store.state.verifyCode
      };
      var data1 = { valueType: 'openLoadWait' };
      var data2 = { valueType: 'closeLoadWait' };
      console.log("验证码校验参数：");
      console.log(info);
      var form = { method: 'M0656' };
      form.userId = this.$store.state.user.userId;//用户id
      form.id = this.$store.state.aoid;//办事项id uuid
      form.applyName = this.$store.state.user.userName;//申请人姓名
      form.applyCardNum = this.$store.state.user.idCard;//申请人证件号码
      form.sex = this.$store.state.gender;//性别
      form.nation = this.$store.state.form.nation;//民族
      form.cardSValidDate = this.$store.state.form.cardSValidDate;//证件有效期开始日期 yyyy-MM-dd
      form.cardEValidDate = this.$store.state.form.cardEValidDate;//证件有效期结束日期 yyyy-MM-dd
      form.phone = this.$store.state.user.phoneNum;//电话
      form.bankCode = this.$store.state.form.bankCode;//银行编码
      form.bankAreaCode = this.$store.state.form.bankAreaCode;//银行网点所属区域
      form.address = this.$store.state.form.address;//联系地址
      form.addressCode = this.$store.state.form.addressCode;//详细地址编码
      console.log("form:");
      console.log(form);

      if (form.cardSValidDate == '' || form.cardSValidDate == undefined) {
        console.log("证件开始日期不能为空！");
        Toast('证件开始日期不能为空！');
        // this.$store.dispatch('toast', '证件开始日期不能为空！');
        return false;
      }
      if (form.cardEValidDate == '' || form.cardEValidDate == undefined) {
        console.log("证件结束日期不能为空！");
        Toast('证件结束日期不能为空！');
        return false;
      }
      if (form.cardSValidDate >= form.cardEValidDate) {
        console.log("证件有效期结束日期应大于证件有效期开始日期！");
        Toast('证件有效期结束日期需要大于开始日期！');
        return false;
      }
      if (form.nation == '' || form.nation == undefined) {
        Toast('民族不能为空！');
        console.log("民族不能为空！");
        // this.$store.dispatch('toast', '民族不能为空！');
        return false;
      }
      if (form.phone == '' || form.phone == undefined) {
        console.log("手机号码不能为空！");
        Toast('手机号码不能为空！');
        return false;
      }
      if (form.bankCode == '' || form.bankCode == undefined) {
        console.log("银行不能为空！");
        Toast('银行不能为空！');
        return false;
      }
      if (form.bankAreaCode == '' || form.bankAreaCode == undefined) {
        console.log("支行网点不能为空！");
        Toast('支行网点不能为空！');
        return false;
      }
      if (form.address == '' || form.address == undefined) {
        console.log("详细地址不能为空！");
        Toast('详细地址不能为空！');
        return false;
      }
      if (form.addressCode == '' || form.addressCode == undefined) {
        console.log("联系地址不能为空！");
        Toast('联系地址不能为空！');
        return false;
      }

      if (this.$store.state.verifyCode == '') {
        Toast('验证码不能为空！');
        return false;
      }
      if (this.$store.state.YCZHP.id == '' || this.$store.state.ZMZ.id == '' || this.$store.state.BMZ.id == '') {
        Toast('请上传完整照片材料后提交申请！');
        return false;
      }
      console.log("表单提交如下：");
      console.log(form);
      // 请求校验验证码
      this.$store.dispatch('testCode', info).then(response => {
        console.log("验证码校验结果:");
        console.log(response);
        if (response.resultCode === '0000') {
          // 提交表单请求
          MessageBox.confirm("是否确认提交").then(action => {
            if (action == 'confirm') {
              this.$store.dispatch('showRobot', data1).then(response => {
              });
              this.$store.dispatch('submit', form).then(response => {
                console.log("表单提交结果：");
                console.log(response);
                if (response.result.flag == '1') {
                  this.$store.dispatch('showRobot', data2).then(response => {
                  });
                  this.$router.push('/applyCard/success');
                } else {
                  this.$store.dispatch('showRobot', data2).then(response => {
                  });
                  this.$store.state.wrongMsg = response.result.msg;
                  this.$router.push('/applyCard/failed');
                }
              });
            }
          }).catch(error => {
            console.log("取消提交表单");
          });

        } else {
          Toast('验证码不匹配，请确认后重试！');
        }

      });

    }
  }
}
</script>
<style lang="stylus" scoped>
    .weui-btn
        display block
        margin-top 0.5rem
        margin-bottom 0.5rem
        padding-bottom 1.5rem
        background #ff0055
        font-size 0.8rem
        line-height 2.3rem        
</style>
