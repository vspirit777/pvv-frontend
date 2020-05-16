

import React, { PropTypes, Component } from 'react';

import common from '../../data/common';
import { config } from '../../config';
import RaisedButton from 'material-ui/RaisedButton';
import ImageGallery from 'react-image-gallery';
import Home from '../Home';
import Router from 'next/router'

class Display extends Home {
  constructor(props, context) {
    super(props, context);

    if (common.checkLoginUser()) {
      Router.push(config.shortUrl.home)
    }
    this.props.initPropsData.seoTitle = "CHÀO MỪNG BẠN ĐẾN VỚI PHUOTVIVU!";
    this.props.initPropsData.seoDescription = "CHÀO MỪNG BẠN ĐẾN VỚI PHUOTVIVU!";

    if (common.location.pathArr) {
      common.setCookie("referrerCode", common.location.pathArr[2], 86400)
    }

  }

  renderBanner() {
    let imageGaleryList = this.getBannerImageList();
    return <div style={{ position: "relative" }}>
      <ImageGallery
        ref={(input) => { this.imageGaleryRef = input; }}
        items={imageGaleryList}
        slideInterval={5000}
        showPlayButton={false}
        autoPlay={true}
        onImageLoad={function () { this.imageGaleryLoaded = true }}
        disableArrowKeys={true}
        showThumbnails={false}
        showFullscreenButton={false}
        showBullets={false}
      // onClick={(e) => { this.imageGaleryRef._toggleFullScreen() }}
      />
      <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, opacity: 0.2, backgroundColor: "#000" }} />
      <div style={{ position: "absolute", height: "100%", width: "100%", top: 0, left: 0, display: "flex" }}>
        <div style={{ ...config.pageSmallWidthStyle, }}>
          <div style={{ verticalAlign: "middle", }}>
            <div style={{ color: "#fff", textAlign: "center", }}>
              <h1 style={{
                fontSize: common.getViewportWidth() >= 600 ? "3.1667em" : "2.1em",
                fontWeight: "bold", lineHeight: "1.25em", marginBottom: 15
              }}>
                CHÀO MỪNG BẠN ĐẾN VỚI PHUOTVIVU!
              </h1>
              <div style={{
                fontSize: common.getViewportWidth() >= 800 ? "1.5em" : "1em",
                marginBottom: 40, fontWeight: "bold"
              }}>
                <div>Nhận ₫50.000 ưu đãi sau khi đăng ký!</div>
              </div>
              <RaisedButton
                buttonStyle={{ ...config.buttonStyle[0] }}
                style={{
                  height: 48, marginBottom: 12, fontSize: 20, fontWeight: "bold", lineHeight: "48px",
                  width: 300, maxWidth: "100%", margin: 8, marginLeft: 0,
                  fontWeight: "bold",
                  outline: "none",
                }}
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    registerModalPopup: true,
                  })
                }}
              >Đăng ký ngay
              </RaisedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

}

export default Display;
