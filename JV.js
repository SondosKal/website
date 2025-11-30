


function toggleMenu() { //shows the navigation
  const nav = document.getElementById("navLinks");
  if(!nav) return;
  nav.classList.toggle("active");
}
/////////////////


function toggleTheme() {//changes the theme using class
  const themeIcon = document.getElementById("themeIcon");
  if(!themeIcon) return;
 document.body.classList.toggle("light-theme");
  
   if (document.body.classList.contains("light-theme")) {
    themeIcon.src = "images/icons/moon.svg";  // Dark mode icon

  } else {
        themeIcon.src="images/icons/sun.svg";   // Light mode icon

  } 
  
}
//////////////////////////====back to top button============================////
document.addEventListener("DOMContentLoaded", () => {

  console.log("JS loaded ✅");

  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) {
    return;
  }

  window.addEventListener("scroll", () => {
    

    if (window.scrollY > 100) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
//====================Clock at footer=======================//////
const clock= document.getElementById("clock");
if(clock){
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("clock").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); // call immediately once
}

//==================== extra section part=============///////
const container = document.getElementById("autoScroll");
const images = document.querySelectorAll(".gallery-img");

if (container && images.length > 0) {
let direction = 1;  // 1 = right, -1 = left

function autoScroll() {
  container.scrollLeft += direction;

  // If reached right end, switch direction
  if (container.scrollLeft + container.clientWidth >= container.scrollWidth-2) {
    direction = -1;
  }

  // If reached left end, switch direction
  if (container.scrollLeft <= 0) {
    direction = 1;
  }
}



let scrollInterval = setInterval(autoScroll, 30);

container.addEventListener("mouseenter", () => {
  clearInterval(scrollInterval);
});

container.addEventListener("mouseleave", () => {
  scrollInterval = setInterval(autoScroll, 30);
});




function highlightCenterImage() {
  const containerCenter = container.scrollLeft + container.clientWidth / 2;
  
  let closestImg = null;
  let closestDistance = Infinity;

  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const imgCenter = rect.left + rect.width / 2;
    const distance = Math.abs((window.innerWidth / 2) - imgCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestImg = img;
    }
  });

  images.forEach(img => img.classList.remove("active"));
  if (closestImg) closestImg.classList.add("active");
}

container.addEventListener("scroll", highlightCenterImage);
window.addEventListener("resize", highlightCenterImage);

// Trigger once at start
highlightCenterImage();
}
///////////////////////////////////////

console.log("checking whether the java script file working or not");

/*-------------------------------------------------Request service page------------------------------------------------------*/

// امسك زر صفحة الريكوست سيرفس
var submitBtn_RS = document.getElementById("submit-requestService");

// نفذ كود الريكوست سيرفس فقط إذا الزر موجود في الصفحة
if (submitBtn_RS != null) {

    var service_RS = document.getElementById("service");
    var nameInput_RS = document.getElementById("name");
    var dateInput_RS= document.getElementById("date");
    var desc_RS = document.getElementsByTagName("textarea")[0];
    var requestsContainer_RS= document.getElementById("requests-inner-container");

    submitBtn_RS.addEventListener("click", function(event){
        event.preventDefault();

        var serviceField_rs = service_RS.value;
        var nameField_rs = nameInput_RS.value;
        var dateField_rs = dateInput_RS.value;
        var descField_rs = desc_RS.value;

        // 1) الخدمة
        if(serviceField_rs == ""){
            alert("Please select a service.");
            return;
        }

        // 2) الاسم
        var numCheck = nameField_rs.match(/[0-9]/);
        var symCheck = nameField_rs.match(/[?!@]/);
        var nameCheck = nameField_rs.split(" ");

        if(nameCheck.length < 2 || numCheck != null || symCheck != null){
            alert("Please enter a valid name without numbers or special characters.");
            return;
        }

        // 3) التاريخ
        var today1 = new Date();
        today1.setDate(today1.getDate() + 3);
        var today2 = new Date();
        var selected = new Date(dateField_rs);

        if (selected.getFullYear() === today2.getFullYear() &&
            selected.getMonth() === today2.getMonth() &&
            selected.getDate() === today2.getDate()) {
            alert("Invalid date! You cannot select today's date.");
            return;
        }

        if (selected < today2) {
            alert("Invalid date! You cannot select a past date.");
            return;
        }

        if (selected < today1){
            alert("Due date is too soon. Please choose a later date.");
            return;
        }

        // 4) الوصف
        if (descField_rs.length < 100){
            alert("Description must be at least 100 characters.");
            return;
        }

        
        var stay = confirm(
            "Your request was successfully submitted.\n\n" +
            "Click OK to stay on this page.\n" +
            "Click Cancel to return to the dashboard."
        );

        if (stay) {

            document.getElementById("recent-request").style.display = "block"; 
 requestsContainer_RS.style.display = "block";

            requestsContainer_RS.innerHTML += `
                <div class="single-request">
                    <p><strong>Service:</strong> ${serviceField_rs}</p>
                    <p><strong>Name:</strong> ${nameField_rs}</p>
                    <p><strong>Due date:</strong> ${dateField_rs}</p>
                    <p><strong>Description:</strong> ${descField_rs}</p>
                </div>
            `;

            nameInput_RS.value = "";
            desc_RS.value = "";

        } else {
            window.location.href = "CustomerDashboard.html";
        }
    });
}


/*---------------------------------------------------Service Evaluation page -------------------------------------------*/

var submitBtn_se = document.getElementById("submit-evaluation");

if (submitBtn_se != null) {
    console.log("Service evaluation page detected.");

    var service_SE = document.getElementById("service-SE");
    var feedback_SE = document.getElementById("feedback-SE");
    var ratingInputs = document.getElementsByName("rating");

    var selectedRating = null;

    // التقاط التقييم
    for (var i = 0; i < ratingInputs.length; i++) {
        ratingInputs[i].addEventListener("change", function () {
            selectedRating = this.value;
        });
    }

    submitBtn_se.addEventListener("click", function(event){
        event.preventDefault();

        var serviceField_se = service_SE.value;
        var feedbackField_se = feedback_SE.value;

        if (serviceField_se == "") {
            alert("Please select a service.");
            return;
        }

        if (selectedRating == null) {
            alert("Please select a rating ");
            return;
        }

        if (feedbackField_se == "" || feedbackField_se.toLowerCase() == "input here") {
            alert("Please write your feedback.");
            return;
        }

        if (selectedRating >= 4) {
            alert("Thank you! We're glad you enjoyed our service ");
        } else {
            alert("We're sorry the service did not meet your expectations ");
        }

        window.location.href = "CustomerDashboard.html";
    });
}



/*-------------------------------------------------Add a service page------------------------------------------------------*/



function addService() {


    // 1) نجيب قيم الفورم
    var name = document.getElementById("serviceName").value;
    var price = document.getElementById("price").value;
    var desc = document.getElementById("desc").value;
  var photo = "images/services/arabsstock_52227_large.jpg";


    //  التحقق من الحقول الفارغة

    if (name == "" || price == "" || desc == "" || photo == "") {
        alert("Please fill all fields.");
        return; 
    }

    
    //  التحقق من أن الاسم ما يبدأ برقم

    if (!isNaN(name.charAt(0))) {  
        alert("Service name cannot start with a number.");
        return;
    }

  
    //  التحقق من أن السعر رقم

    if (isNaN(price)) {
        alert("Price must be a number.");
        return;
    }


    var service = {
        name: name,
        price: Number(price),
        desc: desc,
        photo: photo
    };

    
    //  نجلب الخدمات الموجودة (array)
 
    var services = [];

    if (localStorage.getItem("services") != null) {
        services = JSON.parse(localStorage.getItem("services"));
    }


    //  نضيف الخدمة الجديدة

    services.push(service);


    //  نخزن array في localStorage

    localStorage.setItem("services", JSON.stringify(services));




    alert("Service " + name + " added successfully!");

  
    // 10) مسح الفورم

    document.getElementById("serviceName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("servePhoto").value = "";
}


/*-------------------------------------------------Provider dashboard page------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {

    var container = document.getElementById("serviceList");

    if (!container) return;  

    var services = localStorage.getItem("services");

    if (services != null) {
        services = JSON.parse(services);

        for (var i = 0; i < services.length; i++) {
            container.innerHTML += `
                <div class="service">
                    <div class="service-container">
                        <img src="${services[i].photo}" alt="">
                        <h4>${services[i].name}</h4>
                    </div>
                    <p class="price">${services[i].price} SAR</p>
                </div>
            `;
        }
    }

});


/*-------------------------------------------------Manage staff member page------------------------------------------------------*/

// DELETE STAFF MEMBERS 
function deleteStaff() {

    var checkboxes = document.getElementsByName("staff");
    var anySelected = false;

    // نتحقق هل في أحد مختار
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            anySelected = true;
            break;
        }
    }

    // إذا مافي أحد مختار
    if (!anySelected) {
        alert("Please select at least one member");
        return;
    }

    // نسأل المستخدم confirm
    var confirmDelete = confirm("Are you sure you want to delete the selected members?");

    if (confirmDelete) {

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var memberDiv = checkboxes[i].parentNode.parentNode;
                memberDiv.remove();
            }
        }
    }
}

// ADD NEW MEMBER 
function addStaff() {


    var name = document.getElementById("WName").value;
    var dob = document.getElementById("WDob").value;
    var email = document.getElementById("WEmail").value;
    var area = document.getElementById("WArea").value;
    var skills = document.getElementById("WSkills").value;
    var edu = document.getElementById("WEdu").value;
    var photo = "images/profilepic.webp";

    // فاليديشن: أي حقل فاضي؟
    if (name == "" || dob == "" || email == "" || area == "" || skills == "" || edu == "" || photo == "") {
        alert("Please fill all fields");
        return;
    }

    // الاسم ما يبدأ برقم
    if (!isNaN(name.charAt(0))) {
        alert("Name cannot start with a number");
        return;
    }

    // نضيف العضو في أعلى القائمة:
    var container = document.querySelector(".grid");

    var newMember =
        "<div class='member'>" +
            "<label>" +
                "<input type='checkbox' name='staff'>" +
                "<img src='" + photo + "'>" +
                "<span>" + name + "</span>" +
            "</label>" +
        "</div>";

    container.innerHTML += newMember;

    alert("New staff member " + name + " added successfully!");

    // نفرغ الفورم
    document.getElementById("WName").value = "";
    document.getElementById("WDob").value = "";
    document.getElementById("WEmail").value = "";
    document.getElementById("WArea").value = "";
    document.getElementById("WSkills").value = "";
    document.getElementById("WEdu").value = "";
    document.getElementById("WPhoto").value = "";
}









/* ----------------------------------------------- services page ---------------------------------------------------------------*/






function sortServices(){

  var sortValue = document.getElementById("sort").value;
  var container = document.getElementById("servicesContainer");

  var services = container.getElementsByClassName("service-box");
  var servicesArray = [];

  
  for(var i = 0; i < services.length; i++){
    servicesArray.push(services[i]);
  }

  
  if(sortValue == "A-Z"){
    servicesArray.sort(function(a, b){
      var nameA = a.getElementsByTagName("h3")[0].innerHTML;
      var nameB = b.getElementsByTagName("h3")[0].innerHTML;

      if(nameA > nameB) return 1;
      if(nameA < nameB) return -1;
      return 0;
    });
  }

  
  if(sortValue == "Z-A"){
    servicesArray.sort(function(a, b){
      var nameA = a.getElementsByTagName("h3")[0].innerHTML;
      var nameB = b.getElementsByTagName("h3")[0].innerHTML;

      if(nameA < nameB) return 1;
      if(nameA > nameB) return -1;
      return 0;
    });
  }

  
  if(sortValue == "low-high"){
    servicesArray.sort(function(a, b){
      return getPrice(a) - getPrice(b);
    });
  }

  
  if(sortValue == "high-low"){
    servicesArray.sort(function(a, b){
      return getPrice(b) - getPrice(a);
    });
  }

  
  container.innerHTML = "";
  for(var j = 0; j < servicesArray.length; j++){
    container.appendChild(servicesArray[j]);
  }
}



function getPrice(service){
  var priceText = service.getElementsByClassName("price")[0].innerHTML;
  var parts = priceText.split(" ");
  return parseInt(parts[3]);   
}







/* ----------------------------------------------- about us page ---------------------------------------------------------------*/

var aboutForm = document.getElementById("own");

if (aboutForm != null) {

aboutForm.onsubmit = function() {

  var name = document.getElementById("name").value;
  var photoInput = document.getElementById("photo");
  var date = document.getElementById("date").value;
  var email = document.getElementById("email").value;
  var area = document.getElementById("area").value;
  var skill = document.getElementById("skill").value;
  var edu = document.getElementById("edu").value;
  var message = document.getElementById("text").value;
  
  if(name == "" ||
     date == "" || 
     email == "" ||
     area == "" || 
     skill == "" || 
     edu == "" || 
     photoInput.files.length == 0 ||
     message == ""
    ){
    alert("Please fill all fields.");
    return false;
  }

  var firstChar = name.charAt(0);
  if(firstChar >= "0" && firstChar <= "9"){
    alert("Name cannot start with a number.");
    return false;
  }

  var file = photoInput.files[0];
  if(!file.type.startsWith("image/")){
    alert("field accepts only image files .");
    return false;
  }

  var year = parseInt(date.split("-")[0]);
  if(year > 2008){
    alert("Date of birth must not be after 2008.");
    return false;
  }

  alert(
    "Dear " + name + ",\n\n" +
    "Thank you for choosing Lenzah, where we turn moments into timeless memories.\n\n" +
    "Your request has been received and our team is excited to review your artistic profile.\n\n" +
    "Stay tuned, we’ll be in touch soon!\n\n" +
    "Warm regards,\n" +
    "Lenzah Photography Team 📸"
  );

  return true;
};

}
