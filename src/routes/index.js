const _import = require(`./_import_${process.env.NODE_ENV}`)

export default [
  // 公司
  {
    path: '/company',
    name: 'company-index',
    component: _import('company/card/index'),
    children: [{
      path: ':card',
      name: 'company-card',
      component: _import('company/card/index')
    }]
  },
  // 供应商
  {
    path: '/supplier',
    name: 'supplier-index',
    component: _import('supplier/index')
  }
]