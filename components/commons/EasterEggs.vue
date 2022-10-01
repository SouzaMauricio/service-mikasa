<template>
  <div
    v-if="show"
    class="fixed bottom-0 left-0 z-0"
  >
    <img
      class="h-60"
      :src="require('../../assets/its_friday.gif')"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'EasterEggs',

  created () {
    if (new Date().getDay() !== 5) return
    // this.emitter.on('show-easter-egg-friday', this.showEasterEggs)
  },

  data () {
    return {
      show: false
    }
  },

  methods: {
    showEasterEggs() {
      this.show = true
      setTimeout(() => this.show = false, 5000)
    }
  }
}
</script>