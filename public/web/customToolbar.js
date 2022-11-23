let rightSidebarOpen = false;

function toggleRightSidebar(tool) {
  rightSidebarOpen = !rightSidebarOpen;
  const containerElement = document.getElementById("outerContainer");
  const rightSidebarElement = document.getElementById("rightSidebarContainer");

  if (rightSidebarOpen) {
    containerElement.classList.add("rightSidebarMoving", "rightSidebarOpen");
  } else {
    containerElement.classList.remove("rightSidebarMoving", "rightSidebarOpen");
  }
}

function editToolBar() {
  /* Moving elements*/
  //   addElemFromSecondaryToPrimary("previous", "toolbarViewerMiddle");
  /* Hiding elements */
  //removeElement("secondaryToolbarToggle")
  removeElement("editorInk");
  removeElement("editorFreeText");

  document.getElementById("referenceDetails").onclick = toggleRightSidebar;
  document.getElementById("knowledgeGraph").onclick = toggleRightSidebar;
  document.getElementById("summary").onclick = toggleRightSidebar;
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
