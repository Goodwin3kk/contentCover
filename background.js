function switchPageCover() {

  const contentCoverId ="contentCover";
  const contentCoverHeaderId ="contentCoverHeader";
  var existingCover = document.getElementById(contentCoverId);

  if(existingCover){
    document.body.removeChild(existingCover);
    return;
  }
  
  var contentCover = document.createElement("div");
  document.body.appendChild(contentCover);

  contentCover.id = contentCoverId;
  contentCover.style.position = 'absolute';
  contentCover.style.top = '0';
  contentCover.style.bottom = '0';
  contentCover.style.zIndex = '99999';
  contentCover.style.backgroundColor = '#f1f1f1';
  contentCover.style.height = '500px';
  contentCover.style.width = '500px';

  var contentCoverHeader = document.createElement("div");
  contentCover.appendChild(contentCoverHeader);
  contentCoverHeader.id = contentCoverHeaderId;
  contentCoverHeader.style.padding = '10px';
  contentCoverHeader.style.cursor = ' move';
  contentCoverHeader.style.backgroundColor = '#2196F3';

  dragElement(document.getElementById(contentCoverId));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(contentCoverHeaderId)) {
      document.getElementById(contentCoverHeaderId).onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    var resizer = document.createElement('div');

    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.cursor = ' se-resize';
    resizer.style.position = 'absolute';
    resizer.style.right = '0';
    resizer.style.bottom = '0';
    resizer.style.backgroundColor = 'blue';
    resizer.parentDiv = elmnt;
    elmnt.appendChild(resizer);
    resizer.addEventListener('mousedown', initDrag, false);

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    var startX, startY, startWidth, startHeight;

    function initDrag(e) {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(elmnt).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(elmnt).height, 10);
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
      elmnt.style.width = (startWidth + e.clientX - startX) + 'px';
      elmnt.style.height = (startHeight + e.clientY - startY) + 'px';
    }

    function stopDrag(e) {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: switchPageCover
  });
});