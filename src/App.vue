<template>
  <div>
    <!-- <Login></Login> -->
    <!-- <home-page></home-page> -->
    <!-- <Drawer></Drawer> -->
    <!-- <change-passwd></change-passwd> -->
    <Notice></Notice>
  
  </div>
</template>

<script>
import Login from './components/Login'
import HomePage from './pages/HomePage.vue'
import Drawer from './components/Drawer.vue'
import ChangePasswd from './pages/ChangePasswd'
import Notice from './pages/Notice.vue'
export default {
  name: 'app',
  components: {
    Login,HomePage,Drawer,ChangePasswd,Notice
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
