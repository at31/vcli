<template>
  <div>
    <div class="row ">
      <q-chip icon="fa-info" color="primary">
        {{currentYear}}
      </q-chip>
    </div>
    <div class="row ">
      <h5 class="name-header">
          {{user.fio}}
      </h5>
    </div>
   <div class="row btns ">
      <q-btn color="secondary" icon="fa-arrow-left" @click="getPrev">
      Пред. неделя
    </q-btn>
    <q-btn color="secondary" icon-right="fa-arrow-right" @click="getNext" class="m-l-10">
      След. неделя
    </q-btn>
   </div>

   <div class="row" v-if="diaryData">
      <div class="col-lg-6 col-sm-12 col-md-12" v-for="data in diaryData.pdata" :key="data.index">
         <q-card >
            <q-card-title>
               {{data.title}}
               <q-btn slot="right" flat round color="white" @click="">
                <q-icon name="fa-info" />
              </q-btn>
            </q-card-title>
            <q-card-separator />
            <q-card-main v-show="data.selected">
              <q-list>
                <q-list-header></q-list-header>
                <q-item multiline v-for="(lesson, indx) in data.schedule.lessons">
                  <q-item-side>
                    <q-chip color="light" class="text-black">
                      {{indx+1}}
                    </q-chip>
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>{{formatDate(lesson.beginning)}} - {{formatDate(lesson.ending)}}</q-item-tile>
                    <q-item-tile sublabel>{{lesson.info.subjectname}} {{lesson.info.tablename}}</q-item-tile>
                    <q-item-tile sublabel>{{lesson.info.classroom}}</q-item-tile>
                    <q-item-tile sublabel>{{teacherFIO(lesson)}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-card-main>
            <q-card-main v-show="!data.selected">
               <q-list>
                 <q-list-header></q-list-header>
                 <q-item multiline v-for="item in data.data" >
                   <q-item-side><q-chip color="light" class="text-black">
                      {{item.dayNumber}}
                   </q-chip>
                 </q-item-side>
                   <q-item-main>
                     <q-item-tile label>{{item.dayLessons}}</q-item-tile>
                     <q-item-tile sublabel>{{item.dayHW}}</q-item-tile>
                     <q-btn round small flat color="primary" v-if="!item.dayFile==''">
                        <q-icon name="fa-file-archive-o" />
                      </q-btn>
                     <q-btn round small flat color="primary" v-if="!item.dayCommentTitle==''">
                        <q-icon name="fa-comments" />
                        <q-tooltip>
                        {{item.dayCommentTitle}}
                      </q-tooltip>
                      </q-btn>
                   </q-item-main>
                   <q-item-side right>
                       <q-item-tile label v-if="!item.dayRatingExam">
                        <q-btn round outline :color="ratingColor(item.dayRating)" v-if="!item.dayRating==''" @click="showModal(item.dayRating)">
                        <big >{{item.dayRating}}</big>
                          <q-tooltip>
                        {{createRatingTooltipTxt(item)}}
                      </q-tooltip>
                      </q-btn>
                      </q-item-tile>
                      <q-item-tile label v-if="item.dayRatingExam">
                        <q-btn round :color="ratingColor(item.dayRating)" v-if="!item.dayRating==''" @click="showModal(item.dayRating)">
                        <big >{{item.dayRating}}</big>
                          <q-tooltip>
                        {{createRatingTooltipTxt(item)}}
                      </q-tooltip>
                      </q-btn>
                      <q-btn round color="secondary" v-if="item.dayRating===''">
                        <big > K </big>
                          <q-tooltip>
                        {{createRatingTooltipTxt(item)}}
                      </q-tooltip>
                      </q-btn>
                      </q-item-tile>
                     </q-item-side>
                 </q-item>
                 <q-item-separator/>
               </q-list>
            </q-card-main>
            <q-card-separator />
            <q-card-actions align="around">
              <q-btn flat round small color="primary" @click="shDiarySchedule(data)">
                <q-icon name="fa-clock-o" />
              </q-btn>
              <q-btn flat round small  color="primary">
                <q-icon name="fa-comments" />
              </q-btn>
              <q-btn flat round small  color="primary" @click="showLog">
                <q-icon name="fa-info" />
              </q-btn>
            </q-card-actions>
         </q-card>
      </div>
   </div>


    <q-modal v-model="open">
      <q-btn color="primary" @click="open = false" label="Close" />
      <div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe :src="gifLink" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
    </q-modal>

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
  name: 'Diary',
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
      selected: undefined,
      sdview: true,
      dvisible: [],
      open: false,
      ndconfig: {
        rowHeight: '30px',
        /*
        pagination: {
          rowsPerPage: 5,
          options: [1, 3, 5, 10, 15, 30, 50, 500]
        },
        columnPicker: true,
        leftStickyColumns: 2,
        */
        responsive: true
      },
      ndcolumns: [
        { label: '№', field: 'dayNumber', width: '50px', sort: false },
        { label: 'Предмет', field: 'dayLessons', width: '130px', sort: false },
        { label: 'Дом. задание', field: 'dayHW', width: '130px', sort: false },
        { label: ' ', field: 'dayFile', width: '50px', sort: false },
        { label: 'Оценка', field: 'dayRating', width: '70px', sort: false },
        { label: ' ', field: 'dayComment', width: '50px', sort: false }
      ]
    }
  },
  watch: {
    diaryData: function (n) {

    },
    login: function (n) {
      if (!n) {
        this.$router.push({
          path: '/',
          params: {
            hi: 'hi @at31 '
          }
        })
      }
    }
  },
  computed: {
    /*
    daydetail () {
      return this.$store.state.diaryData
    },
    */
    gifLink () {
      return this.$store.state.gifLink
    },
    diaryData () {
      return this.$store.state.diaryData
    },
    user () {
      return this.$store.state.user
    },
    login () {
      return this.$store.state.user.login
    },
    currentYear () {
      let cy = ''
      if (this.$store.state.diaryData) {
        cy = this.$store.state.diaryData.currentYear
      }
      return cy
    }
  },
  methods: {
    formatDate (str) {
      return str.substring(0, 5)
    },
    teacherFIO (lesson) {
      let fio = ''
      if (lesson.teacher) {
        fio = lesson.teacher[0]
        fio = fio.fio
        console.log(fio.fio)
      }

      return fio
      /* let t = lesson.teacher[0]
      return t[0].fio */
    },
    shDiarySchedule (data) {
      this.$set(data, 'selected', !data.selected)
    },
    showLog (info) {
      console.log(this)
    },
    showModal (rating) {
      // console.log(cell)
      let wrd = 'congratulations'
      if (rating < 3) {
        wrd = 'sad'
      }
      this.$store.dispatch('getGIPHY', wrd)
      this.open = true
    },
    ratingColor (rating) {
      let rcolor = 'green'
      let numRating = 0

      if (rating !== '') {
        numRating = Number.parseInt(rating)
        if (numRating <= 2) {
          rcolor = 'red'
        }
      }
      return rcolor
    },
    createRatingTooltipTxt (item) {
      let rrt = ''
      if (item.dayRatingTitle !== '') {
        rrt = item.dayRatingTitle
      }
      else if (item.dayRatingTitle === '' && item.dayRating !== '') {
        rrt = item.dayRating
      }
      return rrt
    },
    getNext () {
      console.log('this.$store.state.diaryData.nextDateLink', this.$store.state.diaryData.nextDateLink)
      console.log('this.$store.state.user', this.$store.state.user)
      this.$store.dispatch('getDiaryDataFR', {
        userID: this.$store.state.user.uid,
        date: this.$store.state.diaryData.nextDateLink,
        wd: this.$store.state.diaryData.wid
      })
    },
    getPrev () {
      this.$store.dispatch('getDiaryDataFR',
        {
          userID: this.$store.state.user.uid,
          date: this.$store.state.diaryData.prevDateLink,
          wd: this.$store.state.diaryData.wid
        })
    }
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
    }
  },
  beforeDestroy () {

  },
  beforeMounted () {

  }
}
</script>

<style lang="stylus" scoped>

.q-data-table table td
  white-space: pre-wrap
.bggreen
  background-color: #abf2ab
  display: block
  font-size:9 pt
  padding: 0 10 pt
  box-sizing: inherit
.q-list
  border:none
.q-item
  margin: 1rem 0 1rem 0
  border-bottom: 2px solid #efefef
.m-l-10
  margin-left: 10px
.docs-chip .q-chip
  margin 5px
.btns
  margin-top: 10px
  margin-bottom: 10px
  margin-left : 8px
.q-card
  > div:first-child
      color: white
      background-color: #26a69a
      border-bottom: 10px solid #008074
.q-item
  font-size: 1.1rem
.q-card
  background-color: white
.name-header
  color: #747474
  // text-shadow: 0px 2px #00635a
</style>
