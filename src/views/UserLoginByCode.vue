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
      <div class="row" id="account">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">邮箱:</span>
        </div>
        <div class="col-lg-7">
          <input type="text" class="form-control input-lg" v-model="formData.email">
        </div>
      </div>
      <div class="row" id="code">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">验证码:</span>
        </div>
        <div class="col-lg-2">
          <input type="text" class="form-control input-lg" v-model="formData.code">
        </div>
        <div class="col-lg-5">
          <button class="btn btn-primary btn-xs btn-block" :disabled="buttonDisabled" @click="sendLoginCode()" id="sendCodeButton">
            {{ buttonText }}
          </button>
        </div>
      </div>
      <div class="row" id="login">
        <div class="col-lg-8 offset-lg-2">
          <button class="btn btn-success btn-lg btn-block" @click="login()">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/util/request'
export default {
  name: 'UserLogin',
  data () {
    return {
      formData: {},
      errorTip: '',
      displayTime: 60,
      buttonText: '获取验证码',
      buttonDisabled: false,
      errorTipDisplay: 'display:none'
    }
  },
  methods: {
    // 登录功能
    login () {
      this.errorTipDisplay = 'display:none'
      // 发起请求 携带参数
      request.get('/user/code-login/' + this.formData.email + '/' + this.formData.code)
        .then((res) => {
          // 登录成功
          if (res.code === null) {
            this.errorTipDisplay = 'display:none'
            this.$store.commit('setAuthorization', res.data.data)
            this.$router.push('/menu')
          } else {
            // 失败
            this.errorTipDisplay = 'display: '
            this.errorTip = res.message
          }
        })
    },
    // 发送验证码
    sendLoginCode () {
      this.buttonReset()
      request.post('/send-email-code/login-code/' + this.formData.email)
        .then((res) => {
          this.errorTipDisplay = 'display:none'
          if (res.data.code === 400001) {
            this.errorTipDisplay = 'display: '
            this.errorTip = res.data.message
          }
        })
        .catch((error) => {
          this.errorTip = '发送验证码失败：' + error.message
        })
    },
    buttonReset () {
      // 按钮失效
      this.buttonDisabled = true

      // 每1秒执行一次
      var setTime = setInterval(() => {
        this.displayTime--
        this.buttonText = '请等待' + this.displayTime + '秒后可再次发送'

        // 倒计时为0 按钮恢复
        if (this.displayTime === 0) {
          clearInterval(setTime)
          this.buttonDisabled = false
          this.buttonText = '获取验证码'
          this.displayTime = 60
        }
      }, 1000)
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
  position: absolute;

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

a:link {
  color: white;
}

#account {
  padding-top: 3%;
  color: white;
  font-size: 24px;
  font-weight: bold;

}

#code {
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
