import React from 'react';
// import fetch from 'isomorphic-unfetch'
import common from '../src/data/common';
import Language from '../src/language/Language';
import LanguageIdMap from '../src/language/LanguageIdMap';
import Router from 'next/router';
import { analytics } from '../src/config';

Router.events.on('routeChangeComplete', url => {
  ga('create', analytics.google.trackingId, 'auto');
  ga('send', 'pageview', url);
})

class __SuperPage extends React.Component {
  constructor(props) {
    super(props);

    common.initPropsData = props.initPropsData;
    if (props.common) {
      try {
        Object.keys(props.common || {}).forEach((param) => {
          common[param] = JSON.parse(JSON.stringify(props.common[param]))
        })
      } catch (error) {
      }
      // common.topDestinationSecondRow = {
      //   _copyOfOtherRow: common.topDestination,
      //   data: common.topDestination.data,
      // }
      // common.topDestination._hasCopyRow = [common.topDestinationSecondRow];
      // let topDestinationData = {
      //   briefName: Language.getLanguage(LanguageIdMap.TOP_DESTINATION),
      //   subCategories: common.topDestination.data
      // }
      common.searchInputSuggestDataDefault.data = []//[topDestinationData, ...common.allDestination]
      common.searchInputSuggestData = common.searchInputSuggestDataDefault
    }
  }

  static setupStaticSuperPage(props) {
    // common.initPropsData={}

    let url = decodeURI(props.asPath);
    // console.log("url--->" + url)
    common.setupLocationFromUrl(url)
    try {
      window.history.pushState(undefined, undefined, url);
    } catch (error) {
      
    }
    

    if (props.req) {
      // console.log("delete all common data")
      common.initPropsData = {}
      delete common.topDestination;
      delete common.allDestination;
      delete common.schedulePriceItemTypeMap;
      delete common.typeOfTrip
    }
  }
  static async getInitialProps(props, promiseArr = []) {
    let defaultPromiseArr = []
    // if (props.req) {  //only check when call from server
    //todo: remove all comment here
      defaultPromiseArr = common.updateDefaultClientDataForAllPage();
    // } else {
    //   defaultPromiseArr = []
    // }

    await Promise.all([
      ...defaultPromiseArr,
      ...promiseArr,
    ]);

    if (props.req) {
      return {
        common:
        {
          topDestination: common.topDestination,
          allDestination: common.allDestination,
          schedulePriceItemTypeMap: common.schedulePriceItemTypeMap,
          typeOfTrip: common.typeOfTrip,
          location: common.location,
        },
        initPropsData: common.initPropsData
      }
    } else {
      return {
        initPropsData: common.initPropsData
      }
    }
  }
}

export default __SuperPage
