var x = 0;
var cart = [];
var cartTotal = 0;

function validate() {

    if (document.addProductForm.productName.value == "") {
        alert("Please provide product name!");
        document.addProductForm.productName.focus();
        return false;
    }
    if (document.addProductForm.productImage.value == "") {
        alert("Please provide product Image");
        document.addProductForm.productImage.focus();
        return false;
    }
    if (document.addProductForm.productDesc.value == "") {
        alert("Please provide Product Description");
        document.addProductForm.productDesc.focus();
        return false;
    }
    if (document.addProductForm.productQty.value < 1) {
        alert("Minimum Qantity is 1!");
        document.addProductForm.productQty.focus();
        return false;
    }
    if (document.addProductForm.productPrice.value < 1) {
        alert("Please enter price more 0!");
        document.addProductForm.productPrice.focus();
        return false;
    }

    addProduct();
    return true;
}


var x = 0;
var cart = [];
var cartTotal = 0;
function addProduct() {
    let files = document.getElementById("productImage").files
    if (files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            x++;
            var div = document.createElement('div');
            var img = document.createElement('img');
            var infoDiv = document.createElement('div');
            var qtyDiv = document.createElement('div');
            var button = document.createElement('button');
            var productName = document.createElement('p');
            var productDesc = document.createElement('p');
            var productPrice = document.createElement('p');
            var productQty = document.createElement('p');
            productName.id = "name" + x;
            productDesc.id = "desc" + x;
            productPrice.id = "price" + x;
            productQty.id = "qty" + x;
            img.id = "img" + x;
            button.id = x;
            productName.innerHTML = document.getElementById("productName").value;
            productDesc.innerHTML = document.getElementById("productDesc").value;
            productPrice.innerHTML = document.getElementById("productPrice").value + " Rs";
            productQty.innerHTML = document.getElementById("productQty").value + " Qty";
            button.innerHTML = "Add To Cart";
            div.classList.add("item");
            img.src = fr.result;
            img.classList.add("image","shop-item-image");
            productName.classList.add("shop-item-title");
            productDesc.classList.add("shop-item-desc");
            button.classList.add("btnaddtocart","btn","btn-primary","shop-item-button");
            infoDiv.classList.add("productinfo","shop-item-details");
            qtyDiv.classList.add("quantityinfo","shop-item-details");
            productPrice.classList.add("shop-item-price");
            // button.addEventListener("click", addcart);
            button.onclick = function () {
                addcart(this.id);
            }
            div.append(img);
            infoDiv.append(productName);
            infoDiv.append(productDesc);
            div.append(infoDiv);
            qtyDiv.append(productPrice);
            qtyDiv.append(productQty);
            div.append(qtyDiv);
            div.append(button);
            document.getElementById('product').append(div);
            
        }
        fr.readAsDataURL(files[0]);
    }
}
function addcart(x) {
    console.log("X:"+x);
    console.log(cart);
    if (cart.indexOf(x) > -1) {
        var productQty = document.getElementById("qty" + x).innerHTML;
        console.log("Qty" +productQty);
        var qty = parseFloat(productQty);
        console.log("AfterParseFloatQty" +qty);
        if (qty > 0) {
            document.getElementById("qty" + x).innerHTML = qty - 1 + " Qty";
            var productPrice = document.getElementById("price" + x).innerHTML;
            var total = document.getElementById("total" + x).innerHTML;
            var newtotal = parseFloat(total) + parseFloat(productPrice);
            cartTotal += parseFloat(productPrice);
            document.getElementById("total" + x).innerHTML = newtotal +" Rs" ;
            document.getElementById("cartqty" + x).innerHTML = newtotal / parseFloat(productPrice);
            document.getElementById('total').innerHTML = "Total Rs "+ cartTotal ;
        } else {
            alert("Sorry Product Out of stock");
        }
    } else {
        cart.push(x);
        var productName = document.getElementById("name" + x).innerHTML;
        var productPrice = document.getElementById("price" + x).innerHTML;
        var productQty = document.getElementById("qty" + x).innerHTML;
        document.getElementById("qty" + x).innerHTML = parseFloat(productQty) - 1 + " Qty";
        var image = document.getElementById("img" + x).src

        var tableRow=document.createElement('tr');
        var tablePName=document.createElement('td');
        var tablePNameDiv=document.createElement('div');
        var tablePrice=document.createElement('td');
        var tableQty=document.createElement('td');
        var tableTotal=document.createElement('td');
        var tableBtntd=document.createElement('td');
        
        var img = document.createElement('img');
        var infoDiv = document.createElement('div');
        var qtyDiv = document.createElement('div');
        var delButton = document.createElement('button');
        img.classList.add("image","cart-item-image");
        infoDiv.classList.add("cartinfo");
        delButton.classList.add("btn","btn-danger");
        qtyDiv.classList.add("cart-quantity-input");
        delButton.id = "remove" + x;

        delButton.innerHTML = "Delete";
        delButton.onclick = function () {
            removeElement(this.id);
        }
        qtyDiv.innerHTML = "QTY:-";
        img.src = image;

        tablePNameDiv.innerHTML=productName;
        tablePrice.innerHTML=productPrice;
        tableQty.innerHTML="1";
        tableTotal.innerHTML=productPrice;

        tablePNameDiv.id="nameDiv";
        tableQty.id = "cartqty" + x;
        tableRow.id = "remove" + x + "delete";
        tableTotal.id="total" + x;
        
        document.getElementById("cartTableBody").append(tableRow);
        tableRow.append(tablePName);
        tablePName.append(tablePNameDiv);
        tablePName.append(img);
        tableRow.append(tablePrice);
        tableRow.append(tableQty);
        tableRow.append(tableTotal);
        tableRow.append(tableBtntd);
        tableBtntd.append(delButton);
        
        cartTotal += parseFloat(productPrice);
        document.getElementById('total').innerHTML = "Total Rs "+ cartTotal ;
    }
}
function removeElement(elementId) {
    var id = elementId;
    id = id.substring(6);
    cart = arrayRemove(cart, id);
    var qty = document.getElementById("qty" + id).innerHTML;
    var cartqty = document.getElementById("cartqty" + id).innerHTML;
    document.getElementById("qty" + id).innerHTML = parseFloat(cartqty) + parseFloat(qty) + " Qty";
    var itemTotal = document.getElementById("total" + id).innerHTML;
    cartTotal = cartTotal - parseFloat(itemTotal);
    document.getElementById('total').innerHTML = "Total Rs "+ cartTotal ;
    var element = document.getElementById(elementId + "delete");
    element.parentNode.removeChild(element);

}
function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });

}