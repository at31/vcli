<template>
  <div>
    <div class="row " >
      <q-chip icon="fa-info" color="primary">
        {{currentYear}}
      </q-chip>
    </div>
    <div class="row ">
      <h5 class="name-header">
        Дневник ученика Учеников Ученик.
          <!--{{studentFIO}}-->
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
      <div class="col-lg-6 col-sm-12 col-md-12 col-xs-12" v-for="data in diaryData.pdata" :key="data.index">
         <q-card >
            <q-card-title>
               {{data.title}}
               <!--q-btn slot="right" flat round color="white" @click="shDiarySchedule(data)">
                 <q-icon name="fa-clock-o" />
               </q-btn-->

            </q-card-title>
            <q-card-separator />
            <q-card-main v-show="data.selected">
              <q-list>
                <q-list-header></q-list-header>
                <q-item multiline v-for="(lesson, indx) in data.data" :key="data.index" class="border-bottom">
                  <q-item-side>
                    <q-chip color="light" class="text-black">
                      {{indx+1}}
                    </q-chip>
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>{{formatDate(lesson.startDate)}} - {{formatDate(lesson.stopDate)}}</q-item-tile>
                    <q-item-tile sublabel>{{lesson.subject.name}}</q-item-tile>
                    <q-item-tile sublabel>{{lesson.room}}</q-item-tile>
                    <q-item-tile sublabel>{{lesson.teacher.initials}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-card-main>
            <q-card-main v-show="!data.selected">
               <q-list>
                 <q-list-header></q-list-header>
                 <div v-for="item in data.data" :key=" item.index" class="border-bottom">
                 <q-item multiline class="no-border-bottom">
                   <q-item-side><q-chip color="light" class="text-black">
                      {{item.number}}
                   </q-chip>
                 </q-item-side>
                   <q-item-main>
                     <q-item-tile label>{{item.subject.name}}</q-item-tile>
                   </q-item-main>
                   <q-item-side right>
                       <q-item-tile label v-if="item.examType===null">
                        <q-btn v-model="item.showscoregif" loader small round outline :color="ratingColor(item.scores[0].score)" v-if="item.scores.length>0" @click="showModal(item)">
                        <q-spinner-mat slot="loading"></q-spinner-mat>
                        <big >{{item.scores[0].score}}</big>
                          <q-tooltip>
                        {{createRatingTooltipTxt(item)}}
                      </q-tooltip>
                      </q-btn>
                      </q-item-tile>
                      <q-item-tile label v-if="item.examType!==null">
                        <q-btn v-model="item.showscoregif" loader small round :color="ratingColor(item.scores[0].score)" v-if="item.scores.length>0" @click="showModal(item)">
                        <q-spinner-mat slot="loading"></q-spinner-mat>
                        <big >{{item.scores[0].score}}</big>
                          <q-tooltip>
                        {{createRatingTooltipTxt(item)}}
                      </q-tooltip>
                      </q-btn>
                      <q-btn small round color="secondary" v-if="item.examType!==null">
                        <big > K </big>
                          <q-tooltip>
                        {{createRatingTooltipTxt(item)}}
                      </q-tooltip>
                      </q-btn>
                      </q-item-tile>
                    </q-item-side>
                 </q-item>

                 <q-item  class="no-border-bottom" v-if="item.theme!==null && data.showTheme">
                   <q-item-side>
                     <q-item-tile color="secondary" icon="fa-info" />
                   </q-item-side>
                   <q-item-main>
                     <q-item-tile sublabel class="item-italic">{{item.theme}}</q-item-tile>
                   </q-item-main>
                 </q-item>

                 <q-item v-if="item.homework!=='' && item.homework!==null" class="no-border-bottom">
                   <q-item-side>
                     <q-item-tile color="primary" icon="fa-book" />
                   </q-item-side>
                   <q-item-main>
                     <q-item-tile sublabel class="black-color">{{item.homework}}</q-item-tile>
                   </q-item-main>
                 </q-item>

               </div>
                 <q-item-separator/>
               </q-list>
            </q-card-main>
            <!--q-card-separator /-->
            <q-card-actions align="around">
              <q-btn  round flat color="tertiary" @click="shDiarySchedule(data)">
                <q-icon name="fa-clock" />
              </q-btn>
              <q-btn  round flat  color="positive" @click="shLessonsTheme(data)">
                <q-icon name="fa-info" />
              </q-btn>
              <a :href="data.tbotlink" target="_blank">
              <q-btn slot="right" flat round color="blue">
               <q-icon name="fa-share-alt"/>
             </q-btn>
             </a>
            </q-card-actions>
            <br>
         </q-card>
      </div>
   </div>


   <q-modal ref="modalgif" minimized>
     <q-btn color="primary" @click="closeModal()" label="Close" icon="fa-times"/>
     <div style="width:100%;height:0;padding-bottom:100%;position:relative;">
       <img :src="gifLink" class="responsive">
     </div>
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
  QIcon,
  QSpinnerMat
} from 'quasar'

export default {
  name: 'Mdiary',
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
    QIcon,
    QSpinnerMat
  },
  data () {
    return {
      selected: undefined,
      sdview: true,
      dvisible: [],
      scoregif: [],
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
    gifLink: function (n) {
      this.scoregif.forEach((el) => {
        this.$set(el, 'showscoregif', false)
      })
      this.scoregif = []
      this.$nextTick(function () {
        this.$refs.modalgif.open()
      })
    },
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
    },
    studentFIO () {
      let fio = ''
      if (this.$store.state.diaryData) {
        fio = this.$store.state.diaryData.studentFIO
      }
      return fio
    }
  },
  methods: {
    closeModal () {
      this.$refs.modalgif.close()
    },
    formatDate (time) {
      return (new Date(time).getHours()) + ':' + (new Date(time).getMinutes())
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
    shLessonsTheme (data) {
      this.$set(data, 'showTheme', !data.showTheme)
    },
    showLog (info) {
      console.log(this)
    },
    showModal (item) {
      // console.log(cell)
      this.scoregif.push(item)
      this.$set(item, 'showscoregif', true)
      let wrd = 'congratulations'
      if (item.scores[0].score < 4) {
        wrd = 'sad'
      }
      this.$store.dispatch('getGIPHY', wrd)
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
      else if (item.dayRatingTitle === '' || item.dayRating !== '') {
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
        wd: this.$store.state.diaryData.wid,
        eduYearId: this.$store.state.diaryData.eduYearId,
        currentYear: this.$store.state.diaryData.currentYear,
        studentFIO: this.$store.state.diaryData.studentFIO
      })
    },
    getPrev () {
      this.$store.dispatch('getDiaryDataFR',
        {
          userID: this.$store.state.user.uid,
          date: this.$store.state.diaryData.prevDateLink,
          wd: this.$store.state.diaryData.wid,
          eduYearId: this.$store.state.diaryData.eduYearId,
          currentYear: this.$store.state.diaryData.currentYear,
          studentFIO: this.$store.state.diaryData.studentFIO
        })
    },
    sendToTlelga (data) {
      return 'https://t.me/VCLI_BOT?start=start-111'
    }
  },
  created () {
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
  margin: 0.3rem 0 0.1rem 0
  padding: 0.3rem
  // border-bottom: 2px solid #efefef
.no-border-bottom
  border-bottom: none
.m-l-10
  margin-left: 10px
.docs-chip .q-chip
  margin 5px
.btns
  margin-top: 10px
  margin-bottom: 10px
  margin-left : 8px
.border-bottom
  border-bottom: 2px solid #efefef
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
.item-italic
  font-style: italic;
.black-color
  color:#0c0c0c
</style>
