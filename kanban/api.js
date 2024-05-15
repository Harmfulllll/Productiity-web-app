export default class KanbanAPI {
  /* static class */
  /* Get the column items */
  static getItems(columnId) {
    /* check if input id and items id is same */
    const column = read().find((column) => column.id == columnId);

    if (!column) {
      return [];
    }

    return column.items;
  }

  static insertItem(columnId, content, content2) {
    const data = read(); /* read from storage */
    /* check if input id and items id is same */
    const column = data.find((column) => column.id == columnId);
    const item = {
      /* new object / new item */
      id: Math.floor(Math.random() * 200000) /* set unique id for each item */,
      content /* data */,
      content2 /* due date */,
    };

    if (!column) {
      throw new Error("Column does not exist.");
    }

    column.items.push(item); /* push to the bottom */
    save(data);

    return item;
  }

  static updateItem(itemId, newdata, newdata2) {
    const data = read(); /* read the data */
    /* array destructuring */
    /* finding column id of that data */
    const [item, currentColumn] = (() => {
      for (const column of data) {
        /* find data with input item id */
        const item = column.items.find((item) => item.id == itemId);

        if (item) {
          return [item, column];
        }
      }
    })();

    if (!item) {
      throw new Error("Item not found.");
    }
    /* update item content */

    item.content =
      newdata.content === undefined ? item.content : newdata.content;

    item.content2 =
      newdata2.content2 === undefined ? item.content2 : newdata2.content2;

    // Update column and position

    if (newdata.columnId !== undefined && newdata.position !== undefined) {
      const targetColumn = data.find((column) => column.id == newdata.columnId);

      if (!targetColumn) {
        throw new Error("Target column does not exist.");
      }

      // Delete the item from it's current column
      /* delete 1 item */
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      // Move item into it's new column and position

      targetColumn.items.splice(newdata.position, 0, item);
    }

    save(data);
  }

  static deleteItem(itemId) {
    const data = read();

    /* looping through all columns of data */
    for (const column of data) {
      const item = column.items.find((item) => item.id == itemId);

      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }
    }

    save(data);
  }
}

/* read data */

function read() {
  /* get the item */
  const json = localStorage.getItem("kanban-data");

  /* There is no data */
  if (!json) {
    /* return deafult data */
    return [
      {
        id: 1,
        items: [] /* empty */,
      },
      {
        id: 2,
        items: [],
      },
      {
        id: 3,
        items: [],
      },
    ];
  }
  /* return data */

  return JSON.parse(json); /* change json to js object  */
}

/* Save to the local storage */

function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}
