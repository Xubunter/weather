<template>
  <div class="clock">
    {{time}}
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data() {
    return {
      time: '',
    };
  },
  methods: {
    getTime() {
      const date = new Date();
      function f(n) {
        return n < 10 ? `0${n}` : n;
      }
      const hours = f(date.getHours());
      const minutes = f(date.getMinutes());
      return `${hours}:${minutes}`;
    },
  },
  mounted() {
    this.time = this.getTime();
    setInterval(() => {
      this.time = this.getTime();
    }, 10000);
  },
};
</script>

<style scoped>
.clock{
  font-size: 3rem;
  font-weight: 500;
}
</style>
