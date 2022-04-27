import "./style.scss";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ManageOrders from "./ManageOrders";
import ManageProducts from "./ManageProducts";

function Admin() {
  const { t } = useTranslation();

  return (
    <div className="profile py-3">
      <Container>
        <Tab.Container id="admin" defaultActiveKey="products">
          <Row>
            <Col sm={2}>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="products">
                    {t("manage products")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="orders">
                    {t("manage orders")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="orders">
                  <ManageOrders />
                </Tab.Pane>
                <Tab.Pane eventKey="products">
                  <ManageProducts />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default Admin;
