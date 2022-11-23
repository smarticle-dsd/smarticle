function registerCustomToolbarButtonHandlers() {
  const buttons = ["referenceDetails", "knowledgeGraph", "summary"];

  buttons.forEach((btn) => {
    document.getElementById(btn).onclick = () => {
      const sidebarContent = document.getElementById("sidebarContent");
      for (const child of sidebarContent.children) {
        child.classList.add("hidden");
      }

      document.getElementById(`${btn}View`)?.classList.remove("hidden");
    };
  });
}

function editToolBar() {
  /* Moving elements*/
  //addElemFromSecondaryToPrimary("previous","toolbarViewerMiddle")
  /* Hiding elements */
  //removeElement("secondaryToolbarToggle")
  // removeElement("editorInk");
  // removeElement("editorFreeText");
  registerCustomToolbarButtonHandlers();
}

function addElemFromSecondaryToPrimary(elemID, parentID) {
  let element = document.getElementById(elemID);
  let parent = document.getElementById(parentID);
  element.style.minWidth = "0px";
  element.innerHTML = "";
  parent.append(element);
}
function removeElement(elemID) {
  let element = document.getElementById(elemID);
  element.parentNode.removeChild(element);
}

window.onload = editToolBar;
