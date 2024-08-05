import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
