import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AiOutlineArrowUp,
  AiFillDelete,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  DeleteAllCart,
  DeleteCartProduct,
  UpdateCartProduct,
} from "../../config/graphql/mutation/mutation";
import {
  BadgeCart,
  SubscriptionCart,
} from "../../config/graphql/subscription/subscription";
import { BackTop, Button, Image, Popconfirm, Space, Spin } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useSubscription } from "@apollo/client";
import { FormattedNumber, IntlProvider } from "react-intl";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { Table } from "reactstrap";
import { useState } from "react";

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

function Cart() {
  const [size, setSize] = useState("large");
  const { data, loading, error } = useSubscription(SubscriptionCart);
  const {
    data: dataSum,
    loading: loadingSum,
    error: errorSum,
  } = useSubscription(BadgeCart);

  const [deleteCart, { loading: loadingDelete }] = useMutation(
    DeleteCartProduct,
    {
      refetchQueries: [SubscriptionCart],
    }
  );

  const [deleteAllCart, { loading: loadingDeleteAll }] = useMutation(
    DeleteAllCart,
    {
      refetchQueries: [SubscriptionCart],
    }
  );

  const [updateCart, { loading: loadingUpdate }] = useMutation(
    UpdateCartProduct,
    {
      refetchQueries: [SubscriptionCart],
    }
  );

  if (loading || loadingDelete || loadingDeleteAll || loadingUpdate) {
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

  const hapusCart = (idx) => {
    deleteCart({
      variables: {
        id: idx,
      },
    });
  };

  const hapusAll = () => {
    deleteAllCart();
  };

  const updateItemCart = (id, jumlah, total, harga) => {
    updateCart({
      variables: {
        id,
        jumlah,
        total,
        harga,
      },
    });
  };

  const handleUpdateCartQty = (id, jumlah, total, harga) => {
    updateItemCart(id, jumlah, total, harga);
  };

  return (
    <>
      <div>
        <h3 style={{ textAlign: "start", padding: "0px 20px" }}>
          <BsFillCartFill color="#1890FF" />
          Cart
        </h3>
        <div style={{ padding: "0px 20px" }}>
          <Table borderless hover responsive striped>
            <thead>
              <tr style={{ textAlign: "start" }}>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Hapus</th>
              </tr>
            </thead>
            {data?.toko_order.map((product) => (
              <tbody>
                <tr style={{ textAlign: "start" }}>
                  <th scope="row">
                    <Image
                      src={product.product.image}
                      style={{ height: "50px" }}
                    />
                  </th>
                  <td>{product.product.nama}</td>
                  <td>
                    <div style={{ width: "100px" }}>
                      <Button
                        type="primary"
                        shape="circle"
                        size={"small"}
                        onClick={() =>
                          product.jumlah > 1
                            ? handleUpdateCartQty(
                                product.id,
                                product.jumlah - 1,
                                (product.total =
                                  (product.jumlah - 1) * product.product.harga)
                              )
                            : hapusCart(product.id)
                        }
                      >
                        <AiOutlineMinus />
                      </Button>
                      <span style={{ padding: "0px 5px" }}>
                        {product.jumlah}
                      </span>
                      <Button
                        type="primary"
                        shape="circle"
                        size={"small"}
                        onClick={() =>
                          handleUpdateCartQty(
                            product.id,
                            product.jumlah + 1,
                            (product.total =
                              (product.jumlah + 1) * product.product.harga)
                          )
                        }
                      >
                        <AiOutlinePlus />
                      </Button>
                    </div>
                  </td>
                  <td>
                    <IntlProvider locale="id-ID">
                      <p>
                        <FormattedNumber
                          value={product.total}
                          style="currency"
                          currency="IDR"
                        />
                      </p>
                    </IntlProvider>
                  </td>
                  <td>
                    <Popconfirm
                      placement="top"
                      title="Yakin Mau Hapus？"
                      icon={
                        <QuestionCircleOutlined
                          style={{
                            color: "red",
                          }}
                        />
                      }
                      onConfirm={() => hapusCart(product.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="danger" shape="round" size={size}>
                        <AiFillDelete />
                      </Button>
                    </Popconfirm>
                  </td>
                </tr>
              </tbody>
            ))}
            <IntlProvider locale="id-ID">
              <p>Total Harga:</p>
              <FormattedNumber
                value={dataSum?.toko_order_aggregate.aggregate.sum.total}
                style="currency"
                currency="IDR"
              />
            </IntlProvider>
          </Table>
        </div>

        <div style={{ textAlign: "center" }}>
          <Space>
            <Link to={`/checkout`}>
              <Button
                onClick={hapusAll}
                type="primary"
                shape="round"
                size={size}
              >
                <IoBagCheckOutline />
                Checkout
              </Button>
            </Link>
            <Popconfirm
              placement="top"
              title="Yakin Mau Hapus？"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              onConfirm={hapusAll}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" shape="round" size={size}>
                <AiFillDelete />
                Hapus Semua
              </Button>
            </Popconfirm>
          </Space>
        </div>
        <BackTop>
          <div style={style}>
            <AiOutlineArrowUp />
          </div>
        </BackTop>
      </div>
    </>
  );
}
export default Cart;
