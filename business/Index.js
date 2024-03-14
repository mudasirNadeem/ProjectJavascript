var products=[];
var productJson=localStorage.getItem("products");
if(productJson){
    products=JSON.parse(productJson);
    products.forEach(product => {
        ShowProductToUser(product);
    });
}

var index = 0;
function submitData() {
    index++;
    var productNmeElement = document.getElementById("productName").value;
    var constPriceElement = document.getElementById("costPrice").value;
    var salePriceElement = document.getElementById("salePrice").value;
  
  if (productNmeElement && constPriceElement && salePriceElement !== 0) {
    var newProduct={
        id:index,
      name:productNmeElement,
      costPrice: constPriceElement,
      salePrice:salePriceElement,
    };
    products.push(newProduct);
    ShowProductToUser(newProduct);

     productNmeElement = document.getElementById("productName").value = "";
     constPriceElement = document.getElementById("costPrice").value = "";
     salePriceElement = document.getElementById("salePrice").value = "";

     localStorage.setItem("products",JSON.stringify(products));
  } else {
    alert("Please Enter Your Data");
  }
}

function ShowProductToUser(newProduct) {
    var tbodyElement = document.querySelector("tbody");
    
    let productElement = document.createElement("tr");

    productElement.setAttribute("id", `ProductRow-${newProduct.id}`);
    tbodyElement.appendChild(productElement);

    let nameDetails = document.createElement("td");
    productElement.appendChild(nameDetails);
    nameDetails.setAttribute("id", `ProductName-${newProduct.id}`);
    nameDetails.innerText += `${newProduct.name}`;

    let costPriceDetails = document.createElement("td");
    productElement.appendChild(costPriceDetails);
    costPriceDetails.setAttribute("id", `ConstPrice-${newProduct.id}`);
    costPriceDetails.innerText += `${newProduct.costPrice}`;

    let salePriceDetails = document.createElement("td");
    productElement.appendChild(salePriceDetails);
    salePriceDetails.setAttribute("id", `SalePrice-${newProduct.id}`);
    salePriceDetails.innerText += `${newProduct.salePrice}`;

    let editbtnElement = document.createElement("td");
    productElement.appendChild(editbtnElement);
    editbtnElement.innerHTML += `    <button type="button" onclick = "onEditClick(${newProduct.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <i class="fa-solid fa-pen"></i>
                        </button>`;

    let deletebtnElement = document.createElement("td");
    productElement.appendChild(deletebtnElement);
    deletebtnElement.innerHTML += `<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#deletedata" onclick= "onDeleteClick(${newProduct.id})" >
    <i class="fa-solid fa-trash-can"></i>
</button>`;
}

function deleteData() {
  var productElement = document.getElementById(`ProductRow-${selectedProduct.id}`);
  productElement.remove(productElement);
  var index=products.indexOf(selectedProduct);
   products.splice(index,1);
   localStorage.setItem("products", JSON.stringify(products));
}
function editProductDetail() {
    var editnameElement = document.getElementById("editproductnameElement").value;
    var editCostPriceElement = document.getElementById("editCostPriceElement").value;
    var editSalePriceElement = document.getElementById("editSalePriceElement").value;

     productNameElement = document.getElementById(`ProductName-${selectedProduct.id}`);
     costPriceElement = document.getElementById(`ConstPrice-${selectedProduct.id}`);
     salePriceElement = document.getElementById(`SalePrice-${selectedProduct.id}`);

     productNameElement.innerText = editnameElement;
     costPriceElement.innerText = editCostPriceElement;
     salePriceElement.innerText = editSalePriceElement;
     
     selectedProduct.name = editnameElement;
     selectedProduct.costPrice = editCostPriceElement;
     selectedProduct.salePrice = editSalePriceElement;
     
     localStorage.setItem("products", JSON.stringify(products));

    editnameElement = document.getElementById("editproductnameElement").value = "";
    editCostPriceElement = document.getElementById("editCostPriceElement").value = "";
    editSalePriceElement = document.getElementById("editSalePriceElement").value = "";
}

var productNameElement = undefined;
var    costPriceElement = undefined
var  salePriceElement = undefined
var selectedProduct = undefined;
function onEditClick(id){
     selectedProduct = products.find(product => product.id == id);
  
}
function onDeleteClick(id){
  selectedProduct = products.find(products => products.id == id);

}