import styles from "./ItemsList.module.css";


function ItemsList({ items }) {
    console.log("ItemsList>items:", items);

    return (
        <div className={ styles.itemsList }>
        {   items?.map((item) => 
            (   <>
                    <h3>userId: { item.userId }</h3>
                    <p>id: { item.id }</p>
                    <h4>title: { item.title } </h4>
                    <p>completed: { item.completed }</p>
                </>
            ))
        }
        </div>
    )
}

export default ItemsList;
