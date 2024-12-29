let titel=[];
let message=[];
let deleteTitel=[];
let deleteMessage=[];


load();
garbageBackUpload();

function render(){
    let content=document.getElementById('note_container');
    content.innerHTML='';

    for(let i=0;i<titel.length;i++){
        let notiz=titel[i];
        let anmerkung=message[i];
        content.innerHTML+=`
        <div class="createnotecontainer">
        <h2>${titel[i]}</h2>
        <p>${message[i]}</p>
        <img src="./img/papierkorb.png" onclick="deletenote(${i}), garbage(${i})" class="secondtrash"</img>
        </div>`
    }
    document.getElementById('notiz').value='';
    document.getElementById('anmerkung').value='';

    save();
    saveDelteNotes();
}

function addnoteall(){
    let notiz=document.getElementById('notiz');
    let anmerkung=document.getElementById('anmerkung');
    if(notiz.value==0){
        alert('Gib einen titel ein!!!')
    }else{
        if (anmerkung.value==0){
            alert('Gib eine Anmerkung ein!!!')
        }else{
            titel.push(notiz.value);
            message.push(anmerkung.value);

        }
    }
    render();
    save();

}

function save(){
    localStorage.setItem('Notiz',JSON.stringify(titel));
    localStorage.setItem('Message',JSON.stringify(message));
}

function load(){
    let titelAsText=localStorage.getItem('Notiz');
    let messageAsText=localStorage.getItem('Message');
    if(titelAsText && messageAsText){
        titel=JSON.parse(titelAsText);
        message=JSON.parse(messageAsText);
    }
    garbageBackUpload();

}

function openGarbage(){
    document.getElementById('garbage1').classList.remove('d-none');
    garbage();
}

function closeGarbage(){
    document.getElementById('garbage1').classList.add('d-none');
}

function deletenote(i){
    deleteTitel.push(titel[i]);
    deleteMessage.push(message[i]);

    titel.splice(i,1);
    message.splice(i,1);

    render();
    saveDelteNotes();
}

function saveDelteNotes(){
    localStorage.setItem('deleteTitel',JSON.stringify(deleteTitel));
    localStorage.setItem('delteMessage', JSON.stringify(deleteMessage));
}

function garbage(){
    let garbage=document.getElementById('garbage');
    garbage.innerHTML='';
    for(let i=0;i<deleteTitel.length;i++){
        garbage.innerHTML+=deleteNoteHtml(i)
    }
    if(deleteTitel.length===0 && deleteMessage.length===0){
        closeGarbage();
    }
    save();
    render();
    saveDelteNotes();
}
 function deleteNoteHtml(i){
    return `<div class="garbage-button-position">
        <div class="card-position-button">
        <div class="card"><h2>${deleteTitel[i]}</h2><p>${deleteMessage[i]}</p> </div>
        <div><button class="button" onclick="restoreNotes(${i}), closeGarbage(${i}), garbageRestoredNotes(${i})">Wiederherstellen</button>
        <button class="button" onclick="garbageRestoredNotes(${i})">Löschen</button></div>       
        </div>`;

 }

 function restoreNotes(i){
    titel.push(deleteTitel[i]);
    message.push(deleteMessage[i]);

    saveDelteNotes();
    garbage();
 }

 function garbageRestoredNotes(i){
    deleteTitel.splice(i,1);
    deleteMessage.splice(i,1);

    saveDelteNotes();
    garbage();
    render();
}
 

 function saveDelteNotes(){
    localStorage.setItem('deleteTitel', JSON.stringify(deleteTitel));
    localStorage.setItem('deleteMessage', JSON.stringify(deleteMessage));
 }

 function garbageBackUpload(){
    let titelText=localStorage.getItem('deleteTitel');
    let messageText=localStorage.getItem('deleteMessage');

    if(titelText && messageText){
        deleteTitel=JSON.parse(titelText);
        deleteMessage=JSON.parse(messageText);

    }
 }