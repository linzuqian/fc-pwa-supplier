export default {
  data () {
    return {
      defaultUrl: require('./images/default-banner.jpg'),
      defaultUser: require('./images/logo_blank.png')
    }
  },
  props:{
    company:{
      type:Object,
      default() {
        return {}
      }
    }
  }
}