<template>
  <div id="home">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/search" class="nav-link">浏览商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/flash" class="nav-link ">秒杀商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/new-goods" class="nav-link">浏览新品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/shop-cart" class="nav-link">我的购物车</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/my-orders" class="nav-link ">我的订单</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/user-message" class="nav-link active">我的消息</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/menu" class="nav-link">返回菜单</router-link>
      </li>
    </ul>
    <div id="main">
      <div class="container" id="messageTable">
        <table class="table table-striped table-dark">
          <tbody>
          <tr>
            <th scope="row">账号:</th>
            <td>{{ userMessage.userId }}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">用户名:</th>
            <td>
              <span v-if="!changeUsername">{{ userMessage.username }}</span>
              <input type="text" class="form-control input-lg" v-model="userMessage.username" v-if="changeUsername">
            </td>
            <td>
              <button class="btn btn-primary btn-md" v-if="!changeUsername" @click="changeUsername=true">修改用户名
              </button>
              <button class="btn btn-success btn-md" v-if="changeUsername" @click="toChangeUserName()">提交</button>
            </td>
          </tr>
          <tr>
            <th scope="row">收货手机号:</th>
            <td>
              <span v-if="!changeReceive">{{ userMessage.userPhone }}</span>
              <input type="text" class="form-control input-lg" v-model="userMessage.userPhone" v-if="changeReceive">
            </td>
            <td>
              <button class="btn btn-primary btn-md" v-if="!changeReceive" @click="changeReceive=true">修改收货消息
              </button>
              <button class="btn btn-success btn-md" v-if="changeReceive" @click="toChangeReceive()">提交</button>
            </td>
          </tr>
          <tr>
            <th scope="row">收货地址:</th>
            <td>
              <span v-if="!changeReceive">{{ userMessage.userAddress }}</span>
              <input type="text" class="form-control input-lg" v-model="userMessage.userAddress" v-if="changeReceive">
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <th scope="row">收件人姓名:</th>
            <td>
              <span v-if="!changeReceive">{{ userMessage.userConsignee }}</span>
              <input type="text" class="form-control input-lg" v-model="userMessage.userConsignee" v-if="changeReceive">
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <th scope="row">密码设置:</th>
            <td></td>
            <td>
              <router-link to="/change-password" class="btn btn-warning btn-md ">点击设置</router-link>
            </td>
          </tr>
          <tr>
            <th scope="row">退出登录:</th>
            <td></td>
            <td>
              <button class="btn btn-danger btn-md" @click="exit()">退出登录</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/util/request'

export default {
  name: 'UserMessage',
  data () {
    return {
      userMessage: {},
      errorTip: '',
      changeUsername: false,
      changeReceive: false
    }
  },
  methods: {
    getUserMessage () {
      // 发送获取用户信息请求
      request.get('/user/after-login', {
        headers: {
          authorization: this.$store.state.authorization
        }
      })
        .then((res) => {
          this.userMessage = res.data
        })
    },
    toChangeUserName () {
      // 发送请求
      request.put('/user/change-username/' + this.userMessage.username, null, {
        headers: {
          authorization: this.$store.state.authorization
        }
      }).then(res => {
        if (res.data === true) {
          alert(res.message)
          this.changeUsername = false
        } else {
          alert(res.message)
        }
      })
    },
    toChangeReceive () {
      // 发送请求
      request.put('/user/change-receive-message/' + this.userMessage.userPhone + '/' + this.userMessage.userAddress + '/' + this.userMessage.userConsignee, null, {
        headers: {
          authorization: this.$store.state.authorization
        }
      }).then(res => {
        if (res.data === true) {
          alert(res.message)
          this.changeReceive = false
        } else {
          alert(res.message)
        }
      })
    },
    exit () {
      request.delete('/user', {
        headers: {
          authorization: this.$store.state.authorization
        }
      }).then(res => {
        alert('退出成功')
        this.$store.commit('setAuthorization', '')
        this.$router.push('/password-login')
      })
    }
  },
  created () {
    this.getUserMessage()
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
  min-height: 100vh;
  background: url("@/assets/indexBackground.jpg") no-repeat fixed center center;
  background-size: cover;
}

.nav-pills {
  background-color: #696969;
}

.nav-link {
  color: white;
}

#main {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 4%;
  margin-left: 10%;
  margin-right: 10%;
  color: white;
}

#search {
  padding-top: 4%;
  padding-bottom: 4%;
}
</style>
