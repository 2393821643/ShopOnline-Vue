<template>
  <div id="home">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/admin-search" class="nav-link ">浏览商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-find-goods-id" class="nav-link ">id查找商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-add-goods" class="nav-link">添加商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-find-orders-id" class="nav-link active">订单号查找</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-find-orders-user" class="nav-link">查找用户订单</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-menu" class="nav-link">返回菜单</router-link>
      </li>
    </ul>
    <div id="main">
      <div class="row" id="search">
        <div class="col-lg-7 offset-lg-1">
          <input type="number" class="form-control input-lg" placeholder="请输入订单id" v-model="searchOrdersId">
        </div>
        <div class="col-lg-3">
          <button class="btn btn-secondary btn-block" @click="searchOrder">搜索</button>
        </div>
      </div>
      <div v-if="order.orderId!=null">
        <div class="media">
          <img :src="order.img" class="mr-3" alt="..." width="10%" height="10%">
          <div class="media-body">
            <h1 class="mt-0">订单号：{{ order.orderId }}</h1>
            <h3 class="mt-0">{{ order.goodName }}</h3>
            <h3 class="mt-0">用户id：{{ order.userId }}</h3>
            <h3 class="mt-0">收货消息：地址：{{ order.address }} 电话：{{ order.userPhone }}
              收件人：{{ order.userConsignee }}</h3>
            <h3 class="mt-0">数量：{{ order.goodCount }}</h3>
            <h3 class="mt-0">总价：{{ order.price }}元</h3>
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
  name: 'AdminFindOrdersId',
  data () {
    return {
      adminMessage: {},
      searchOrdersId: '',
      order: {}
    }
  },
  methods: {
    getAdminMessage () {
      // 发送获取用户信息请求
      request.get('/admin/after-login', {
        headers: {
          admin_authorization: this.$store.state.adminAuthorization
        }
      })
        .then((res) => {
          this.adminMessage = res.data
        })
    },
    searchOrder () {
      if (this.searchOrdersId === '') {
        alert('id不能为空')
        return
      }
      request.get('/order/' + this.searchOrdersId, {
        headers: {
          admin_authorization: this.$store.state.adminAuthorization
        }
      }).then(res => {
        if (res.data === null) {
          alert('未查到此订单')
        }
        this.order = res.data
      })
    }
  },
  created () {
    this.getAdminMessage()
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
