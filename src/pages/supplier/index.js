import companyList from '@/components/supplier/list/main.vue'
import search from '@/components/supplier/search/main.vue'
import screen from '@/components/supplier/screen/main.vue'
import MENU_ITEMS from '@/graphql/menus/menuItems.gql'
import _ from 'lodash'

export default {
  data () {
    return {
      active: 0,
      showRight: false,
      showLeft: false,
      menuList: [],
      currentType: 'all',
      companyType: 'all',
      filterParams: null,
      filterArea: []
    }
  },
  apollo: {
    menuItems: {
      prefetch: true,
      query: MENU_ITEMS,
      variables() {
        return {
          menuId: this.pageType
        }
      },
      result(res) {
        this.menuList = res.data.menuItems.items
      }
    }
  },
  components: {
    companyList,
    search,
    screen
  },
  methods: {
    getActionArgs(item) {
      return _.get(item, 'actionArgs', {})
    },
    openRight () {
      this.showRight = !this.showRight
    },
    openSearch () {
      this.showLeft = !this.showLeft
    },
    getFilters(val1, val2) {
      if (val1) {
        this.filterParams = []
        if (Object.keys(val1).length) {
          Object.keys(val1).forEach((key) => {
            if (val1[key].length) {
              this.filterParams.push(`${val1[key]}`)
            }
          })
          this.filterParams = this.filterParams.join('&')
        }
      }
      this.filterArea = val2
      this.showRight = false
    },
    changeCompanyType(value) {
      if (!this.currentType || this.currentType !== value) {
        this.currentType = value
        if (this.currentType === 'company') {
          this.companyType = '公司'
        }
        if (this.currentType === 'merchants') {
          this.companyType = '商户'
        }
      } else {
        this.currentType = 'all'
        if (this.currentType === 'all') {
          this.companyType = 'all'
        }
      }
    }
  },
  computed: {
    pageType() {
      const type = _.get(this.$route, 'query.type', 'supplier')
      return `${type}Filter`
    }
  }
}