<template>
  <div class="main-widget">
    <img class="main-widget__icon" :src="icon" />
    <div class="main-widget__weather" v-text="weather"/>
    <div class="main-widget__city" v-text="city"/>
    <div class="main-widget__date" v-text="date"/>
    <div class="main-widget__weekday" v-text="weekDay"/>
  </div>
</template>

<script>
const weekDays = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

export default {
  name: 'WeatherWidget',
  props: {
    icon: String,
    weather: String,
    city: String,
    dateRaw: String,
  },
  computed: {
    weekDay() {
      if (this.dateRaw) {
        const day = new Date(Date.parse(this.dateRaw)).getDay();
        return weekDays[day];
      }
      return '';
    },
    date() {
      if (this.dateRaw) {
        return this.dateRaw
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('/');
      }
      return '';
    },
  }
};
</script>

<style lang="scss" scoped>
  .main-widget{
    &__icon{
      height: 100px;
      text-align: center;
    }
    &__weather{
      font-size: 2rem;
      font-weight: 300;
      text-transform: capitalize;
    }
    &__city{
      font-size: 2rem;
      font-weight: 700;
      line-height: 4rem;
    }
    &__date, &__weekday{
      font-size: 1.5rem;
      line-height: 2rem;
      text-transform: uppercase ;
    }
  }
</style>
