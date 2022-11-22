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


function newElementMake(type,description,value){
const newItemHtml = `<div class="item">
<div class="item-description-time">
    <div class="item-description">
    <p>${description}</p>
    </div>
    <div class="item-time">
    <p>25 Feb, 06:45 PM</p>
    </div>
</div>
<div class="item-amount ${type === '+' ? "income-amount":"expense-amount"}">
    <p>${type}$${value}</p>
</div>
</div>`;

console.log(newItemHtml);
document.querySelector('.collection').insertAdjacentHTML('afterbegin',newItemHtml);
}

function resetForm(){
document.querySelector(".add__type").value = '+';
document.querySelector(".add__description").value = '';
document.querySelector(".add__value").value = '';
}

