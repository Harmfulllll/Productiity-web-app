import KanbanAPI from "./api.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
  /* this class is a single column from UI */
  constructor(id, title) {
    /* From kan.js */

    const topDropZone = DropZone.createDropZone(); /* from dropzone.js */

    this.elements = {}; /* new object to store HTML elements */
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector(
      ".kanban__column-title"
    );
    this.elements.items = this.elements.root.querySelector(
      ".kanban__column-items"
    );

    this.elements.addItem =
      this.elements.root.querySelector(".kanban__add-item");

    this.elements.root.dataset.id = id; /* column id */
    this.elements.title.textContent = title;
    this.elements.items.appendChild(topDropZone);

    this.elements.addItem.addEventListener("click", () => {
      const newItem = KanbanAPI.insertItem(id, "", "");
      /* Take input and render it */
      this.renderItem(newItem);
    });

    /* After that render every item */
    /* From API.js */
    KanbanAPI.getItems(id).forEach((item) => {
      this.renderItem(item);
    });
  }

  static createRoot() {
    const range = document.createRange();
    /* Range of elements */
    range.selectNode(document.body);
    /* Select the entire HTML body */

    return range.createContextualFragment(`
			<div class="kanban__column">
				<div class="kanban__column-title"></div>
				<div class="kanban__column-items">

				<button class="kanban__add-item" type="button">Add New</button>
			</div>
		`).children[0]; /* Represents the first child , that is first div here */
  }

  renderItem(data) {
    const item = new Item(data.id, data.content, data.content2);

    this.elements.items.appendChild(item.elements.root);
  }
}
