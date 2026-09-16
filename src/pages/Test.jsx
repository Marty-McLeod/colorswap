import shared from "./sharedPageStyles.module.css";
import styles from "./Test.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import TestItem from "../components/TestItem";
import { getTestData5 } from "../services/apiTestData";
import { URL_JSONPLACEHOLDER } from "../data/urls.js";
import Loader from "../components/Loader.jsx";


function Test() {
    // const testItems = useLoaderData();
    const testItems = getTestData5();

    console.log("testItems:", testItems);

    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.test} ${shared.sharedPage}`}>
            {
                testItems ?? (
                     <section>
                    {
                            testItems.map((item) => (
                                <TestItem item={item} key={item.id} />
                            ))
                    }
                    </section> 
                )
            }
           
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
