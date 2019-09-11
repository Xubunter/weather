<template>
  <div class="container">
    <div class="box--container">
      <div class="box box--1">
        <div class="circle circle--1"></div>
      </div>

      <div class="box box--2">
        <div class="circle circle--2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
};
</script>

<style scoped>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container .box--container {
    width: 50%;
    height: 80%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    animation: rotate 1s ease infinite;
  }
  .container .box--container .box {
    /* background: #fff; */
    /* overflow: hidden; */
    position: relative;
  }
  .container .box--container .box .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50px;
    width: 50px;
    background: #222;
    border-radius: 50%;
  }
  .container .box--container .box .circle--1 {
    animation: circle--1 ease 1200ms infinite;
    /* animation: rotate 1s ease infinite; */
  }
  .container .box--container .box .circle--2 {
    background: #fff;
    animation: circle--2 ease 1200ms infinite;
  }
  @keyframes circle--1 {
    0% {
      top: 50%;
    }
    50% {
      top: 120%;
    }
    100% {
      top: 50%;
    }
  }
  @keyframes circle--2 {
    0% {
      top: 50%;
    }
    50% {
      top: -50%;
    }
    100% {
      top: 50%;
    }
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }


  .support{
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 10px;
    display: flex;
  }
  a{
    margin: 0 10px;
    color: #1d81af;
    font-size: 1.5rem;
    transition: all 400ms ease;
  }

  a:hover{
    color: #222;
  }

  @media(max-width: 400px), (max-height: 400px){
    .container{
      width: 200px;
      height: 200px;
    }
    .circle{
      height: 25px !important;
      width: 25px !important;
    }
  }
</style>
