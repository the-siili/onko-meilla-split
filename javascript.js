
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "lps01.2f MiV,lge01.4ef MMe,läi05.5 JJu,lfi02.6ef LLa,lbi07.1ABI POj,lke07.2ABI HHu,lena09.3ABI RKo,lena09.4ABI PSk,lrub09.1/a09.1ABI MPa*lmay01A.1f NNu,lmay01A.5ef SSn,lmay01A.3f HNo,lmay01A.6ef LEk,lena05.1 RWe,lhi02.2f ATa,läi05.3 HTe,lhi02.4f SHi,lyh05.1ABI VKo,lena09.2ABI PAu?lena01+02.1 PAu,lmay01A.2f SSn,lyh01.3fe VKo,lps01.5ef MiV,lhi05.1f SHi,lfy05.2fe JMa,läi/ls219.1o2 TLy,lge02.2ef MMe,lsaa03/lsab203/lsab305 JSn,leab206/leaa08/leab308 RWe*lmu02.1e MMc,lli02.2fe PBo,lku02.2f EPe,lmay01A.4f HNo,lmab08.2fe EMa,lke07.1ABI HHu,lue07.ABI NMä,let07.ABI LVä,lfi01.6ef LLa,lbi04.1f ARa?lyh05.1ABI VKo,lrub09.1/a09.1ABI MPa,lena09.2ABI PAu,lte01.5ef OVi,lmaa05.1f HNo,läi05.2 JJu,lge01.3f MMe,läi05.4 TLy,lke07.2ABI HHu,lbi01.4f ARa*lmu01.2e ILe,lmu01.5e MMc,lku01.1f EPe,lku01.7ef KEs,lli01.6fe JWi,lke01+02.3f EMa,lena09.4ABI PSk,läi05.6 HTe,ls205 MAl,lbi07.1ABI POj,lena09.3ABI RKo?lmay01A.3f HNo,lmay01A.6ef LEk,lmay01A.1f NNu,lmay01A.5ef SSn,lena05.1 RWe,lhi02.2f ATa,läi05.3 HTe,lhi02.4f SHi,lyh05.1ABI VKo*lps01.2f MiV,lge01.4ef MMe,läi05.5 JJu,lfi02.6ef LLa,lbi07.1ABI POj,lke07.2ABI HHu,lena09.3ABI RKo,lena09.4ABI PSk,lena09.2ABI PAu,lrub09.1/a09.1ABI MPa?lrub04.2 MPa,lue02.4fe NMä,lmaa05.3f NNu,let02.2ef LVä,lbi01.6ef CFr,lhi12.a ABI ATa,lena09.5ABI PSk,lbi07.2ABI POj,lraa08/lrab308/lrab206 IWi*lku01.3f EPe,lli01.4fe RKi,lke01+02.2f EMa,lke01+02.7ef HHu,lmab08.1f JMa,lmaa10.3f SSn,lte01.1f OVi,lfy01+02.5fe MSl,lfy01+02.1f EHy,lrub04.4 JSn"
let day_stacks = ""

let splits = ""
let normals = ""

let all_courses = []

let today = ""


myCourse = "Oppitunti?"


var select = document.getElementById('dd');




let menu = []




let can_continue = false





function lastDay()
{
    today = days[days.indexOf(today) - 1]
    if(days.indexOf(today) < 0){
        today = days[days.length -1]
    }
    changeDay();
}

function nextDay()
{
    //Näin täytyy tehdä koska en tiedä, mutta älä edes koita korjata et tule onnistumaan(message to self)
    if(today == "Saturday"){
        today = days[days.indexOf(today) + 1]
    }
    //


    today = days[days.indexOf(today) + 1]
    if(days.indexOf(today) > days.length-1){
        today = 0
    }
    changeDay();


}


function changeDay(){

    select.innerHTML="";
    CheckDay();
    all_courses.forEach(AddCourseToOptions)
    

    if(today == "Saturday" || today == "Sunday")
    {
        select.innerHTML="";
        document.getElementById('resultLbl').innerHTML="VKLP!";
    }
    else{
        document.getElementById('resultLbl').innerHTML="?";
    }

    document.getElementById('dayLbl').innerHTML=fin_days[days.indexOf(today)];
    loadCourse()
    displayMenuData()
}






function Init() {
    day_stacks = text1.split("?")

    days.forEach((day,index)=>{
        // Check if the index of day value is equal to the returned value of getDay()
        if(index == new Date().getDay()){
            today = day;
        }
    });

    CheckDay()
    all_courses.forEach(AddCourseToOptions)
    document.getElementById('dayLbl').innerHTML=fin_days[days.indexOf(today)];
    document.getElementById('resultLbl').innerHTML="?";
    loadCourse()
    menu = localStorage.getItem("menu")
    
}
window.onload = Init;









function CheckDay() 
{

    if(today == "Saturday" || today == "Sunday")
    {
        select.innerHTML="";
        document.getElementById('resultLbl').innerHTML = "VKLP!";
        return
    }
    else{
        document.getElementById('resultLbl').innerHTML = "";
    }


    dataToDayLists(days.indexOf(today)-1)

}


function dataToDayLists(ind){
    let sep = day_stacks[ind].split("*")
    splits = sep[0].split(",")
    normals = sep[1].split(",")

    all_courses = [...splits, ...normals]
    myCourse = all_courses[0]
}



function showResult(){

    if(today == "Saturday" || today == "Sunday")
    {
        return
    }



    if(splits.includes(myCourse))
    {
        document.getElementById('resultLbl').innerHTML = "SPLIT";
    }
    else if(normals.includes(myCourse))
    {
        document.getElementById('resultLbl').innerHTML = "NORMAALI";
    }
    saveCurrentCourse()
}






function AddCourseToOptions(item)
{
    //SKIPPING EMPTY STRINGS
    if(item == "nan" || item.length === 0 ){
        return
    }



    var opt = document.createElement('option');
    opt.value = item;
    opt.innerHTML = item;
    select.appendChild(opt);
}


function setMyCourse()
{

    myCourse = document.getElementById('dd').value;
    document.getElementById('resultLbl').innerHTML = "?";

}


function saveCurrentCourse()
{
    localStorage.setItem(today, select.value);
    
}

function loadCourse()
{
    if(today == "Saturday" || today == "Sunday")
    {
        return
    }


    select.value = localStorage.getItem(today)
    setMyCourse()
    showResult()
}








//HANDLING MENU
function getMenuData(){

    //GETTING MENU DATA
    fetch('https://ksyk-menu-scraper.onrender.com/').then(function (response) 
    {
        // The API call was successful!
        return response.text();
    }).then(function (html) {

        menu = html
        localStorage.setItem("menu", html);
        displayMenuData()
        


    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong1.', err);
    });

}


function displayMenuData()
{
    
    document.getElementById("menu_list").innerHTML = ""

    var a = JSON.parse(menu)
    var menu_arr = a["menu-data"][today].split(";");


    document.getElementById("menu_week").innerHTML = a["menu-data"]["Week"]


    for (i in menu_arr)
    {
        document.getElementById("menu_list").innerHTML += menu_arr[i] + "<br />"
    }

}
