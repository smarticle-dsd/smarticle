function registerCustomToolbarButtonHandlers() {
  const toolbarButtons = document.querySelectorAll(".sidebarToolButton");

  const oldPdfJsHistory = JSON.parse(localStorage.getItem("pdfjs.history"));
  const newPdfJsHistory = {
    files: oldPdfJsHistory.files.map((el) => ({
      ...el,
      sidebarView: 1,
    })),
  };

  localStorage.setItem("pdfjs.history", JSON.stringify(newPdfJsHistory));
  for (const toolbarBtn of toolbarButtons) {
    toolbarBtn.addEventListener("click", (e) => {
      toggleSidebarTool(e.target.id);
    });
  }
}

/**
 * Opens the sidebar tool with `toolId`
 *
 * If the tool is already open, doesn't do anything
 *
 * @param {buttonId} buttonId id of the button that controls the tool
 * @param {viewId} viewId id of the view that is controlled
 */
function openSidebarTool(buttonId) {
  const sidebar = document.getElementById("outerContainer");
  const button = document.getElementById(buttonId);
  const toolbarButtons = document.querySelectorAll(".sidebarToolButton");

  if (!button || !sidebar || !toolbarButtons) return;

  sidebar?.classList.add("sidebarOpen");

  const sidebarContent = document.getElementById("sidebarContent");
  for (const child of sidebarContent.children) {
    child.classList.add("hidden");
  }

  for (const toolbarBtn2 of toolbarButtons) {
    toolbarBtn2.classList.remove("active");
  }

  document
    .getElementById(button.dataset.sidebarPage)
    ?.classList.remove("hidden");
  button?.classList.add("active");
}

/**
 * Closes the sidebar tool with `toolId`
 *
 * If the tool is already closed, doesn't do anything
 *
 * @param {buttonId} buttonId id of the button that controls the tool
 */
function closeSidebarTool(buttonId) {
  const sidebar = document.getElementById("outerContainer");
  const button = document.getElementById(buttonId);

  if (!button) return;

  sidebar?.classList.remove("sidebarOpen");
  sidebar?.classList.add("sidebarClosed");
  button?.classList.remove("active");
}

/**
 * Closes the sidebar tool with `toolId` if that tool is open,
 * and vice versa.
 *
 * @param {buttonId} buttonId id of the button that controls the tool
 */
function toggleSidebarTool(buttonId) {
  const button = document.getElementById(buttonId);

  if (!button) return;

  if (button.classList.contains("active")) {
    closeSidebarTool(buttonId);
  } else {
    openSidebarTool(buttonId);
  }
}

function editToolBar() {
  /* Moving elements*/
  //addElemFromSecondaryToPrimary("previous","toolbarViewerMiddle")
  removeElement("openFile");
  removeElement("secondaryOpenFile");
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
