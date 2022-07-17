<template>
    <p @click="changeShowPopup()">{{ title }}<i :class="this.showPopup ? 'arrow up' : 'arrow down'"></i></p>
    <slot v-if="showPopup"></slot>
</template>

<script>


/* eslint-disable */
export default {
  name: 'Popup',
  props: {
      title: String
  },
  data() {
    return {
        showPopup: false
    }
  },
  methods: {
      changeShowPopup() {
          this.showPopup = !this.showPopup
      }
  }
}
</script>

<style scoped>
.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

</style>
