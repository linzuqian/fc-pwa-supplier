import Vue from 'vue'
import { Tag } from 'vant'
Vue.use(Tag)
import COMPANIES_ITEMS from '@/graphql/companies/companiesItem.gql'
import _ from 'lodash'
import companyItem from '@/components/supplier/list/item/main.vue'

export default {
  components: {
    companyItem
  },
  data () {
    return {
      limit: 30,
      items: [],
      currentType:'merchant',
      isRefreshing: false,
      loadDown: false,
      page: -1,
      skipQuery: true,
      disablePullRefresh: false
    }
  },
  props: {
    companyType: {
      type: String
    },
    filterParams: {
      type: String
    },
    filterArea: {
      type: [Array, Object]
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    actionArgs: {
      type: Object
    }
  },
  apollo: {
    companies: {
      query: COMPANIES_ITEMS,
      variables() {
        return {
          take: this.limit,
          skip: 0
        }
      },
      skip() {
        return this.skipQuery
      },
      result({ data }) {
        
      }
    }
  },
  computed: {
    isNeedLoad() {
      if (this.currentType == 'merchant' || this.currentType == 'company') {
        return true
      } else {
        return false
      }
    },
    Province() {
      if (_.get(this.filterArea, '[0].name')) {
        return _.get(this.filterArea, '[0].name')
      }
      return ''
    },
    City() {
      if (_.get(this.filterArea, '[1].name')) {
        return _.get(this.filterArea, '[1].name')
      }
      return ''
    }
  },
  watch: {
    companyType(val) {
      this.onRefresh()
    },
    filterParams(val) {
      this.onRefresh()
    }
  },
  mounted () {
    const scroller = _.get(this.$refs, 'scroller.$el')
    scroller.addEventListener('scroll', _.throttle(() => {
      if (scroller.scrollTop !== 0) {
        this.disablePullRefresh = true
      } else {
        this.disablePullRefresh = false
      }
    }, 200))
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.loadDown = false
        this.items = []
        this.page = -1
        if (this.$refs.infiniteLoading) {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        }
      }, 500)
    },
    infiniteHandler($state) {
      if (this.page === -1) {
        this.skipQuery = false
        this.page = 0
        $state.loaded()
      } else {
        this.loadMore($state)
      }
    },
    loadMore($state) {
      if(!this.loadDown){
        this.$apollo.queries.companies.fetchMore({
          variables: {
            skip: (this.page * this.limit) < 0 ? 0 : (this.page * this.limit),
            take: this.limit,
            province: this.Province,
            city: this.City,
            type: this.companyType,
            categoryId: this.filterParams,
            categoryIdsByOr: this.actionArgs.categoryIdsByOr
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            this.items = this.items.concat(fetchMoreResult.companies.items)
            if (fetchMoreResult.companies.items.length === this.limit) {
              this.page += 1
              $state.loaded()
              this.isRefreshing = false
            } else {
              this.loadDown = true
              this.isRefreshing = false
              $state.complete()
            }
          }
        })
      }else{
        $state.complete()
        this.isRefreshing = false
      }
    }
  },
  beforeDestroy() {
    const scroller = _.get(this.$refs, 'scroller.$el')
    if (scroller) {
      scroller.removeEventListener('scroll', () => {})
    }
  }
}