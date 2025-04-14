let getindex=0

let step=document.querySelectorAll('.step')
let todoarr=JSON.parse(localStorage.getItem('user'));
let todoInputs=document.querySelectorAll('.todoField');
let userinput=JSON.parse(localStorage.getItem('userInput'))||[];
let todoEditId,todoEvent;

window.onload=()=>{
    
    if(!localStorage.getItem('user')){
        localStorage.setItem('user',JSON.stringify({'name':'','gmail':'','mothername':'','fathername':'','schoolname':'','collegename':'','todos':[],'aadhar':'','pan':''}))
    }
    let arr = JSON.parse(localStorage.getItem('user'));
    let inputs=document.querySelectorAll('.inputFields');
    let keys=Object.keys(arr).filter(key=>key !=='todos')

    inputs.forEach((input,index)=>{
        if(input.name==keys[index]){
            input.value = arr[input.name]
        }
    })
    arr.todos.forEach((input)=>{
        $('#todo').append(`<div><span>${input.skillname}</span><span>${input.fieldname}</span><button onclick='edit(event,${input.id})' id='edits' type='button'>Edit</button><button onclick='deletValues(event,${input.id})' id='delet' type='button'>Delete</button></div>`)
    })
}
function createData(ele){

let arr=JSON.parse(localStorage.getItem('user')) || {};
arr[ele.name]=ele.value;
localStorage.setItem('user',JSON.stringify(arr));
}

function show(index){

    let allforms = document.querySelectorAll(".form");
    allforms.forEach(form=>{form.style.display='none'})

    allforms[index].style.display='block';

    if(index==2){$('.next').text('submit'); step[getindex].classList.remove('style')}else{$('.next').text('Next')}
    $('.previous').css('display',index > 0  && index < 3 ? 'block' : 'none');
    $('.next').css('display',index < allforms.length-1 ? 'block' : 'none' )
}
show(getindex)


$('.next').on('click',function(e){
    e.preventDefault();
    validation(getindex)
})
$('.previous').on('click',function(e){
    e.preventDefault();
    getindex--
    step[getindex].classList.remove('style')
    show(getindex)
})


function validation(come){

    let check=true;   
    let allforms = document.querySelectorAll(".form");
    let inputField=allforms[come].querySelectorAll('.form .inputFields')
 
    inputField.forEach((input)=>{
        if(input.value===''){check=false; input.classList.add('border')}
        else if(input.name=='gmail' && !input.value.includes('@gmail.com')){check=false; input.classList.add('border')}
    })

    if(check){
        if(getindex < 2){
            step[getindex].classList.add('style')
        }
        getindex++
        if(getindex==3){userinput.push(JSON.parse(localStorage.getItem('user')));localStorage.setItem('userInput',JSON.stringify(userinput));setTimeout(()=>{localStorage.removeItem('user')},4000)}
        if(getindex==4)return
        show(getindex)
    } 
}     

$('#add-btn').click(function(e){
    e.preventDefault();let flag=true;
    let idGenerate=Math.floor(Math.random()*100);
    let arr=JSON.parse(localStorage.getItem('user')) || {};
    
    todoInputs.forEach(todos=>{
        if(todos.value===""){flag=false;todos.classList.add('border')};
    })
    if(flag){
        if( $('#add-btn').text()==='edit'){
            let change=todoEvent.querySelectorAll('span')
            change[0].textContent=todoInputs[0].value;change[1].textContent=todoInputs[1].value
            arr.todos.find(changeValues=>{if(changeValues.id==todoEditId){
                changeValues.skillname=todoInputs[0].value;changeValues.fieldname=todoInputs[1].value;
                $('#add-btn').text('ADD');todoEditId;todoEvent;
            }})
        }
        else{
            $('#todo').append(`<div><span>${todoInputs[0].value}</span><span>${todoInputs[1].value}</span><button onclick="edit(event,${idGenerate})" id='edits' type='button'>Edit</button><button id='delet' onclick='deletValues(event,${idGenerate})' type='button'>Delete</button></div>`)
            arr.todos.push({'id':idGenerate,'skillname':todoInputs[0].value,'fieldname':todoInputs[1].value})
        }
        localStorage.setItem('user',JSON.stringify(arr))
        todoInputs.forEach(todos=>todos.value='')
    }
    
})

$('#link').click(function(){
    getindex=0;show(getindex)
})

function edit(event,id){
    $('#add-btn').text('edit');todoEditId=id;
    todoEvent=event.target.parentElement;
    let editValue=todoarr.todos.filter(editId=>editId.id==id)
    todoInputs[0].value=editValue[0].skillname;
    todoInputs[1].value=editValue[0].fieldname
}

function deletValues(event,id){
    if(todoarr.todos){
        todoarr.todos=todoarr.todos.filter(deleteid=>deleteid.id != id)
        localStorage.setItem('user',JSON.stringify(todoarr))
    }
    event.target.parentElement.remove()
}

