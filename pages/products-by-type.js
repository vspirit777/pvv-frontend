import Child, { TYPE_OF_TRIP_CONFIG } from '../src/routes/category/ProductsByType'
import __SuperPage from './__SuperPage';
import common from '../src/data/common';
import LanguageIdMap from '../src/language/LanguageIdMap';
import Language from '../src/language/Language';
import NotFoundPage from '../src/routes/notFoundPage'

class Display extends __SuperPage {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(props) {
    __SuperPage.setupStaticSuperPage(props);
    var propReturn = await __SuperPage.getInitialProps(props, Child.getInitialPromiseListForProps(props));

    // Get typeOfTripAlias from query
    var typeOfTripAlias = common.location.search.typeOfTripAlias;
    
    // Set up page meta data based on typeOfTripAlias
    if (typeOfTripAlias && TYPE_OF_TRIP_CONFIG[typeOfTripAlias]) {
      var typeConfig = TYPE_OF_TRIP_CONFIG[typeOfTripAlias];
      propReturn.initPropsData.seoTitle = typeConfig.name + " - Phuotvivu";
      propReturn.initPropsData.seoDescription = "Khám phá " + typeConfig.name + " tại Phuotvivu. Đặt vé online an toàn và tiết kiệm.";
    }

    // Set up filters - Price filter only
    if (common.productFilterArr && common.productFilterArr.length > 0) {
      propReturn.initPropsData.filter = common.productFilterArr.slice();
    } else {
      // Initialize default filters if not available
      propReturn.initPropsData.filter = Child.getDefaultFilters();
    }
    
    if (propReturn.common) {
      propReturn.common.productFilterArr = common.productFilterArr;
    }

    // Validate typeOfTripAlias
    if (!typeOfTripAlias || !TYPE_OF_TRIP_CONFIG[typeOfTripAlias]) {
      if (props.res) {
        props.res.statusCode = 404;
        return { ...propReturn, notfound: true };
      } else {
        return { ...propReturn, notfound: true };
      }
    }

    await Child.getProductFilter();
    return propReturn;
  }

  render() {
    if (this.props.notfound) {
      return <NotFoundPage {...this.props} />;
    }
    return <Child {...this.props} />;
  }
}

export default Display;
