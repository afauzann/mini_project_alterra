import { Button } from "antd";
import { Row, Col } from "reactstrap";
import "./LandingPage.css";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <Row xs="1" md="2">
        <Col className="title">
          <h1>
            Welcome to
            <span style={{ fontWeight: "bold", color: "#1088E9" }}> K</span>
            umikyu
          </h1>
          <h3>Buatlah Fantasimu Menjadi Nyata</h3>
          <Link to={`/store`}>
            <Button type="primary" shape="round">
              Mulai
            </Button>
          </Link>
        </Col>
        <Col>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/toko-b7254.appspot.com/o/book.jpg?alt=media&token=5b6dea99-ba74-4f32-8c7d-67dbe538ee6f"
            alt="landing-image"
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
