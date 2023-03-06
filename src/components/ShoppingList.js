import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  let url = "http://localhost:4000/items"

  useEffect(() => {
    fetch(url)
    .then((resp) => resp.json())
    .then((items) => setItems(items))
  },[])

  function handleDelete(deletedItem){
    const updatedItems = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  function handleUpdatedItem(updatedItem){
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onDeleteItem={handleDelete} onUpdatedItem={handleUpdatedItem} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
