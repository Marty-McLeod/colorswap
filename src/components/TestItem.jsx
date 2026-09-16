import styles from "./TestItem.module.css";


function TestItem({ item }) {
    return (
        <div className={ styles.testitem }>
            <h3>userId: { item.userId }</h3>
            <p>id: { item.id }</p>
            <h4>title: { item.title } </h4>
            <p>completed: { item.completed }</p>
        </div>
    )
}

export default TestItem;
