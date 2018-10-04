import React from 'react'
import { select, call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { applyOrderHistoryFilter, getOrderHistory } from './sagas'
import historyReducer from './reducers'
import { getOrders } from './selectors'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { getUrl } from '../../common/utils'

it('(History view sagas - applyOrderHistoryFilter) dispatches with filter, selects all orders from history, formats them, and returns order matching filter', () => {
  const orders = [
    {
      id: 24403,
      created: 1534318234218,
      createdBy: 'h151388',
      updated: 1534319387631,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Even Hansen',
      orderType: 'VM',
      results: ['d26jbsl01518.test.local'],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/110abd83-455e-4aef-b141-fc4512bafec2/executions/8a819397652704a001653c7e4cd2303d/',
      uri: 'https://basta.adeo.no/rest/orders/24403',
      status: 'SUCCESS',
      errorMessage: null,
      orderDescription: 'WILDFLY',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24402,
      created: 1534315029884,
      createdBy: 'srvfasit',
      updated: 1534315061586,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Service User',
      orderType: 'VM',
      results: [],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/557dccf4-863a-49b3-b9f5-53a70f5b9fc2/executions/8a819397652704a001653c4d65db2fd3/',
      uri: 'https://basta.adeo.no/rest/orders/24402',
      status: 'ERROR',
      errorMessage: null,
      orderDescription: 'JBOSS',
      orderOperation: 'DELETE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    }
  ]
  const action = { filter: 'JBOSS' }
  return expectSaga(applyOrderHistoryFilter, action)
    .withReducer(historyReducer)
    .provide([[select(getOrders), orders]])
    .hasFinalState({
      orderHistory: [],
      filteredOrderHistory: [
        {
          id: 24402,
          created: 'Aug 15, 2018 8:37 AM',
          createdBy: 'srvfasit',
          updated: 'Aug 15, 2018 8:37 AM',
          updatedBy: 'srvOrchestrator',
          updatedByDisplayName: 'Service User',
          createdByDisplayName: 'Service User',
          orderType: 'VM',
          results: [],
          input: null,
          externalId:
            'https://orcprod.adeo.no:443/vco/api/workflows/557dccf4-863a-49b3-b9f5-53a70f5b9fc2/executions/8a819397652704a001653c4d65db2fd3/',
          uri: 'https://basta.adeo.no/rest/orders/24402',
          status: 'ERROR',
          errorMessage: null,
          orderDescription: 'Jboss',
          orderOperation: 'Delete',
          nextOrderId: null,
          previousOrderId: null,
          resultDetails: [],
          tags: ['srvfasit', 'Service User', 'JBOSS', 'DELETE', 'VM']
        }
      ],
      totalOrders: 0,
      orderHistoryCompleted: false,
      requestFailed: false,
      requestStatus: ''
    })
    .run()
})

it('(History view sagas - getOrderHistory) fetches orders from backend with correct pagination', () => {
  const orders = [
    {
      id: 24403,
      created: 1534318234218,
      createdBy: 'h151388',
      updated: 1534319387631,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Even Hansen',
      orderType: 'VM',
      results: ['d26jbsl01518.test.local'],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/110abd83-455e-4aef-b141-fc4512bafec2/executions/8a819397652704a001653c7e4cd2303d/',
      uri: 'https://basta.adeo.no/rest/orders/24403',
      status: 'SUCCESS',
      errorMessage: null,
      orderDescription: 'WILDFLY',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24402,
      created: 1534315029884,
      createdBy: 'srvfasit',
      updated: 1534315061586,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Service User',
      orderType: 'VM',
      results: [],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/557dccf4-863a-49b3-b9f5-53a70f5b9fc2/executions/8a819397652704a001653c4d65db2fd3/',
      uri: 'https://basta.adeo.no/rest/orders/24402',
      status: 'ERROR',
      errorMessage: null,
      orderDescription: 'JBOSS',
      orderOperation: 'DELETE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    }
  ]
  const noOrders = []
  const action = { pageSize: 2 }
  let pageId = 0
  return expectSaga(getOrderHistory, action)
    .withReducer(historyReducer)
    .provide({
      call(effect, next) {
        if (effect.fn === getUrl) {
          if (pageId < 1) {
            pageId++
            return orders
          } else {
            return noOrders
          }
        }
        return next()
      }
    })
    .put({ type: 'HISTORY_FETCHING' })
    .put({
      type: 'HISTORY_RECEIVED',
      value: orders
    })
    .put({ type: 'HISTORY_COMPLETE' })
    .hasFinalState({
      orderHistory: [
        {
          id: 24403,
          created: 1534318234218,
          createdBy: 'h151388',
          updated: 1534319387631,
          updatedBy: 'srvOrchestrator',
          updatedByDisplayName: 'Service User',
          createdByDisplayName: 'Even Hansen',
          orderType: 'VM',
          results: ['d26jbsl01518.test.local'],
          input: null,
          externalId:
            'https://orcprod.adeo.no:443/vco/api/workflows/110abd83-455e-4aef-b141-fc4512bafec2/executions/8a819397652704a001653c7e4cd2303d/',
          uri: 'https://basta.adeo.no/rest/orders/24403',
          status: 'SUCCESS',
          errorMessage: null,
          orderDescription: 'WILDFLY',
          orderOperation: 'CREATE',
          nextOrderId: null,
          previousOrderId: null,
          resultDetails: []
        },
        {
          id: 24402,
          created: 1534315029884,
          createdBy: 'srvfasit',
          updated: 1534315061586,
          updatedBy: 'srvOrchestrator',
          updatedByDisplayName: 'Service User',
          createdByDisplayName: 'Service User',
          orderType: 'VM',
          results: [],
          input: null,
          externalId:
            'https://orcprod.adeo.no:443/vco/api/workflows/557dccf4-863a-49b3-b9f5-53a70f5b9fc2/executions/8a819397652704a001653c4d65db2fd3/',
          uri: 'https://basta.adeo.no/rest/orders/24402',
          status: 'ERROR',
          errorMessage: null,
          orderDescription: 'JBOSS',
          orderOperation: 'DELETE',
          nextOrderId: null,
          previousOrderId: null,
          resultDetails: []
        }
      ],
      filteredOrderHistory: [],
      totalOrders: 2,
      orderHistoryCompleted: true,
      requestFailed: false,
      requestStatus: 'Order history request complete'
    })
    .run()
})

it('(History view sagas - getOrderHistory) handles errors', () => {
  const action = { pageSize: 2 }
  const err = Error('error')
  return expectSaga(getOrderHistory, action)
    .withReducer(historyReducer)
    .provide([[matchers.call.fn(getUrl), throwError(err)]])
    .put({
      type: 'HISTORY_FETCHING'
    })
    .put({
      type: 'HISTORY_REQUEST_FAILED',
      err: err
    })
    .hasFinalState({
      orderHistory: [],
      filteredOrderHistory: [],
      totalOrders: 0,
      orderHistoryCompleted: false,
      requestFailed: true,
      requestStatus: err
    })
    .run()
})
