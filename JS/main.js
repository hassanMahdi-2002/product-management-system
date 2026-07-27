var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");

var currentId = 0;

var currentIndex = 0;
var addBtn= document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn") 

var productsContener ;
if(localStorage.getItem("myProducts") != null)
    {
        productsContener =JSON.parse ( localStorage.getItem("myProducts"));
        displayProducts(productsContener);
    }
    else 
        {
            productsContener = [];
        } 
function addProduct()
{
    if (validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true) {

    var products={
        id: Date.now(),
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value
    }
    productsContener.push(products);
    localStorage.setItem("myProducts", JSON.stringify(productsContener) );
    clearForm();
    displayProducts(productsContener);
}else{
    alert("Please enter valid product details.");
}
}
function clearForm()
{
    productNameInput.value = "",
    productPriceInput.value = "",
    productCategoryInput.value = "",
    productDescriptionInput.value = ""
    
    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
}

function displayProducts(productList){
    var cartoona = ``;
    for(var i = 0 ; i<productList.length ; i++){
        cartoona +=`<tr>
            <td>${i + 1}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td><button onclick="setFormForUpdate(${productList[i].id})" class="btn btn-warning btn-sm">Update</button></td>
            <td><button onclick="deleteProducts(${productList[i].id})" class="btn btn-danger btn-sm">Delete</button></td>
            </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartoona ;
}

function searchProducts(searchTerm){
    var searchResult=[];
    for(var i=0 ; i < productsContener.length ; i++){

        if(productsContener[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            searchResult.push(productsContener[i]);
        } 
    }
    displayProducts(searchResult);
}
function deleteProducts(deletedId){


    var index = productsContener.findIndex(function(product) {
        return product.id === deletedId;
    });

    if (index !== -1) {
        productsContener.splice(index, 1);
        localStorage.setItem("myProducts", JSON.stringify(productsContener));
        displayProducts(productsContener); 
    }
}


function setFormForUpdate(updatedId){
    currentId = updatedId;
    var product = productsContener.find(function(product) {
        return product.id === updatedId;
    });
    if (product) {
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productCategoryInput.value = product.category;
        productDescriptionInput.value = product.description;

        updateBtn.classList.replace("d-none", "d-inline-block");
        addBtn.classList.add("d-none");
    }else{
        alert("Product not found.");
    }
}


function updateProduct(){

    var index = productsContener.findIndex(function(product) {
        return product.id === currentId;
    });

    productsContener[index].name = productNameInput.value;
    productsContener[index].price = productPriceInput.value;
    productsContener[index].category = productCategoryInput.value;
    productsContener[index].description = productDescriptionInput.value;

    localStorage.setItem("myProducts", JSON.stringify(productsContener));

    displayProducts(productsContener);

    clearForm();

    updateBtn.classList.replace("d-inline-block", "d-none");
    addBtn.classList.remove("d-none");
}



function validateProductName() {

    var regex = /^[A-Z][a-zA-Z0-9\s]{2,20}$/;
    if (regex.test(productNameInput.value) == true) {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        return true;
    } else {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        return false;
    }
}

function validateProductPrice() {
    var regex = /^([1-9][0-9]{0,5})$/; 
    if (regex.test(productPriceInput.value) == true) {
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        return true;
    } else {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        return false;
    }
}

function validateProductCategory() {
    var regex = /^[A-Z][a-zA-Z\s]{2,20}$/;
    if (regex.test(productCategoryInput.value) == true) {
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        return true;
    } else {
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        return false;
    }
}