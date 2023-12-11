<template>
  <div id="home">
    <div class="container" id="errorTip" :style="errorTipDisplay">
      <div class="alert alert-danger" role="alert">
        {{ errorTip }}
      </div>
    </div>
    <div id="main">
      <div class="container">
        <p id="mainTitle">修改密码</p>
      </div>
      <div class="row" id="account">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">设置新密码:</span>
        </div>
        <div class="col-lg-7">
          <input type="password" class="form-control input-lg" v-model="formData.password"
                 placeholder="密码长度大于5，小于20" @blur="verifyPasswordConsistency()">
        </div>
      </div>
      <div class="row" id="account">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">重复密码:</span>
        </div>
        <div class="col-lg-7">
          <input type="password" class="form-control input-lg" v-model="repeatPassword"
                 @blur="verifyPasswordConsistency()">
        </div>
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
          <button class="btn btn-primary btn-xs btn-block" @click="sendCode()" :disabled="buttonDisabled"
                  id="sendCodeButton">{{ buttonText }}
          </button>
        </div>
      </div>
      <div class="row" id="changePassword">
        <div class="col-lg-8 offset-lg-2">
          <button class="btn btn-success btn-lg btn-block" @click="changePassword()" data-toggle="modal"
                  data-target="#changeState">修改密码
          </button>
        </div>
      </div>
    </div>

    <div class="modal fade" id="changeState" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">{{ changeState }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="close-btn" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import request from '@/util/request'
export default {
  name: 'ChangePassword',
  data () {
    return {
      formData: {},
      repeatPassword: '',
      errorTip: '',
      displayTime: 60,
      buttonText: '获取验证码',
      verifyPassword: false,
      changeState: '',
      errorTipDisplay: 'display:none',
      buttonDisabled: false
    }
  },
  methods: {
    changePassword () {
      // 判断密码是否符合规则
      if (this.verifyPassword === false) {
        this.errorTip = '密码不一致'
        this.errorTipDisplay = 'display:'
        // 弹窗提示
        this.changeState = '修改失败'
        return
      }

      // 符合规则，发起请求 携带信息
      request.put('/user/change-password', this.formData)
        .then((res) => {
          // 修改成功
          if (res.code === null) {
            this.errorTipDisplay = 'display:none'
            this.changeState = '修改成功'
            setTimeout(() => {
              document.getElementById('close-btn').click()
              this.$router.push('/password-login')
            }, 5000)
          } else {
            // 修改失败，提示信息
            this.errorTip = res.message
            this.changeState = '修改失败'
            this.errorTipDisplay = 'display:'
          }
        })
    },
    // 发送验证码功能
    // 发送验证码
    sendCode () {
      this.buttonReset()
      request.post('/send-email-code/change-password-code/' + this.formData.email)
        .then((res) => {
          this.errorTipDisplay = 'display:none'
          if (res.code === 400001) {
            this.errorTipDisplay = 'display: '
            this.errorTip = res.message
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
      const setTime = setInterval(() => {
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
    },
    // 格式验证
    verifyPasswordConsistency () {
      this.verifyPassword = false
      if (this.formData.password.trim().length < 5 || this.formData.password.trim().length > 20) {
        this.errorTipDisplay = 'display:'
        this.errorTip = '密码格式错误'
        return
      }
      if (this.repeatPassword === '' || this.repeatPassword === null) {
        this.errorTipDisplay = 'display:none'
        return
      }
      if (this.formData.password !== this.repeatPassword) {
        this.errorTip = '密码不一致'
        this.errorTipDisplay = 'display:'
      } else {
        this.errorTip = ''
        this.errorTipDisplay = 'display: none'
        this.verifyPassword = true
      }
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
  padding-top: 3%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

#changePassword {
  padding-top: 5%;
}

#errorTip {
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 12%;
  transform: translate(-50%, -50%);

}
</style>
