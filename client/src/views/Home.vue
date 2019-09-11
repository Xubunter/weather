<template>
  <div class="home">
    <transition name="preloader">
      <Preloader v-if="loadingPage"/>
    </transition>
    <div class="bg">
      <transition name="bg">
        <img class="bg" :src="bgImgBuf" alt="" :key="bgImgBuf">
      </transition>
      <img
        class="bg"
        :style="{opacity: 0}"
        :src="bgImg"
        alt=""
        @load="showNewBgImg"
      >
      <div class="bg__blur"/>
    </div>
    <div class="page">
      <Clock style="position: absolute; left:0; right: 0; text-align: center"/>
      <div class="top-widgets">
        <transition name="change" mode="out-in">
          <WeatherWidget
            :weather="weather.weather"
            :icon="weather.icon"
            :date-raw="weather.dt_txt"
            :city="city"
            :key="cardNumber"
          />
        </transition>
        <Spinner v-show="loading" v-if="settings.spinner"/>
        <div>
          <div class="search">
            <Search @setcity="setCity" @change-settings="updateSettings"/>
          </div>
          <AdditionalWeatherWidget
            :humidity="weather.humidity"
            :wind="weather.wind"
            :clouds="weather.clouds"
          />
        </div>
      </div>
      <div class="time-list" @wheel="cardListScroll" ref="list" v-dragscroll>
        <div
          class="time-item"
          v-for="(item, i) in forecast"
          :key="i"
          :class="{'time-item_active': cardNumber===i, 'time-item_no-active': cardNumber!==i}"
          @click="cardNumber=i"
        >
          <div class="time-item__hours" v-text="cardTime(item.dt_txt)"/>
          <div class="time-item__day" v-text="weekDays(item.dt_txt)"/>
          <div class="time-item__value" v-text="`${Math.round(item.main.temp)}°C`"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import Search from '../components/Search.vue';
import Spinner from '../components/Spinner.vue';
import Clock from '../components/Clock.vue';
import WeatherWidget from '../components/WeatherWidget.vue';
import AdditionalWeatherWidget from '../components/AdditionalWeatherWidget.vue';
import Preloader from '../components/Preloader.vue';
import axios from 'axios';

const weekDaysAbb = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default {
  name: 'home',
  components: {
    Search,
    Spinner,
    Clock,
    WeatherWidget,
    AdditionalWeatherWidget,
    Preloader,
  },
  data() {
    return {
      bgImg: '',
      bgImgBuf: '',
      loading: false,
      imgLoading: false,
      intervalBg: null,
      intervalForecast: null,
      cardNumber: 0,
      icon: '',
    };
  },
  computed: {
    ...mapState([
      'city',
      'forecast',
      'settings',
      'loadingPage',
    ]),
    weather() {
      if (this.forecast.length > 0) {
        const { dt_txt, weather, main, wind, clouds } = this.forecast[this.cardNumber];
        const iconName = weather[0].icon;
        return {
          weather: weather[0].description,
          dt_txt,
          icon: `http://openweathermap.org/img/wn/${iconName}@2x.png`,
          humidity: `${main.humidity}%`,
          wind: `${wind.speed} км/ч`,
          clouds: `${clouds.all}%`,
        };
      }
      return {
        weather: '',
        dt_txt: '',
        icon: '',
        humidity: '',
        wind: '',
        clouds: '',
      };
    },
  },
  async mounted() {
    if (localStorage.getItem('city')) {
      this.$store.commit('setCity', localStorage.getItem('city'));
    }
    if (localStorage.getItem('settings')) {
      this.$store.commit('setSettings', JSON.parse(localStorage.getItem('settings')));
    }
    this.getForecast();
    this.changeBgImg();
    this.updateSettings();
  },
  beforeDestroy() {
    clearInterval(this.intervalBg);
    clearInterval(this.intervalForecast);
  },
  methods: {
    showNewBgImg() {
      this.imgLoading = false;
      this.$store.commit('setLoadingPage', false);
    },
    updateSettings() {
      clearInterval(this.intervalBg);
      clearInterval(this.intervalForecast);
      if (this.settings.updateBg) {
        this.intervalBg = setInterval(() => {
          this.changeBgImg();
        }, this.settings.changeBgTime);
      }
      if (this.settings.updateForecast) {
        this.intervalForecast = setInterval(() => {
          this.getForecast();
        }, this.settings.reloadForecast);
      }
    },
    getForecast() {
      this.loading = true;
      this.$store.dispatch('getForecast', {
        q: this.city,
        lang: 'ru',
        units: 'metric',
      })
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setCity(newCity) {
      this.$store.commit('setCity', newCity);
      this.getForecast();
    },
    // TODO получать с бэкенда
    changeBgImg() {
      const prev = this.bgImgBuf.split('/').slice(1).join('/');
      this.imgLoading = true;
      axios.get('/api/bg', {
        params: { prev }
      })
        .then((response) => {
          this.bgImgBuf = this.bgImg;
          this.bgImg = response.data;
          if (!this.bgImgBuf) {
            this.bgImgBuf = this.bgImg;
          }
        })
        .catch(error => console.log(error));
    },
    cardListScroll(e) {
      this.$refs.list.scrollLeft += e.deltaY;
    },
    cardTime(date) {
      if (date) {
        const result = date
          .split(' ')[1]
          .split(':');
        result.length = 2;
        return result.join(':');
      }
      return '';
    },
    weekDays(date) {
      if (date) {
        const day = new Date(Date.parse(date)).getDay();
        return weekDaysAbb[day];
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
  }
  .bg{
    height: 100vh;
    min-height: 500px;
    width: 100%;
    bottom: 0;
    top: 0;
    object-fit: cover;
    position: absolute;
    background-size: cover;
    z-index: -1;
    transition: opacity 2s ease;
    &__blur{
      height: 100%;
      width: 100%;
      position: absolute;
      opacity: 0.5;
      background: linear-gradient(180deg, #CC9978 0%, #1E2A42 100%), #C4C4C4;
    }
  }
  .page{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-widgets{
    display: flex;
    justify-content: space-between;
  }
  .search{
    text-align: right;
  }
  .time-list{
    display: flex;
    overflow-x: hidden;
    .time-item{
      padding: 1.6rem;
      width: 180px;
      font-weight: 700;
      cursor: pointer;
      transition: .2s;
      &__hours{
        text-transform: uppercase;
      }
      &__value{
        font-size: 3rem;
        line-height: 6rem;
      }
    }
    .time-item_active{
      background: rgba(0,0,0,0.5);
    }
    .time-item_no-active{
      &:hover{
        background: rgba(0,0,0,0.2);
      }
    }
  }
  .hidden{
    animation: show 2s 1 ease;
  }
  .show{
    animation: show 2s 1 ease;
  }
  .change-leave-active{
    transition: opacity 0.2s ease-in;
  }
  .change-enter-active {
    transition: opacity 0.2s ease-out;
  }
  .change-enter, .change-leave-to {
    opacity: 0;
  }
  .bg-leave-active{
    transition: opacity 2s ease-in;
  }
  .bg-enter-active {
    transition: opacity 2s ease-out;
  }
  .bg-enter, .bg-leave-to {
    opacity: 0;
  }
  .preloader-leave-active{
    transition: opacity 0.5s ease;
  }
  .preloader-enter, .preloader-leave-to {
    opacity: 0;
  }
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media(max-width: 950px), (max-height: 950px){
    .page{
      padding: 30px 40px;
    }
    .details-widget{
      margin-top: 50px;
    }
  }
  @media(max-width: 750px), (max-height: 750px) {
    .details-widget{
      margin-top: 50px;
    }
    .page{
      padding: 15px 20px 10vh 20px;
    }
  }
  @media(max-width: 550px)  {
    .top-widgets{
      margin-top: 10px;
    }
    .settings{
      right: -100px;
    }
  }
</style>
