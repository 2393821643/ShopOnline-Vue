<template>
  <div id="home">
    <div id="main">
      <h1 id="mainTitle">欢迎回来，{{ userMessage.username }}</h1>
      <div class="container" id="function">
        <div class="row">
          <div class="col-lg-7 offset-lg-1">
            <input type="text" class="form-control input-lg" placeholder="请输入商品名" v-model="goodName">
          </div>
          <div class="col-lg-3">
            <button class="btn btn-secondary btn-block" @click="toSearchGoods">搜索</button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <div class="card-body">
              <h5 class="card-title">秒杀商品</h5>
              <div class="col-lg-10 offset-lg-1">
                <router-link to="/flash" class="btn btn-danger btn-lg btn-block ">点击进入</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <h5 class="card-title">新品</h5>
              <div class="col-lg-10 offset-lg-1">
                <router-link to="/new-goods" class="btn btn-success btn-lg btn-block ">点击进入</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <h5 class="card-title">我的购物车</h5>
              <div class="col-lg-10 offset-lg-1">
                <router-link to="/shop-cart" class="btn btn-warning btn-lg btn-block ">点击查看</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <h5 class="card-title">我的订单</h5>
              <div class="col-lg-10 offset-lg-1">
                <router-link to="/my-orders" class="btn btn-info btn-lg btn-block ">点击查看</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <h5 class="card-title">设置个人消息</h5>
              <div class="col-lg-10 offset-lg-1">
                <router-link to="/user-message" class="btn btn-primary btn-lg btn-block ">点击设置</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/util/request'

export default {
  name: 'MenuPage',
  data () {
    return {
      userMessage: {},
      goodName: ''
    }
  },
  methods: {
    // 获取用户信息
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
    // 搜索
    toSearchGoods () {
      this.$router.push('/search?key=' + this.goodName + '&page=1')
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
  height: 100vh;
  background: url("@/assets/indexBackground.jpg") center center no-repeat;
  background-size: 100% 100%;
  position: absolute;

}

#main {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 4%;
  margin-left: 10%;
  margin-right: 10%;
  height: 800px;
}

#mainTitle {
  color: white;
  font-size: 48px;
  font-weight: bold;
  padding-top: 5%;
}

#function {
  padding-top: 5%;
  color: white;
}

.card-body {
  background-color: rgb(27, 30, 31, 0.6);
  padding: 10%;
  margin-top: 10%;
}
</style>
