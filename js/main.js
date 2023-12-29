var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var searchItem = document.getElementById("searchItem");
var submitbtn = document.getElementById("submitbtn");
var urlRegex =  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i;
var nameRegex = /^\w{3,}$/i
var infoList = [];

if (localStorage.getItem("allInfo") != null){
infoList= JSON.parse(localStorage.getItem("allInfo"));
displayData ();

}
submitbtn.addEventListener("click",function(){
   if (siteNameInput.classList.contains("is-valid") &&
   siteUrlInput.classList.contains("is-valid"))
    { var info = {
        name: (siteNameInput.value),
        url: (siteUrlInput.value),
    }
    infoList.push(info);
    localStorage.setItem("allInfo" , JSON.stringify (infoList));
    clear();
    displayData ();
    siteNameInput.classList.remove("is-vaild")
    siteUrlInput.classList.remove("is-valid")
    }

});



function clear(){
    siteNameInput.value="";
    siteUrlInput.value= "";
}
function displayData(){
    var data="";
    for(var i=0; i<infoList.length; i++)
    {
        data +=`<tr> <td>${[i]}</td>
            <td>${infoList[i].name}</td>
            <td>${infoList[i].url}</td>
            <td>
            <a href="${infoList[i].url}"
             target="_blank" 
             class="btn btn-success
              text-light
               px-3">
            <i class="fa-solid fa-eye"></i> Visit </a> </td>

            <td><button onclick="deleteInfo(${i});" class="btn btn-danger text-light px-3">
            <i class="fa-solid fa-trash-can"></i> Delete</button></td>`
    }
            document.getElementById("tableBody").innerHTML= data ;
}
function deleteInfo(index)
{
    infoList.splice(index,1)
    localStorage.setItem("allInfo" , JSON.stringify (infoList));
    displayData ();
}
function searchInput(){
    var term = searchItem.value;
    var data="";
    for(var i=1; i<infoList.length; i++)
    {
        if (infoList[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
            
        data +=`<tr> <td>${[i]}</td>
        <td>${infoList[i].name}</td>
            <td>${infoList[i].url}</td>
            <td><button class="btn btn-success text-light px-3">
            <i class="fa-solid fa-eye"></i> Visit</button> </td>
            <td><button onclick="deleteInfo(${i});" class="btn btn-danger text-light px-3">
            <i class="fa-solid fa-trash-can"></i> Delete</button></td>`

        }
    }
            document.getElementById("tableBody").innerHTML= data ;    
}

siteNameInput.addEventListener("input", function () {
  validate(siteNameInput, nameRegex);
});
siteUrlInput.addEventListener("input", function () {
  validate(siteUrlInput, urlRegex);
});

function validate(element,regex){
    var testRegex = regex
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        submitbtn.removeAttribute("data-bs-toggle","modal")
        submitbtn.setAttribute("data-bs-target=","#exampleModal")


    }else{
        element.classList.remove("is-valid")
        element.classList.remove("is-invalid")
        submitbtn.setAttribute("data-bs-toggle","modal")
        submitbtn.setAttribute("data-bs-target=","#exampleModal")

    }
};
