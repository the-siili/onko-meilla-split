
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "läi10.5 / xLäi08.5 JJu,lhi02.1f ATa,lmab10.2fe EMa,ls210.1 / xLs208.1 MAl,lena06.6 PSk,lena05.4 RKo,lge01.1f MMe,lfi02.3f LLa,lmaa02+04.3f NNu*lmaa02+04.2f HNo,lmaa02+04.5fe IKa,lmaa02+04.6ef LEk,lmaa14.3f EHä,lmab02.1f JMa,lyh02.5f VKo,läi11.1 / xLäi09.1 HTe,lhi02.2f SHi,lps01.4f MiV,lrua09.2 PAu?leaa05.1 / leab204.1 / leab306.1 APo,lyh05.2fe VKo,lrub01+02.2 MPa,läi01+02+03.1 TLy,lena01+02.4 PSk,läi11.3 HTe,lfy06.1fe JMa*lke04.2fe HHu,lraa05.1 / lrab204.1 / lrab306.1 IWi,läi01+02+03.6 JJu,lrub01+02.4 PAu,lbi05.2fe POj,lbi05.3ef CFr,lena01+02.3 RKo,lmaa12.2f NNu,ls201+02+03.1 MAl?lmaa02+04.1f IKa,lmaa02+04.4f HNo,lmaa12.3f NNu,lmaa14.4f EHä,lbi07.3f/ xLbi07.3f  POj,lge01.2f MMe,lhi01.3f ATa,lrub09.2 MPa,lfi02.6ef LLa,lhi12.1f / xLhi12.1 SHi*lyh01.5fe VKo,lena06.3 PAu,lena06.2 RKo,lena06.5 PSk,lfy10.1f JMa,läi11.4 / xLäi09.4 HTe,läi06+07.4 TLy,lps01.6ef MiV,läi05.1 JJu?lmaa02+04.6ef LEk,lmaa14.3f EHä,lmab02.1f JMa,lyh02.5f VKo,lps01.4f MiV,läi11.1 / xLäi09.1 HTe,lena05.4 RKo,lhi02.2f SHi,ls210.1 / xLs208.1 MAl*lmaa02+04.2f HNo,lmaa02+04.5fe IKa,lmaa02+04.3f NNu,lmab10.2fe EMa,läi10.5 / xLäi08.5 JJu,lhi02.1f ATa,lena06.6 PSk,lge01.1f MMe,lfi02.3f LLa,lrua09.2 PAu?,lmaa06+07.1f HNo,lrub04.3 JSn,lrua04.1 PAu,lue02.3feo2 NMä,läi10.3 TLy,läi11.2 / xLäi09.2 JJu,lfy01+02.3f EHy,lraa09.1 / lrab208.1 / lrab310.1 IWi,let02.2ef LVä*lmu01.7ef MMc,lli01.8ef LHe,lke01+02.2f EMa,lku01.4f EPe,lku01.5f KEs,lli01.6fe PBo,lke07.3f / xLke06.3 HHu,lmaa14.2f EHä,lmaa06+07.3f NNu,lbi01.1f ARa,lrub09.3 / xLrub09.3 MPa?x"

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
    getMenuData()
    
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