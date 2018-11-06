<template>
  <slide>
    <div class='add'>
      <pageHeader title="新增地址"></pageHeader>
      <section class="addDetail">
        <section class="ui-padding-block">
          <div class="input-new">
            <input type="text" placeholder="请填写您的姓名" :class="{verifies:verify}" v-model="message" @input="inputThing">
            <p v-if="verify">请填写您的姓名</p>
          </div>
          <div class="input-new" @click="addDetail">
            <input type="text" placeholder="小区/写字楼/学校等" readonly v-model="address">
          </div>
          <div class="input-new">
            <input type="text" placeholder="请填写详细送餐地址" :class="{verifies:verifythree}" v-model="detail"
                   @input="inputThingthree">
            <p v-if="verifythree">{{sendAddress}}</p>
          </div>
          <div class="input-new">
            <input type="tel" placeholder="请填写能够联系到您的手机号" :class="{verifies:verifyfour}" v-model="telnum"
                   @input="inputThingfour">
            <p v-if="verifyfour">{{telephone}}</p>
          </div>
          <div class="input-new">
            <input type="tel" placeholder="备用联系电话（选填）" v-model="standbytelenum" @input="inputThingfive">
            <p v-if="verifyfive">{{standByTel}}</p>
          </div>
        </section>
        <div class="addButton" :class="{butopacity:butpart}" @click="confirmNewAddress">
          新增地址
        </div>
        <router-view></router-view>
      </section>
    </div>
  </slide>

</template>

<script>
  import PageHeader from './../../../../../base/pageHeader/pageHeader'
  import Slide from './../../../../../base/slide/slide'
  import {mapGetters,mapActions} from 'vuex'
  import axios from 'axios';
  import {getStore, setStore} from "../../../../../assets/js/util";

  export default {
    name: '',
    components: {PageHeader, Slide},
    data() {
      return {
        verify: false,     //姓名
        verifytwo: false,   //备注
        verifythree: false, //地址
        verifyfour: false,  //电话
        verifyfive: false,  //备用电话
        sendAddress: '',    //地址
        message: '',         //信息
        detail: '',         //送餐地址
        telnum: '',         //手机号
        telephone: '',      //手机号提示
        standByTel: '',      //备用手机号提示
        standbytelenum: '',  //备用手机号
        butpart: false,
        address: '',
        addressList:[]
      }
    },
    mounted() {
      axios.defaults.withCredentials = true;
      this.address = getStore('addressDetail') || '';
    },
    computed: {
      ...mapGetters([
        'addAddress',
        'userInfo'
      ])
    },
    methods: {
      inputThing() {
        (!this.message) ? this.verify = true : this.verify = false;
        this.bindThing();
      },
      inputThingthree() {
        this.verifythree = true;
        if (this.detail.length === 0) {
          this.sendAddress = '请详细填写送餐地址'
        } else if (this.detail.length > 0 && this.detail.length <= 2) {
          this.sendAddress = '送餐地址太短了，不能辨识'
        } else {
          this.sendAddress = '';
          this.verifythree = false;
        }
        this.bindThing();
      },
      inputThingfour() {
        this.verifyfour = true;
        if ((/^[1][358][0-9]{9}$/).test(this.telnum)) {
          this.verifyfour = false;
        } else if (this.telnum === '') {
          this.telephone = "手机号不能为空"
        } else {
          this.telephone = "请输入正确的手机号"
        }
        this.bindThing()
      },
      inputThingfive() {
        this.verifyfive = true;
        if ((/^[1][358][0-9]{9}$/).test(this.standbytelenum) || this.standbytelenum === '') {
          this.verifyfive = false;
        } else {
          this.standByTel = "请输入正确的手机号"
        }
        this.bindThing();
      },
      bindThing() {
        this.butpart = !!(this.message && this.detail && !this.verifyfour);
      },
      addDetail() {
        this.$router.push({
          path: '/profile/info/address/add/addDetail'
        })
      },
      confirmNewAddress() {
        if(!this.butpart){
          return;
        }
        const address = {
          name: this.message,
          address: this.detail,
          address_detail: this.addAddress,
          geohash: 'wtw37r7cxep4',
          phone: this.telnum,
          phone_bk: this.standbytelenum,
          poi: this.addAddress,
          poi_type: 0,
        };
        axios.post(`https://elm.cangdu.org/v1/users/${this.userInfo.user_id}/addresses`, {
          address: this.detail,
          address_detail: this.address,
          geohash: 'wtw37r7cxep4',
          name: this.message,
          tag: '123',
          sex: 1,
          tag_type: 2,
          phone: this.telnum,
          phone_bk: this.standbytelenum,
          poi: this.address,
          poi_type: 0,
        }).then((res) => {
           if(res.status === 200 && res.data.status === 1){
             this.saveAddressList(address);
             this.$router.go(-1);
           }
        })
      },
      ...mapActions([
        'saveAddressList'
      ])
    }
  }
</script>

<style lang='scss' scoped>
  @import "./../../../../../assets/scss/variables";

  .add {
    width: 100%;
    height: 100%;
    background: $color-background;
    .addDetail {
      margin: 20px 0;
      background: #fff;
      .input-new {
        padding: 20px 0 0 20px;
        input {
          width: 670px;
          padding: 20px;
          font-size: 26px;
          background: $color-background;
          border-radius: 5px;
          color: $color-text;
          &::placeholder {
            color: $color-text-bold;
          }
          &.verifies {
            border: 2px solid #f40;
          }
        }
        p {
          color: #f40;
          padding: 20px 0 0 20px;
          font-size: 16px;
        }
      }
    }
    .addButton {
      margin: 20px 20px 0 20px;
      background: #4cd964;
      border-radius: 5px;
      color: rgba(255, 255, 255, .6);
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      padding: 20px 0;
      &.butopacity {
        color: #fff;
      }
    }
  }

</style>
