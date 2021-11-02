

import React from 'react';
import $ from "jquery";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import common from '../../../data/common';
import { config } from '../../../config';
import LanguageIdMap from '../../../language/LanguageIdMap'
import Language from '../../../language/Language'
import Category from '../Category';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Router from 'next/router'

class Display extends Category {
  constructor(props, context) {
    super(props, context);
  }

  static getInitialPromiseListForProps(context) {
    return Category.getInitialPromiseListForProps(context)
  }
  static async getProductFilter(state = common.initPropsData) {
    await Category.getProductFilter(state, {
      destinationAlias: state.alias
    },
      "typeOfTripAlias"
    )
  }

  checkAndLoadData() {
    if (super.checkAndLoadData() == false) {
      return false;
    }

    this.forceUpdate();
    return true;
  }

  renderBelowOfFilter() {
    let retArr = []
    if (this.props.initPropsData.attractionByDestination && this.props.initPropsData.attractionByDestination.data && this.props.initPropsData.attractionByDestination.data.length > 0) {
      retArr.push(<div className="mgBottom48">
        {this.props.initPropsData.category && <div className="fontsize32 mgBottom32">
          {Language.getLanguage(LanguageIdMap.TOP_ATTRACTION_IN_CATEGORY, { category: this.props.initPropsData.category.briefName })}
        </div>}
        {this.renderOneRow(this.props.initPropsData.attractionByDestination, {
          loadMore: () => { Category.getAttractionByDestination(this.props.initPropsData, this) },
          cardRender: function (rowData) {
            return <a className="width100 pointer colorInherit"
              href={config.shortUrl.attraction + "/" + rowData.alias}
              onClick={(e) => {
                e.preventDefault();
                Router.push(config.shortUrl.attraction, config.shortUrl.attraction + "/" + rowData.alias)
              }}
            >
              <div className="posRelative pdBottom66">
                <img
                  alt={rowData.photoInfo ? rowData.photoInfo.altText : undefined}
                  src={rowData.photoInfo ? rowData.photoInfo.thumbUrl : undefined}
                  className="shadowImg height100 width100 backgroundGrey posAbsolute"
                  />
              </div>
              {rowData.name &&
                <div className="twoLineText productCardExcerpt">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>
                      {rowData.name}
                    </Tooltip>}
                  >
                    <a className="pointer colorInherit">{rowData.name}</a>
                  </OverlayTrigger>
                </div>
              }
            </a>
          }.bind(this)
        })}
      </div>)
    }
    if (this.props.initPropsData.category && this.props.initPropsData.category.content) {
      retArr.push(<div className="mgTop48">
        {/* <div style={{ fontSize: 32, marginBottom: 32, }}>
          {Language.getLanguage(LanguageIdMap.TRAVELING_IN_CATEGORY, { category: ReactHtmlParser(this.props.initPropsData.category.briefName) })}
        </div> */}
        <div>
          {ReactHtmlParser(this.props.initPropsData.category.content)}
        </div>
      </div>)
    }
    return retArr;
  }
  renderUpperOfFilter() {
    if (this.props.initPropsData.subDestination && this.props.initPropsData.subDestination.data && this.props.initPropsData.subDestination.data.length > 0) {
      return <div>
        {this.props.initPropsData.category && <div className="fontsize32 mgBottom32">
          {Language.getLanguage(LanguageIdMap.DESTINATION_IN_CATEGORY, { category: this.props.initPropsData.category.briefName })}
        </div>}
        {this.renderOneRow(this.props.initPropsData.subDestination, {
          cardRender: function (data) {
            return <a className="colorInherit pointer" href={config.domain + config.shortUrl.destination + "/" + data.alias}
              onClick={e => {
                e.preventDefault();

                delete common.location.search.page;
                delete common.location.search[Category.sortApiKey];
                $('html, body').animate({
                  scrollTop: $('#categoryH1').offset().top - this.getTopHeightNav()
                }, 300)
                this.props.initPropsData.productList = undefined;
                this.forceUpdate(() => {
                  Router.push(common.location.pathArr.slice(0, 2).join("/")
                    + `?alias=` + data.alias + "&" + Category.getStringSearchToUrl()
                    , common.location.pathArr.slice(0, 2).join("/") + "/" + data.alias + "?" + Category.getStringSearchToUrl())
                });

              }}
            >
              <div className="width100 pdBottom100 backgroundGrey posRelative">
                <img
                  alt={data.photoInfo ? data.photoInfo.altText : undefined}
                  className="width100 height100 posAbsolute"
                  src={data.photoInfo ? data.photoInfo.thumbSecondUrl : undefined}
                />
              </div>
              <div className="mgTop16 whiteSpaceNowrap textOverflowEllipsis overflowHidden">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>
                    {data.briefName}
                  </Tooltip>}
                >
                  <a className="colorInherit fontsize16">{data.briefName}</a>
                </OverlayTrigger>
              </div>
            </a>
          }.bind(this)
        })}
      </div>
    }
  }
}

export default Display;
