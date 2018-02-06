<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="" color="secondary">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        VSOpen-mirror
        <div slot="subtitle"></div>
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>VSOpen-mirror menus</q-list-header>
        <q-item @click="">
          <q-item-side icon="fa-sign-in-alt" />
          <q-side-link to="/">
            <q-item-main label="Авторизация" sublabel="авторизация (логин и пароль)" />
          </q-side-link>
        </q-item>
        <q-item @click="">
          <q-item-side icon="fa-calendar" />
          <q-side-link to="/diary">
            <q-item-main label="Дневник" sublabel="расписание занятий, оценки, задания" />
          </q-side-link>
        </q-item>
        <q-item @click="">
          <q-item-side icon="fa-graduation-cap" />
          <q-side-link to="/report">
            <q-item-main label="Табель" sublabel="табель успеваемости" />
          </q-side-link>
        </q-item>
      </q-list>
    </div>

    <div class="layout-padding" id="q-app">
    <router-view />
    </div>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QSideLink
} from 'quasar'

export default {
  name: 'APP',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus">
@media (min-device-width: 768px)
  .layout-padding
    padding: 1rem 4rem 3rem 4rem
.layout-page
  background-color: #f4f4f4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23cacaca' fill-opacity='0.2'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
</style>
