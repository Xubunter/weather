<template>
  <div class="search-box">
    <Cogweel v-show="hidden" @click="settings(true)" style="position: absolute">
      <Settings v-if="showSettings" @close-settings="settings(false)" @change-settings="$emit('change-settings')"/>
    </Cogweel>
    <div class="input" :class="{'active': !hidden}" @focusout="hideInput">
      <input
        @focus="showInput"
        :class="{'hide-input': hidden, 'active-input': !hidden}"
        type="text"
        ref="search"
        v-model="input"
        @input="liveSearch()"
        @keypress.enter="setCity()"
      >
      <div class="live-search" v-show="!hidden">
        <span style="cursor: pointer" @click="setCity">{{search}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Cogweel from './Cogweel.vue';
import Settings from './Settings.vue';
import axios from 'axios';

export default {
  name: 'Search',
  components: {
    Cogweel,
    Settings,
  },
  data() {
    return {
      hidden: true,
      showSettings: false,
      input: 'Поиск',
      search: '',
      searchLabel: 'Поиск',
      searchBuf: '',
    };
  },
  methods: {
    setCity() {
      if (this.search) {
        this.$refs.search.blur();
        this.$emit('setcity', this.search);
        this.hidden = true;
      }
    },
    hideInput() {
      setTimeout(() => {
        this.hidden = true;
        this.searchBuf = this.input;
        this.input = this.searchLabel;
      }, 100);
    },
    showInput() {
      this.hidden = false;
      this.input = this.searchBuf;
    },
    liveSearch() {
      if (this.input === '') {
        this.search = '';
      } else {
        axios.get('/api/city', {
          params: {input: this.input}
        })
          .then((response) => {
            this.search = response.data;
            resolve();
          })
          .catch(error => console.log(error));
      }
    },
    settings(bool) {
      this.$nextTick();
      this.showSettings = bool;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-box{
  height: 50px;
  font-size: 2rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
input[type="text"]{
  height: 3rem;
  width: 100%;
  font-size: 2rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
  color: white;
  outline: none;
  border: none;
  background: none;
  transition: background .2s;
}
.input{
  position: relative;
  margin-left: auto;
  width: 8rem;
  transition: .2s;
}
.active{
  width: 16rem;
}
.live-search{
  right: 0;
  position: absolute;
  padding: 16px;
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  background: rgba(0,0,0,0.2);
}
.hide-input{
  transition: .2s;
  opacity: 0.5;
  background: none;
}

.active-input{
  opacity: 1;
  background: rgba(0,0,0,0.5) !important;
}
</style>
