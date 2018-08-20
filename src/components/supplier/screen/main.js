import Vue from 'vue'
import _ from 'lodash'
const AreaList = () =>
  import ('@/components/area')

export default {
  data () {
    return {
      select: false,
      areaList: [],
      typeList: [],
      areaValue: [],
      enterpriseList: [],
      categories: {},
      currentSelectItem:[] 
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
    },
    fetchCompanyFilter() {
      Vue.$http.get('/v1.1/CompanyCategories?TypeId=6e3cecaf-4d35-e711-80e4-da42ba972ebd&FromCategoryId=').then((response) => {
        const catItems = response.data
        catItems.forEach(item => {
          Vue.set(this.categories, `${item.Id}`, {})
          Vue.$http.get(`/v1.1/CompanyCategories/${item.Id}?fields=SubCategories`).then((response) => {
            if(response.data.Id){
              response.data.SubCategories.forEach(elem => {
                Vue.set(elem,'checked', false)
              })
            }
            this.categories[`${item.Id}`] = response.data
          })
        })
      })
    },
    // 切换获取当前属性
    toggleSelectItem(item) {
      item.checked = !item.checked
      let currentIndex = this.currentSelectItem.findIndex(elem => elem == item.Id)
      if(item.checked){
        if(currentIndex < 0){
          this.currentSelectItem.push(item.Id)
        }
      } else {
        this.currentSelectItem.splice(currentIndex,1)
      }
    },
    resetSelect () {
      this.areaValue = []
      this.currentSelectItem = []
      let keys = Object.keys(this.categories)
      if(keys.length){
        keys.forEach(item => {
          this.categories[item].SubCategories.forEach(elem => {
            elem.checked = false
          })
        })
      }
    },
    confirmSelect () {
      this.$emit('filters', this.currentSelectItem, this.areaValue)
    }
  },
  mounted () {
    this.fetchCompanyFilter()
  }
}