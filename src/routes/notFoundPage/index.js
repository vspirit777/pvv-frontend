

import React, { PropTypes, Component } from 'react';

import Router from 'next/router'
import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import SuperComponent from '../../components/SuperComponent';

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
  }
  renderData() {
    return <div style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ ...config.pageSmallWidthStyle, paddingTop: 12, paddingBottom: 12, backgroundColor: "#fff" }}>
        <h1 style={{ marginBottom: 24, fontSize: 48, textAlign: "center"}}>
          {Language.getLanguage(LanguageIdMap.WHOOPS)}
        </h1>
        <div style={{ textAlign: "center" }}>
          <div>{Language.getLanguage(LanguageIdMap.PAGE_NOT_EXISTS)}</div>
          <div>
            <a
              href={config.shortUrl.home}
              onClick={e => {
                e.preventDefault();
                Router.push(config.shortUrl.home)
              }}
            >
              {Language.getLanguage(LanguageIdMap.BACK_TO_HOME_PAGE)}
            </a>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Display;
