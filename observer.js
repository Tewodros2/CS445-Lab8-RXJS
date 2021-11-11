
window.onload = function () {
  empList();
  const { Observable } = rxjs;
  document.getElementById("refesh").onclick = function () {
    Observable.create(observer => observer.next(empList(document.getElementById("number-user").value)))
      .subscribe()
  };
};
function empList(n = 6) {
  const fileDisplay = document.getElementById("employee-list");
  fileDisplay.innerHTML = "";
  const { from } = rxjs;
  from(fetchUser("https://randomuser.me/api?results=" + n))
    .subscribe((obj) => {
      obj.results.forEach((emp) => {
        let showList = `<div class="container" style="display: flex;flex:2; gap: 20px;">      
         <div class="img" style=" gap: 20px; margin:30px; ">
             <img src="${emp.picture.large}" />
         </div>
         <div class="profile" style="gap:20px">
             <h2 >${emp.name.first} ${emp.name.last}</h2>
             <p>Location</p>
             <p>City: ${emp.location.city}</p>
             <p>Country: ${emp.location.country}</p>
             <p>State: ${emp.location.state}</p>
             <p>Street: ${emp.location.street.number + " " + emp.location.street.name}</p>
         </div> 
         </div>    
     `;
        const display = document.createElement("display");
        display.innerHTML = showList;
        fileDisplay.appendChild(display);
      });
    });

}
async function fetchUser(url) {
  let result = await fetch(url);
  console.log(result);
  return result.json();
  // console.log(json)
  // return json;
}
/**
 *
// //const name=document.querySelector("#name");
// //const email = document.querySelector("#email");
// //const phone = document.querySelector("#phone");

// const { Observable, fromEvent } = rxjs;
// const button = document.querySelector("refeshBtn");
// const obs$ = fromEvent(button, 'click');
// const fileDisplay = document.getElementById('employee-list');
// fileDisplay.innerHTML = '';
// const data$ = Observable.create(observer => {
//     fetch('https://randomuser.me/api/?results=10')
//         .then(response => response.json())
//         .then(data => observer.next(data))
// })
// obs$.subscribe(() => {
//     data$.subscribe((data) => {
//         data.results.forEach(emp => {
//             console.log(emp)
//             let template = `
//         <div class="col">
//             <img src="${emp.picture.large}" />
//         </div>
//         <div class="col">
//             <h3>${emp.name.first} ${emp.name.last}</h3>
//             <p>Location</p>
//             <p>City: ${emp.location.city}</p>
//             <p>Country: ${emp.location.country}</p>
//             <p>State: ${emp.location.state}</p>
//             <p>Street: ${emp.location.street.number + " " + emp.location.street.name}</p>
//         </div>
//     `;
//             const div = document.createElement('div');
//             div.classList = 'row border-top';
//             div.innerHTML = template;
//             fileDisplay.appendChild(div);
//         })
//     })
// })
 */
// const { fromEvent } = rxjs;
// const node = document.getElementById("search"); //create observable that emits click events
// const inputObs = fromEvent(node, "input"); //observable
// let obs = {
//   //this an observer
//   error: (err) => console.log(`Oops... ${err}`),
//   next: (event) => console.log(`You just typed ${event.target.value}!`),
//   complete: () => console.log(`Complete!`),
// };
// inputObs.subscribe(obs);
