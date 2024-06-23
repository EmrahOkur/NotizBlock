let titel= [];
let message= [];
let deleteTitel= [];
let deleteNote= [];

load();
garbageBackupLoad();

function render(){
    let content=document.getElementById('note_container');
    content.innerHTML='';

    for (let i=0;i<titel.length;i++){
        let notiz=titel[i];
        let anmerkung=message[i];
        content.innerHTML+=`
        <div class="createnotecontainer">
        <h2>${titel[i]}</h2>
        <p>${message[i]}</p>
        <img src="./img/papierkorb.png" onclick="deletenote(${i}), 
        garbage(${i})" class="secondtrash"</img>`
    }
    document.getElementById('notiz').value='';
    document.getElementById('anmerkung').value='';

    save();
    saveDeleteNotes();
}
function addnoteall(){
    let notiz=document.getElementById('notiz');
    let anmerkung=document.getElementById('anmerkung');
    if (notiz.value.trim().length===0){
        alert('Gib eine Titel ein!')
    }else{
        if (anmerkung.value==0){
            alert('Gib eine Anmerkung ein!')
        }else{
            titel.push(notiz.value);
            message.push(anmerkung.value);
            
        }
    }
    render();
    save();
}

function deletenote(i){
    deleteTitel.push(titel[i]);
    deleteNote.push(message[i]);

    titel.splice(i,1);
    message.splice(i,1);

    render();
    saveDeleteNotes();
}

function save(){
    localStorage.setItem('Notiz', JSON.stringify(titel));
    localStorage.setItem('Anmerkung',JSON.stringify(message));
}

function load(){
    let titelAsText=localStorage.getItem('Notiz');
    let messageAsText=localStorage.getItem('Anmerkung');
    if(titelAsText&&messageAsText){
        titel=JSON.parse(titelAsText);
        message=JSON.parse(messageAsText);
    }
    garbageBackupLoad();
}

function opengarbage(){
    document.getElementById('garbage1').classList.remove('d-none');

    garbage();
}

function closeGarbage(){
    document.getElementById('garbage1').classList.add('d-none');
}

function garbage(){
    let garbage=document.getElementById('garbage');
    garbage.innerHTML='';
    for (let i=0;i<deleteTitel.length;i++){
        garbage.innerHTML+=deletedNoteHTML(i)
    }
    if(deleteTitel.length=== 0 && deleteNote.length === 0){
        closeGarbage();
    }
    saveDeleteNotes();
    save();
    render();

}

function deletedNoteHTML(i){
    return`<div class="garbage-button-position">
            <div class="card-position-button">
            <div class="card"><h2>${deleteTitel[i]}</h2><p>${deleteNote[i]}</p></div>
            <div><button class="button" onclick="restoreNotes(${i}),closeGarbage(${i}),garbageRestoredNotes(${i})">Wiederherstellen</button>
            <button class="button" onclick="garbageRestoredNotes(${i})">Löschen</button></div>
            </div>`;
    
}

function garbageBackupLoad(){
    let titelText=localStorage.getItem('deleteTitel');
    let messageText=localStorage.getItem('deleteNote');

    if (titelText && messageText){
        deleteTitel=JSON.parse(titelText);
        deleteNote=JSON.parse(messageText);
    }
}

function garbageRestoredNotes(i){
    deleteTitel.splice(i,1);
    deleteNote.splice(i,1);

    saveDeleteNotes();
    garbage();
    render();
}

function restoreNotes(i){
    titel.push(deleteTitel[i]);
    message.push(deleteNote[i]);

    garbageRestoredNotes(i);


}

function saveDeleteNotes(){
    localStorage.setItem('deleteTitel',JSON.stringify(deleteTitel));
    localStorage.setItem('deleteNote', JSON.stringify(deleteNote));
}