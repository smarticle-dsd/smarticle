function registerCustomToolbarButtonHandlers() {
  const toolbarButtons = document.querySelectorAll(
    "#sidebarViewButtons button",
  );

  for (const toolbarBtn of toolbarButtons) {
    toolbarBtn.addEventListener("click", (e) => {
      const sidebarContent = document.getElementById("sidebarContent");
      for (const child of sidebarContent.children) {
        if (child.id !== e.target.id) child.classList.add("hidden");
      }

      for (const toolbarBtn2 of toolbarButtons) {
        toolbarBtn2.classList.remove("toggled");
      }

      document.getElementById(`${e.target.id}View`)?.classList.remove("hidden");
      document.getElementById(`${e.target.id}`)?.classList.add("toggled");
    });
  }
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

//toggles sidebar and reference toolbar on clicking the reference link
const toggleRefTool = () => {
  let referenceid = document.getElementById("referenceDetailsView");

  const toolbarButtons = document.querySelectorAll(
    "#sidebarViewButtons button",
  );
  const sidebarContent = document.getElementById("sidebarContent");
  for (const child of sidebarContent.children) {
    if (child.id !== referenceid) child.classList.add("hidden");
  }
  for (const toolbarBtn2 of toolbarButtons) {
    toolbarBtn2.classList.remove("toggled");
  }
  document
    .getElementById(`${"referenceDetails"}View`)
    ?.classList.remove("hidden");
  document.getElementById(`${"referenceDetails"}`)?.classList.add("toggled");

  document.getElementById(`${"outerContainer"}`)?.classList.add("sidebarOpen");
  document.getElementById(`${"sidebarToggle"}`)?.classList.add("toggled");
};

window.onload = editToolBar;
