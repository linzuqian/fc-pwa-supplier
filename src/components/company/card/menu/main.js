import homeIcon from './svg/bt_company_card_home.svg'
import addIcon from './svg/bt_company_card_add.svg'
import buyIcon from './svg/bt_company_card_buy.svg'
import supplierIcon from './svg/bt_company_card_supplier.svg'

export default {
  data () {
    return {
      menus: [
        {
          value: '微店',
          icon: homeIcon
        },
        {
          value: '现场供应',
          icon: supplierIcon
        },
        {
          value: '求购信息',
          icon: buyIcon
        },
        {
          value: '添加好友',
          icon: addIcon
        },
      ]
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