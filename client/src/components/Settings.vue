<template>
  <div class="settings" v-click-outside="closeSettings">
    <div class="setting-item">
      <span class="label">Спинер загрузки</span>
      <Switches :value="settings.spinner" @input="changeSettings($event, 'spinner')"/>
    </div>
    <div class="setting-item">
      <span class="label">Обновлять фон</span>
      <Switches :value="settings.updateBg" @input="changeSettings($event, 'updateBg')"/>
    </div>
    <div class="setting-item">
      <span class="label">Обновлять прогноз</span>
      <Switches :value="settings.updateForecast" @input="changeSettings($event, 'updateForecast')"/>
    </div>
    <div class="setting-item">
      <span class="label">Время обновления фона, c</span>
      <input
        class="setting-input"
        type="number"
        min="10"
        :value="settings.changeBgTime/1000"
        @change="changeSettings($event.target.valueAsNumber, 'changeBgTime')"
        @keypress.enter="closeSettings"
      >
    </div>
    <div class="setting-item">
      <span class="label">Время обновления прогноза, c</span>
      <input
        class="setting-input"
        type="number"
        min="10"
        :value="settings.reloadForecast/1000"
        @keypress.enter="closeSettings"
        @change="changeSettings($event.target.valueAsNumber, 'reloadForecast')"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Switches from 'vue-switches';

export default {
  name: 'Settings',
  components: {
    Switches,
  },
  data() {
    return {
      tog: false,
    };
  },
  computed: {
    ...mapState([
      'settings',
    ]),
  },
  methods: {
    closeSettings() {
      this.$emit('close-settings');
    },
    changeSettings(newSettings, name) {
      if (typeof newSettings === 'number') {
        if (newSettings < 10) newSettings = 10;
        newSettings *= 1000;
      }
      let payload = {};
      payload[name] = newSettings;
      this.$store.commit('setSettings', payload);
      this.$emit('change-settings');
    },
  },
};
</script>

<style lang="scss" scoped>
  .settings{
    position: absolute;
    padding: 1rem;
    width: 500px;
    right: 0;
    background: rgba(0,0,0,0.4);
  }
  .settings *:not(:first-child){
    margin-top: 1rem;
  }
  .setting-item{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .label{
    font-size: 1.5rem;
  }
  .setting-input{
    width: 60px;
    height: 2rem;
    outline: none;
    padding: 0 0.5rem;
    border: none;
    background: #5f5f5f;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    -moz-appearance: textfield;
  }

  @media(max-width: 950px) {
    .settings{
      position: fixed;
      left: 40px;
      right: 40px;
      width: auto;
    }
  }
  @media(max-width: 550px) {
    .settings{
      position: fixed;
      left: 5px;
      right: 5px;
      width: auto;
    }
  }
</style>
