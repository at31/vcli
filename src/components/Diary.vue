<template>
  <div>
    <p>{{windowWidth}}</p>
    <Mdiary v-if="windowWidth<768"></Mdiary>
    <Bdiary v-if="windowWidth>=768"></Bdiary>
  </div>
</template>

<script>
import Bdiary from './big/Bdiary.vue'
import Mdiary from './mobile/Mdiary.vue'

export default {
  name: 'Diary',
  components: {
    Mdiary,
    Bdiary
  },
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  watch: {

  },
  computed: {

  },
  methods: {

  },
  created () {
  },
  mounted () {
    if (!this.$store.state.user.login) {
      this.$router.push({
        path: '/',
        params: {
          hi: 'hi @at31 '
        }
      })
    }
    else {
      this.$store.dispatch('getDiaryData')
      window.onresize = (event) => {
        this.windowWidth = window.innerWidth
      }
    }
  },
  beforeDestroy () {

  },
  beforeMounted () {

  }
}
</script>

<style lang="stylus" scoped>


</style>
