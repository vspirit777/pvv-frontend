import Child from '../src/routes/Home'
import __SuperPage from './__SuperPage';

class Display extends __SuperPage {
  constructor(props) {
    super(props);
  }
  static async getInitialProps(context) {
    __SuperPage.setupStaticSuperPage(context)
    let r = await __SuperPage.getInitialProps(context, Child.getInitialPromiseListForProps(context))
    return r;
  }
  render() {
    return <Child {...this.props} />
  }
}

export default Display
