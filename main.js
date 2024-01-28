
let myleads = [];
let input = document.getElementById("textset");
let savebtn = document.getElementById("save-input");
let leadsbox = document.getElementById("leads");
let deletedata = document.getElementById("delete-data");
let savetab = document.getElementById("save-tab");
deletedata.addEventListener("dblclick", function(){
     localStorage.clear();
     myleads = [];
     renderleads();
});
savebtn.addEventListener("click",function(){
   myleads.push(input.value);
   localStorage.setItem("leads", JSON.stringify(myleads));
   input.value = "";
   renderleads();
})

let savememory = JSON.parse(localStorage.getItem("leads"));
if(savememory){
   myleads = savememory;
   renderleads();
}
function renderleads(){
   let listItems = "";
     for(let i =0; i<myleads.length; i++){
      listItems += `
            <li>
                <a target='_blank' href='${myleads[i]}'>
                    ${myleads[i]}
                </a>
            </li>
        `
      }
      leadsbox.innerHTML = listItems;
};
savetab.addEventListener("click", function(){
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myleads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myleads) )
      renderleads();
  })
})