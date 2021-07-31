import React, { PropTypes } from 'react';
import { analytics, config } from '../config';
import $ from "jquery";
import serialize from "serialize-javascript"

function Html({ style, script, children, }) {
  return (
    <html className="no-js" lang="en">
      <head>

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta property="fb:app_id" content="311335096081890" />
        
        <meta name="fragment" content="!" />
        <title>{config.metaTitle}</title>

        <meta name="description" content={config.metaDesc} />
        <meta name="title" content={config.metaTitle} />
        <meta name="og:image" content={config.metaImg} />
        
        <meta name="image" content={config.metaImg} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="keywords" content="phuot vi vu vivu" />


        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />


        <link rel="stylesheet" href={config.domain + "/css/sb-admin.css"} />
        {/* <link rel="stylesheet" href={config.domain + "/css/dist/react-datepicker.css"} /> */}
        {/* <link rel="shortcut icon" type="image/x-icon" href={config.domain + "/favicon.jpg"} /> */}
        <link rel="manifest" href={config.domain + "/manifest.json"} />

        {/* <script src="/css/htmlScript.js"></script> */}

        {/* <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js" async></script> */}
        <script type="text/javascript" src={config.domain + "/css/bootstrap.js"} async></script>
        <link rel="stylesheet" href={config.domain + "/css/bootstrap.min.css"} />
        {/* <script type="text/javascript" src="https://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js" async></script> */}
        <script type="text/javascript" src={config.domain + "/css/jquery.js"} async></script>


        {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.8/summernote.css" rel="stylesheet" /> */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.8/summernote.js"></script> */}

        {/* <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" /> */}


        <style id="css" dangerouslySetInnerHTML={{ __html: style }} />

        {/* {analytics.google.trackingId &&
          <script
            dangerouslySetInnerHTML={{
              __html:
                `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${analytics.google.tagManagerId}')`
            }}
          />
        } */}
      </head>
      <body id='body'>
        {/* <div id='preLoader' style={{ height: "97vh", verticalAlign: "middle", display: "flex" }}>
          <div className="loader" style={{ margin: "auto" }}></div>
        </div> */}

        {/* {analytics.google.tagManagerId &&
          <noscript>
            <iframe src={"https://www.googletagmanager.com/ns.html?id=" + analytics.google.tagManagerId}
              height="0" width="0" style={{ display: "none", visibility: "hidden" }}/>
          </noscript>
        } */}



        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {/* <div style={{display:"none"}} id='initDataFromServer'>{__INITIAL_DATA__}</div> */}
        {script && <script type="text/javascript" src={script} async />}
        {analytics.google.trackingId &&
          <script
            dangerouslySetInnerHTML={{
              __html:
                'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')`
            }}
          />
        }
        {analytics.google.trackingId &&
          <script src="https://www.google-analytics.com/analytics.js" async defer />
        }

        {/* <script src="https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js"></script> */}

      </body>
    </html>
  );
}

export default Html;
