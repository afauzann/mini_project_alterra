import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import { Button, BackTop, Input, Spin, Typography, Image } from "antd";
import { AiOutlineArrowUp, AiOutlineShoppingCart } from "react-icons/ai";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { FormattedNumber, IntlProvider } from "react-intl";
import {
  FilterProduct,
  PaginationProduct,
} from "../../config/graphql/query/query";
const { Paragraph, Text } = Typography;
const { Search } = Input;

// style untuk backdrop
const style = {
  height: 40,
  width: 40,
  lineHeight: "35px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 25,
};

const pageSize = 10;

function Store() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [ellipsis, setEllipsis] = useState(true);
  const { data, loading, error } = useQuery(PaginationProduct, {
    variables: {
      limit: pageSize,
      offset: page * pageSize,
    },
  });
  const [
    filterTags,
    { data: dataFilter, loading: loadingFilter, error: errorFilter },
  ] = useLazyQuery(FilterProduct);

  if (loading || loadingFilter) {
    return (
      <h1 style={{ textAlign: "center" }}>
        <Spin size="large" tip="Loading..." />
      </h1>
    );
  }

  if (error) {
    console.log(error);
    return null;
  }

  const handleFilterChange = (e) => {
    filterTags({ variables: { genre: e.target.value } });
  };

  return (
    <>
      <Row lg={3} md={3} sm={1} xs={1}>
        <Col>
          <h2 style={{ textAlign: "center" }}>Store List</h2>
        </Col>
        <Col>
          <div style={{ textAlign: "center" }}>
            <Search
              placeholder="input search text"
              allowClear
              onChange={(event) => setSearch(event.target.value)}
              style={{
                width: 300,
              }}
            />
          </div>
        </Col>
        <Col>
          <div
            className="select"
            style={{
              textAlign: "center",
              color: "rgba(0,0,0,.85)",
              padding: "1px 11px",
              fontSize: "14px",
              lineHeight: "1.5715",
              backgroundColor: "#fff",
              backgroundImage: "none",
              borderRadius: "2px",
              transition: "all .3s",
            }}
          >
            <select onChange={handleFilterChange}>
              <option value="">Filter By Genre</option>
              <option value="Sport">🎾Sport</option>
              <option value="Fantasy">🪄Fantasy</option>
              <option value="Action">🔫Action</option>
              <option value="Romance">💘Romance</option>
              <option value="Horror">👻Horror</option>
              <option value="SoL">👨‍👩‍👦SoL</option>
            </select>
          </div>
        </Col>
      </Row>
      <Row
        md={3}
        xs={1}
        sm={2}
        lg={5}
        className="g-3"
        style={{ padding: "20px 80px" }}
      >
        {dataFilter
          ? dataFilter?.toko_product
              .filter((product) => {
                if (search === "") {
                  return product;
                } else if (
                  product.nama.toLowerCase().includes(search.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((product) => (
                <div key={product.id}>
                  <Col>
                    <Card
                      className="h-100 p-2"
                      style={{ boxShadow: "0 0 10px rgb(229 229 229 / 80%)" }}
                    >
                      <Image src={product.image} height="300px" />
                      <CardBody className="d-flex flex-column">
                        <CardTitle
                          className="d-flex justify-content-between align-items-baseline mb-4"
                          style={{ flexWrap: "wrap" }}
                        >
                          <span className="fs-4">
                            <Paragraph
                              ellipsis={
                                ellipsis
                                  ? {
                                      rows: 2,
                                      expandable: true,
                                      symbol: "more",
                                    }
                                  : false
                              }
                            >
                              {product.nama}
                            </Paragraph>
                          </span>
                          <IntlProvider locale="id-ID">
                            <span className="ms-2 text-muted">
                              <FormattedNumber
                                value={product.harga}
                                style="currency"
                                currency="IDR"
                              />
                            </span>
                          </IntlProvider>
                        </CardTitle>
                        <Link to={`/store/${product.id}`}>
                          <div style={{ textAlign: "center" }}>
                            <Button
                              type="primary"
                              shape="round"
                              icon={<AiOutlineShoppingCart />}
                            >
                              Shop Now
                            </Button>
                          </div>
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                </div>
              ))
          : data?.toko_product
              .filter((product) => {
                if (search === "") {
                  return product;
                } else if (
                  product.nama.toLowerCase().includes(search.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((product) => (
                <div key={product.id}>
                  <Col>
                    <Card
                      className="h-100 p-2"
                      style={{ boxShadow: "0 0 10px rgb(229 229 229 / 80%)" }}
                    >
                      <Image src={product.image} height="300px" />
                      <CardBody className="d-flex flex-column">
                        <CardTitle
                          className="d-flex justify-content-between align-items-baseline mb-4"
                          style={{ flexWrap: "wrap" }}
                        >
                          <span className="fs-4">
                            <Paragraph
                              ellipsis={
                                ellipsis
                                  ? {
                                      rows: 2,
                                      expandable: true,
                                      symbol: "more",
                                    }
                                  : false
                              }
                            >
                              {product.nama}
                            </Paragraph>
                          </span>
                          <IntlProvider locale="id-ID">
                            <span className="ms-2 text-muted">
                              <FormattedNumber
                                value={product.harga}
                                style="currency"
                                currency="IDR"
                              />
                            </span>
                          </IntlProvider>
                        </CardTitle>
                        <Link to={`/store/${product.id}`}>
                          <div style={{ textAlign: "center" }}>
                            <Button
                              type="primary"
                              shape="round"
                              icon={<AiOutlineShoppingCart />}
                            >
                              Shop Now
                            </Button>
                          </div>
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                </div>
              ))}
      </Row>
      <div style={{ textAlign: "center" }}>
        <Button disabled={!page} onClick={() => setPage((prev) => prev - 1)}>
          Previous
        </Button>
        <span style={{ margin: "0px 10px" }}>Page {page + 1}</span>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>
      <BackTop>
        <div style={style}>
          <AiOutlineArrowUp />
        </div>
      </BackTop>
    </>
  );
}

export default Store;
