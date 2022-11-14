function editToolBar(){
    //when the page is resized, the viewer hides and move some buttons around.
    //this function forcibly show all buttons so none of them disappear or re-appear on page resize
    

    /* Changing icons */
    
    addElemFromSecondaryToPrimary("previous","toolbarViewerMiddle")
    /* Hiding elements */
    removeElement("secondaryToolbarToggle")
    removeElement("editorInk")
    removeElement("editorFreeText")
  
}

function addElemFromSecondaryToPrimary(elemID, parentID){
    let element = document.getElementById(elemID);
    let parent = document.getElementById(parentID);
    element.style.minWidth = "0px";
    element.innerHTML =""
    parent.append(element);
}
function removeElement(elemID){
    let element = document.getElementById(elemID);
    element.parentNode.removeChild(element);
}

window.onload = editToolBar