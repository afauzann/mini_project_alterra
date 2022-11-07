import { Button, Result, Space } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.min.css";

function Checkout() {
  return (
    <>
      <Result status="success" title="Pembayaran Sukses" />
      <div style={{ textAlign: "center" }}>
        <Space>
          <Link to={`/`}>
            <Button type="primary">Home</Button>
          </Link>
          <Link to={`/store`}>
            <Button>Buy Again</Button>,
          </Link>
        </Space>
      </div>
    </>
  );
}

export default Checkout;
