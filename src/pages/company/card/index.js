import cardBanner from '@/components/company/card/banner/main.vue'
import cardMenu from '@/components/company/card/menu/main.vue'
import cardDetail from '@/components/company/card/detail/main.vue'
import COMPANY_BY_ID from '@/graphql/companies/companiesById.gql'
import _ from 'lodash'

export default {
  name: 'company-card',
  data () {
    return {
      company:{}
    }
  },
  components: {
    cardBanner,
    cardMenu,
    cardDetail
  },
  computed: {
    companyId() {
      return this.$route.params.card
    }
  },
  apollo: {
    companyById: {
      prefetch: true,
      query: COMPANY_BY_ID,
      variables() {
        return {
          id: this.companyId
        }
      },
      result(result) {
        this.company = _.get(result,'data.companyById',{})
      }
    }
  }
}