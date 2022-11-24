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
/*check and return any data is on Browser Local Storage strt*/
function getItemsFromLS(){
    let items = localStorage.getItem('item');
    if(items){
    items = JSON.parse(items);
    }else{
    items = [];
    } 
 return items;
}
/*check and return any data is on Browser Local Storage end*/

/*add new data with existing or new to Browser Local Storage strt*/
function addItemsToLS(time,type,description,value){
    let items = getItemsFromLS();
    items.push({time,type,description,value});
    console.log(items);
    localStorage.setItem('item',JSON.stringify(items));   
}
/*add new data with existing or new to Browser Local Storage end*/

/*show items from browser local storage start*/
showItemsFromLs();
function showItemsFromLs(){
    let items = getItemsFromLS();
    for(let item of items){
        let newItemHtml = `<div class="item">
        <div class="item-description-time">
        <div class="item-description">
        <p>${item.description}</p>
        </div>
        <div class="item-time">
        <p>${item.time}</p>
        </div>
        </div>
        <div class="item-amount ${item.type === '+' ? "income-amount":"expense-amount"}">
        <p>${item.type}$${item.value}</p>
        </div>
        </div>`;
        document.querySelector('.collection').insertAdjacentHTML('afterbegin',newItemHtml);
    }
}
/*show items from browser local storage end*/

/*total income count strt*/
showTotalIncome();
function showTotalIncome(){
    let items = getItemsFromLS();
    let totalIncome = 0;
    for(let item of items){
        if(item.type === "+")
        totalIncome += parseInt(item.value);
    }
    document.querySelector('.income__amount p').innerText = `$${totalIncome}` ;
    console.log(document.querySelector('.expense__amount p').children);
}
/*total income count end*/
/*total expense count strt*/
showTotalExpenses();
function showTotalExpenses(){
    let items = getItemsFromLS();
    let totalExpense = 0;
    for(let item of items){
        if(item.type === "-")
        totalExpense += parseInt(item.value);
    }
    document.querySelector('.expense__amount p').innerText = `$${totalExpense}`;
    console.log(totalExpense);
}
/*total expense count end*/

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
addItemsToLS(time,type,description,value);
showTotalIncome();
showTotalExpenses();
}

/*reset the typed item of add bar in form strt*/
function resetForm(){
document.querySelector(".add__type").value = '+';
document.querySelector(".add__description").value = '';
document.querySelector(".add__value").value = '';
}
/*reset the typed item of add bar in form end*/
