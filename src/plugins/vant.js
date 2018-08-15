import 'vant/lib/vant-css/index.css';

import Vue from 'vue'

import { Button } from 'vant'
import { Lazyload } from 'vant'
import { Popup } from 'vant'
import { Icon } from 'vant'
import { NavBar } from 'vant'
import { Tab, Tabs } from 'vant'
import { Dialog } from 'vant'
import { PullRefresh } from 'vant'
import { Cell, CellGroup } from 'vant'
import { Field } from 'vant'
import { Search } from 'vant'
import { Toast } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Row, Col } from 'vant'
import { Panel } from 'vant'
import { DatetimePicker } from 'vant'
import { Area } from 'vant'
import { Collapse, CollapseItem } from 'vant'


Vue.use(Button)
Vue.use(Lazyload)
Vue.use(Popup)
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Tab).use(Tabs)
Vue.use(PullRefresh)
Vue.use(Cell).use(CellGroup)
Vue.use(Field)
Vue.use(Search)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Row).use(Col)
Vue.use(Panel)
Vue.use(DatetimePicker)
Vue.use(Area)
Vue.use(Collapse).use(CollapseItem)