<template>
  <div id="home">
    <div id="main">
      <div id="title">
        <p id="mainTitle">网上商城</p>
        <p id="assistantTitle">励志于帮助电脑小白构建最简单的电脑配置</p>
      </div>
      <div class="container" id="introduce">
        <div class="row">
          <div class="col-lg-4">
            <div class="card-body">
              <h5 class="card-title">商品繁多</h5>
              <p class="card-text">可供大量商品进行选择</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <h5 class="card-title">价格透明</h5>
              <p class="card-text">我们会展示商品的大致价格，以做到价格透明，少花冤枉钱。</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <h5 class="card-title">与人分享</h5>
              <p class="card-text">可以和他人分享自己的购物车</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" id="toLogin">
        <div class="col-lg-8 offset-lg-2 buttonBox">
          <router-link to="/password-login" class="btn btn-dark btn-lg btn-block">开始使用</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage'
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

#assistantTitle {
  color: white;
  font-size: 16px;
  font-weight: bold;

}

#introduce {
  padding-top: 5%;
  color: white;
}

.card-body {
  background-color: rgb(27, 30, 31, 0.6);
}

#toLogin {
  padding: 5%;
}
</style>
