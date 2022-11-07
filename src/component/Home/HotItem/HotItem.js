import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillFire, AiOutlineShoppingCart } from "react-icons/ai";
import { Button, Carousel, Skeleton, Spin, Image } from "antd";
import { Link } from "react-router-dom";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useQuery } from "@apollo/client";
import { ListCarousel } from "../../../config/graphql/query/query";

const contentStyle = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
};

function HotItem() {
  const { data, loading, error } = useQuery(ListCarousel);

  if (loading) {
    return <Skeleton active />;
  }

  if (error) {
    console.log(error);
    return null;
  }
  return (
    <>
      <p style={{ fontSize: "30px" }}>
        <AiFillFire style={{ color: "red" }} />
        Produk Terbaru
      </p>
      <div>
        <Carousel autoplay>
          {data?.toko_product.map((product) => (
            <div key={product.id}>
              <h3 style={contentStyle}>
                <div>
                  <Image src={product.image} style={{ height: "300px" }} />
                </div>
                <div>
                  <div>
                    <div style={{ height: "50px" }}>{product.nama}</div>
                    <div style={{ height: "50px" }}>
                      <IntlProvider locale="id-ID">
                        <FormattedNumber
                          value={product.harga}
                          style="currency"
                          currency="IDR"
                        />
                      </IntlProvider>
                    </div>
                    <Link to={`/store/${product.id}`}>
                      <Button
                        style={{ color: "#364d79" }}
                        shape="round"
                        icon={<AiOutlineShoppingCart />}
                      >
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </h3>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default HotItem;
