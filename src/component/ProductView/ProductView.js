import "antd/dist/antd.min.css";
import "../Navbar/Navbar.css";
import { useMutation, useQuery } from "@apollo/client";
import { Col, Button, PageHeader, Row, BackTop, Spin, Typography } from "antd";
import { AiOutlineShoppingCart, AiOutlineArrowUp } from "react-icons/ai";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { GetProductDetail } from "../../config/graphql/query/query";
import { CreateCartProduct } from "../../config/graphql/mutation/mutation";
const { Paragraph, Text } = Typography;

const ProductView = () => {
  const { id } = useParams();
  const [ellipsis, setEllipsis] = useState(true);
  const [size, setSize] = useState("large");
  const { data, loading, error } = useQuery(GetProductDetail, {
    variables: { id },
  });
  const [addCart, { loading: loadingCreate }] = useMutation(CreateCartProduct);
  const [state, setState] = useState({
    id_product: id,
    jumlah: "",
    total: "",
  });

  const navigate = useNavigate();
  const navigateStore = () => {
    navigate("/store");
  };

  if (loading || loadingCreate) {
    return (
      <h1 style={{ textAlign: "center" }}>
        <br></br>
        <Spin size="large" tip="Loading..." />
      </h1>
    );
  }
  if (error) {
    console.log(error);
    return null;
  }

  const tambahCart = (newData) => {
    addCart({ variables: newData });
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.jumlah) {
      const jumlah = state.jumlah;
      if (jumlah > data.toko_product_by_pk.stok) {
        alert("Inputan Melebihi Stok");
      } else {
        const newData = {
          id_product: state.id_product,
          jumlah: state.jumlah,
          total: state.jumlah * data.toko_product_by_pk.harga,
        };
        tambahCart(newData);
        setState({
          ...state,
          id_product: id,
          jumlah: Number,
          total: Number,
        });
      }
    } else {
      alert("Data masih ada yang kosong");
    }
  };

  return (
    <>
      <PageHeader
        style={{ border: "1px solid rgb(235, 237, 240)" }}
        onBack={navigateStore}
        title="Back"
      />
      <Row style={{ justifyContent: "space-evenly" }}>
        <Col>
          <img
            src={data.toko_product_by_pk.image}
            style={{
              width: "100%",
              height: "400px",
              padding: "0px 0px 20px",
              position: "sticky",
              top: "40px",
            }}
          />
        </Col>
        <Col style={{ padding: "0px 20px" }}>
          <h1 style={{ width: "280px" }}>{data.toko_product_by_pk.nama}</h1>
          <h4 style={{ width: "280px" }}>{data.toko_product_by_pk.author}</h4>
          <h5>Deskripsi</h5>

          <p
            style={{
              lineHeight: "24px",
              whiteSpace: "pre-line",
              wordWrap: "break-word",
              width: "280px",
              fontSize: "inherit",
            }}
          >
            <Paragraph
              ellipsis={
                ellipsis
                  ? {
                      rows: 3,
                      expandable: true,
                      symbol: "more",
                    }
                  : false
              }
            >
              {data.toko_product_by_pk.deskripsi}
            </Paragraph>
          </p>
          <h5>Stok</h5>
          <p>{data.toko_product_by_pk.stok}</p>
          <h5>Harga</h5>
          <IntlProvider locale="id-ID">
            <p>
              <FormattedNumber
                value={data.toko_product_by_pk.harga}
                style="currency"
                currency="IDR"
              />
            </p>
          </IntlProvider>
          <div key={id}>
            <p>Input Jumlah Pembelian:</p>
            <input
              type="number"
              placeholder="Input Jumlah"
              value={state.jumlah}
              name="jumlah"
              onChange={onChange}
              min="1"
              max={data.toko_product_by_pk.stok}
              style={{ width: "200px" }}
            />
            <br></br>
            Total Harga:
            <IntlProvider locale="id-ID">
              <FormattedNumber
                value={state.jumlah * data.toko_product_by_pk.harga}
                style="currency"
                currency="IDR"
              />
            </IntlProvider>
            <br></br>
            <Button
              type="primary"
              shape="round"
              icon={<AiOutlineShoppingCart />}
              size={size}
              onClick={handleSubmit}
              style={{ marginTop: "20px" }}
            >
              Shop Now
            </Button>
          </div>
        </Col>
        <BackTop>
          <div
            className="style"
            style={{ borderRadius: 4, height: 40, width: 40, fontSize: 25 }}
          >
            <AiOutlineArrowUp />
          </div>
        </BackTop>
      </Row>
    </>
  );
};

export default ProductView;
