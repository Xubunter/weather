<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  letter-spacing: 0.3px;
  height: 100vh;
  min-height: 500px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media(max-width: 950px) {
  html{
    font-size: 14px;
  }
}
@media(max-width: 750px), (max-height: 750px) {
  html{
    font-size: 12px;
  }
}
@media(max-width: 550px), (max-height: 550px) {
  html{
    font-size: 10px;
  }
}
@media(max-width: 400px), (max-height: 400px){
  html{
    font-size: 8px;
  }
}

</style>
