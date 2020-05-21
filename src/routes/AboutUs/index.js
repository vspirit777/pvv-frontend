

import React from 'react';

import { config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import SuperComponent from '../../components/SuperComponent';
import Head from 'next/head';

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.ABOUT_NAME, { name: config.companyName });
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.ABOUT_NAME, { name: config.companyName });

    this.canNotRenderFooter = true;
  }

  renderData() {
    return <div>
      <Head>
        <style type="text/css">{`
          .aboutBody{
            max-width: 900px;
            padding-top: 24px;
            margin-bottom: 48px;
            background-color: #fff;
          }
          .staffImage{
            float: left;
            width: 200px;
            margin-right: 24px;
          }
        `}</style>
      </Head>
      <div className="backgroundGrey">
        <div className="pageSmallWidth aboutBody">
          <h1 className="mgBottom40 textAlignCenter">
            {Language.getLanguage(LanguageIdMap.ABOUT_NAME, { name: config.companyName })}
          </h1>
          <p>
            Phuotvivu khởi điểm là 1 blog chia sẻ kinh nghiệm du lịch của travel blogger Nhung Phùng từ năm 2013, sau 2 năm Phuotvivu đã xây dựng trở thành một trong những website cung cấp các dịch vụ du lịch cho người du lịch tự túc lớn nhất Việt Nam.
        </p>
          <p>
            Ngoài travel blogger Nhung Phùng, tất cả các thành viên của Phuotvivu đều là những chuyên gia du lịch tự túc đã đi rất nhiều nơi trên thế giới. Do đó chúng tôi rất am hiểu nhu cầu của khách hàng và tin rằng sẽ mang lại những sản phẩm, dịch vụ tốt nhất và phù hợp.
        </p>

          <h3 className="mgTop32">
            Sản phẩm của Phuotvivu
          </h3>
          <p>
            Phuotvivu là trang web cung cấp thông tin và dịch vụ đặt chỗ cho những hoạt động du lịch, tour ngắn ngày, dài ngày, phương tiện di chuyển, sim card và các show diễn tại điểm đến từ những nhà cung cấp uy tín nhất với giá tốt hơn khi mua trực tiếp tại chỗ.
          </p>
          <p>
            Chỉ với vài cú nhấp chuột bạn đã có thể đặt bất kỳ các dịch vụ du lịch ở nơi bạn sắp đến, cực kỳ đơn giản tiện lợi, chủ động hành trình, nhận voucher nhanh.
        </p>

          <h3 className="mgTop32">
            Sứ mệnh
          </h3>
          <p>
            Đem đến trải nghiệm, dịch vụ du lịch tuyệt vời nhất với mức giá tốt nhất, tiện lợi nhất cho người Việt Nam du lịch tự túc.
          </p>

          <h3 className="mgTop32 mgBottom24">
            Truyền thông nói gì về Phuotvivu
        </h3>
          <div className='row mgLeft0 mgRight0'>
            <div className='col-sm-6 pdLeft8 pdRight8 mgBottom48'>
              <iframe src="https://www.youtube.com/embed/pWwDR1ui8R0"
                width="100%" height="250"
                allowFullScreen="allowfullscreen"></iframe>
              <div className="mgTop24">
                <strong>VTV3 – Vui Sống mỗi ngày:</strong>Trekking Núi Lửa Nam Mỹ
            </div>
            </div>
            <div className='col-sm-6 pdLeft8 pdRight8 mgBottom48'>
              <iframe src="https://www.youtube.com/embed/SKiouKWETrE"
                width="100%" height="250"
                allowFullScreen="allowfullscreen"></iframe>
              <div className="mgTop24">
                <strong>VTV3 – Vui Sống mỗi ngày:</strong>Du lịch biển, những điểm đến đẹp ở Đông Nam Á
            </div>
            </div>
          </div>
          <div className='row mgLeft0 mgRight0'>
          <div className='col-sm-6 pdLeft8 pdRight8 mgBottom48'>
              <iframe src="https://www.youtube.com/embed/Vo4so30GR1s"
                width="100%" height="250"
                allowFullScreen="allowfullscreen"/>
              <div className="mgTop24">
                <strong>VTV3 – Vui Sống mỗi ngày:</strong>Hướng dẫn du lịch nước ngoài tiết kiệm
            </div>
            </div>
            <div className='col-sm-6 pdLeft8 pdRight8 mgBottom48'>
              <iframe src="https://www.youtube.com/embed/IdZ3yyAuzFM"
                width="100%" height="250"
                allowFullScreen="allowfullscreen"/>
              <div className="mgTop24">
                <strong>HTV- Thành phố hôm nay:</strong>Kỹ năng săn vé máy bay, tìm khách sạn khi đi du lịch bụi
            </div>
            </div>
          </div>


          <h3 className="mgTop32">
            Đội ngũ Phuotvivu
        </h3>
          <p>
            Phuotvivu team là những chuyên gia du lịch giàu kinh nghiệm, blogger du lịch luôn sẵn sàng tư vấn cho các bạn chi tiết kinh nghiệm du lịch đến từng địa điểm, hỗ trợ bạn trong những lúc gặp khó khăn khi du lịch trong nước hay nước ngoài.
        </p>
          <div className="mgTop24">
            <img src={"/static/images/avatar/nhung-phung-phuotvivu.jpg"} className="staffImage"/>
            <h3>Nhung Phung</h3>
            <p className="mgBottom24"><i>FOUNDER</i></p>
            <p>Là founder của Phuotvivu, Nhung yêu thích viết lách và chia sẻ những câu chuyện du lịch thú vị, không ngừng sáng tạo trong viết và tìm kiếm những điểm đến, tour độc đáo cho bạn đọc và khuyến khích mọi người du lịch khám phá bản thân, thế giới .Những nơi yêu thích của Nhung là Bali, Khao Sok, Hà Lan, Nhật Bản và Bắc Mỹ…</p>
            <div className="clearBoth"/>
          </div>
          {/* <div className="mgTop24">
            <img src={"/static/images/avatar/marnick-phuotvivu.jpg"}  className="staffImage"/>
            <h3>Marnick Schoonderwoerd</h3>
            <p className="mgBottom24"><i>MARKETING DIRECTOR</i></p>
            <p>Sau 5 năm làm việc trong lĩnh vực marketing online, anh nghỉ việc để du lịch khám phá thế giới. Đã đến 34 đất nước trải dài khắp các châu từ Châu Phi, Nam Mỹ, Bắc Mỹ, Châu Âu, Châu Úc và Châu Á, hiện tại anh đang gắn bó với Việt Nam và là giám đốc Marketing của Phuotvivu.</p>
            <div className="clearBoth"/>
          </div> */}


        </div>


      </div>
      {this.renderFooter()}
    </div>
  }
}

export default Display;
