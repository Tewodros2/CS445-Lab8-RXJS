
window.onload = function () {
  empList();
  const { Observable } = rxjs;
  document.getElementById("refesh").onclick = function () {
    Observable.create(observer => observer.next(empList(document.getElementById("number-user").value)))
      .subscribe()
  };
};
async function fetchUser(url) {
  let result = await fetch(url);
  console.log(result);
  return result.json();
}

function empList(n = 6) {
  const fileDisplay = document.getElementById("employeeList");
  fileDisplay.innerHTML = "";
  const { from } = rxjs;
  from(fetchUser("https://randomuser.me/api?results=" + n)).subscribe((obj) => {
    obj.results.forEach((emp) => {
      let showList = `<div class="container" style="display: flex;flex:2; gap: 20px;">      
         <div class="img" style=" gap: 20px; margin:30px; ">
             <img src="${emp.picture.large}" />
         </div>
         <div class="profile" style="gap:20px">
             <h2 >${emp.name.first} ${emp.name.last}</h2>
             <p>Location</p>
             <p>Street: ${emp.location.street.number + " " + emp.location.street.name}</p>
             <a>${emp.location.city}</a>
             <a>, ${emp.location.state}</a>
             <a>, ${emp.location.country}</a> 
         </div> 
         </div>    
     `;
      const display = document.createElement("display");
      display.innerHTML = showList;
      fileDisplay.appendChild(display);
    });
  });
}

