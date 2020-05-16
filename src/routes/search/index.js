

import React, { PropTypes, Component } from 'react';

import common from '../../data/common';
import { config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import SuperComponent from '../../components/SuperComponent';
import SeachSuggestionPopup from '../../components/searchSuggestionPopup';

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    super.componentDidMount();
    this.searchInputRef.focus();
  }
  renderData() {
    return <div style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ ...config.pageSmallWidthStyle, paddingTop: 12, paddingBottom: 12, backgroundColor: "#fff" }}>
        <form style={{ position: "relative" }}>
          {/* <FormControl
            inputRef={el => this.searchInputRef = el}
            
            className="focusBorderColorDefault "
            style={{
              marginBottom: 4, marginTop: 8, paddingLeft: 12, borderRadius: 2, height: 48,
              paddingRight: common.getViewportWidth() >= 500 ? 120 : 50
            }}
            type="text"
            autoComplete="off"
            value={this.state.searchInputValue}
            onClick={e => {
              setTimeout(() => {
                this.searchInputRef.focus();
              }, 200);
              window.ga('require', 'ecommerce');
              window.ga('ec:addImpression', {            // Provide product details in an impressionFieldObject.
                'id': 'P12345',                   // Product ID (string).
                'name': 'Android Warhol T-Shirt', // Product name (string).
                'category': 'Apparel/T-Shirts',   // Product category (string).
                'brand': 'Google',                // Product brand (string).
                'variant': 'Black',               // Product variant (string).
                'list': 'Search Results',         // Product list (string).
                'position': 1,                    // Product position (number).
                'dimension1': 'Member'            // Custom dimension (string).
              });
              window.ga('ecommerce:send');
              console.log("add g")
            }}
            onChange={e => {
              if (e.target.value) {
                let v = e.target.value;
                if (this._headerCallSearchProductTimeout) {
                  clearTimeout(this._headerCallSearchProductTimeout)
                }
                this._headerCallSearchProductTimeout = setTimeout(() => {
                  this._headerCallSearchProductTimeout = undefined;
                  this.searchSuggestionPopupRef.getSearchProduct(v, this.searchInputRef)
                }, 500);
                this.setState({
                  searchInputValue: e.target.value,
                }, () => {
                  this.searchInputRef.focus();
                });
              } else {
                common.searchInputSuggestData = common.searchInputSuggestDataDefault;
                this.setState({
                  searchInputValue: undefined,
                }, () => {
                  this.searchInputRef.focus();
                });
              }
            }}
            placeholder={Language.getLanguage(LanguageIdMap.SEARCH_BY_DESTINATION_ACTIVITY_TOUR)}
          /> */}
          <SeachSuggestionPopup
            id="searchInput"
            className="focusBorderColorDefault "
            style={{width:"100%"}}
            textFieldStyle={{
              marginBottom: 4, marginTop: 8, paddingLeft: 12, borderRadius: 2, height: 48,
              paddingRight: common.getViewportWidth() >= 500 ? 120 : 50
            }}
            hintStyle={{ bottom: 2, fontSize: 14 }}
            underlineShow={false}
            hintText={Language.getLanguage(LanguageIdMap.SEARCH_BY_DESTINATION_ACTIVITY_TOUR)}
          />
          <div style={{
            position: "absolute", top: 0, right: 0, width: common.getViewportWidth() >= 500 ? 120 : 50,
            cursor: "pointer", height: 48
            , backgroundColor: config.colorConfig.main, textAlign: "center"
          }}>
            <span className="glyphicon glyphicon-search"
              style={{ marginTop: 15, color: "#fff", fontSize: 15 }} />
          </div>
        </form>



      </div>
    </div>
  }
}

export default Display;
