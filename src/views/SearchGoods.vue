<template>
  <div id="home">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/search" class="nav-link active">浏览商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/flash" class="nav-link">秒杀商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/new-goods" class="nav-link">浏览新品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/shop-cart" class="nav-link">我的购物车</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/my-orders" class="nav-link">我的订单</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/user-message" class="nav-link">我的消息</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/menu" class="nav-link">返回菜单</router-link>
      </li>
    </ul>

    <div id="main">
      <div class="row" id="search">
        <div class="col-lg-7 offset-lg-1">
          <input type="text" class="form-control input-lg" placeholder="请输入商品名" v-model="goodName">
        </div>
        <div class="col-lg-3">
          <button class="btn btn-secondary btn-block" @click="toSearchGoods">搜索</button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3" v-for="(data,i) in goodList" :key="i">
          <div class="card" style="width: 18rem;">
            <img :src="data.img" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ data.name }}</h5>
              <p class="card-text">￥{{ data.price }}</p>
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-warning" @click="addGoodToShopCart(data.id)">加入购物车</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-danger" data-toggle="modal" data-target="#buyStaticBackdrop"
                          @click="nowGoodId=data.id">立即购买
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br><br>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-2 offset-3">
            <button class="btn btn-primary" v-if="page!=1" @click="toLastPage()">上一页</button>
          </div>
          <div class="col-1">
            <input v-model="page" class="form-control input-group-lg">
          </div>
          <div class="col-2">
            <button class="btn btn-primary" v-if="goodList.length===20" @click="toNextPage">下一页</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 购买模糊框 -->
    <div class="modal fade" id="buyStaticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">确定购买？</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>请选择数量：</span>
            <button v-if="nowGoodCount>=2" class="btn btn-primary" @click="nowGoodCount--">-</button>
            {{ nowGoodCount }}个
            <button @click="nowGoodCount++" class="btn btn-primary">+</button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="buyGood(nowGoodId,nowGoodCount)">
              确定购买
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/util/request'

export default {
  name: 'SearchGoods',
  data () {
    return {
      // 用户消息
      userMessage: {},
      // 商品名
      goodName: '',
      // 当前页
      page: 1,
      // 商品列表
      goodList: [],
      // 选择某个商品时的id 无论是加入购物车或是购买 点击时改变
      nowGoodId: 0,
      // 购买的商品数量
      nowGoodCount: 1
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
    // 从url中获取goodName和page 并发起请求
    getSearch () {
      // 从url中获取goodName和page
      this.goodName = this.$route.query.key
      if (this.goodName === undefined || this.goodName === '' || this.goodName === null) {
        this.goodName = ''
      }
      this.page = this.$route.query.page
      if (this.page === undefined || this.page === '' || this.page === null) {
        this.page = 1
      }
      // 发送请求获取数据
      request.get('/goods/search/key?key=' + this.goodName + '&page=' + this.page).then(res => {
        this.goodList = res.data
      })
    },
    // 购买商品
    buyGood (goodId, goodCount) {
      // 重制数量
      this.nowGoodCount = 1
      // 发送请求
      request.post('/order/create-order-cache/' + goodId + '/' + goodCount, null, {
        headers: {
          authorization: this.$store.state.authorization
        }
      }).then(res => {
        alert(res.message)
      })
    },
    // 加入购物车
    addGoodToShopCart (goodId) {
      request.post('/shop-cart/' + goodId, null, {
        headers: {
          authorization: this.$store.state.authorization
        }
      }).then(res => {
        alert(res.message)
      })
    },
    // 搜索
    toSearchGoods () {
      this.$router.push('/search?key=' + this.goodName + '&page=1')
      this.getSearch()
    },
    // 上一页
    toLastPage () {
      this.$router.push('/search?key=' + this.goodName + '&page=' + (Number(this.page) - 1))
      this.getSearch()
    },
    // 下一页
    toNextPage () {
      this.$router.push('/search?key=' + this.goodName + '&page=' + (Number(this.page) + 1))
      this.getSearch()
    }
  },
  created () {
    this.getUserMessage()
    this.getSearch()
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
}

#search {
  padding-top: 4%;
  padding-bottom: 4%;
}

</style>
