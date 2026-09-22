import styles from "./ItemsList.module.css";

function ItemsList({ items }) {
  return (
    <>
      <ul className={styles.itemsList}>
        {items.map((item) => (
          <li key={item.id}>
            <h3>userId: {item.userId}</h3>
            <p>id: {item.id}</p>
            <h4>title: {item.title} </h4>
            <p>Completed: {item.completed ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemsList;
