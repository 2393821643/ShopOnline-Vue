<template>
  <div id="home">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/admin-search" class="nav-link ">浏览商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-find-goods-id" class="nav-link">id查找商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-add-goods" class="nav-link active">添加商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-find-orders-id" class="nav-link">订单号查找</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-find-orders-user" class="nav-link">查找用户订单</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-menu" class="nav-link">返回菜单</router-link>
      </li>
    </ul>

    <div id="main">
      <div class="container">
        <p id="mainTitle">添加商品</p>
      </div>
      <div class="row interText">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">商品名:</span>
        </div>
        <div class="col-lg-7">
          <input type="text" class="form-control input-lg" v-model="goodsName">
        </div>
      </div>
      <div class="row interText">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">价格:</span>
        </div>
        <div class="col-lg-7">
          <input type="number" class="form-control input-lg" v-model="goodsPrice">
        </div>
      </div>
      <div class="row interText">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">库存:</span>
        </div>
        <div class="col-lg-7">
          <input type="number" class="form-control input-lg" v-model="goodsStock">
        </div>
      </div>
      <div class="row interText">
        <div class="col-lg-2 offset-lg-1">
          <span class="tab">商品图片:</span>
        </div>
        <div class="col-lg-7">
          <input class="form-control input-lg" type="file" accept="image/*" @change="handleFileUpload">
        </div>
      </div>
      <div class="row" id="submit">
        <div class="col-lg-8 offset-lg-2">
          <button class="btn btn-success btn-lg btn-block" @click="upload">添加商品</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/util/request'

export default {
  name: 'AdminAddGoods',
  data () {
    return {
      adminMessage: {},
      goodsName: null,
      goodsPrice: null,
      goodsStock: null,
      goodImg: null
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
    // 读取图片
    handleFileUpload (event) {
      this.goodImg = event.target.files[0]
    },
    // 上传
    upload () {
      const formData = new FormData()
      formData.append('name', this.goodsName)
      formData.append('price', this.goodsPrice)
      formData.append('stock', this.goodsStock)
      formData.append('image', this.goodImg)
      request.post('/manage-good', formData, {
        headers: {
          admin_authorization: this.$store.state.adminAuthorization
        }
      }).then(res => {
        if (res.code !== 4000007) {
          alert('上传成功，商品号：' + res.data)
        } else {
          alert(res.message)
        }
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
  margin-top: 5%;
  margin-left: 20%;
  margin-right: 20%;
  height: 700px;
}

#mainTitle {
  color: white;
  font-size: 48px;
  font-weight: bold;
  padding-top: 5%;
}

.interText {
  padding-top: 5%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

#submit {
  padding-top: 5%;
}

</style>
