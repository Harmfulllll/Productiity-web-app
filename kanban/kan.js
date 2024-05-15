import Column from "./column.js";

/* Make user interface */
/* With export we can import class to other files */
export default class Kanban {
  constructor(root) {
    /* refers to the div kanban */
    /* Root element  */
    this.root = root; /* keep a reference */

    Kanban.columns().forEach((column) => {
      /* From column.js */
      const columnView = new Column(column.id, column.title);

      this.root.appendChild(columnView.elements.root);
    });
  }

  static columns() {
    return [
      {
        id: 1 /* column id  */,
        title: "Not Started",
      },
      {
        id: 2,
        title: "In Progress",
      },
      {
        id: 3,
        title: "Completed",
      },
    ];
  }
}
