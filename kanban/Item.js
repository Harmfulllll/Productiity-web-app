/* represents an item */

import DropZone from "./DropZone.js";
import KanbanAPI from "./api.js";

export default class Item {
  /* constructor for each item */
  constructor(id, content, content2) {
    const bottomDropZone = DropZone.createDropZone();

    this.elements = {}; /* new obejct */
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(
      ".kanban__item-input"
    );
    this.elements.input2 = this.elements.root.querySelector(".due");

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.elements.input2.textContent = content2;
    this.content = content;
    this.content2 = content2;
    this.elements.root.appendChild(bottomDropZone); /* */

    /* when user clicks on input box and moves away */
    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();
      const newContent2 = this.elements.input2.textContent.trim();
      /*    console.log(this.content2);
      console.log(newContent2); */

      /* check if content changed */
      if (newContent == this.content) {
        return;
      }
      if (newContent2 == this.content2) {
        return;
      }

      this.content = newContent;
      this.content2 = newContent2;

      KanbanAPI.updateItem(
        /* API.JS */
        id,
        {
          content: this.content,
        },
        {
          content2: this.content2,
        }
      );
    };

    this.elements.input.addEventListener("blur", onBlur);
    this.elements.input2.addEventListener("blur", onBlur);

    this.elements.root.addEventListener("dblclick", () => {
      const check = confirm("Are you sure you want to delete this item?");

      if (check) {
        KanbanAPI.deleteItem(id);

        /* remove from HTML */
        this.elements.input.removeEventListener("blur", onBlur);
        this.elements.input2.removeEventListener("blur", onBlur);

        /* parent element refers to that column */
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });
    /* listen for drag start */

    this.elements.root.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", id);
      /* datatransfer component of event object */
    });

    this.elements.input.addEventListener("drop", (e) => {
      e.preventDefault();
      /* prevent the text from apperaing into box */
    });
    this.elements.input2.addEventListener("drop", (e) => {
      e.preventDefault();
    });
  }

  static createRoot() {
    /* container item for each item */
    const range = document.createRange();

    range.selectNode(document.body);

    /* Input boxes */
    return range.createContextualFragment(`
			<div class="kanban__item" draggable="true">
				<div class="kanban__item-input" contenteditable>
        </div>
        <div class="due" placeholder="Due date:"
        contenteditable="true">
        </div>
        </div>
			</div>
		`).children[0];
  }
}
/*   */
