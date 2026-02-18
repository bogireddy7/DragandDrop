const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
const fileList = document.getElementById("fileList");
const clearBtn = document.getElementById("clearBtn");
const uploadBtn = document.getElementById("uploadBtn");
const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const successMsg = document.getElementById("successMsg");

let files = [];

browseBtn.onclick = () => fileInput.click();
dropArea.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
  handleFiles(e.target.files);
};

dropArea.ondragover = (e) => {
  e.preventDefault();
  dropArea.classList.add("drag");
};

dropArea.ondragleave = () => {
  dropArea.classList.remove("drag");
};

dropArea.ondrop = (e) => {
  e.preventDefault();
  dropArea.classList.remove("drag");
  handleFiles(e.dataTransfer.files);
};

function handleFiles(selectedFiles){
  for(let file of selectedFiles){
    files.push(file);
  }
  renderFiles();
}

function renderFiles(){
  fileList.innerHTML="";
  files.forEach((file,index)=>{
    fileList.innerHTML+=`
      <div class="file-item">
        ${file.name}
        <span onclick="removeFile(${index})">✖</span>
      </div>
    `;
  });
}

function removeFile(index){
  files.splice(index,1);
  renderFiles();
}

clearBtn.onclick=()=>{
  files=[];
  renderFiles();
  progressContainer.style.display="none";
  successMsg.style.display="none";
};

uploadBtn.onclick=()=>{
  if(files.length===0) return;

  progressContainer.style.display="block";
  successMsg.style.display="none";
  let percent=0;

  let interval=setInterval(()=>{
    percent+=10;
    progress.style.width=percent+"%";
    if(percent>=100){
      clearInterval(interval);
      successMsg.style.display="block";
    }
  },300);
};
