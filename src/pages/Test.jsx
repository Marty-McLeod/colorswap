import shared from "./sharedPageStyles.module.css";
import styles from "./Test.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import ItemsList from "../components/ItemsList.jsx";
import { getTestData5 } from "../services/apiTestData";
import { URL_JSONPLACEHOLDER } from "../data/urls.js";
import Loader from "../components/Loader.jsx";


function Test() {
    const { isLoading, testItems, error } = getTestData5();
    console.log(testItems);

    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.test} ${shared.sharedPage}`}>
                <section>
                    {
                        isLoading && <Loader/>
                    }   
                    { !isLoading && (
                                <ItemsList items={testItems}/>
                            )
                    }
                </section>              
            </div>
            <Footer/>
        </div>
    )
}

// export async function loader() {
//     const items = await getTestData5();
//     console.log(items);

//     return items;
// }

export default Test;
