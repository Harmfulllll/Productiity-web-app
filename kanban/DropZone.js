import KanbanAPI from "./api.js";

export default class DropZone {
  /* method */
  static createDropZone() {
    const range = document.createRange();
    /* Range of elements */

    range.selectNode(document.body);
    /* Select the entire body of HTML */

    const dropZone = range.createContextualFragment(`
			<div class="kanban__dropzone"></div>
		`).children[0];
    /* create dropzone */

    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault(); /* prevent accidents  */
      dropZone.classList.add("kanban__dropzone--active");
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("kanban__dropzone--active");
    });

    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("kanban__dropzone--active");

      /* HTML element for column where we are dropping */

      const columnElement = dropZone.closest(".kanban__column");
      const columnId = Number(columnElement.dataset.id); /* column id */

      /* Get all dropzones in that column */
      const dropZonesInColumn = Array.from(
        columnElement.querySelectorAll(".kanban__dropzone")
      );

      const droppedIndex = dropZonesInColumn.indexOf(dropZone);

      /* which item we dropped */
      const itemId = Number(e.dataTransfer.getData("text/plain"));
      const droppedItemElement = document.querySelector(
        `[data-id="${itemId}"]`
      );

      const insertAfter = dropZone.parentElement.classList.contains(
        "kanban__item"
      )
        ? dropZone.parentElement
        : dropZone;

      /* if dropping item to its own dropzone */
      if (droppedItemElement.contains(dropZone)) {
        return;
      }

      insertAfter.after(droppedItemElement);
      KanbanAPI.updateItem(itemId, {
        columnId,
        position: droppedIndex,
      });
    });

    return dropZone;
  }
}
