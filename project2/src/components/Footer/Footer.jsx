import "./style.scss";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoFooter from "../../assets/images/logo-footer.png";
import googlePlay from "../../assets/images/google-play.png";
import appStore from "../../assets/images/app-store.png";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3}>
            <h2 className="footer__title">LIÊN HỆ VỚI LAZADA</h2>
            <nav>
              <ul className="footer__list">
                <li>
                  <Link to="/">Hotline & Chat trực tuyến (24/7)</Link>
                </li>
                <li>
                  <Link to="/">Trung tâm hỗ trợ</Link>
                </li>
                <li>
                  <Link to="/">Hướng dẫn đặt hàng</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/">Giao hàng & Nhận hàng</Link>
                </li>
                <li>
                  <Link to="/">Chính sách hàng nhập khẩu</Link>
                </li>
                <li>
                  <Link to="/">Hướng dẫn đổi trả hàng</Link>
                </li>
              </ul>
            </nav>
          </Col>
          <Col md={3}>
            <h2 className="footer__title">LAZADA VIỆT NAM</h2>
            <nav>
              <ul className="footer__list">
                <li>
                  <Link to="/">Về Lazada Việt Nam</Link>
                </li>
                <li>
                  <Link to="/">Bán hàng cùng Lazada</Link>
                </li>
                <li>
                  <Link to="/">Chương trình Lazada Afﬁliate</Link>
                </li>
                <li>
                  <Link to="/">Tuyển dụng</Link>
                </li>
                <li>
                  <Link to="/">Điều khoản sử dụng</Link>
                </li>
                <li>
                  <Link to="/">Chính sách bảo mật</Link>
                </li>
                <li>
                  <Link to="/">Báo chí</Link>
                </li>
                <li>
                  <Link to="/">Bảo vệ quyền sở hữu trí tuệ</Link>
                </li>
                <li>
                  <Link to="/">Quy chế hoạt động sàn Lazada</Link>
                </li>
                <li>
                  <Link to="/">Quy trình giải quyết tranh chấp, khiếu nại</Link>
                </li>
              </ul>
            </nav>
          </Col>
          <Col md={6}>
            <div className="footer__top">
              <Image src={logoFooter} />
              <div>
                <span>Go where your heart beats</span>
                <p>Tải App Lazada</p>
              </div>
              <Link to="/">
                <Image src={googlePlay} />
              </Link>
              <Link to="/">
                <Image src={appStore} />
              </Link>
            </div>
            <div className="footer__bottom">
              <p>CÔNG TY TNHH RECESS</p>
              <p>
                Giấy CNĐKDN: 0308808576 – Ngày cấp: 06/5/2009, được sửa đổi lần
                thứ 19 ngày 15/8/2019.
              </p>
              <p>
                Cơ quan cấp: Phòng Đăng ký kinh doanh – Sở kế hoạch và Đầu tư
                TP.HCM
              </p>
              <p>
                Địa chỉ đăng ký kinh doanh: Tầng 19, Tòa nhà Saigon Centre –
                Tháp 2, 67 Lê Lợi, Phường Bến Nghé, Quận 1, Tp. Hồ Chí Minh,
                Việt Nam.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
