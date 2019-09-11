import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const baseUrl = 'https://community-open-weather-map.p.rapidapi.com';
const forecastUrl = '/forecast';

const openWeather = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': '65d18a81b2msh2ef79731fed3cbcp136ecbjsn21d653552849',
  },
});

export default new Vuex.Store({
  state: {
    city: 'Moscow',
    forecast: [],
    settings: {
      spinner: false,
      changeBgTime: 60000,
      reloadForecast: 60000,
      updateBg: true,
      updateForecast: true,
    },
    loadingPage: true,
  },
  mutations: {
    setCity(state, city) {
      state.city = city;
    },
    setForecast(state, data) {
      state.forecast = data;
    },
    setSettings(state, data) {
      Object.assign(state.settings, data);
      localStorage.setItem('settings', JSON.stringify(state.settings));
    },
    setLoadingPage(state, data) {
      state.loadingPage = data;
    },
  },
  actions: {
    getForecast({ commit }, data) {
      return new Promise((resolve, reject) => {
        openWeather.get(forecastUrl, {params: data})
          .then((response) => {
            localStorage.setItem('city', response.data.city.name);
            commit('setCity', response.data.city.name);
            commit('setForecast', response.data.list);

            resolve();
          })
          .catch(error => console.log(error));
      });
    },
    getSettings({ commit }){

    },
  },
});
