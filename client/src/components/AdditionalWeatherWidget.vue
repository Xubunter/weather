<template>
  <div class="details-widget">
    <div class="details-widget__item">
      <div class="details-widget__icon"></div>
      <div>
        <div class="details-widget__title">Влажность</div>
        <div class="details-widget__value" v-text="humidity"/>
      </div>
    </div>
    <div class="details-widget__item">
      <div class="details-widget__icon"></div>
      <div>
        <div class="details-widget__title">Скорость ветра</div>
        <div class="details-widget__value" v-text="wind"/>
      </div>
    </div>
    <div class="details-widget__item">
      <div class="details-widget__icon"></div>
      <div>
        <div class="details-widget__title">Облочность</div>
        <div class="details-widget__value" v-text="clouds"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdditionalWeatherWidget',
  props: {
    humidity: String,
    wind: String,
    clouds: String,
  },
};
</script>

<style lang="scss" scoped>
  .details-widget{
    margin-top: 10vh;
  &__item{
     margin-bottom: 30px;
   }
  &__title{
     font-size: 2rem;
   }
  &__value{
     font-size: 2.5rem;
     font-weight: 700;
   }
  }
</style>
