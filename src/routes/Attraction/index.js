

import React, { PropTypes, Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import common from '../../data/common';
import { config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import SuperComponent from '../../components/SuperComponent';


class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    this.props.initPropsData.photoIndex = -1;

  }
  static getInitialPromiseListForProps(context) {

    common.initPropsData.alias = common.location.pathArr[2];

    return [
      common.fetcher(
        config.api.hostType.product_url,
        config.api.hostEndPoint.getAttractionDetail,
        "get",
        { alias: common.initPropsData.alias },
      )
        .then((jsonRes) => {
          common.initPropsData.seoTitle = jsonRes.data.seoTitle
          common.initPropsData.seoDescription = jsonRes.data.meta
          common.initPropsData.seoImage = jsonRes.data.bannerUrl

          if (jsonRes.data.content) {
            jsonRes.data.content = jsonRes.data.content.replace(/style=""/g, "")
          }

          common.initPropsData.attraction = jsonRes.data
        })
        .catch((err) => {
        }),


      common.fetcher(
        config.api.hostType.product_url,
        config.api.hostEndPoint.getAttractionByAttraction,
        "get",
        { alias: common.initPropsData.alias, offset: 0, size: 10 }
      )
        .then((jsonRes) => {
          console.log
          // if (jsonRes.data) {
          //   for (let i = 0; i < jsonRes.data.length; i++) {
          //     if (jsonRes.data[i].alias === alias) {
          //       jsonRes.data.splice(i, 1);
          //       break;
          //     }
          //   }
          // }
          common.initPropsData.otherAttraction = {
            data: jsonRes.data,
            _configMaxCardDisplayOfRow: 5,
            _leftRightHeightButton: "29%",
          }
        })
        .catch((err) => {
        }),

      common.fetcher(
        config.api.hostType.product_url,
        config.api.hostEndPoint.getProductFilter,
        "get",
        { tagAttractionAlias: common.initPropsData.alias, offset: 0, size: 10 }
      )
        .then((jsonRes) => {
          common.initPropsData.attractionProduct = {
            data: jsonRes.data.products,
            _configMaxCardDisplayOfRow: 3,
            _leftRightHeightButton: "33%",
          }
        })
        .catch((err) => {
        })
    ]
  }

  async checkAndLoadData() {
    if (super.checkAndLoadData() == false) {
      return false;
    }
    getInitialProps()


    return true;
  }


  renderBanner() {
    if (!this.props.initPropsData.attraction || !this.props.initPropsData.attraction.bannerUrl) {
      return <div />;
    }
    return <div
      alt={this.props.initPropsData.attraction.altBanner}
      style={{
        height: 260,
        backgroundImage: "url('" + this.props.initPropsData.attraction.bannerUrl + "')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        display: "flex",
        justifyContent: "center",
      }}>
      <div style={{ color: "#fff", ...config.pageSmallWidthStyle }}>
        <h1 style={{ fontSize: 40 }}>
          {this.props.initPropsData.attraction && !!this.props.initPropsData.attraction.name && this.props.initPropsData.attraction.name}
        </h1>
      </div>
    </div>
  }
  renderData() {
    if (!this.props.initPropsData.attraction) {
      return <div/>;
    }
    // console.log(this.props.initPropsData.attractionProduct)
    return <div>
      <div style={{}}>
        {this.props.initPropsData.attractionProduct && this.props.initPropsData.attractionProduct.data && this.props.initPropsData.attractionProduct.data.length > 0
          && <div style={{ ...config.pageSmallWidthStyle, marginTop: 48, }}>
            <div style={{}}>
              <h2 style={{ marginBottom: 32, }}>
                {this.props.initPropsData.attraction && !!this.props.initPropsData.attraction.name && (this.props.initPropsData.attraction.name + ": ")}
                {Language.getLanguage(LanguageIdMap.TOUR_AND_TICKET)}
              </h2>
              {this.renderOneRow(this.props.initPropsData.attractionProduct, {
                cardRender: this.renderProductCard.bind(this)
              })}
            </div>
          </div>}

        {this.props.initPropsData.attraction.content && <div style={config.pageSmallWidthStyle} >
          <div style={{ marginTop: 24 }}>
            {ReactHtmlParser(this.props.initPropsData.attraction.content)}
          </div>
        </div>}

        {this.props.initPropsData.otherAttraction && this.props.initPropsData.otherAttraction.data && this.props.initPropsData.otherAttraction.data.length > 0
          && <div style={{ ...config.pageSmallWidthStyle, marginTop: 48, }}>
            <div style={{}}>
              <h2 style={{ marginBottom: 32, }}>
                {this.props.initPropsData.attraction && !!this.props.initPropsData.attraction.name
                  && Language.getLanguage(LanguageIdMap.OTHER_ATTRACTION_IN_NAME, { name: this.props.initPropsData.attraction.name })}
              </h2>
              {this.renderOneRow(this.props.initPropsData.otherAttraction, {
                cardRender: function (rowData) {
                  return <a style={{ width: "100%", ...this.props.style, cursor: "pointer", color: "inherit" }}
                    href={config.domain + config.shortUrl.attraction + "/" + rowData.alias}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("click attracion in attraction")
                      common.needReload = true;
                      Router.push(config.shortUrl.attraction,config.shortUrl.attraction + "/" + rowData.alias)
                    }}
                  >
                    <div style={{ position: "relative", paddingBottom: "66.66%" }}>
                      <img
                        alt={rowData.photoInfo ? rowData.photoInfo.altText : undefined}
                        src={rowData.photoInfo ? rowData.photoInfo.thumbUrl : undefined}
                        className="shadowImg"
                        style={{
                          width: "100%", height: "100%",
                          backgroundColor: "#eeeeee", position: "absolute",
                        }} />
                    </div>
                    {rowData.name &&
                      <div className="twoLineText"
                        style={{
                          fontWeight: "bold",
                          lineHeight: 1.4, marginBottom: 4, marginTop: 12,
                          fontSize: 18, maxHeight: 1.6 * 18 * 2,      //2 is 2 line
                        }}>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>
                            {rowData.name}
                          </Tooltip>}
                        >
                          <a style={{
                            cursor: "pointer", color: "inherit"
                          }}>{rowData.name}</a>
                        </OverlayTrigger>
                      </div>
                    }
                  </a>
                }.bind(this)
              })}
            </div>
          </div>}

      </div>
    </div>
  }
}

export default Display;
