import { getApiData } from "../services/apiTestData";
import shared from "./sharedPageStyles.module.css";
import styles from "./Test.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import ItemsList from "../components/ItemsList.jsx";
import Loader from "../components/Loader.jsx";

function Test() {
  const { isLoading, data, error } = getApiData(5);

  if (error) {
    return (
      <div id="div-parent-layout" className={shared.parentDiv}>
        <PageNav />
        <div className={`${styles.test} ${shared.sharedPage}`}>
          <section>
            <h2>Couldn't load test items: {error}</h2>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div id="div-parent-layout" className={shared.parentDiv}>
      <PageNav />
      <div className={`${styles.test} ${shared.sharedPage}`}>
        <section>
          {isLoading ? <Loader /> : <ItemsList items={data} />}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Test;
