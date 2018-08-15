import supplierList from '@/components/supplier/list/main.vue'

export default {
  data () {
    return {
      searchcContent: ''
    }
  },
  components :{
    supplierList
  },
  methods: {
    closeSearch () {
      this.$emit('closes')
    },
    onSearch () {

    }
  }
}