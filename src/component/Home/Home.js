import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BackTop } from "antd";
import { AiOutlineArrowUp } from "react-icons/ai";
import Form from "./Form/Form";
import HotItem from "./HotItem/HotItem";
import LandingPage from "./LandingPage/LandingPage";
import Example from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

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

function Home() {
  return (
    <div>
      <Example />
      <br></br>
      <LandingPage />
      <br></br>
      <HotItem />
      <br></br>
      <Form />
      <Footer />
      <BackTop>
        <div style={style}>
          <AiOutlineArrowUp />
        </div>
      </BackTop>
    </div>
  );
}
export default Home;
