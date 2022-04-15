import "./style.scss"
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import OrderHistory from "./OrderHistory"
import ManageAccount from "./ManageAccount";

function Profile() {
  const { t } = useTranslation();
  
  return (
    <div className="profile py-3">
      <Container>
        <Tab.Container id="profile" defaultActiveKey="account">
          <Row>
            <Col sm={2}>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="account">
                    {t("manage my account")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="orders">{t("my orders")}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="wishlist">{t("my wishlist")}</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="account"><ManageAccount /></Tab.Pane>
                <Tab.Pane eventKey="orders"><OrderHistory /></Tab.Pane>
                <Tab.Pane eventKey="wishlist">third</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default Profile;
