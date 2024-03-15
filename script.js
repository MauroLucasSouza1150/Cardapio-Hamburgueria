const menu = document.querySelector("#menu");
const cartBtn = document.querySelector("#cart-btn");
const cartModal = document.querySelector("#cart-modal");
const cartItemsContainer = document.querySelector("#cart-items");
const cartTolal = document.querySelector("#cart-total");
const checkoutBtn = document.querySelector("#checkout-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const cartCounter = document.querySelector("#cart-count");
const addressInput = document.querySelector("#address");
const addressWarn = document.querySelector("#address-warn");

let cart = [];

cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";
});

cartModal.addEventListener("click",function(event) {
    if(event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
});

menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if(parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price)
    }

})


const addToCart = (name,price) => {
    const hasItem = cart.find((item) => item.name === name);

    if (hasItem) {
        hasItem.quantity += 1;
    }else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();

}

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-normal">Nome: ${item.name}</p>
                    <p class="font-normal">Quantidade: ${item.quantity}</p>
                    <p class="font-medium mb-2">Preço: R$ ${item.price.toFixed(2)} Reais</p>
                </div>
                <button class="font-normal border text-red-600 px-4 py-1 rounded remove-from-cart-btn" data-name="${item.name}"=>Remover </button>
            </div>
        `

        total += item.price * item.quantity;

        cartTolal.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartCounter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            cartTolal.textContent = "00.00";
            updateCartModal();
            return;
        }else {
            cart.splice(index, 1);
            cartTolal.textContent = "00.00";
            updateCartModal();
        }

    }


}

addressInput.addEventListener("input", function(event) { 
    let inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
})

checkoutBtn.addEventListener("click", function() {
    const isOpen = checkOpen();

    if(!isOpen) {
        
    Toastify({
        text: "O Restaurante está fechado no momento, Abriremos às 18:00 horas!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#ef4444",
        },
    }).showToasty();
    return;
}

    if (cart.length === 0) return;

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    const cartItems = cart.map((item) => {
        return (
            `Nome: ${item.name} Quantidade: ${item.quantity} Preço: ${item.price} || `
        )
    }).join()

    const message = encodeURIComponent(cartItems)
    const phone = "88981258154"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank");

    cart = [];
    cartTolal.textContent = "00.00";
    updateCartModal();

})

function checkOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 23;
}

const spanItem = document.querySelector("#date-span");
const isOpen = checkOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
}else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
