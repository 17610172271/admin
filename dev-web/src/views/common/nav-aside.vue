<template>
  <ul class="nav-aside not-print">
    <router-link v-for="link in list" :key="link.key" tag="li" :to="link.to" :exact="link.exact">
      <div class="active-mask">
        <div class="nav-dot"></div>
        <div class="arrow-left"></div>
      </div>
      <a>{{link.title}}</a>

    </router-link>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array
    }
  }
}
</script>
<style lang="scss">
.nav-aside {
  margin-top:10px;
  position: relative;
  display: block;

  list-style: none;
  padding: 0 0 0 20px;
  font-size: 16px;
  font-weight: 600;
}
.nav-aside::before,
.nav-aside::after{
  display: table;
  content: "";
}
.nav-aside > li {

  list-style: none;
  display: block;
  position: relative;
}
.nav-aside > li > a{
  position: relative;
  display: block;

  color:#2E3E4C;
  border: 0;
  font-size: 16px;
  line-height: 1.5em;
  padding:20px 20px;
  transition: .1s ease;
}
.nav-aside > li > a:hover{
  background: none;
  color:#FE7C1E;
}


.nav-aside .active-mask{
  position: absolute;
  width: 100%;
  top:28px;
  height: auto;
  display: none;
  transition: 5s ease-in;
}
.nav-dot{
  color: #FE7C1E;
  width: 15px;
  height: 12px;
  position: absolute;
  left:20px;
  top: 0;
}
.nav-dot:before{
  background-color: #FE7C1E;
  width: 10px;
  height: 10px;
  margin-right:5px;
  box-shadow: 2px 1px 4px 0 rgba(254,124,30,0.50);
  border-radius: 5px 0 5px 5px;
  transform: rotate(45deg);
  display: block;
  content: " "
}
.nav-aside .arrow-left{
  width: 11px;
  height: 20px;
  position: absolute;
  top: -6px;
  right:0;
  content: " ";
  overflow: hidden;
}
.nav-aside .arrow-left:before{
  width: 14px;
  height: 14px;
  transform: rotate(45deg);
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.10);
  position: absolute;
  top: 3px;
  left:4px;
  content: " "
}

.nav-aside > li.active a{
  padding-left:35px;
}
.nav-aside > li.router-link-active a{
  color:#FE7C1E;
  padding-left:40px;
}
.nav-aside > li.router-link-active .active-mask{
  display: block;
}
.nav-aside > li.router-link-active .active-mask .nav-dot{
}

</style>
