<template>
  <div id="home">
    <div class="container" id="errorTip" :style="errorTipDisplay">
      <div class="alert alert-danger" role="alert">
        {{ errorTip }}
      </div>
    </div>
    <div id="main">
      <div class="container">
        <p id="mainTitle">登录</p>
      </div>
      <div id="toCodeLogin" class="row">
        <div class="col-lg-4 offset-lg-8 buttonBox">
          <router-link to="/code-login" class="btn btn-link btn-lg btn-block">没有密码？点击这里验证码登录</router-link>
        </div>
      </div>
      <div class="row" id="account">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">账号/邮箱:</span>
        </div>
        <div class="col-lg-7">
          <input type="text" class="form-control input-lg" v-model="formData.account">
        </div>
      </div>
      <div class="row" id="password">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">密码:</span>
        </div>
        <div class="col-lg-7">
          <input type="password" class="form-control input-lg" v-model="formData.password">
        </div>
      </div>
      <div class="row" id="login">
        <div class="col-lg-8 offset-lg-2">
          <button class="btn btn-success btn-lg btn-block" @click="login()">登录</button>
        </div>
      </div>
      <div id="toChangePassword" class="row">
        <div class="col-lg-4 offset-lg-8 buttonBox">
          <router-link to="/change-password" class="btn btn-link btn-lg btn-block">忘记密码？点击修改</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/util/request'
export default {
  name: 'UserLoginByPassword',
  data () {
    return {
      formData: {},
      errorTip: '',
      errorTipDisplay: 'display:none'
    }
  },
  methods: {
    // 登录功能 向后端发起请求 携带输入的账号密码
    login () {
      request.get('/user/password-login/' + this.formData.account + '/' + this.formData.password)
        .then((res) => {
          // 返回判定成功
          if (res.code === null) {
            this.errorTipDisplay = 'display:none'
            this.$store.commit('setAuthorization', res.data)
            this.$router.push('/menu')
          } else {
            // 失败提示
            this.errorTipDisplay = 'display:'
            this.errorTip = res.message
          }
        })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#home {
  width: 100%;
  height: 100vh;
  background: url("@/assets/indexBackground.jpg") center center no-repeat;
  background-size: 100% 100%;
  position:absolute;

}

#main {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 8%;
  margin-left: 20%;
  margin-right: 20%;
  height: 600px;
}

#mainTitle {
  color: white;
  font-size: 48px;
  font-weight: bold;
  padding-top: 5%;
}

#account {
  padding-top: 3%;
  color: white;
  font-size: 24px;
  font-weight: bold;

}

#password {
  padding-top: 5%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

#login {
  padding-top: 5%;
}

#toChangePassword {
  padding-top: 3%;
}

#errorTip {
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 12%;
  transform: translate(-50%, -50%);

}
</style>
