<template>
  <div id="home">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/admin-search" class="nav-link active">浏览商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-find-goods-id" class="nav-link">id查找商品</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-add-goods" class="nav-link">添加商品</router-link>
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
              <p class="card-text">id:{{ data.id }}</p>
              <p class="card-text">￥{{ data.price }}</p>
              <p class="card-text">库存{{ data.stock }}</p>
              <div class="row">
                <div class="col-4">
                  <button class="btn btn-primary" @click="nowGood=data" data-toggle="modal"
                          data-target="#changeStaticBackdrop">修改商品
                  </button>
                </div>
                <div class="col-4">
                  <button class="btn btn-danger" data-toggle="modal" data-target="#flashStaticBackdrop"
                          @click="nowGood=data">设为秒杀
                  </button>
                </div>
                <div class="col-4">
                  <button class="btn btn-secondary" data-toggle="modal" data-target="#deleteStaticBackdrop"
                          @click="nowGood=data">删除商品
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
    <!-- 修改商品模糊框 -->
    <div class="modal fade" id="changeStaticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">修改商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancel">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>商品id:</span>{{ nowGood.id }}
            <div class="row">
              <div class="col-3">商品名：</div>
              <div class="col-5"><input v-model="nowGood.name" class="form-control input-group-lg"></div>
            </div>
            <div class="row">
              <div class="col-3">价格：</div>
              <div class="col-5"><input type="number" v-model="nowGood.price" class="form-control input-group-lg"></div>
            </div>
            <div class="row">
              <div class="col-3">库存：</div>
              <div class="col-5"><input type="number" v-model="nowGood.stock" class="form-control input-group-lg"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancel">取消</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="changeGood(nowGood.id,nowGood)">
              确定修改
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 设置秒杀商品模糊框 -->
    <div class="modal fade" id="flashStaticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">秒杀商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>商品id:</span>{{ nowGood.id }}
            <div class="row">
              <div class="col-5">秒杀时长（单位分钟）：</div>
              <div class="col-5"><input type="number" class="form-control input-group-lg" v-model="flashTime"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="setFlash(nowGood.id,flashTime)">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--    设置删除商品模糊框-->
    <div class="modal fade" id="deleteStaticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">删除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancel">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>商品id:</span>{{ nowGood.id }}
            <div>确定要删除商品？</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancel">取消</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteGoods(nowGood.id)">
              确定
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
  name: 'AdminSearch',
  data () {
    return {
      // 用户消息
      adminMessage: {},
      // 商品名
      goodName: '',
      // 当前页
      page: 1,
      // 商品列表
      goodList: [],
      // 选择某个商品  点击时改变
      nowGood: {},
      // 秒杀时间
      flashTime: 0
    }
  },
  methods: {
    // 获取用户信息
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
    // 修改商品
    changeGood (goodId, good) {
      // 重制nowGood
      this.nowGood = {}
      // 发送请求
      request.put('/manage-good/' + goodId, good, {
        headers: {
          admin_authorization: this.$store.state.adminAuthorization
        }
      }).then(res => {
        if (res.data === true) {
          alert(res.message)
        } else {
          alert(res.message)
          this.cancel()
        }
      })
    },
    // 取消操作
    cancel () {
      this.getSearch()
    },
    // 设置秒杀
    setFlash (goodId, time) {
      // 重制nowGood
      this.nowGood = {}
      this.flashTime = 0
      if (time === '') {
        return
      }
      // 发送请求
      request.post('/manage-good/flash-kill/' + goodId + '/' + time, null, {
        headers: {
          admin_authorization: this.$store.state.adminAuthorization
        }
      }).then(res => {
        alert(res.message)
      })
    },
    // 删除商品
    deleteGoods (goodId) {
      // 发送请求
      request.delete('/manage-good/' + goodId, {
        headers: {
          admin_authorization: this.$store.state.adminAuthorization
        }
      }).then(res => {
        alert(res.message)
        this.cancel()
      })
    },
    // 搜索
    toSearchGoods () {
      this.$router.push('/admin-search?key=' + this.goodName + '&page=1')
      this.getSearch()
    },
    // 上一页
    toLastPage () {
      this.$router.push('/admin-search?key=' + this.goodName + '&page=' + (Number(this.page) - 1))
      this.getSearch()
    },
    // 下一页
    toNextPage () {
      this.$router.push('/admin-search?key=' + this.goodName + '&page=' + (Number(this.page) + 1))
      this.getSearch()
    }
  },
  created () {
    this.getAdminMessage()
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
