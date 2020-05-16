

import React, { PropTypes, Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import $ from "jquery";
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  OverlayTrigger,
  Popover,
  Glyphicon
} from 'react-bootstrap';
import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap';
import Language from '../../language/Language';
import ReactLoading from 'react-loading';
import Home from '../Home';
import common from '../../data/common';

class Display extends Home {
  constructor(props, context) {
    super(props, context);
    this.logout(false);
    this.state.resetPasswordModal = common.location.search.token
  }

  renderData() {
    return <div>
      {this.renderResetPasswordModal()}
      {super.renderData()}
      </div>
  }
  renderResetPasswordModal() {
    if (!this.state.resetPasswordModal) {
      return;
    }
    return <Modal show={true}
      onHide={() => {
        this.setState({
          resetPasswordModal: undefined,
        })
      }}
    >
      <Modal.Body style={{ padding: config.sizeConfig.distanceSection }}>
        <div
          className="closeHover"
          aria-hidden="true" style={{
            cursor: "pointer", fontSize: 30, marginTop: -15,
            marginBottom: 10, display: "inline-block"
          }}
          onClick={() => {
            this.setState({
              resetPasswordModal: undefined,
            })
          }}
        >×</div>
        <div style={{
          textAlign: "center", ...config.fontStyle.h1,
          ...config.fontStyle.fontFamilyBold,
          color: "#000", marginBottom: 16
        }}>
          {Language.getLanguage(LanguageIdMap.RESET_PASSWORD)}
        </div>

        <form role="form" onSubmit={(e) => {
          e.preventDefault();
          common.fetcher(
            config.api.hostType.auth_url,
            config.api.hostEndPoint.passwordReset,
            "post",
            undefined,
            {
              token: this.state.resetPasswordModal,
              newSecret: this.secret.value,
            },
            { typeFormUrlencoded: true }
          )
            .then((data) => {
              this.passwordResetLoading = undefined;
              this.setState({
                loginModalPopup:true,
                resetPasswordModal:undefined,
                alertSnackBar: Language.getLanguage(LanguageIdMap.msg_update_success)
              })
            })
            .catch((err) => {
              this.passwordResetLoading = undefined;
              console.log("---------->err:" + err)
              this.forceUpdate();
            })
          this.forceUpdate();
        }}>
          <div style={{ position: "relative" }}>
            <FormControl
              autoComplete="off"
              style={{ height: 48, marginBottom: config.sizeConfig.belowTitle, }}
              type={this.passVisible ? "text" : "password"}
              placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_password)}
              inputRef={ref => { this.secret = ref; }}
            /> <Glyphicon
              style={{ cursor: "pointer", position: "absolute", right: 10, top: 18 }}
              glyph="eye-open" onClick={() => {
                this.passVisible = !this.passVisible;
                this.forceUpdate();
              }} />
          </div>
          <Button
            style={{
              height: 48, marginBottom: config.sizeConfig.belowTitle,
              ...config.buttonStyle[0],
              fontWeight: "bold",
              outline: "none",
              opacity: this.passwordResetLoading ? 0.3 : 1
            }}
            type="submit" bsSize="large" block>
            {!this.passwordResetLoading && Language.getLanguage(LanguageIdMap.RESET_PASSWORD)}
            {this.passwordResetLoading &&
              <ReactLoading type="bubbles"
                style={{ margin: "auto", marginTop: -30, width: 60, height: 20, fill: "#fff" }} />}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  }
}

export default Display;
