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
        <router-link to="/my-orders" class="nav-link active">我的订单</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/user-message" class="nav-link">我的消息</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/menu" class="nav-link">返回菜单</router-link>
      </li>
    </ul>
    <div id="main">
      <div v-for="(data,i) in orderList" :key="i">
        <div class="media">
          <img :src="data.img" class="mr-3" alt="..." width="10%" height="10%">
          <div class="media-body">
            <h1 class="mt-0">订单号：{{ data.orderId }}</h1>
            <h3 class="mt-0">{{ data.goodName }}</h3>
            <h3 class="mt-0">收货消息：地址：{{ data.address }} 电话：{{ data.userPhone }}
              收件人：{{ data.userConsignee }}</h3>
            <h3 class="mt-0">数量：{{ data.goodCount }}</h3>
            <h3 class="mt-0">总价：{{ data.price }}元</h3>
          </div>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/util/request'

export default {
  name: 'MyOrders',
  data () {
    return {
      // 用户消息
      userMessage: {},
      // 商品列表
      orderList: []
      // 选择某个商品时的id 无论是加入购物车或是购买 点击时改变
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
    // 发起请求
    getOrders () {
      // 发送请求获取数据
      request.get('/order/user-order', {
        headers: {
          authorization: this.$store.state.authorization
        }
      }).then(res => {
        this.orderList = res.data
      })
    }
  },
  created () {
    this.getUserMessage()
    this.getOrders()
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
