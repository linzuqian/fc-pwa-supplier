import _ from 'lodash'
import pako from 'pako'
import companyAmap from '@/components/company/map/main.vue'

export default {
  data () {
    return {
      showMap: false,
      companyType: '',
      businessType: '',
      businessProp: '',
      businessCategory: ''
    }
  },
  components: {
    companyAmap
  },
  props:{
    company:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    address() {
      const addressArr = [
        _.get(this.company,'residentCountry','中国') || '中国',
        _.get(this.company,'residentProvince',''),
        _.get(this.company,'residentCity',''),
        _.get(this.company,'residentArea','')
      ]
      return addressArr.join('')
    }
  },
  methods: {
    openMap () {
      this.showMap = true
    },
    closeMap() {
      this.showMap = false
    }, 
    decodedData(data) {
      let stringText = ''
      const compressed = window.atob(data)
      const zipArray = pako.ungzip(compressed)
      zipArray.forEach((item) => {
        stringText += String.fromCharCode(item)
      })
      return JSON.parse(stringText)
    },
    fetchCompanyProfile() {
      const companyType = _.get(this.company.categories,'items',[])
      companyType.forEach((item) =>{
        if (item.typeId == '07154e16-de57-e611-b281-a00b61b73b60') {
          this.companyType = `${this.companyType.length ? this.companyType + ',' : this.companyType}${item.name}`
        } else if (item.typeId == 'b0d53699-dde9-e611-80e3-850a1737545e') {
          this.businessType = `${this.businessType ? this.businessType + ',' : this.businessType}${item.name}`
        } else if (item.typeId == '6e3cecaf-4d35-e711-80e4-da42ba972ebd') {
          this.businessProp = `${this.businessProp ? this.businessProp + ',' : this.businessProp}${item.name}`
        } else if (item.typeId == '4d2d281e-de57-e611-b281-a00b61b73b60') {
          this.businessCategory = `${this.businessCategory ? this.businessCategory + ',' : this.businessCategory}${item.name}`
        }
      })
    }
  },
  mounted() {
    if(_.has(this.company,'categories')){
      this.fetchCompanyProfile() 
    }
  },
  watch:{
    company() {
      if(_.has(this.company,'categories')){
        this.fetchCompanyProfile() 
      }
    }
  }
}