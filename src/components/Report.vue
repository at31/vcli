<template>
  <div class='row'>
    <div class="wrapper">
    <div class="scroller">
      <span v-html="htmldata"></span>     
    </div>
</div>   
</div>
</template>

<script>
import {
  QCollapsible,
  QModal,
  QDataTable,
  QCard,
  QCardTitle,
  QCardActions,
  QCardSeparator,
  QCardMain,
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QItemSide,
  QItemMain,
  QItemTile,
  QBtn,
  QInput,
  QCheckbox,
  QSelect,
  QChip,
  QTooltip,
  QIcon
} from 'quasar'

export default {
  name: 'Login',
  components: {
    QCollapsible,
    QModal,
    QDataTable,
    QCard,
    QCardTitle,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile,
    QBtn,
    QInput,
    QCheckbox,
    QSelect,
    QChip,
    QTooltip,
    QIcon
  },
  data () {
    return {

    }
  },
  watch: {

  },
  computed: {

    htmldata () {
      return this.$store.state.report.htmldata
    }
  },
  methods: {

  },
  mounted () {
    /*
    if (!this.$store.state.user.login) {
      this.$router.push({
        path: '/',
        params: {
          hi: 'hi @at31'
        }
      })
    }
    else {
      this.$store.dispatch('getDiaryData')
    }
    */
    this.$store.dispatch('getReportData')
  },
  beforeDestroy () {

  },
  beforeMounted () {
  }
}
</script>

<style lang="stylus">
.excellent
    color: green
    font-weight: bold
.passably
    color: maroon
.exam
    color: white
    background-color: #42990A
.good
    color: green
.headcol
    border-left: solid 1px #DDEFEF
    border-right: solid 1px #DDEFEF
    left: 0
    position: absolute
    top: auto
    width: 120px
    
.wrapper {
    position: relative
}
.scroller {
    margin-left: 200px
    overflow-x: scroll
    overflow-y: visible
    padding-bottom: 5px
    width: 100%
}
</style>
