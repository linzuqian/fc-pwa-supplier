import Vue from 'vue'
import VueApollo from 'vue-apollo'
import createApolloClient from './apollo'

// Install the vue plugin
Vue.use(VueApollo)

// Config
const options = {
  ssr: false,
  base: process.env.VUE_APP_GRAPHQL_DEFAULT,
  endpoints: {
    graphql: '/gqlgateway/graphql',
    subscription: '/gqlgateway/graphql'
  },
  persisting: false,
  subscriptions: false
}

// Create apollo client
export const apolloClient = createApolloClient(options)

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
