document.querySelector('#ewallet-form').addEventListener('submit',(e)=>{
e.preventDefault();
const type = document.querySelector(".add__type").value;
const description = document.querySelector(".add__description").value;
const amount = document.querySelector(".add__value").value;
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
    return items ? JSON.parse(items) : [];
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
        <p>${item.type}$${toSeparetorFun(item.value)}</p>
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
    let totalIncome = items.filter(item => item.type === "+").reduce((income,item) => income + parseInt(item.value),0);
    document.querySelector('.income__amount p').innerText = `$${toSeparetorFun(totalIncome)}` ;
}
/*total income count end*/
/*total expense count strt*/
showTotalExpenses();
function showTotalExpenses(){
    let items = getItemsFromLS();
    let totalExpense = items.filter(item => item.type === "-").reduce((income,item) => income + parseInt(item.value),0);
    document.querySelector('.expense__amount p').innerText = `$${toSeparetorFun(totalExpense)}`;
}
/*total expense count end*/

/*total balance calculate and background strt*/
totalBalance();
function totalBalance(){
    let allitems = getItemsFromLS();
    let totalBal = 0;
    for(let item of allitems){
        if(item.type === "+")
        totalBal += parseInt(item.value);
        else
        totalBal -= parseInt(item.value);   
    }
    document.querySelector('.balance__amount p').innerText = `$${toSeparetorFun(totalBal)}`;
    totalBal >= 0 ?  document.querySelector('header').className= "green": document.querySelector('header').className= "red";
}
/*total balance calculate and background end*/

/*comma separated number str*/
function toSeparetorFun(val){
    const value = parseInt(val);
    return value.toLocaleString();
}
/*comma separated number end*/

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
    <p>${type}$${toSeparetorFun(value)}</p>
</div>
</div>`;
document.querySelector('.collection').insertAdjacentHTML('afterbegin',newItemHtml);
addItemsToLS(time,type,description,value);
showTotalIncome();
showTotalExpenses();
totalBalance();
}

/*reset the typed item of add bar in form strt*/
function resetForm(){
document.querySelector(".add__type").value = '+';
document.querySelector(".add__description").value = '';
document.querySelector(".add__value").value = '';
}
/*reset the typed item of add bar in form end*/
