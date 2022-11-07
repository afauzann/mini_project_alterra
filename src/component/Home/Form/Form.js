import "./Form.css";
import React, { useState } from "react";
import { Row, Col, Badge, Input } from "reactstrap";
import { BsTwitter, BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

function Form() {
  const baseData = {
    email: "",
  };
  const [data, setData] = useState(baseData);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    alert(`Data Berhasil Diterima`);
    resetData();
    e.preventDefault();
  };

  const resetData = () => {
    setData(baseData);
  };

  return (
    <Row xs="1" md="2">
      <Col>
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/toko-b7254.appspot.com/o/connect.jpg?alt=media&token=00cee24f-4d4c-4b73-bbe0-52dea37506fc"
          }
          style={{ width: "100%", height: "auto" }}
        />
      </Col>
      <Col className="titles">
        <h1>Connect Us</h1>
        <h6 style={{ textAlign: "center" }}>Isi Email untuk Info Terbaru</h6>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              bsSize=""
              type="email"
              name="email"
              required
              onChange={handleInput}
              value={data.email}
              placeholder="example@mail.com"
            />
            <p></p>
            <Input type="submit" />
          </form>
        </div>
        <div>
          <h6 style={{ textAlign: "center", marginTop: "10px" }}>atau</h6>
          <h6 style={{ textAlign: "center", marginTop: "10px" }}>
            Kunjungi Social Media Kami
          </h6>
          <h2>
            <Badge href="https://twitter.com/twitterid" color="none">
              <BsTwitter style={{ marginRight: "10px", fontSize: "30px" }} />
            </Badge>
            <Badge href="https://web.facebook.com/MetaIndonesia" color="none">
              <BsFacebook style={{ marginRight: "10px", fontSize: "30px" }} />
            </Badge>
            <Badge href="https://www.instagram.com/instagram/" color="none">
              <BsInstagram style={{ marginRight: "10px", fontSize: "30px" }} />
            </Badge>
            <Badge href="https://github.com/afauzann" color="none">
              <BsGithub style={{ fontSize: "30px" }} />
            </Badge>
          </h2>
        </div>
      </Col>
    </Row>
  );
}

export default Form;
