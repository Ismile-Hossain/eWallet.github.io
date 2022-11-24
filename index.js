document.querySelector('#ewallet-form').addEventListener('submit',(e)=>{
e.preventDefault();
console.log('hello');

const type = document.querySelector(".add__type").value;
const description = document.querySelector(".add__description").value;
const amount = document.querySelector(".add__value").value;

console.log(type,description,amount);
console.log(description.length,amount.lenght);
if(description && amount){
    newElementMake(type,description,amount);
    resetForm();
}

});

/*Get formated date time strt*/
function getFormatedDateTime(){
    const now = new Date().toLocaleDateString('en-us',{
    day: 'numeric',
    month : 'short', 
    hour: '2-digit',
    minute : '2-digit'
    });
    const dayMonth = now.split(',')[0].split(' ');
    const hourMinute = now.split(',')[1];
    const formatedTime = `${dayMonth[1]} ${dayMonth[0]},${hourMinute}`;
    return formatedTime;
}
/*Get formated date time end*/


    
function newElementMake(type,description,value){
const time = getFormatedDateTime();
const newItemHtml = `<div class="item">
<div class="item-description-time">
    <div class="item-description">
    <p>${description}</p>
    </div>
    <div class="item-time">
    <p>${time}</p>
    </div>
</div>
<div class="item-amount ${type === '+' ? "income-amount":"expense-amount"}">
    <p>${type}$${value}</p>
</div>
</div>`;
document.querySelector('.collection').insertAdjacentHTML('afterbegin',newItemHtml);
}

function resetForm(){
document.querySelector(".add__type").value = '+';
document.querySelector(".add__description").value = '';
document.querySelector(".add__value").value = '';
}

