const _import = require(`./_import_${process.env.NODE_ENV}`)

export default [
  {
    path: '/supplier',
    name: 'supplier.index',
    component: _import('supplier/index')
  }
]