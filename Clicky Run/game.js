window.onload = pageLoad;

function pageLoad() {
    var startButton = document.getElementById("start");
    startButton.onmousedown = startGame;


}

function startGame() {
    alert("Ready");
    addBox();
    timeStart();
}

function timeStart() {
    var TIMER_TICK = 1000;
    var timer = null;
    var min = 0.1; // 0.5 minute
    var second = min * 100;
    // var second = 5; 
    var x = document.getElementById('clock');
    //setting timer using setInterval function
    clearInterval(timer);
    timer = setInterval(timeCount, TIMER_TICK);
    x.innerHTML = second;

    function timeCount() {
        var allbox = document.querySelectorAll("#game-layer div");

        if (second > 0) {

            // จัดการเกี่ยวกับเวลา เช่น ถ้ายังมีกล่องเหลืออยู่ เวลาจะลดลงเรื่อยๆ 
            if (allbox.length > 0) {
                second -= 1;
                x.innerHTML = second;
            }

            // ถ้าไม่มีกล่องเหลือแล้ว และเวลายังเหลืออยู่จะขึ้นว่า You win!
            if (allbox.length == 0) {
                alert("You win!");
                clearInterval(timer);
            }
        } else {

            // ถ้าเวลาหมด แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen
            clearScreen();
            clearInterval(timer);
            alert("Game over");
        }
    }
}

function addBox() {
    // สร้างกล่องตาม input ที่เราใส่ 
    var numbox = document.getElementById("numbox").value;
    var gameLayer = document.getElementById("game-layer");
    var colorDrop = document.getElementById("color").value;
    for (var i = 0; i < numbox; i++) {
        var tempbox = document.createElement("div");
        tempbox.className = "square";
        tempbox.id = "box" + i;
        tempbox.style.left = Math.random() * (500 - 25) + "px";
        tempbox.style.top = Math.random() * (500 - 25) + "px";
        tempbox.style.backgroundColor = colorDrop;
        //add element to HTML node
        gameLayer.appendChild(tempbox);
        bindBox(tempbox);
    }
}

function bindBox(box) {
    //เมื่อกดแล้ว กล่องจะหายไป
    box.onclick = function() {
        box.parentNode.removeChild(box);
    }
}

function clearScreen() {
    // ทำการลบ node ของกล่องทั้งหมด ออกจาก หน้าจอ
    var allbox = document.querySelectorAll("#game-layer div");

    //delete all  div
    for (var i = 0; i < allbox.length; i++) {
        allbox[i].parentNode.removeChild(allbox[i]);
    }
}