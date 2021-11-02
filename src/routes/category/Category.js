

import React, { PropTypes, Component } from 'react';


import { Collapse, } from 'react-bootstrap';
import $ from "jquery";
import common from '../../data/common';
import { config } from '../../config';
import ReactLoading from 'react-loading';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

import Drawer from 'material-ui/Drawer';
import SuperComponent from '../../components/SuperComponent';
import HoverOpenDropdownMenu from '../../components/HoverOpenDropdownMenu';
import Router from 'next/router'
import Pagination from '../../components/Pagination';
import Head from 'next/head';


class Category extends SuperComponent {
  static sortApiKey = "sort";
  constructor(props, context) {
    super(props, context);
    this.urlIndexLength = 3;
  }

  static getInitialPromiseListForProps(context) {
    common.initPropsData.alias = common.location.pathArr[2];

    if (!common.location.search[Category.sortApiKey]) {
      common.location.search[Category.sortApiKey] = "0";
    }
    // LanguageIdMap.SORT_PRODUCT_FILTER[]
    if (!common.location.search.page) {
      common.location.search.page = "0"
    }

    try {
      document
      //no need to get again data
      common.currentAlias
      if (common.currentMainComponent instanceof Category
        && common.currentAlias == common.initPropsData.alias) {
        return [];
      }
      common.currentAlias = common.initPropsData.alias;
    } catch (error) {

    }

    let promiseArr = []

    promiseArr.push(Category.getAttractionByDestination())
    promiseArr.push(Category.getCategoryDetail())
    promiseArr.push(Category.getSubDestination())

    let sortSubcategory = [];
    for (let key in LanguageIdMap.SORT_PRODUCT_FILTER) {
      sortSubcategory.push({
        name: Language.getLanguage(LanguageIdMap.SORT_PRODUCT_FILTER[key].id),
        _apiValue: LanguageIdMap.SORT_PRODUCT_FILTER[key].value,
      })
    }
    let sortFilter = {
      _apiKey: Category.sortApiKey,
      subCategories: sortSubcategory,
    }


    common.initPropsData.seoCanonical = common.location.pathArr.slice(0, 3).join("/")


    if (!common.productFilterArr) {
      common.productFilterArr = [
        sortFilter,
        {
          type: LanguageIdMap.CATEGORY_FILTER.DURATION.value,
          name: Language.getLanguage(LanguageIdMap.CATEGORY_FILTER.DURATION.id),
          _apiKey: "duration",
        },
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
        {
          type: LanguageIdMap.CATEGORY_FILTER.SERVICE.value,
          name: Language.getLanguage(LanguageIdMap.CATEGORY_FILTER.SERVICE.id),
          _apiKey: "service",
        },
      ];


      promiseArr.push(
        common.fetcher(
          config.api.hostType.product_url,
          config.api.hostEndPoint.getDurationList,
          "get",
        )
          .then((jsonRes) => {
            for (let i = 0; i < common.productFilterArr.length; i++) {
              if (common.productFilterArr[i].type === LanguageIdMap.CATEGORY_FILTER.DURATION.value) {
                common.productFilterArr[i].subCategories = jsonRes.data;
                break;
              }
            }
          })
          .catch((err) => {
            console.log("error cate1:" + err)
          })
      )
      promiseArr.push(
        common.fetcher(
          config.api.hostType.product_url,
          config.api.hostEndPoint.getServiceList,
          "get",
        )
          .then((jsonRes) => {
            for (let i = 0; i < common.productFilterArr.length; i++) {
              if (common.productFilterArr[i].type === LanguageIdMap.CATEGORY_FILTER.SERVICE.value) {
                common.productFilterArr[i].subCategories = jsonRes.data;
                break;
              }
            }
          })
          .catch((err) => {
            console.log("error cate2:" + err)
          })
      )
    }

    return promiseArr;
  }

  static getSubDestination(state = common.initPropsData) {
    return common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.getSubDestination,
      "get",
      { alias: state.alias }
    )
      .then((jsonRes) => {
        // console.log("subDestination done")
        state.subDestination = {
          data: jsonRes.data ? jsonRes.data : [],
          _configMaxCardDisplayOfRow: 5,
          _leftRightHeightButton: "39%",
        }
      })
      .catch((err) => {
      })
  }

  static getCategoryDetail(state = common.initPropsData) {
    state.category = [];
    return common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.getCategoryDetail,
      "get",
      { alias: state.alias }
    ).then((jsonRes) => {
      state.seoTitle = jsonRes.data.seoTitle;
      state.seoDescription = jsonRes.data.meta;
      state.seoImage = jsonRes.data.bannerUrl;

      if (jsonRes.data.content) {
        // console.log("getCategoryDetail done")
        jsonRes.data.content = jsonRes.data.content.replace(/style=""/g, "")
        // jsonRes.data.content = ""
      }
      state.category = jsonRes.data
    })
      .catch((err) => {
      })
  }

  static getAttractionByDestination(state = common.initPropsData) {
    return common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.getAttractionByDestination,
      "get",
      {
        alias: state.alias,
        offset: 0,
        size: config.numRowPerPage,
      }
    )
      .then((jsonRes) => {
        // console.log("getAttractionByDestination done")
        state.attractionByDestination = {
          data: jsonRes.data ? jsonRes.data : [],
          _configMaxCardDisplayOfRow: 5,
          _leftRightHeightButton: "39%",
        }
      })
      .catch((err) => {
      })
  }

  static addKeyToDataApi(key, value, specialKeyToAddFromData) {

    for (let i = 0; i < specialKeyToAddFromData.length; i++) {
      if (specialKeyToAddFromData[i].key == key) {
        specialKeyToAddFromData[i].value.push(value)
        return;
      }
    }
    specialKeyToAddFromData.push({
      key: key,
      value: [value]
    })
  }
  static updateDataApiFrom(filter, data, specialKeyToAddFromData) {
    try {
      let convertObj = filter.subCategories[parseInt(data)]
      if (convertObj._apiValue !== undefined) {
        for (let key in convertObj._apiValue) {
          Category.addKeyToDataApi(key, convertObj._apiValue[key], specialKeyToAddFromData)
        }
      } else if (convertObj.id !== undefined) {
        Category.addKeyToDataApi(filter._apiKey, convertObj.id, specialKeyToAddFromData)
      }
      // if(convertObj)
    } catch (error) {

    }
  }

  static getDataForCategoryFilter(state = common.initPropsData) {
    let specialKeyToAddFromData = [];
    for (let i = 0; i < state.filter.length; i++) {
      // console.log("sssssssssssssssssss")
      // console.log(JSON.stringify(state.filter[i]))
      if (state.filter[i]._apiKey) {
        let data = common.location.search[state.filter[i]._apiKey];
        if (data) {
          if (!Array.isArray(data)) {
            Category.updateDataApiFrom(state.filter[i], data, specialKeyToAddFromData)
          } else {
            for (let j = 0; j < data.length; j++) {
              Category.updateDataApiFrom(state.filter[i], data[j], specialKeyToAddFromData)
            }
          }
        }
      }
    }
    return specialKeyToAddFromData;
  }


  static async getProductFilter(state = common.initPropsData, moreData = {}, fieldNameOfAddOtherCategory = "") {
    let specialKeyToAddFromData = Category.getDataForCategoryFilter(state)
    if (common.location.pathArr.length > 3) {
      moreData[fieldNameOfAddOtherCategory] = common.location.pathArr[common.location.pathArr.length - 1]
    }
    await common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.getProductFilter,
      "get",
      {
        specialKeyToAddFromData: specialKeyToAddFromData,
        ...moreData,
        offset: common.location.search.page ? parseInt(common.location.search.page) * config.numRowPerPage : 0,
        size: config.numRowPerPage,
      },
      undefined,
      {}
    )
      .then((jsonRes) => {
        // console.log(jsonRes.data)
        state.productList = jsonRes.data;

      })
      .catch((err) => {
        console.log(err)
      })
  }

  getParamFilterList(subCategories = undefined, value = undefined) {
    if (!subCategories) {
      return [];
    }
    // console.log(subCategories)
    let ret = [];
    for (let i = 0; i < subCategories.length; i++) {

      let addSub = [];
      if (subCategories[i].subCategories) {
        addSub = this.getParamFilterList(subCategories[i].subCategories, value)
      }
      if (addSub && addSub.length > 0) {
        ret.push(...addSub);
      } else {
        if (subCategories[i].active) {
          if (value) {
            ret.push(subCategories[i][value])
          } else {
            ret.push(subCategories[i].id)
          }
        }
      }
    }
    return ret;
  }

  checkAndLoadData() {
    if (super.checkAndLoadData() == false) {
      return false;
    }



    return true;
  }
  deleteAllActiveFilter(filter) {
    if (!filter) {
      return;
    }
    delete filter.active;
    if (filter.subCategories) {
      for (let i = 0; i < filter.subCategories.length; i++) {
        this.deleteAllActiveFilter(filter.subCategories[i])
      }
    }
  }
  renderCategoryFilterNestedDropDown(subCategories, rootNestedDropDown, parentUrl, normalFilterStyle, activeFilterStyle,
    hoverOpenNestedDropdown = true, deep = 0) {
    if (!subCategories) {
      return <div />;
    }
    let returnData = [];
    for (let i = 0; i < subCategories.length; i++) {
      let targetUrl = parentUrl + "/" + subCategories[i].alias;
      // if (subCategories[i].subCategories !== undefined) {
      returnData.push(
        <li className={`nestedDropdownData ${deep > 0 ? "mgLeft5" : ""}`}>
          <a
            className={"hoverDefaultColor filterElementHaveChild "
              + (common.location.pathArr.indexOf(subCategories[i].alias) >= 0 ? activeFilterStyle : normalFilterStyle)
            }
            href={targetUrl}
            onClick={e => {
              e.preventDefault();
              // console.log(targetUrl)

              common.location.search.page = 0;

              $('html, body').animate({
                scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
              }, 300)
              this.props.initPropsData.productList = undefined;
              this.forceUpdate(() => {
                Router.push(common.location.pathArr.slice(0, 2).join("/")
                  + `?alias=` + this.props.initPropsData.alias
                  + "&otherCategoryAlias=" + subCategories[i].alias
                  + "&" + Category.getStringSearchToUrl()
                  , targetUrl + "?" + Category.getStringSearchToUrl())
              });
            }}
          >
            {hoverOpenNestedDropdown && subCategories[i].subCategories !== undefined
              && <i className="fa fa-angle-right filerElementAngleRight" />}
            {subCategories[i].name}
          </a>
          {subCategories[i].subCategories !== undefined && hoverOpenNestedDropdown
            && <ul
              className="nestedDropdown filterElementNoChild"
            >
              {this.renderCategoryFilterNestedDropDown(subCategories[i].subCategories, rootNestedDropDown
                , targetUrl, { ...normalFilterStyle, border: undefined, }, activeFilterStyle, undefined, deep + 1)}
            </ul>}
        </li>
      )
    }
    return returnData;
  }

  static getStringSearchToUrl() {
    let strArr = [];
    for (let key in common.location.search) {
      let data = common.location.search[key]
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          strArr.push(key + "=" + data[i])
        }
      } else {
        strArr.push(key + "=" + data)
      }
    }
    return strArr.join("&")
  }

  renderFilter() {
    if (!this.props.initPropsData.filter) {
      return <div />;
    }
    let filterDataArr = [];
    let headCss = "";
    for (let rowIndex = 0; rowIndex < this.props.initPropsData.filter.length; rowIndex++) {
      const rowData = this.props.initPropsData.filter[rowIndex];

      let addTitle = rowData.name
      let addBodyData = [];
      let addHr = rowIndex < this.props.initPropsData.filter.length - 1
        && this.props.initPropsData.filter[rowIndex]._apiKey !== Category.sortApiKey
        ? <hr style={{ marginTop: 24, marginBottom: 24 }} />
        : undefined;
      if (LanguageIdMap.getIdByValue({ object: LanguageIdMap.CATEGORY_FILTER, value: rowData.type })
        === LanguageIdMap.CATEGORY_FILTER.TYPE_OF_TRIP.id
        || LanguageIdMap.getIdByValue({ object: LanguageIdMap.CATEGORY_FILTER, value: rowData.type })
        === LanguageIdMap.CATEGORY_FILTER.ALL_DESTINATION.id) {
        let normalFilterStyle = ` border: 1px solid #aaa;
                          margin: 5px 0px;
                          border-radius: 5px;
                          height: 40px;
                          padding: 10px 18px;`;
        let activeFilterStyle = `
                          margin: 5px 0px;
                          border: 1px solid ${config.colorConfig.main};
                          color: ${config.colorConfig.main};
                          border-radius: 10px;
                          height: 40px;
                          padding: 10px 18px;`
        headCss += `.normalFilterStyle{
         ${normalFilterStyle}
        }
        .activeFilterStyle{
          ${activeFilterStyle}
        }
        .filterElementHaveChild{
          color: inherit;
          padding-right: 24px;
          padding-left: 18px;
          position: relative;
        }
        .filterElementNoChild{
          background: #eee;
          left: 100%;
          top: 0;
          margin-top: -5px;
        }
        .filerElementAngleRight{
          position: absolute;
          right: 5px;
          top: 6px;
          font-size: 24px;
        }
        .filterElementAngleLeft{
          position: absolute;
          left: 8px;
          top: 8px;
          font-size: 24px;
        }
        `
        let browseAllTargetUrl = "/" + common.location.pathArr[1] + "/" + this.props.initPropsData.alias;
        // if (!common.checkMobile()) {
        if (true) {
          // console.log(common.location.pathArr)
          // console.log(common.location.pathArr.length)
          headCss += `.browseAllStyle{
              ${common.location.pathArr.length > 3 ? normalFilterStyle : activeFilterStyle}
            }
            .nestedDropdownAll{
              display: unset;
              left: 100%;
              top: 0;
              color: #000;
            }
            `
          addBodyData = [<ul
            className="nestedDropdown nestedDropdownAll"
            autoWidth={false}
          >
            <li className="nestedDropdownData">
              <a href={browseAllTargetUrl}
                className="hoverDefaultColor colorInherit browseAllStyle"
                onClick={e => {
                  e.preventDefault();
                  common.location.search.page = 0;

                  $('html, body').animate({
                    scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
                  }, 300)
                  this.props.initPropsData.productList = undefined;
                  this.forceUpdate(() => {
                    Router.push(common.location.pathArr.slice(0, 2).join("/")
                      + `?alias=` + this.props.initPropsData.alias + "&" + Category.getStringSearchToUrl()
                      , common.location.pathArr.slice(0, 3).join("/") + "?" + Category.getStringSearchToUrl())
                  });
                }}
              >
                {Language.getLanguage(LanguageIdMap.TYPE_OF_TRIP_BROWSE_ALL)}
              </a>
            </li>
            {this.renderCategoryFilterNestedDropDown(rowData.subCategories, rowData
              , "/" + common.location.pathArr[1] + "/" + this.props.initPropsData.alias, "normalFilterStyle", "activeFilterStyle"
              , true)}
          </ul>]
        } else {
          if (rowData.filterFocusNameHasSubfilter !== undefined) {
            addTitle = rowData.name + ": " + rowData.filterFocusNameHasSubfilter
          }
          let urlArr = new URL(decodeURI(window.location)).pathname.split("/");
          if (urlArr[urlArr.length - 1] === "") {
            urlArr.pop();
          }

          let currentRowdata = rowData;
          if (rowData.filterFocusData) {
            currentRowdata = rowData.filterFocusData
          }

          let currentUrl = "";
          browseAllTargetUrl = new URL(decodeURI(window.location)).pathname.split("/");
          if (browseAllTargetUrl[browseAllTargetUrl.length - 1] === "") {
            browseAllTargetUrl.pop();
          }

          if (rowData.filterFocusData === rowData) {
            if (urlArr.length > this.urlIndexLength) {
              browseAllTargetUrl.pop();
            }

            currentUrl = browseAllTargetUrl.join("/")
            browseAllTargetUrl = browseAllTargetUrl.join("/")
          } else {
            let focusHassub = false;
            if (currentRowdata.subCategories) {
              for (let i = 0; i < currentRowdata.subCategories.length; i++) {
                if (currentRowdata.subCategories[i].active) {
                  focusHassub = true;
                  break;
                }
              }
            }
            currentUrl = browseAllTargetUrl.join("/")
            browseAllTargetUrl.pop();
            browseAllTargetUrl = browseAllTargetUrl.join("/")
            if (focusHassub) {
              currentUrl = browseAllTargetUrl;
            }

            if (rowData.filterFocusNameHasSubfilter) {
              let backButtonUrl = currentUrl.split("/");
              backButtonUrl.pop();
              backButtonUrl = backButtonUrl.join("/")

              addTitle = <div className="alignCenter">
                {rowData.filterFocusData !== rowData
                  && <i className="fa fa-angle-left filterElementAngleLeft"
                    onClick={e => {
                      e.preventDefault();
                      common.setActiveAllDataObject(rowData, undefined, "subCategories")
                      window.history.pushState(undefined, undefined, backButtonUrl);
                      this.props.initPropsData.categoryPageOffset = 0;
                      this.setState({}, function () {
                        this.loadDataFromCategoryFilter()
                      }.bind(this))

                    }}
                  > </i>}
                {rowData.filterFocusNameHasSubfilter}
              </div>
            }
          }

          // urlArr.splice(0, this.urlIndexLength);

          let browseAllStyle = "activeFilterStyle";
          if (currentRowdata.subCategories) {
            for (let i = 0; i < currentRowdata.subCategories.length; i++) {
              if (currentRowdata.subCategories[i].active) {
                browseAllStyle = "normalFilterStyle";
                break;
              }
            }
          }
          addBodyData = [<ul
            className="nestedDropdown "
            style={{ display: "unset", left: "100%", top: 0 }}
            autoWidth={false}
          // disableAutoFocus={true}
          >
            <li className={`nestedDropdownData`}>
              <a href={browseAllTargetUrl}
                className={`colorInherit ${browseAllStyle}`}
                onClick={e => {
                  e.preventDefault();

                  $('html, body').animate({
                    scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
                  }, 300)
                  this.props.initPropsData.productList = undefined;
                  this.forceUpdate(() => {
                    Router.push(common.location.pathArr.slice(0, 2).join("/")
                      + `?alias=` + this.props.initPropsData.alias
                      + "&" + Category.getStringSearchToUrl()
                      , common.location.pathArr.slice(0, 2).join("/"))
                  });
                }}
              >
                {Language.getLanguage(LanguageIdMap.TYPE_OF_TRIP_BROWSE_ALL)}
              </a>
            </li>
            {currentRowdata.subCategories && currentRowdata.subCategories.map((currentFilterData, currentFilterIndex) => {
              return <li className="nestedDropdownData">
                <a href={currentUrl + "/" + currentFilterData.alias}
                  className={"colorInherit mgLeft5 mgRight5 " + (currentFilterData.active ? "activeFilterStyle" : "normalFilterStyle")}
                  onClick={e => {
                    e.preventDefault();

                    $('html, body').animate({
                      scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
                    }, 300)
                    this.props.initPropsData.productList = undefined;
                    this.forceUpdate(() => {
                      Router.push(common.location.pathArr.slice(0, 2).join("/")
                        + `?alias=` + this.props.initPropsData.alias
                        + "&otherCategoryAlias=" + currentFilterData.alias
                        + "&" + Category.getStringSearchToUrl()
                        , common.location.pathArr.slice(0, 2).join("/"))
                    });
                  }}
                >
                  {!!currentFilterData.subCategories
                    && <i className="fa fa-angle-right filerElementAngleRight" />}
                  {currentFilterData.name}
                </a>
              </li>
            })}
          </ul>];
        }
      } else if (LanguageIdMap.getIdByValue({ object: LanguageIdMap.CATEGORY_FILTER, value: rowData.type })
        === LanguageIdMap.CATEGORY_FILTER.DURATION.id
        || LanguageIdMap.getIdByValue({ object: LanguageIdMap.CATEGORY_FILTER, value: rowData.type })
        === LanguageIdMap.CATEGORY_FILTER.SERVICE.id) {
        let renderSubFilterArr = [];
        let renderMoreSubFilterArr = [];
        if (rowData.subCategories) {
          for (let i = 0; i < rowData.subCategories.length; i++) {
            let filterEle = <a>
              <div
                style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", padding: 2 }}
                onClick={(e) => {
                  let data = common.location.search[rowData._apiKey]
                  if (!data) {
                    common.location.search[rowData._apiKey] = i + ""
                  } else if (data == i) {
                    delete common.location.search[rowData._apiKey];
                  } else {
                    if (!Array.isArray(data)) {
                      data = [data]
                    }
                    if (data.indexOf(i + "") >= 0) {
                      data.splice(data.indexOf(i + ""), 1)
                    } else {
                      data.push(i + "")
                    }
                    common.location.search[rowData._apiKey] = data;
                  }
                  common.location.search.page = 0;

                  $('html, body').animate({
                    scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
                  }, 300)
                  this.props.initPropsData.productList = undefined;
                  this.forceUpdate(() => {
                    Router.push(common.location.pathArr.slice(0, 2).join("/")
                      + `?alias=` + this.props.initPropsData.alias + "&" + Category.getStringSearchToUrl()
                      , common.location.pathArr.join("/") + "?" + Category.getStringSearchToUrl())
                  });

                }}>
                <div style={{ whiteSpace: "nowrap" }}>
                  {!common.checkServer() && <Checkbox
                    label={rowData.subCategories[i].name}
                    checked={common.location.search[rowData._apiKey] == i
                      || (Array.isArray(common.location.search[rowData._apiKey])
                        && common.location.search[rowData._apiKey].indexOf(i + "") >= 0)
                    }
                  />}
                </div>
                {/* <div style={{ borderRadius: 5, padding: "2px 6px", marginBottom: 5, backgroundColor: "#eee" }}>
                {rowData.subCategories[i].total}
              </div> */}
              </div>
            </a>
            if (renderSubFilterArr.length >= 4) {
              renderMoreSubFilterArr.push(filterEle)
            } else {
              renderSubFilterArr.push(filterEle)
            }
          }
        }

        addBodyData = [
          ...renderSubFilterArr,
          renderMoreSubFilterArr.length > 0
          && !common.checkServer()
          && <Collapse in={this.props.initPropsData["filterCollapseOpen" + rowData.type] ? true : false}>
            <div>
              {this.props.initPropsData["filterCollapseOpen" + rowData.type] !== undefined && <div> {renderMoreSubFilterArr}</div>}
            </div>
          </Collapse>,
          renderMoreSubFilterArr.length > 0
          && <div>
            <a
              style={{ cursor: "pointer" }}
              onClick={e => {
                this.props.initPropsData["filterCollapseOpen" + rowData.type] = !this.props.initPropsData["filterCollapseOpen" + rowData.type];
                this.forceUpdate();
              }}>
              {this.props.initPropsData["filterCollapseOpen" + rowData.type]
                ? Language.getLanguage(LanguageIdMap.VIEWLESS)
                : Language.getLanguage(LanguageIdMap.VIEWALL)}
            </a>
          </div>,
        ]
      } else if (LanguageIdMap.getIdByValue({ object: LanguageIdMap.CATEGORY_FILTER, value: rowData.type })
        === LanguageIdMap.CATEGORY_FILTER.PRICE.id) {
        addBodyData = [];
        if (!common.checkServer()) {
          addBodyData = [
            <SelectField
              autoWidth={true}
              style={{ width: "100%" }}
              selectedMenuItemStyle={{ color: config.colorConfig.main }}
              value={common.location.search[rowData._apiKey] != undefined ? common.location.search[rowData._apiKey] : -1}
              onChange={(event, index, values) => {
                if (values === -1) {
                  delete common.location.search[rowData._apiKey]
                } else {
                  common.location.search[rowData._apiKey] = values + ""
                }
                common.location.search.page = 0;

                $('html, body').animate({
                  scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
                }, 300)
                this.props.initPropsData.productList = undefined;
                this.forceUpdate(() => {
                  Router.push(common.location.pathArr.slice(0, 2).join("/")
                    + `?alias=` + this.props.initPropsData.alias + "&" + Category.getStringSearchToUrl()
                    , common.location.pathArr.join("/") + "?" + Category.getStringSearchToUrl())
                });

              }}
            >
              <MenuItem
                insetChildren={true}
                checked={common.location.search[rowData._apiKey] == undefined}
                value={-1}
                primaryText={Language.getLanguage(LanguageIdMap.CHOOSE_ALL)}
              />
              {rowData.subCategories != undefined && rowData.subCategories.map((price, index) => {
                return <MenuItem
                  insetChildren={true}
                  checked={common.location.search[rowData._apiKey] == index}
                  value={index + ""}
                  primaryText={rowData.subCategories[index].name}
                />
              })}
            </SelectField>
          ]
        }
      }
      filterDataArr.push([
        addTitle !== undefined && <div style={{ fontWeight: "bold", marginBottom: 12 }}>{addTitle}</div>,
        ...addBodyData,
        addHr,
      ]);
    }

    filterDataArr.push(<Head>
      <style type="text/css">
        {headCss}
      </style>
    </Head>)

    if (!common.checkMobile()) {
      return filterDataArr
    } else {
      return <div>
        {!common.checkServer() && <Drawer
          containerStyle={this.props.initPropsData.filterSideOpen ? { width: "100%", transform: "translate(0px, 0px)" } : { transform: "translate(-120%, 0px)" }}>
          <div style={{ padding: "50px 12px" }}>
            {filterDataArr}
          </div>
        </Drawer>}
      </div>
    }
  }
  renderBanner() {
    return <div>
      {this.props.initPropsData.category && this.props.initPropsData.category.bannerUrl && <div
        title={this.props.initPropsData.category.altBanner}
        className='bannerCate'>
        <div className="pageSmallWidth colorWhite">
          <div className="fontsize40">
            {this.props.initPropsData.category && !!this.props.initPropsData.category.name && this.props.initPropsData.category.name}
          </div>
        </div>
      </div>}
    </div>
  }
  renderData() {
    return <div>
      <Head>
        <style type="text/css">{`
          .bannerCate{
            height: 260px;
            background-image: url('${this.props.initPropsData.category.bannerUrl}');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            display: flex;
            justify-content: center;
          }
          .renderDataCate{
            margin-bottom: 80px;
            padding-top: 36px;
            max-width: 100%; 
          }
          .filterBtnContainer{
            position: fixed;
            bottom: 5px;
            left: 0;
            text-align: center;
            z-index: 2000;
            width: 100%;
          }
          .filterBtn{
            display: inline-block;
            color: ${config.colorConfig.main};
            box-shadow: rgb(0, 0, 0) 2px 2px 3px;
            background-color: #fff;
            padding: 5px 18px;
            border-radius: 12px;
          }
          .cateAttractiveInCategory{
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .cateAttractiveInCategoryTitle{
            font-size: 32px;
            margin: .67em 0;
            ${common.getViewportWidth() >= 600 ? "" : "text-align: center;"}
          }
          .sortFilterAngleDown{
            font-size: 15px;
            position: absolute;
            top: 5px;
            right: 0;
          }
          .loadingProduct{
            margin: auto;
            margin-top: -30px;
            width: 60px;
            height: 20px;
            fill: ${config.colorConfig.main}
          }
          .allProductContainer{
            display: flex;
            flex-wrap: wrap;
            list-style-type: none;
            padding: 0;
            // margin-top:${this.getTopHeightNav() + 42}px
          }
          .productContainer{
            width: ${common.getViewportWidth() >= 500 ? "50%" : "100%"};
            padding-left: 2%;
            ${common.getViewportWidth() > config.sizeConfig.widthSm ? "" : "padding-right:2%;"}
            margin-bottom: 48px;
          }
          .secondBanner{
            width:100%;
            marginBottom:48px;
          }
        `}</style>
      </Head>
      <div className="renderDataCate pageSmallWidth">

        {Boolean(this.props.initPropsData.category.secondBannerActive)
          && Boolean(this.props.initPropsData.category.secondBannerUrl)
          && Boolean(this.props.initPropsData.category.plugLink)
          && <a href={this.props.initPropsData.category.plugLink}
          onClick={e=>{
            e.relatedTarget();
            window.open(this.props.initPropsData.category.plugLink, '_blank');
          }}
          >
            <img
              src={this.props.initPropsData.category.secondBannerUrl}
              className={'secondBanner'}
            />
          </a>}
        {this.renderUpperOfFilter !== undefined && this.renderUpperOfFilter()}

        {this.props.initPropsData.category && <div className="cateAttractiveInCategory">
          {(this.props.initPropsData.category && this.props.initPropsData.category.content && this.props.initPropsData.category.content.indexOf("<h1") >= 0)
            ? <div
              id="categoryH1"
              className="cateAttractiveInCategoryTitle">
              {Language.getLanguage(LanguageIdMap.ATTRACTIVE_IN_CATEGORY, { category: this.props.initPropsData.category.briefName })}
            </div>
            : <h1
              id="categoryH1"
              className="cateAttractiveInCategoryTitle">
              {Language.getLanguage(LanguageIdMap.ATTRACTIVE_IN_CATEGORY, { category: this.props.initPropsData.category.briefName })}
            </h1>}
          {this.props.initPropsData.productList && this.props.initPropsData.productList.products
            && this.props.initPropsData.productList.products.length > 0
            && !common.checkServer()
            && <HoverOpenDropdownMenu
              ref={r => { this.sortProductFilterRef = r }}
              iconButtonElement={<div
                className="headerDropdownItem hoverDefaultColor mgRight0"
              >
                {Language.getLanguage(LanguageIdMap.SORT_PRODUCT_FILTER
                [Object.keys(LanguageIdMap.SORT_PRODUCT_FILTER)[parseInt(common.location.search[Category.sortApiKey])]].id)}
                <i className="fa fa-chevron-down hoverDefaultColor sortFilterAngleDown" />
              </div>}
              data={Object.keys(LanguageIdMap.SORT_PRODUCT_FILTER).map((key, index) => {
                return <MenuItem className="hoverDefaultColor"
                  onClick={e => {
                    common.location.search[Category.sortApiKey] = index;
                    common.location.search.page = 0;
                    $('html, body').animate({
                      scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
                    }, 300)
                    this.props.initPropsData.productList = undefined;
                    this.forceUpdate(() => {
                      Router.push(common.location.pathArr.slice(0, 2).join("/")
                        + `?alias=` + this.props.initPropsData.alias + "&" + Category.getStringSearchToUrl()
                        , common.location.pathArr.join("/") + "?" + Category.getStringSearchToUrl())
                    });
                  }}
                >
                  {Language.getLanguage(LanguageIdMap.SORT_PRODUCT_FILTER[key].id)}
                </MenuItem>
              })}
            />}
        </div>
        }
        <div className='row mgLeft0 mgRight0 posRelative'>
          <div className={"zIndex10 " + (!common.checkMobile() ? "col-sm-3" : "")}>
            {this.renderFilter()}
          </div>

          <div
            className={"fontsize16 mgBottom12 " + (!common.checkMobile() ? 'col-sm-9' : '')} >
            {this.props.initPropsData.productList === undefined && <div className="textAlignCenter">
              <ReactLoading type="bubbles loadingProduct" />
            </div>}
            {this.props.initPropsData.productList !== undefined && this.props.initPropsData.productList.products
              && this.props.initPropsData.productList.products.length === 0
              && <div className="textAlignCenter">{Language.getLanguage(LanguageIdMap.NO_TOUR_AVAILABLE)}</div>}
            <ul className="allProductContainer">
              {this.props.initPropsData.productList !== undefined && this.props.initPropsData.productList.products
                && this.props.initPropsData.productList.products.map((rowData, rowIndex) => {
                  return <li className='productContainer'>
                    {this.renderProductCard(rowData)}
                  </li>
                })}
            </ul>
            {this.props.initPropsData.productList !== undefined
              && this.props.initPropsData.productList.total > config.numRowPerPage
              && <div className='textAlignCenter'>
                <Pagination
                  activePage={parseInt(common.location.search.page)}
                  items={Math.ceil(this.props.initPropsData.productList.total / config.numRowPerPage) - 1}
                  maxButtons={5}
                  onSelect={(eventKey) => {
                    common.location.search.page = eventKey;

                    $('html, body').animate({
                      scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
                    }, 300)
                    this.props.initPropsData.productList = undefined;
                    this.forceUpdate(() => {
                      Router.push(common.location.pathArr.slice(0, 2).join("/")
                        + `?alias=` + this.props.initPropsData.alias + "&" + Category.getStringSearchToUrl()
                        , common.location.pathArr.join("/") + "?" + Category.getStringSearchToUrl())
                    });
                  }}
                />
              </div>}
          </div>
        </div>


        {this.renderBelowOfFilter !== undefined && this.renderBelowOfFilter()}



        {this.props.initPropsData.category && this.props.initPropsData.category.links && this.props.initPropsData.category.links.length > 0
          && <div className="mgTop48">
            <div className="fontsize32 mgBottom32">
              {Language.getLanguage(LanguageIdMap.ONTDEK_MEER)}
            </div>
            <div className='row mgLeft0 mgRight0'>
              {this.props.initPropsData.category.links.map((rowData, rowIndex) => {
                return <div className='col-xs-2 col-sm-3 col-md-4'>
                  <a href={rowData.url}
                    onClick={e => {
                      if (rowData.url && rowData.url.indexOf("http") < 0) {
                        e.preventDefault();
                        Router.push(rowData.url);
                      }
                    }}
                  >
                    {rowData.name}
                  </a>
                </div>
              })}
            </div>
          </div>}

      </div>


      {/* render filter button */}
      {common.checkMobile() && <div className="filterBtnContainer">
        <div
          className="filterBtn"
          onClick={e => {
            this.props.initPropsData.filterSideOpen = !this.props.initPropsData.filterSideOpen;
            this.forceUpdate();
          }}
        >
          {Language.getLanguage(LanguageIdMap.filter)}
        </div>
      </div>}
    </div>
  }

}

export default Category;
