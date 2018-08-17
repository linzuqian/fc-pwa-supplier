export default {
  data () {
    return {
      defaultUrl: require('./images/logo_blank.png'),
    }
  },
  props: {
    item: {
      type: Object,
      default: {}
    }
  }
}