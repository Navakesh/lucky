function handleformSubmit(event){
    event.preventDefault()
    const costmerdetails={
        name:event.target.username.value,
        email:event.target.useremail.value,
        number:event.target.phone_num.value,
        bus:event.target.bus_num.value
    }
    axios
    .post('https://crudcrud.com/api/aef43e13644044859851078b35be48ec/Bookingdata',costmerdetails)
    .then((res)=>display(res.data))
    .catch((error)=>console.log(error))
event.target.reset()
}
window.onload=function(){
    axios
        .get('https://crudcrud.com/api/aef43e13644044859851078b35be48ec/Bookingdata')
        .then((res)=>{
            for(let i=0;i<res.data.length;i++){
                display(res.data[i])
            }
        })
        .catch((error)=>{console.log(error)})
}


const filter = document.querySelector('.one');
filter.addEventListener('change', function(event){
    const costemerslist=document.querySelector('ul')
    const filterValue = event.target.value;
    axios
        .get('https://crudcrud.com/api/aef43e13644044859851078b35be48ec/Bookingdata')
        .then((res)=>{
            const filteredData = res.data.filter(item => item.bus === filterValue || filterValue === 'All');
            costemerslist.innerHTML = ''; // clear the list
            for(let i=0;i<filteredData.length;i++){
                display(filteredData[i])
            }
        })
        .catch((error)=>{console.log(error)})
});


function display(details){
    const costemerslist=document.querySelector('ul')
    costemerslist.style.listStyleType = "none"
    const individual=document.createElement('li')
    individual.textContent=`${details.name}  ${details.email} ${details.number} ${details.bus }`
    
    const deltebtn=document.createElement('button')
    deltebtn.textContent="DELETE"
    deltebtn.style.margin = "10px";
    individual.appendChild(deltebtn)
    
    const editbtn=document.createElement('button')
    editbtn.textContent="EDIT"
    individual.appendChild(editbtn)

    costemerslist.appendChild(individual)

    deltebtn.onclick=(()=>{    
        axios
            .delete(`https://crudcrud.com/api/aef43e13644044859851078b35be48ec/Bookingdata/${details._id}`)
            .then((res)=>{
                costemerslist.removeChild(individual)
            })
            .catch((error)=>{console.log(error)})
    })
    editbtn.addEventListener('click',function(event){
        axios
            .delete(`https://crudcrud.com/api/aef43e13644044859851078b35be48ec/Bookingdata/${details._id}`)
            .then((res)=>{
                costemerslist.removeChild(individual)
            })
            .catch((error)=>{console.log(error)})

        document.getElementById('username').value=details.name;
        document.getElementById('useremail').value=details.email;
        document.getElementById('phone_num').value=details.number;
        })

        
}
