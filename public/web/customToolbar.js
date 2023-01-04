function registerCustomToolbarButtonHandlers() {
  const toolbarButtons = document.querySelectorAll(".sidebarToolButton");

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
 */
function openSidebarTool(buttonId, calledFromPDFEventBus = false) {
  const sidebar = document.getElementById("outerContainer");
  const button = document.getElementById(buttonId);
  const toolbarButtons = document.querySelectorAll(".sidebarToolButton");

  if (!button || !sidebar || !toolbarButtons) return;

  // Open the sidebar if it is not already open
  // Only open on button click
  if (!calledFromPDFEventBus && !sidebar?.classList.contains("sidebarOpen")) {
    document.getElementById("sidebarToggle").click();
  }

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
  const button = document.getElementById(buttonId);

  if (!button) return;

  document.getElementById("sidebarToggle").click();
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

PDFViewerApplication.initializedPromise.then(() => {
  const f = (e) => {
    if (typeof e.view === "number" && e.view != 0) {
      switch (e.view) {
        case 1:
          openSidebarTool("viewThumbnail", true);
          break;
        case 2:
          openSidebarTool("viewOutline", true);
          break;
        case 3:
          openSidebarTool("viewAttachments", true);
          break;
        case 4:
          openSidebarTool("viewLayers", true);
          break;
      }
    }
    PDFViewerApplication.eventBus._off("sidebarviewchanged", f);
  };
  PDFViewerApplication.eventBus.on("sidebarviewchanged", f);
});
