import "./style.scss";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ManageOrders from "./ManageOrders";
import ManageUsers from "./ManageUsers";

function Admin() {
  const { t } = useTranslation();

  return (
    <div className="profile py-3">
      <Container>
        <Tab.Container id="admin" defaultActiveKey="orders">
          <Row>
            <Col sm={2}>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="orders">
                    {t("manage orders")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="ps-0" eventKey="users">
                    {t("manage users")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="orders">
                  <ManageOrders />
                </Tab.Pane>
                <Tab.Pane eventKey="users">
                  <ManageUsers />
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
