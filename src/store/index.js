import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {Toast, Loading, QSpinnerCircles} from 'quasar'

Vue.use(Vuex)
const spinner = {
  spinner: QSpinnerCircles,
  spinnerColor: 'primary',
  spinnerSize: 140,
  message: '',
  messageColor: 'black'
}
const REST_SERVER_ADDRESS = 'http://127.0.0.1:3000'
// const REST_SERVER_ADDRESS = 'http://192.168.1.173:3000'

const state = {
  diaryData: [{}, {}, {}, {}, {}, {}, {}],
  gifLink: '',
  user: {
    login: false,
    uid: ''
  },
  sescookie: '',
  dairyData: {
    currenrYear: '',
    prevDateLink: '',
    nextDateLink: ''
  },
  report: {
    htmldata: {}
  }
}

const actions = {
  session (context) {
    axios.get(REST_SERVER_ADDRESS + '/session')
      .then(resp => {
        if (resp.status === 200) {
          if (!resp.data.sesson) {
            context.state.user.login = false
          }
        }
      })
      .catch(err => {
        Loading.hide()
        Toast.create.negative('ошибка обращения к серверу')
        console.log(err)
      })
  },
  getReportData (context) {
    axios.get(REST_SERVER_ADDRESS + '/fake')
      .then(resp => {
        if (resp.status === 200) {
          context.commit('SET_REPORT_DATA', resp.data)
        }
      })
      .catch(err => {
        Loading.hide()
        Toast.create.negative('ошибка обращения к серверу')
        console.log(err)
      })
  },
  login (context, ldata) {
    Loading.show(spinner)
    context.state.user.login = false
    axios.post(REST_SERVER_ADDRESS + '/login', ldata)
      .then(resp => {
        if (resp.status === 200) {
          Loading.hide()
          if (resp.data.status === 'login-fail') {
            Toast.create.negative('авторизация не удалась')
          }
          else if (resp.data.status === 'login-success') {
            Toast.create.positive('авторизация успешна')
            context.commit('SET_SESSION_COOKIE', resp.data.cookie)
          }
        }
      })
      .catch(err => {
        Loading.hide()
        Toast.create.negative('ошибка обращения к серверу')
        console.log(err)
      })
  },
  getDiaryData (context) {
    Loading.show(spinner)
    context.commit('SET_DIARY_DATA_DEF')
    context.commit('SET_USER_DATA_DEF')
    axios.post(REST_SERVER_ADDRESS + '/diary',
      {sescookie: context.state.sescookie})
      .then(resp => {
        if (resp.status === 200) {
          Loading.hide()
          Toast.create.positive('загрузка закончена')
          context.commit('SET_DIARY_DATA', resp.data)
        }
      })
      .catch(err => {
        Loading.hide()
        Toast.create.negative('ошибка обращения к серверу')
        console.log(err)
      })
  },
  getDiaryDataFR (context, data) {
    Loading.show(spinner)
    context.commit('SET_DIARY_DATA_DEF')
    context.commit('SET_USER_DATA_DEF')
    axios.post(REST_SERVER_ADDRESS + '/timetable',
      {
        sescookie: context.state.sescookie,
        userID: data.userID,
        date: data.date
      })
      .then(resp => {
        if (resp.status === 200) {
          Loading.hide()
          Toast.create.positive('загрузка закончена )))')
          context.commit('SET_DIARY_DATA', resp.data)
        }
      })
      .catch(err => {
        Loading.hide()
        Toast.create.negative('ошибка обращения к серверу')
        console.log(err)
      })
  },
  // API key 4 GIPHY.COM
  // f4m2bZ3A7ec9acqcPlPTFREn3HSaSS8a
  // https://developers.giphy.com/dashboard/
  getGIPHY (context, wrd) {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${wrd}&api_key=f4m2bZ3A7ec9acqcPlPTFREn3HSaSS8a=1`)
      .then(resp => {
        if (resp.status === 200) {
          context.commit('SET_GIPHY', resp.data)
        }
      })
      .catch(err => {
        Toast.create.negative('ошибка обращения к серверу')
        console.log(err)
      })
  }
}

const mutations = {
  SET_REPORT_DATA (state, data) {
    console.log('data html', data)
    state.report = data
  },
  SET_SESSION_COOKIE (state, data) {
    console.log('data', data)
    state.sescookie = data
    state.user.login = true
    console.log('state.user.login', state.user.login)
  },
  SET_DIARY_DATA_DEF (state) {
    state.diaryData = [{}, {}, {}, {}, {}, {}, {}]
    console.log('state.diaryData', state.diaryData)
  },
  SET_USER_DATA_DEF (state) {
    state.user.uid = ''
    state.user.fio = ''
    state.dairyData.currenrYear = ''
    state.dairyData.prevDateLink = ''
    state.dairyData.nextDateLink = ''
  },
  SET_DIARY_DATA (state, data) {
    console.log('==============data============', data.studentID)
    state.diaryData = data.pdata
    state.user.uid = data.studentID
    state.user.fio = data.studentFIO
    state.dairyData.currenrYear = data.currentYear
    state.dairyData.prevDateLink = data.prevDateLink
    state.dairyData.nextDateLink = data.nextDateLink
  },
  SET_GIPHY (state, data) {
    state.gifLink = data[0].images.original.url
  }

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
  }
})
