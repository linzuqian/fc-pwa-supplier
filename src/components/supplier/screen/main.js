export default {
  data () {
    return {
      search: false
    }
  },
  methods: {
    openSearch () {
      this.search = !this.search
    }
  }
}