
//cors solve not allowed error (due to different port)

var socket = io("http://192.168.1.23:3000", {  
    cors: {   
         origin: "http://192.168.1.23:3000",   
        methods: ["GET", "POST"]  
        }
    },
    //here be the dragons
    {'pingTimeout': 50000} 
    
    
    );

//get file from the file object and get his content
function getExt(name){
    ext = name.slice(name.indexOf(".")+1);
    return ext;
} 
function generatename(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
function printFile(file) {
    var reader = new FileReader();
    reader.onload = function(evt) {
        result = (evt.target.result);
        console.log(result);
        ext = getExt(filename);
        filername = generatename(10) + "." + ext;
        type = detectType(ext);
        socket.emit("file",[result,filername,type]);
        console.log("ok");
        var a = document.getElementById("link");
        a.href="http://192.168.1.23/pottersharing/" + type + '/' + filername;
        a.innerText = "http://192.168.1.23/pottersharing/" + type + '/' + filername;
        
    };
    reader.readAsDataURL(file);
    
    
};
function detectType(ext){
    var type = "default";
    listImages = ['jpg','jpeg','png','gif','tif','psd','pdf','eps','ai','indd','svg'];
    listVideos = ['mp4','avi','mkv','mov','vob','wmv'];
    listAudio = ['mp3','wav','ogg','wma','mid']; 
    var i = 0;
    for(; i<11;i++) {
        if(ext == listImages[i]){
            type = 'image';
        };
    };
    i = 0;
    for(; i<6;i++) {
        if(ext == listVideos[i]){
            type = 'video';
        };
    };
    i=0;
    for(; i<5;i++) {
        if(ext == listAudio[i]){
            type = 'audio';
        };
    };
    if(type == "default"){
        type = 'other'; 
    };
    return type;
} 
      
function button() {
    socket.emit("hpagedemand")
    location.replace("hpage.html")
}

function handleFiles(file){
    filename = file[0]['name'];
    printFile(file.item(0));
    
};
function load(){
    
    socket.emit("mpage");
}
function loadhpage(){
    console.log("DOne");
    socket.emit("hpageloaded");
}

socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

