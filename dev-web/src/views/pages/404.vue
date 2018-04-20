<template>
  <div id="404-page" class="page404">
    <div class="page404-wrapper">
    <div class="page404-container">
      <div class="image-404">
        <div class="cloud cloud-left">
          <img src="static/images/404/cloud-left@2x.png">
        </div>
        <div class="cloud cloud-middle">
          <img src="static/images/404/cloud-middle@2x.png">
        </div>
        <div class="cloud cloud-right">
          <img src="static/images/404/cloud-right@2x.png">
        </div>

        <div class="sun"></div>
        <div class="car">
          <img src="static/images/404/car@2x.png">
        </div>
        <img src="static/images/404/404@2x.png">
      </div>
      <div class="info">
        对不住！您要找的网页可能已经被删除、<br>重命名、或暂时不可用！检查网址是否正确！
      </div>
      <div class="">
        <router-link :to="{name: 'home'}" class="btn btn-orange btn-lg w-sm">返回首页</router-link>
      </div>
    </div>
    <div class="footer">
     2017-present  &copy; 北京露营者房车科技有限公司
    </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.page404 {
  display: table;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  transition: all .3 ease;

  .page404-wrapper{
    display: table-cell;
    vertical-align: middle;
    overflow-x: hidden;

    .page404-container {
      width: 600px;
      position: relative;
      margin: 0 auto;
      outline: none;
      padding: 0 0;
      transition: all .3 ease;
      text-align: center;
      overflow: hidden;
      .image-404 {

        width: 100%;
        margin: 0 auto;
        position: relative;
        text-align:center;
        img {
          width: 100%;
        }
      }

    }
    .info {
      padding: 40px 5px;
      font-size: 14px;
      font-family: "PingFangSC-Regular";
      color: #2E3E4C;
      letter-spacing: 0;
      margin-top: 40px;
    }
    .footer {
      text-align: center;
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 10px 5px;
      color: #8D9DB0;
    }
  }


@keyframes right2left
{
  0%   {left:620px}
  100% {left:-10px}
}

@keyframes sun{
  0% { box-shadow: 0 0 5px rgba(252, 138, 59, .3)}
  50% { box-shadow: 0 0 22px rgba(252, 138, 59, .3)}
  100% { box-shadow: 0 0 5px rgba(252, 138, 59, .3)}
}

@keyframes cloud-left{
  0% { left: 77px }
  50% { left: 127px }
  100% { left: 77px }
}

@keyframes cloud-middle{
  0% { left: 267px }
  50% { left: 347px }
  100% { left: 267px }
}

@keyframes cloud-right{
  0% { left: 421px }
  50% { left: 511px }
  100% { left: 421px }
}

.sun {
  width: 47px;
  height: 47px;
  position: absolute;
  top: 39px;
  right: 88px;
  border-radius: 50%;
  z-index: -1;
  background: #fff;

  animation-name: sun;
  animation-duration: 12s;
  animation-timing-function: ease-in;
  animation-iteration-count:infinite;

}

.cloud {
  position: absolute;
  z-index: -1;

  animation-duration: 12s;
  animation-timing-function: linear;
  animation-iteration-count:infinite;
}
.cloud img{
  width: 50%
}

.cloud-left{
  // animation-name: cloud-left;
  animation-delay: 1s;
  width: 82px;
  top:28px;
  left: 77px;
}

.cloud-middle{
  // animation-name: cloud-middle;
  animation-delay: .5s;
  width: 82px;

  top: 84px;
  left: 267px;
}

.cloud-right{
  // animation-name: cloud-right;
  animation-delay: 0;
  width: 79px;
  top: 99px;
  left: 421px;
}

@keyframes car{
  // 0% { right: 129px ; bottom: 22px}
  // 30% { right: 109px ; bottom: 27px }
  // 70% { right: 109px ; bottom: 27px }
  // 100% { right: 129px ; bottom: 22px }
  0% { right: 109px ; bottom: 27px}
  40% { right: 119px ; bottom: 22px }
  80% { right: 119px ; bottom: 22px }
  100% { right: 109px ; bottom: 27px }
}
.car {
  position: absolute;
  z-index: -1;
  right: 129px;
  bottom: 22px;
  width: 114px;

  animation-name: car;
  // animation-delay: 2s;
  animation-duration: 5s;
  // animation-direction:alternate;
  animation-timing-function: ease-in-out;
  animation-iteration-count:infinite;
}
.car img {
  width: 100%
}

}
</style>
