<template>
  <div class="container">
    <div class="applicant-info">
      <moduel-head title="申请人信息"></moduel-head>
      <vue-input title="申请人姓名" type="text" placeholder="请输入姓名" disabled="disabled" :text="userName" color="#999"></vue-input>
      <vue-input title="身份证号码" type="text" placeholder="请输入身份证号码" disabled="disabled" :text="idCard" color="#999"></vue-input>
      <!--证件有效期-->
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">身份证有效期</label>
        </div>
        <div class="weui-cell__bd select-date">
          <input id="beginDate" class="weui-input" type="date" v-model.lazy="beginDate" style="width:45%" placeholder="开始日期">
          <span style="float:left;">至</span>
          <input id="endDate" class="weui-input" type="date" v-model.lazy="endDate" placeholder="结束日期">
        </div>
      </div>
      <vue-input title="性别" type="text" placeholder="请输入性别" :text="gender" color="#999" disabled="disabled"></vue-input>
      <vue-select selected="selectedNation" title="民族" :items="nation"></vue-select>
      <!--号码-->
      <div class="weui-cell" style="height:2rem;">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入手机号码" v-model="phoneNum">
        </div>
      </div>
      <!--号码-->
      <!--手机验证码-->
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">手机验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input input-code" type="text" v-model="verifyCode" placeholder="请输入验证码">
        </div>
        <div class="weui-cell__ft">
          <button id="btnCode" ref="btnCode" :disabled="btnState" class="weui-vcode-btn" @click="getCode()" :class="{active:btnState}">获取验证码</button>
        </div>
      </div>
      <!--领取网点选择-->
      <div class="weui-cell select-area">
        <div class="weui-cell__hd">
          <label class="weui-label">领取网点</label>
        </div>
        <div class="weui-cell__bd fix clear">
          <select @change="bankChange()" id="bank" v-model="bankId" style="background-color:#fff;">
            <option style="color:#999;" disabled value="">选择银行</option>
            <option v-for="item in bankList" :value="item.id">{{ item.name }}</option>
          </select>
          <select id="childBank" v-model="childBankId" @change="getChildBankAddr()" style="background-color:#fff;width:60%;">
            <option style="color:#999;" disabled value="">选择支行网点</option>
            <template v-if="childBankList">
              <option v-for="item in childBankList">{{ item.name }}</option>
            </template>
          </select>
          <p class="tip">制卡完成后，凭有效证件去该网点领取</p>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after" style="height:2rem;padding:10px 15px;">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">联系地址</label>
        </div>
        <router-link to="/applyCard/SelectAddress" style="">
          <div class="weui-cell__bd fix">
            <span v-if="!province" style="float:left;color:#999;">选择所在区域</span>
            <span v-else style="float:left;width:95%;color:#000;font-size:0.8rem;text-align:center;">{{province}}
              <br/>{{city}}&nbsp;{{area}}</span>
          </div>
        </router-link>
      </div>
      <!--详细地址begin-->
      <div class="weui-cell" style="height:2rem;">
        <div class="weui-cell__hd">
          <label class="weui-label">详细地址</label>
        </div>
        <div class="weui-cell__bd address" style="border:none;color:#000;">
          <input class="weui-input" type="text" placeholder="请输入详细地址" v-model.lazy="address" maxlength="50">
        </div>
      </div>
    </div>
    <div class="upload">
      <moduel-head title="材料上传"></moduel-head>
      <div class="id-card">
        <label>身份证</label>
        <div class="choose-pic">
          <img class="icon-add" src="../../assets/img/icon-upload.png" @click="upload('1')" />
          <img v-show="ZMZ.base64 != ''" :src="'data:image/jpg;base64,' + ZMZ.base64" @click="showBigPic(ZMZ.base64)" />
          <a v-show="ZMZ.base64 != ''" href="javascript:void(null)" @click="deletePic(ZMZ.id,'1')">×</a>
          <p class="pic-tip">
            <span class="pic-tip" v-show="ZMZ_TIP != '1'">身份证人像面</span>
            <span class="pic-tip" v-show="ZMZ_TIP == '1'">人像面(电子证照)</span>
          </p>
        </div>
        <div class="choose-pic" style="margin-right:0;">
          <img class="icon-add" src="../../assets/img/icon-upload.png" @click="upload('2')" />
          <img v-show="BMZ.base64 != ''" :src="'data:image/jpg;base64,' + BMZ.base64" @click="showBigPic(BMZ.base64)" />
          <a v-show="BMZ.base64 != ''" href="javascript:void(null)" @click="deletePic(BMZ.id,'2')">×</a>
          <p class="pic-tip">
            <span class="pic-tip" v-show="BMZ_TIP != '2'">身份证国徽面</span>
            <span class="pic-tip" v-show="BMZ_TIP == '2'">国徽面(电子证照)</span>
            <div v-show="BMZ.base64 != ''" class="bg-tip"></div>
          </p>
        </div>
      </div>
      <div class="pic">
        <label>一寸照片</label>
        <div class="choose-pic">
          <img class="icon-add" src="../../assets/img/icon-upload.png" @click.stop="choosePic()" />
          <img v-show="YCZHP.base64 != ''" :src="'data:image/jpg;base64,' + YCZHP.base64" @click="showBigPic(YCZHP.base64)" />
          <a v-show="YCZHP.base64 != ''" href="javascript:void(null)" @click="deletePic(YCZHP.id,'3')">×</a>
          <p class="pic-tip">
            <span class="pic-tip">一寸照片</span>
          </p>
        </div>
      </div>
    </div>
    <vue-button text="提交" width="85%" height="2.3rem"></vue-button>
    <transition name="fade">
      <div class="mask" v-show="submitState" @click="clickMask()">
        <div class="panel">
          <moduel-head title="一寸照片上传须知"></moduel-head>
          <ul>
            <li>1.个人白底免冠彩色照片</li>
            <li>2.像素要求358*441（一寸照片）</li>
            <li>3.图片大小15K-45K</li>
            <li>4.建议去照相馆拍照，拷贝照片原件</li>
            <li>5.建议使用第三方的照片制作软件进行制作</li>
            <li>6.不建议手机拍照上传，这样会导致材料审核不通过</li>
          </ul>
          <button id="btnUpload" @click.stop="btnUpload()" class="btn-upload">点击上传</button>
        </div>
      </div>
    </transition>
    <div id="mask2" class="mask2" v-show="pic != ''" @click="hideMask()">
      <img :src="'data:image/jpg;base64,' + pic" />
    </div>
  </div>
</template>
<script>
import input from '../../components/common/input.vue'
import select from '../../components/common/select.vue'
import button from '../../components/common/button.vue'
import head from '../../components/common/moduleHead.vue'
import Vue from 'vue'
import Mint from 'mint-ui';
import { MessageBox, Toast } from 'mint-ui';
export default {
  data() {
    return {
      submitState: false,
      // childBankList: [],
      phoneNum: '',
      address: this.$store.state.form.address,
      mList: [],
      baseInfo: {},
      hasUploadZZK: '',
      type: '',
      beginDate: this.$store.state.form.cardSValidDate,
      endDate: this.$store.state.form.cardEValidDate,
      choosedZZK: false,
      choosedLocal: false,
      pic: '',
      verifyCode: this.$store.state.verifyCode,
      hasZZK: '',
      deleteType: '',
      btnState: false,
      nagativeColor:'#999'
    }
  },
  components: {
    'vue-input': input,
    'vue-select': select,
    'vue-button': button,
    'moduel-head': head
  },
  watch: {
    phoneNum(newVal) {
      this.$store.state.user.phoneNum = newVal;
      this.$data.phoneNum = newVal;
    },
    beginDate(newVal, oldVal) {
      this.$store.state.form.cardSValidDate = newVal;
    },
    endDate(newVal, oldVal) {
      this.$store.state.form.cardEValidDate = newVal;
    },
    address(newVal) {
      this.$store.state.form.address = newVal;
      console.log("address:" + newVal);
    },
    verifyCode(newVal) {
      this.$store.state.verifyCode = newVal;
    }
  },
  methods: {
    choosePic() {
      this.$data.submitState = true;
    },
    setTime() {
      var self = this;
      var btnCode = document.getElementById('btnCode');
      if (this.$store.state.time == 0) {
        btnCode.innerHTML = "获取验证码";
        this.$store.state.time = 60;
        this.$data.btnState = false;
        return;
      } else {
        btnCode.innerHTML = "重新发送(" + self.$store.state.time + ")";
        this.$store.state.time = this.$store.state.time - 1;
         this.$data.btnState = true;
      }
      setTimeout(function () {
        self.setTime();
      }, 1000)
    },
    getCode() {
      //手机号正则
      var mPattern = /^(^0\d{3,4}-\d{7,8})$|^(^0\d{3,4}\d{7,8})$|^(1(3|4|5|7|8)[0-9]\d{8})$/;
      var phoneNum = this.$store.state.user.phoneNum;
      //校验手机号码
      console.log("phoneNum:" + phoneNum);
      if (mPattern.test(phoneNum)) {
        var data = { method: 'A0101', phoneNum: phoneNum, msgTeplType: '12' };
        MessageBox.confirm("确定发送验证码到手机号：" + phoneNum, '发送验证码提示').then(action => {
          if (action == 'confirm') {
            this.setTime();
            this.$store.dispatch('getCode', data).then(response => {
              var res = JSON.stringify(response);
              console.log("发送验证码接口返回结果：" + JSON.parse(res));
            });
          }
          console.log(action);
        }).catch(error=>{
          console.log("短信验证码发送选择："+error);
        });

      } else {
        Toast('手机号码格式不正确!');
      }
    },
    btnUpload() {
      var mList = this.$data.mList;
      var data = {
        "valueType": "uploadPicPanel",
        "popData": {
          picType: "0",
          contentCode: "001",
          cardType: "1",
          servicename: "001",
          type: "1"
        }
      }
      // 一寸照片提示文字消失
      this.$data.submitState = false;
      //调用原生获取用户选取的图片
      this.$store.dispatch('uploadPic', data).then(response => {
        var res = JSON.stringify(response);
        var res2 = JSON.parse(res);
        var aoid = res2.aoid;
        // 将图片上传至uc服务器
        // 这里需要获取材料的oid当做moid参数传到uc
        var data2 = {
          method: 'M0652',
          aoid: res2.aoid,//办事项oid
          moid: mList[2].oid,//附件材料oid
          attaname: res2.attaname,//附件名称
          attapath: res2.attapath,//附件路径
          smmaterialname: mList[2].name,//材料名称
          zzKey: '',//电子证件照
        };
        console.log("一寸照片oid：" + res2.aoid)
        // this.$data.YCZHP.base64 = res2.imgBase64;
        this.$store.state.YCZHP.base64 = res2.imgBase64;
        this.$store.state.aoid = aoid;
        this.$store.dispatch('upload2UC', data2).then(response => {
          var res = JSON.stringify(response);
          var res2 = JSON.parse(res);
          console.log("一寸照片本地上传uc返回结果:");
          console.log(response);
          if (res2.result.flag == '1') {
            Toast('附件上传成功！');
            this.$store.state.YCZHP.id = res2.result.id;
          }
          if (res2.result.flag == '0') {
            Toast('附件上传成功！');
          }
        });
      });
    },
    clickMask() {

    },
    getChildBankAddr() {
      var e = event.target;
      var val = e.value;
      this.$store.state.form.childBankId = val;
      var childBank = document.getElementById('childBank');
      var index = childBank.selectedIndex - 1;
      // this.$store.state.form.bankAreaCode = this.$data.childBankList[index].bankAreaCode;
      this.$store.state.form.bankAreaCode = this.$store.state.childBankList[index].bankAreaCode;
      console.log("this.$store.state.form.bankAreaCode:" + this.$store.state.form.bankAreaCode);
    },
    hideMask() {
      this.$data.pic = '';
    },
    showBigPic(base64) {
      this.$data.pic = base64;
    },
    deletePic(id, type) {
      console.log("删除uc照片id:" + id);
      // 删除上传材料
      var id = id;
      var YCZHP_ID = this.$store.state.YCZHP.id;
      var ZMZ_ID = this.$store.state.ZMZ.id;
      var BMZ_ID = this.$store.state.BMZ.id;
      console.log(YCZHP_ID + "..." + ZMZ_ID + "..." + BMZ_ID);
      var data = { method: 'M0571', id: id };
      this.$data.deleteType = type;
      this.$store.dispatch('deletePic', data).then(response => {
        console.log("删除照片结果：");
        console.log(response);
        console.log('code:' + response.result.code);
        var result = JSON.stringify(response.result);
        var result2 = JSON.parse(result);
        var source = this.$store.state.user.source;
        console.log("source:" + source);
        var code = '';
        if (source == 'Android') {
          code = response.result.code;
        } else {
          var res2 = JSON.parse(response.result);
          code = res2.code;
        }
        if (code == '1001') {
          Toast('删除照片成功！');
          if (YCZHP_ID == id) {
            console.log("删除一寸照片...");
            this.$store.state.YCZHP = { base64: '', id: '' };
          }
          if (ZMZ_ID == id) {
            console.log("删除正面照...");
            this.$store.state.ZMZ = { base64: '', id: '', zzKey: '' };
          }
          if (BMZ_ID == id) {
            console.log("删除背面照...");
            this.$store.state.BMZ = { base64: '', id: '', zzKey: '' };
          }
          if (this.$data.deleteType == '1') {
            this.$store.state.ZMZ_TIP = '';
          } else if (this.$data.deleteType == '2') {
            this.$store.state.BMZ_TIP = '';
          }
        } else {
          Toast('删除照片失败！');
        }
        // 判断
        if (this.$store.state.ZMZ.id == '' && this.$store.state.BMZ.id == '') {
          // this.$data.choosedZZK = false;
          // this.$data.choosedLocal = false;
           this.$store.state.choosedZZK = false;
          this.$store.state.choosedLocal = false;
        }
      });
    },
    bankChange() {
      var e = event.target;
      var val = e.value;
      this.$store.state.form.bankId = val;
      console.log(" this.$store.state.form.bankId:" + this.$store.state.form.bankId);
      var data = { method: 'M0649', parentId: val };
      var bank = document.getElementById('bank');
      console.log("bank-index:" + bank.selectedIndex);
      var index = bank.selectedIndex - 1;
      this.$store.state.form.bankCode = this.$store.state.bankList[index].bankCode;
      // this.$store.state.form.bankAddr = e.innerHTML;
      console.log("this.$store.state.form.bankCode:" + this.$store.state.form.bankCode);
      this.$store.dispatch('getBankList', data).then(response => {
        // this.$data.childBankList = JSON.parse(response.result.data);
        this.$store.state.childBankList = JSON.parse(response.result.data);
      });
    },
    upload(type) {
      var self = this;
      var userId = self.$store.state.user.userId;
      var picType = '0';
      var data = {};
      var flag = self.$store.state.hasZZK;
      self.$data.type = type;
      console.log("self.$store.state.hasZZK:" + self.$store.state.hasZZK);
      if (flag == '1') {
        // 有电子证照情况下
        picType = '1';
        console.log("该用户有电子证照！");
      } else {
        console.log("该用户没有电子证照！");
      }
      // if (self.$data.choosedZZK) {
      //   picType = '2';
      //   console.log("只有电子证照！");
      // }
      //  if (self.$data.choosedLocal) {
      //   picType = '0';
      //   console.log("已选本地上传！");
      // }
      if (self.$store.state.choosedZZK) {
        picType = '2';
        console.log("只有电子证照！");
      }
       if (self.$store.state.choosedLocal) {
        picType = '0';
        console.log("已选本地上传！");
      }
      // choosedLocal
      data = {
        "valueType": "uploadPicPanel",
        "popData": {
          picType: picType,
          contentCode: "001",
          cardType: "1",
          servicename: "城市卡申请",
          type: self.$data.type,
          applysource: '2'
        }
      }
      console.log("上传照片参数：");
      console.log(data);
      self.$store.dispatch('uploadPic', data).then(response => {
        var mList = self.$data.mList;
        var res = JSON.stringify(response);
        var res2 = JSON.parse(res);
        // 判断返回结果是否是电子证照的
        if (res2.zzKey) {
          console.log("用户选择电子证照。");
          var moid = '';
          var smmaterialname = '';
          var zzKey = res2.zzKey;
          console.log("zzk:" + zzKey);
          console.log('用户选择上传电子证照，返回结果是：');
          console.log("res:");
          console.log(res2);
          // self.$data.choosedZZK = true;
          self.$store.state.choosedZZK = true;
          if (self.$data.type == '1') {
            self.$store.state.ZMZ.base64 = res2.image;
            moid = mList[0].oid;
            smmaterialname = mList[0].name;
            self.$store.state.ZMZ_TIP = '1';
          } else {
            self.$store.state.BMZ.base64 = res2.image;
            moid = mList[1].oid;
            smmaterialname = mList[1].name;
            self.$store.state.BMZ_TIP = '2';
          }
          var aoid = res2.aoid;
          var type = self.$data.type;
          var data3 = {
            method: 'M0652',
            moid: moid,
            aoid: aoid,//办事项oid
            smmaterialname: smmaterialname,//材料名称
            zzKey: zzKey,//电子证件照
          };
          console.log("上传电子证照参数是：");
          console.log(data3);
          self.$store.dispatch('upload2UC', data3).then(response => {
            var res = JSON.stringify(response);
            var res2 = JSON.parse(res);
            console.log("电子证照上传到uc结果：");
            console.log(response);
            var id = res2.result.id;
            if (res2.result.flag == '1' && self.$data.type == '1') {
              Toast('附件上传成功！');
              self.$store.state.ZMZ.id = id;
            } else if (res2.result.flag == '1' && self.$data.type == '2') {
              Toast('附件上传成功！');
              self.$store.state.BMZ.id = id;
            } else if (res2.result.flag == '0') {
              Toast('附件上传失败！');
            }
          });
        } else {
          console.log("用户选择身份证本地上传。");
          // 本地上传
          var aoid = res2.aoid;
          console.log("身份证上传aoid：" + aoid);
          var type = self.$data.type;
          var base64 = res2.imgBase64;
          var moid = '';
          var smmaterialname = '';
          // self.$data.choosedLocal = true;
          self.$store.state.choosedLocal = true;
          if (type == '1') {
            self.$store.state.ZMZ.base64 = base64;
            moid = mList[0].oid;
            smmaterialname = mList[0].name;
          } else {
            self.$store.state.BMZ.base64 = base64;
            moid = mList[1].oid;
            smmaterialname = mList[1].name;
          }
          console.log("开始入参...");
          var data5 = {
            method: 'M0652',
            aoid: aoid,//办事项oid
            moid: moid,//附件材料oid
            attaname: res2.attaname,//附件名称
            attapath: res2.attapath,//附件路径
            smmaterialname: smmaterialname,//材料名称
            zzKey: ''//电子证件照
          };
          console.log("本地上传入参data5：" + JSON.stringify(data5));
          self.$store.dispatch('upload2UC', data5).then(response => {
            var res = JSON.stringify(response);
            var res2 = JSON.parse(res);
            console.log("身份证本地上传到uc结果：");
            console.log(response);
            var id = res2.result.id;
            if (res2.result.flag == '1' && self.$data.type == '1') {
              Toast('附件上传成功！');
              self.$store.state.ZMZ.id = id;
            } else if (res2.result.flag == '1' && self.$data.type == '2') {
              Toast('附件上传成功！');
              self.$store.state.BMZ.id = id;
            } else if (res2.result.flag == '0') {
              Toast('附件上传失败！');
            }
          });
        }
      });

    }
  },
  computed: {
    selectData1() {
      return this.$store.state.selectData1
    },
    bankId() {
      return this.$store.state.form.bankId;
    },
    childBankId() {
      return this.$store.state.form.childBankId;
    },
    // 民族
    nation() {
      return this.$store.state.nation;
    },
    selectedNation() {
      return this.$store.state.form.nation;
    },
    // 获取用户名
    userName() {
      return this.$store.state.user.userName;
    },
    // 获取身份证号码
    idCard() {
      return this.$store.state.user.idCard;
    },
    // 根据身份证获取性别
    gender() {
      var id = this.$store.state.user.idCard;
      var gender;
      if (id.length == 18) {
        gender = id.substr(16, 1);
      } else {
        gender = id.substr(14, 1);
      }
      var sex = (gender % 2 == 0 ? '女' : '男');
      if (sex == '男') {
        this.$store.state.gender = '1';
      } else {
        this.$store.state.gender = '2';
      }
      this.$store.state.form.sex = sex;
      return sex;
      // return 'male'
    },
    phoneNum() {
      return this.$store.state.user.phoneNum;
    },
    bankList() {
      return this.$store.state.bankList;
    },
    childBankList() {
      return this.$store.state.childBankList;
    },
    province() {
      return this.$store.state.form.province;
    },
    city() {
      return this.$store.state.form.city;
    },
    area() {
      return this.$store.state.form.area;
    },
    YCZHP() {
      return this.$store.state.YCZHP;
    },
    ZMZ() {
      return this.$store.state.ZMZ;
    },
    BMZ() {
      return this.$store.state.BMZ;
    },
    verifyCode() {
      return this.$store.state.verifyCode;
    },
    selectedBank: {
      get() {
        return this.$store.state.form.bankCode;
      }
    },
    address() {
      return this.$store.state.form.address;
    },
    ZMZ_TIP() {
      return this.$store.state.ZMZ_TIP;
    },
    BMZ_TIP() {
      return this.$store.state.BMZ_TIP;
    }
  },
  mounted() {
    var self = this;
    self.$data.phoneNum = self.$store.state.user.phoneNum;
    // 获取材料列表
    self.$store.dispatch('getMaterialList', { method: 'M0653' }).then(response => {
      var res = JSON.stringify(response);
      var res2 = JSON.parse(res);
      var arr = res2.result.materialList;
      arr.sort(function (a, b) {
        return a.sort - b.sort;
      });
      this.$data.mList = arr;
    });
    // 获得民族列表
    self.$store.dispatch('getNation').then(response => {
      console.log("民族列表：");
      console.log(response);
      self.$store.state.nation = JSON.parse(response.result.data);
    });
    //获得银行列表
    var data = { method: 'M0649', parentId: '0' };
    self.$store.dispatch('getBankList', data).then(response => {
      console.log("银行列表：");
      console.log(response);
      self.$store.state.bankList = JSON.parse(response.result.data);
      self.$data.bankList = JSON.parse(response.result.data);


      //检测是否有子银行
      if (this.$store.state.form.bankId) {
        console.log("存在父银行,id：" + this.$store.state.form.bankId);
        var data2 = { method: 'M0649', parentId: this.$store.state.form.bankId };
        self.$store.dispatch('getBankList', data2).then(response => {
          console.log("该银行的子银行列表----------------------：");
          console.log(response);
          self.$store.state.childBankList = JSON.parse(response.result.data);
        });
        console.log("回填存在银行...");
      } else {
        console.log("回填没有银行...");
      }

    });
    // 添加上传弹窗消失时间
    document.body.addEventListener('click', function (event) {
      let e = event.target;
      let btnUpload = document.getElementById('btnUpload');
      if (e != btnUpload) {
        self.$data.submitState = false;
      }
    });
    //是否有电子证照
    var userId = self.$store.state.user.userId;
    var hasZZK = {
      method: 'M0654',
      contentCode: '001',
      userId: userId,
      cardType: '1',
      applysource: '2',
      servicename: '芜湖城市卡申请',
      type: '1'
    };
    console.log("hasZZK入参：");
    console.log(hasZZK);
    self.$store.dispatch('hasZZK', hasZZK).then(response => {
      var res = JSON.stringify(response);
      var res2 = JSON.parse(res);
      if (res2.result.flag) {
        self.$store.state.hasZZK = res2.result.flag;
      } else {
        self.$store.state.hasZZK = JSON.parse(response.result).flag;
      }
      console.log("判断电子证照返回结果：");
      console.log(response);
      console.log("self.$data.hasZZK:" + self.$store.state.hasZZK);
    });


  }
}
</script>
<style lang="stylus">
  .active
    color #999 !important
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-active 
    opacity: 0
  #beginDate,#endDate
    font-size 0.7rem
  input
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  input:focus
    border none
    background none
  .pic-tip
    font-size 0.6rem!important
  .mask2
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0,0,0,0.5)
    z-index 999
    img
      position absolute
      top 3rem
      left 0
      right 0
      width 100%
      height 60%
  .address
    height 1.5rem
    .weui-cell__hd
            text-align left
  html
  body
    position relative
/*清除浮动*/
  .fix 
    *zoom:1
  .fix after 
    display block
    content "clear" 
    height 0
    clear both
    overflow hidden
    visibility hidden
  .input-code1::-webkit-input-placeholder
    font-size 0.65rem
  .weui-input
  .applicant-info
    background #fff
    border-top 1px solid #e5e5e5
    borer-bottom 1px solid #e5e5e5
    label
      font-size 0.8rem
    .weui-cell__hd
      text-align left
    .select-area
      .weui-cell__bd
        height 100%
        .tip
          float left
          margin-top 0.3rem
          margin-left 0.25rem
          height 1rem
          color #ff0055
          font-size 0.5rem
      height 2.5rem
      select
        margin-top 0.75rem 
        float left
        width 40%
        border none
        outline none
        option
          // font-size 0.65rem
    .select-date
        height 2rem
        span
          float left
          position relative
          left -3px
          display block
          height 100%
          line-height 2rem
          color #999
          font-size 0.65rem
        input
          float left
          height 100%
          width 45%
  .upload
    margin-top 0.5rem
    background #fff
    .id-card
    .pic    
        padding 0.5rem 1rem
        height 6rem
        border-top 1px solid #e5e5e5
        label
          dispaly block
          float left
          height 100%
          width 3.5rem
          vertical-align middle
          line-height 6rem
        .choose-pic
          position relative
          z-index 1
          float left
          margin 0.5rem 1rem
          width 5rem 
          height 5rem
          border 1px dotted #e5e5e5
          border-radius 8px
          .pic-tip
            position absolute
            bottom 0px
            left 0
            right 0
            padding 0.3rem 0
            height 0.8rem
            font normal 0.75rem/1.4rem "微软雅黑"
            color #999
            text-align center
            border-radius 0 0 8px 8px
            z-index 19
              span
                font-size 0.5rem
              .bg-tip
                position absolute
                top 0
                left 0
                right 0
                bottom 0
                background rgba(0,0,0,0.5)
                z-index 18
          img
            position relative
            width 5rem
            height 80%
            z-index 10
          .icon-add
            position absolute
            left 30%
            top 30%
            width 40%
            height 40%
            z-index 5
          a
            display block
            position absolute
            top -0.3rem
            right -0.3rem
            width 1rem
            height 1rem
            border-radius 50%
            background red
            font-size 1rem
            font-weight bolder
            color #fff
            z-index 100
            text-align center
            line-height 1rem

  
  .mask
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0,0,0,0.5)
    z-index 999
    .panel
      position fixed
      bottom 0
      left 0
      right 0
      height 16rem
      background #fff
      z-index 1000
      font-size 0.65rem
      ul
        border-top 1px solid #e5e5e5
        li
          padding 0.2rem 1rem
          list-style-type none
          text-align left
          border none
      .btn-upload
        margin-top 1rem
        width 90%
        height 2rem
        border none
        background #ff0055
        border-radius 8px
        font normal 0.8rem/2rem "微软雅黑"
        color #fff
        cursor pointer
        outline none
</style>
