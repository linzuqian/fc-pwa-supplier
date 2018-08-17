const AreaList = () =>
  import ('@/components/area')

export default {
  data () {
    return {
      select: false,
      areaList: [],
      areaValue: []
    }
  },
  computed: {
    province() {
      if (_.has(this.areaValue, '[0].name')) {
        if (this.areaValue[0].name !== '' || this.areaValue[0].name !== undefined) {
          return this.areaValue[0].name
        }
      } else {
        return '请选择地区'
      }
    },
    city() {
      if (_.has(this.areaValue, '[1].name')) {
        if (this.areaValue[1].name !== '' || this.areaValue[1].name !== undefined) {
          return this.areaValue[1].name
        }
      } else {
        return ''
      }
    },
    actived() {
      if (this.province != '请选择地区') {
        return true
      }
      return false
    }
  },
  created() {
    this.getAreaList()
  },
  methods: {
    switchSearch () {
      this.select = !this.select
    },
    getAreaList() {
      AreaList().then((res) => {
        this.areaList = res.default
      })
    },
    confirmArea(val) {
      this.areaValue = val
      this.select = false
    }
  }
}