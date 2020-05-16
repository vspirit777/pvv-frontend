

import React from 'react';

import {  OverlayTrigger, Tooltip } from 'react-bootstrap';
import common from '../../../data/common';
import {  config } from '../../../config';
import LanguageIdMap from '../../../language/LanguageIdMap'
import Language from '../../../language/Language'
import Category from '../Category';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Display extends Category {
  constructor(props, context) {
    super(props, context);   
  }
 
  static getInitialPromiseListForProps(context) {
    return Category.getInitialPromiseListForProps(context)
  }
  static async getProductFilter(state = common.initPropsData) {
    await Category.getProductFilter(state, {
      typeOfTripAlias: state.alias
    },"destinationAlias")
  }
  checkAndLoadData() {
    if (super.checkAndLoadData() == false) {
      return false;
    }

    this.forceUpdate();
    return true;
  }
  renderBelowOfFilter() {
    if(this.state.category && this.state.category.content) {
      return <div style={{ marginTop: 48 }}>
      <div style={{ fontSize: 32, marginBottom: 32, }}>
        {this.state.category.briefName }
      </div>
      <div>
        {ReactHtmlParser(this.state.category.content)}
      </div>
    </div>
    }
  }
}

export default Display;
