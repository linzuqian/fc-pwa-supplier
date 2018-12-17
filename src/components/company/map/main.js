import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: '736791005a672c54607a05049d4d9284',
  plugin: ['AMap.Autocomplete', 'AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});
export default {
  props: {
    address: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      zoom: 12,
      center: [116.397428, 39.90923],
      placeSearch: new AMap.PlaceSearch({ 
        pageSize: 5,
        pageIndex: 1,
        city: "" 
      }),
      events: {
        init: (o) => {
          this.placeSearch.search(this.address, (status, result) => {
            if (result.info === 'OK') {
              let location = result.poiList.pois[0].location
              this.center = [location.lng, location.lat]
            }
          })
        }
      }
    }
  },
  methods: {
    back() {
      this.$emit('close')
    }
  },
  computed: {
    markers() {
      return [{
        position: this.center,
        visible: true,
        draggable: false,
        content: this.address,
        infoPosition: [this.center[0], this.center[1] + 0.0001]
      }]
    }
  }
}