var prevText="";
 var stateItem=function(){
               var text=document.querySelector('.input').value;
               var el,e;

               if(text !== ""){
                 fetch('https://cors-anywhere.herokuapp.com/https://api.covidindiatracker.com/state_data.json') 
                 .then(data=>{
                   return data.json()
                 })
                 .then(dataJson=>{
                      if(prevText!="" && prevText != text){
               	        console.log(prevText);
               document.querySelector('select').innerHTML='';
                      }       
                      
                      for(var i=0;i<dataJson.length;i++){
                           if(dataJson[i].state.toUpperCase()===text.toUpperCase()){
                               
                               var x=dataJson[i].active;
                               var y=dataJson[i].confirmed;
                               var z=dataJson[i].deaths;
                               var r=dataJson[i].recovered;
                               break;
                           }else{
                               x=-1;
                           }
                      }

        
                      if(x===-1){
                        document.querySelector('.input').value="";
                          document.querySelector('.result').textContent='0';
                          document.querySelector('.res').textContent=`0`;
                          document.querySelector('.death').textContent="0";
                          document.querySelector('.recover').textContent='0';
                          alert('Try Again');                
                      }else{
                        //document.querySelector('.input-1').value="";
                        prevText=text;
                          document.querySelector('.state-1').textContent="";
                          document.querySelector('.result-1').textContent='0';
                          document.querySelector('.res-1').textContent=`0`;
                          document.querySelector('.death-1').textContent="0";
                          document.querySelector('.recover-1').textContent='0';  
                        document.querySelector('.state').textContent=text.toUpperCase();  
                        document.querySelector('.result').textContent=`${x}`;
                        document.querySelector('.res').textContent=`${y}`;
                        document.querySelector('.death').textContent=`${z}`;
                        document.querySelector('.recover').textContent=`${r}`;
                        //document.querySelector('.input-1').value=dataJson[i].districtData[0].name;
                        var html='<option  value="%vol%">%v%</option>';
                        for(var x=0;x<dataJson[i].districtData.length;x++){
                            newHtml=html.replace('%v%',dataJson[i].districtData[x].name);
                             newHtml=newHtml.replace('%id%',dataJson[i].districtData[x].name);
                            newHtml=newHtml.replace('%vol%',dataJson[i].districtData[x].name); 
                            
                            document.querySelector('#cars').insertAdjacentHTML('beforeend',newHtml);

                        }
                        
                      }
                    
                 })
               }
               else{
                   alert("Your input field is empty.");
               }
           };


            document.querySelector('.btn').addEventListener('click',stateItem);  

            
           

         var district=function(){
            var x,distext,y;
            var text=document.querySelector('.input').value;
            //distext=document.querySelector('.input-1').value;
            var e = document.getElementById("cars");        
            var strUser = e.options[e.selectedIndex].value;
            distext=strUser;
            if(text !== "" && distext!=""){
                 fetch('https://cors-anywhere.herokuapp.com/https://api.covidindiatracker.com/state_data.json') 
                 .then(data=>{
                   return data.json()
                 })
                 .then(dataJson=>{
                      //For knowing the state
                      for(var i=0;i<dataJson.length;i++){
                           if(dataJson[i].state.toUpperCase()===text.toUpperCase()){
                               x=i;
                               break;
                           }else{
                               x=-1;
                           }
                      }
                      //For knowing the district
                      console.log(dataJson[x].districtData);
                     for(var i=0;i<dataJson[x].districtData.length;i++){
                        if(dataJson[x].districtData[i].name.toUpperCase()===distext.toUpperCase()){
                               var c=dataJson[x].districtData[i].zone;
                               var d=dataJson[x].districtData[i].confirmed;
                               var e=dataJson[x].districtData[i].deaths;
                               var f=dataJson[x].districtData[i].recovered;
                               y=x;
                               break;
                           }else{
                               y=-1;    
                           }
                     }

                     if(y===-1){
                        //document.querySelector('.input-1').value="";
                          document.querySelector('.result-1').textContent='0';
                          document.querySelector('.res-1').textContent=`0`;
                          document.querySelector('.death-1').textContent="0";
                          document.querySelector('.recover-1').textContent='0';
                          alert('Try Again');                
                      }else{
                        document.querySelector('.state-1').textContent=distext.toUpperCase();
                        document.querySelector('.res-1').textContent=`${d}`;
                        document.querySelector('.death-1').textContent=`${e}`;
                        document.querySelector('.recover-1').textContent=`${f}`;
                        if(c==="RED"){ 
                         document.querySelector('.result-1').style.color='red'; 	
                         document.querySelector('.result-1').textContent=`${c}`;
                         }else if(c==="GREEN"){
                         document.querySelector('.result-1').style.color='green'; 
                         document.querySelector('.result-1').textContent=`${c}`;
                         }else{
                         document.querySelector('.result-1').style.color='orange'; 
                         document.querySelector('.result-1').textContent=`${c}`;
                         } 

                        //document.querySelector('.input-1').value="";
                      } 
                 });
            }
            else{
                   alert("Your input field is empty.");
               }
         }

          document.querySelector('.btn-1').addEventListener('click',district);


 
var dropItem=function(event){
	       
            var e = document.getElementById("cars");        
            var strUser = e.options[e.selectedIndex].value;
    
            };                          
 document.querySelector('#cars').addEventListener('click',dropItem);
 
 


 //autocomplete search



function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}





var states=[];

      fetch('https://cors-anywhere.herokuapp.com/https://api.covidindiatracker.com/state_data.json') 
      .then(data=>{
       return data.json()
      })
      .then(dataJson=>{
      	var i;
      	for(i=0;i<dataJson.length;i++){
      		states[i]=dataJson[i].state;
      		
      	}
      });

   autocomplete(document.querySelector('.input'), states);   

     





