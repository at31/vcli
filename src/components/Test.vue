<template>
<div>
    <div class="grid">

  <div class="item">
    <div class="item-content">
      <!-- Safe zone, enter your custom markup -->
      This can be anything.
      <!-- Safe zone ends -->
      <q-btn round small flat color="primary" >
        <q-icon name="fa-file-archive-o" />
      </q-btn>
    </div>
  </div>

  <div class="item">
    <div class="item-content">
      <!-- Safe zone, enter your custom markup -->
      <div class="my-custom-content">
        Yippee!
      </div>
      <!-- Safe zone ends -->
    </div>
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
import Muuri from 'muuri'

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

  },
  methods: {

  },
  mounted () {
    var grid = new Muuri('.grid')
  },
  beforeDestroy () {

  },
  beforeMounted () {
  }
}
</script>

<style>
.grid {
  position: relative;
}
.item {
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 5px;
  z-index: 1;
  background: #000;
  color: #fff;
}
.item.muuri-item-dragging {
  z-index: 3;
}
.item.muuri-item-releasing {
  z-index: 2;
}
.item.muuri-item-hidden {
  z-index: 0;
}
.item-content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
