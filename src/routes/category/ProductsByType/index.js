
import React from 'react';
import $ from "jquery";
import { OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap';
import common from '../../../data/common';
import { config } from '../../../config';
import LanguageIdMap from '../../../language/LanguageIdMap'
import Language from '../../../language/Language'
import Category from '../Category';
import ReactHtmlParser from 'react-html-parser';
import ReactLoading from 'react-loading';
import HoverOpenDropdownMenu from '../../../components/HoverOpenDropdownMenu';
import MenuItem from 'material-ui/MenuItem';
import Router from 'next/router'
import Pagination from '../../../components/Pagination';
import Head from 'next/head';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';

// Menu item configuration mapping typeOfTripAlias to names
var TYPE_OF_TRIP_CONFIG = {
  "hoat-dong-tour-trong-ngay": { name: "Tour và trải nghiệm", id: 16 },
  "ve-tham-quan-show": { name: "Vé tham quan", id: 11 },
  "phuong-tien-di-lai-wifi": { name: "Di chuyển", id: 24 },
  "tour-tron-goi": { name: "Combo & Packages", id: 185 },
};

// Helper function to safely get config property
function getTypeConfig(alias, prop) {
  if (alias && TYPE_OF_TRIP_CONFIG[alias]) {
    return TYPE_OF_TRIP_CONFIG[alias][prop];
  }
  return null;
}

class ProductsByType extends Category {
  constructor(props, context) {
    super(props, context);
  }

  static getTypeOfTripAliasFromQuery() {
    // Get typeOfTripAlias from URL query parameter
    var alias = common.location.search.typeOfTripAlias;
    return alias || null;
  }

  // Build URL with typeOfTripAlias parameter
  getBaseUrl() {
    var alias = this.props.initPropsData.typeOfTripAlias || ProductsByType.getTypeOfTripAliasFromQuery();
    return config.shortUrl.productsByType + "?typeOfTripAlias=" + alias;
  }

  // Override URL building to use typeOfTripAlias
  static getStringSearchToUrlForType() {
    var strArr = [];
    for (var key in common.location.search) {
      // Skip typeOfTripAlias as it's already in the base URL
      if (key === 'typeOfTripAlias') continue;
      var data = common.location.search[key];
      if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          strArr.push(key + "=" + data[i]);
        }
      } else {
        strArr.push(key + "=" + data);
      }
    }
    return strArr.join("&");
  }

  // Get default filters (used when productFilterArr is not available)
  static getDefaultFilters() {
    var sortSubcategory = [];
    for (var key in LanguageIdMap.SORT_PRODUCT_FILTER) {
      sortSubcategory.push({
        name: Language.getLanguage(LanguageIdMap.SORT_PRODUCT_FILTER[key].id),
        _apiValue: LanguageIdMap.SORT_PRODUCT_FILTER[key].value,
      });
    }
    var sortFilter = {
      _apiKey: Category.sortApiKey,
      subCategories: sortSubcategory,
    };

    return [
      sortFilter,
      {
        type: LanguageIdMap.CATEGORY_FILTER.PRICE.value,
        name: Language.getLanguage(LanguageIdMap.CHOOSE_PRICE),
        _apiKey: "price",
        subCategories: [
          { name: Language.getLanguage(common.moneyType) + " 0 - 100,000", _apiValue: { maxPrice: 100000 } },
          { name: Language.getLanguage(common.moneyType) + " 100,000 - 500,000", _apiValue: { minPrice: 100000, maxPrice: 500000 } },
          { name: Language.getLanguage(common.moneyType) + " 500,000 - 1,000,000", _apiValue: { minPrice: 500000, maxPrice: 1000000 } },
          { name: Language.getLanguage(common.moneyType) + " 1,000,000 - 2,000,000", _apiValue: { minPrice: 1000000, maxPrice: 2000000 } },
          { name: Language.getLanguage(common.moneyType) + " 2,000,000 - 5,000,000", _apiValue: { minPrice: 2000000, maxPrice: 5000000 } },
          { name: Language.getLanguage(common.moneyType) + " 5,000,000+", _apiValue: { minPrice: 5000000 } },
        ]
      },
    ];
  }

  static getInitialPromiseListForProps(context) {
    // Get typeOfTripAlias from query params
    var typeOfTripAlias = ProductsByType.getTypeOfTripAliasFromQuery();
    common.initPropsData.typeOfTripAlias = typeOfTripAlias;
    common.initPropsData.alias = typeOfTripAlias || 'products';

    // Set page title based on typeOfTripAlias
    if (typeOfTripAlias && TYPE_OF_TRIP_CONFIG[typeOfTripAlias]) {
      common.initPropsData.category = {
        briefName: TYPE_OF_TRIP_CONFIG[typeOfTripAlias].name,
        name: TYPE_OF_TRIP_CONFIG[typeOfTripAlias].name,
      };
    }

    // Initialize sort if not set
    if (!common.location.search[Category.sortApiKey]) {
      common.location.search[Category.sortApiKey] = "0";
    }
    if (!common.location.search.page) {
      common.location.search.page = "0";
    }

    common.initPropsData.seoCanonical = common.location.pathArr.slice(0, 2).join("/");

    var promiseArr = [];

    // Initialize filters - always set to ensure they're available
    if (!common.productFilterArr || common.productFilterArr.length === 0) {
      common.productFilterArr = ProductsByType.getDefaultFilters();
    }

    return promiseArr;
  }

  static async getProductFilter(state) {
    if (!state) state = common.initPropsData;
    var specialKeyToAddFromData = Category.getDataForCategoryFilter(state);
    
    var typeOfTripAlias = state.typeOfTripAlias || ProductsByType.getTypeOfTripAliasFromQuery();
    
    await common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.getProductFilter,
      "get",
      {
        specialKeyToAddFromData: specialKeyToAddFromData,
        typeOfTripAlias: typeOfTripAlias, // Use typeOfTripAlias instead of typeOfTrip ID
        offset: common.location.search.page ? parseInt(common.location.search.page) * config.numRowPerPage : 0,
        size: config.numRowPerPage,
      },
      undefined,
      {}
    )
      .then(function(jsonRes) {
        state.productList = jsonRes.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  checkAndLoadData() {
    if (super.checkAndLoadData() == false) {
      return false;
    }
    this.forceUpdate();
    return true;
  }

  renderBelowOfFilter() {
    return null;
  }

  renderUpperOfFilter() {
    return null;
  }

  // Override renderFilter to only show Price filter (no Service filter)
  renderFilter() {
    var self = this;
    var filter = this.props.initPropsData.filter;
    
    // If filter is not available, use default filters
    if (!filter || filter.length === 0) {
      filter = ProductsByType.getDefaultFilters();
    }
    
    var filterDataArr = [];
    
    for (var rowIndex = 0; rowIndex < filter.length; rowIndex++) {
      var rowData = filter[rowIndex];
      
      // Skip sort filter (handled separately), TYPE_OF_TRIP, ALL_DESTINATION, and SERVICE filters
      if (rowData._apiKey === Category.sortApiKey) continue;
      if (LanguageIdMap.getIdByValue({ object: LanguageIdMap.CATEGORY_FILTER, value: rowData.type })
        === LanguageIdMap.CATEGORY_FILTER.TYPE_OF_TRIP.id) continue;
      if (LanguageIdMap.getIdByValue({ object: LanguageIdMap.CATEGORY_FILTER, value: rowData.type })
        === LanguageIdMap.CATEGORY_FILTER.ALL_DESTINATION.id) continue;
      // Skip Service filter
      if (LanguageIdMap.getIdByValue({ object: LanguageIdMap.CATEGORY_FILTER, value: rowData.type })
        === LanguageIdMap.CATEGORY_FILTER.SERVICE.id) continue;
      if (rowData._apiKey === "service") continue;

      var addTitle = rowData.name;
      var addBodyData = [];

      // Price filter - render all items, highlight selected
      if (rowData.subCategories) {
        addBodyData = rowData.subCategories.map(function(subCat, subIndex) {
          // Check if this item is selected (handle both string and number comparison)
          var searchValue = common.location.search[rowData._apiKey];
          var isActive = searchValue !== undefined && searchValue !== null && 
                         (searchValue == subIndex || String(searchValue) === String(subIndex));
          
          return (
            <div 
              key={subIndex}
              className={"filterItem pointer " + (isActive ? "filterItemActive" : "")}
              style={{
                padding: "8px 12px",
                marginBottom: 4,
                borderRadius: 4,
                border: isActive ? "2px solid " + config.colorConfig.main : "1px solid #ddd",
                backgroundColor: isActive ? "#e8f5e9" : "#fff",
                color: isActive ? config.colorConfig.main : "inherit",
                fontWeight: isActive ? "bold" : "normal",
              }}
              onClick={function(e) {
                // Create closure for subIndex
                var clickedIndex = subIndex;
                var apiKey = rowData._apiKey;
                
                if (isActive) {
                  // Deselect - remove from search
                  delete common.location.search[apiKey];
                } else {
                  // Select - add to search
                  common.location.search[apiKey] = clickedIndex;
                }
                common.location.search.page = 0;
                
                $('html, body').animate({
                  scrollTop: $('#categoryH1').offset().top - self.getTopHeightNav()
                }, 300);
                self.props.initPropsData.productList = undefined;
                self.forceUpdate(function() {
                  var baseUrl = self.getBaseUrl();
                  var searchParams = ProductsByType.getStringSearchToUrlForType();
                  Router.push(baseUrl + (searchParams ? "&" + searchParams : ""));
                });
              }}
            >
              {isActive && <i className="fa fa-check" style={{ marginRight: 8 }} />}
              {subCat.name}
            </div>
          );
        });
      }

      filterDataArr.push(
        <div key={rowIndex} className="filterSection" style={{ marginBottom: 24 }}>
          <div className="filterTitle fontWeightBold mgBottom12" style={{ fontSize: 16 }}>
            {addTitle}
          </div>
          <div className="filterBody">
            {addBodyData}
          </div>
        </div>
      );
    }

    // Mobile drawer
    if (common.checkMobile()) {
      return (
        <Drawer
          open={this.props.initPropsData.filterSideOpen}
          onRequestChange={function(open) {
            self.props.initPropsData.filterSideOpen = open;
            self.forceUpdate();
          }}
          docked={false}
          width={280}
        >
          <div style={{ padding: 16 }}>
            <div className="fontsize20 fontWeightBold mgBottom24">
              {Language.getLanguage(LanguageIdMap.filter)}
            </div>
            {filterDataArr}
          </div>
        </Drawer>
      );
    }

    return (
      <div className="filterContainer" style={{ paddingRight: 24 }}>
        {filterDataArr}
      </div>
    );
  }

  renderData() {
    var self = this;
    var typeOfTripAlias = this.props.initPropsData.typeOfTripAlias || ProductsByType.getTypeOfTripAliasFromQuery();
    var categoryName = getTypeConfig(typeOfTripAlias, 'name') || "Sản phẩm";
    
    return <div>
      <Head>
        <style type="text/css">{"\n          .renderDataCate{\n            margin-bottom: 80px;\n            padding-top: 36px;\n            max-width: 100%; \n          }\n          .filterBtnContainer{\n            position: fixed;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            z-index: 999;\n            background: #fff;\n            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);\n            padding: 12px 16px;\n          }\n          .filterBtn{\n            background: " + config.colorConfig.main + ";\n            color: #fff;\n            text-align: center;\n            padding: 12px 24px;\n            border-radius: 4px;\n            font-weight: bold;\n            cursor: pointer;\n          }\n          .allProductContainer{\n            list-style: none;\n            padding: 0;\n            margin: 0;\n            display: flex;\n            flex-wrap: wrap;\n          }\n          .productContainer{\n            padding: 12px;\n            width: 33.333%;\n            box-sizing: border-box;\n          }\n          @media only screen and (max-width: 768px) {\n            .productContainer{\n              width: 50%;\n            }\n          }\n          @media only screen and (max-width: 480px) {\n            .productContainer{\n              width: 100%;\n            }\n          }\n          .cateAttractiveInCategoryTitle{\n            font-size: 24px;\n            font-weight: bold;\n            margin-bottom: 24px;\n          }\n          .sortFilterAngleDown{\n            margin-left: 8px;\n            font-size: 12px;\n          }\n          .filterItem:hover{\n            background-color: #f5f5f5;\n          }\n        "}</style>
      </Head>
      <div className="renderDataCate pageSmallWidth">
        {/* Page title */}
        <h1 id="categoryH1" className="cateAttractiveInCategoryTitle">
          {categoryName}
        </h1>

        {/* Sort dropdown */}
        {this.props.initPropsData.productList && this.props.initPropsData.productList.products
          && this.props.initPropsData.productList.products.length > 0
          && !common.checkServer()
          && <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <HoverOpenDropdownMenu
              ref={function(r) { self.sortProductFilterRef = r }}
              iconButtonElement={<div
                className="headerDropdownItem hoverDefaultColor mgRight0"
                style={{ cursor: 'pointer', padding: '8px 16px', border: '1px solid #ddd', borderRadius: 4 }}
              >
                {Language.getLanguage(LanguageIdMap.SORT_PRODUCT_FILTER
                  [Object.keys(LanguageIdMap.SORT_PRODUCT_FILTER)[parseInt(common.location.search[Category.sortApiKey])]].id)}
                <i className="fa fa-chevron-down hoverDefaultColor sortFilterAngleDown" />
              </div>}
              data={Object.keys(LanguageIdMap.SORT_PRODUCT_FILTER).map(function(key, index) {
                return <MenuItem className="hoverDefaultColor"
                  key={index}
                  onClick={function(e) {
                    common.location.search[Category.sortApiKey] = index;
                    common.location.search.page = 0;
                    $('html, body').animate({
                      scrollTop: $('#categoryH1').offset().top - self.getTopHeightNav()
                    }, 300);
                    self.props.initPropsData.productList = undefined;
                    self.forceUpdate(function() {
                      var baseUrl = self.getBaseUrl();
                      var searchParams = ProductsByType.getStringSearchToUrlForType();
                      Router.push(baseUrl + (searchParams ? "&" + searchParams : ""));
                    });
                  }}
                >
                  {Language.getLanguage(LanguageIdMap.SORT_PRODUCT_FILTER[key].id)}
                </MenuItem>
              })}
            />
          </div>
        }

        <div className='row mgLeft0 mgRight0 posRelative'>
          {/* Filter sidebar */}
          <div className={"zIndex10 " + (!common.checkMobile() ? "col-sm-3" : "")}>
            {this.renderFilter()}
          </div>

          {/* Product list */}
          <div className={"fontsize16 mgBottom12 " + (!common.checkMobile() ? 'col-sm-9' : '')}>
            {this.props.initPropsData.productList === undefined && <div className="textAlignCenter">
              <ReactLoading type="bubbles" className="loadingProduct" />
            </div>}
            {this.props.initPropsData.productList !== undefined && this.props.initPropsData.productList.products
              && this.props.initPropsData.productList.products.length === 0
              && <div className="textAlignCenter">{Language.getLanguage(LanguageIdMap.NO_TOUR_AVAILABLE)}</div>}
            <ul className="allProductContainer">
              {this.props.initPropsData.productList !== undefined && this.props.initPropsData.productList.products
                && this.props.initPropsData.productList.products.map(function(rowData, rowIndex) {
                  return <li key={rowIndex} className='productContainer'>
                    {self.renderProductCard(rowData)}
                  </li>
                })}
            </ul>
            
            {/* Pagination */}
            {this.props.initPropsData.productList !== undefined
              && this.props.initPropsData.productList.total > config.numRowPerPage
              && <div className='textAlignCenter'>
                <Pagination
                  activePage={parseInt(common.location.search.page)}
                  items={Math.ceil(this.props.initPropsData.productList.total / config.numRowPerPage) - 1}
                  maxButtons={5}
                  onSelect={function(eventKey) {
                    common.location.search.page = eventKey;

                    $('html, body').animate({
                      scrollTop: $('#categoryH1').offset().top - self.getTopHeightNav()
                    }, 300);
                    self.props.initPropsData.productList = undefined;
                    self.forceUpdate(function() {
                      var baseUrl = self.getBaseUrl();
                      var searchParams = ProductsByType.getStringSearchToUrlForType();
                      Router.push(baseUrl + (searchParams ? "&" + searchParams : ""));
                    });
                  }}
                />
              </div>}
          </div>
        </div>
      </div>

      {/* Mobile filter button */}
      {common.checkMobile() && <div className="filterBtnContainer">
        <div
          className="filterBtn"
          onClick={function(e) {
            self.props.initPropsData.filterSideOpen = !self.props.initPropsData.filterSideOpen;
            self.forceUpdate();
          }}
        >
          {Language.getLanguage(LanguageIdMap.filter)}
        </div>
      </div>}
    </div>
  }
}

export { TYPE_OF_TRIP_CONFIG };
export default ProductsByType;
