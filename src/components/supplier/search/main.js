import companyItem from '@/components/supplier/list/item/main.vue'
import COMPANIES_ITEMS from '@/graphql/companies/companiesItem.gql'

export default {
  data () {
    return {
      items: [],
      limit: 10,
      keyword: '',
      searchcContent: '',
      skipQuery: false,
      openInfinite: false
    }
  },
  components: {
    companyItem
  },
  props: {
    Type: String
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
  methods: {
    closeSearch () {
      this.$emit('closes')
    },
    onSearch () {
      if (this.openInfinite) {
        this.resetList()
      }
      this.openInfinite = true
    },
    resetList() {
      this.page = 0
      this.list = []
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      }
    },
    onInfinite($state) {
      //onInfinite这个函数当圈圈出现的时候就会自动执行
      //this.page==0 是为了this.skipQuery = false 初始化一下我们的阿波罗
      if (this.page === -1) {
        this.skipQuery = false
        this.page = 0
        $state.loaded()
      } else {
        this.loadMore($state)
      }
    },
    loadMore($state) {
      this.$apollo.queries.companies.fetchMore({
        variables: {
          skip: (this.page * this.limit) < 0 ? 0 : (this.page * this.limit),
          take: this.limit,
          keyword: this.keyword,
          type: this.Type
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.items = this.items.concat(fetchMoreResult.companies.items)
          if (fetchMoreResult.companies.items.length === this.limit) {
            this.page += 1
            $state.loaded()
          } else {
            $state.complete()
          }
        }
      })
    }
  }
}