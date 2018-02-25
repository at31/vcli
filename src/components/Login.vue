<template>
  <div>
    <h4>логин/пароль - любые</h4>
   <div class="row sm-gutter">
    <div class="col-lg-4 col-sm-12 col-md-12">
      <q-card >
            <q-card-title>
               login
            </q-card-title>
            <q-card-separator />
            <q-card-main>
               <q-input v-model="login" type="text" float-label="Имя пользователя" suffix="" clearable />
               <q-input v-model="pass" type="password" float-label="Пароль" />
            </q-card-main>
            <q-card-separator />
            <q-card-actions>
              <q-btn color="secondary" icon="fa-sign-in-alt" @click="doLogin">
                Логин
              </q-btn>
            </q-card-actions>
         </q-card>
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
      login: '',
      pass: ''
    }
  },
  watch: {
    ulogin: function (n) {
      if (n) {
        console.log('push to the diary')
        this.$router.push({
          path: '/diary',
          params: {
            hi: 'hi @at31'
          }
        })
      }
    }
  },
  computed: {
    ulogin () {
      return this.$store.state.user.login
    }
  },
  methods: {
    doLogin () {
      this.$store.dispatch('login', {
        login: this.login,
        password: this.pass,
        submit: '%D0%92%D0%BE%D0%B9%D1%82%D0%B8'
      })
    }

  },
  mounted () {

  },
  beforeDestroy () {

  },
  beforeMounted () {
  }
}
</script>

<style lang="stylus" scoped>
.q-card
  > div:first-child
      color: white
      background-color: #26a69a
      border-bottom: 10px solid #008074
.q-item
  font-size: 1.1rem
.q-card
  background-color: white
</style>
