const items = [
  {
    id: 1,
    tipoDocumento: "nf-e",
    plano: "A1",
    duracao: "1 ano",
    preco: "325.00",
    img: "img/NFe.png"
  },
  {
    id: 2,
    tipoDocumento: "nf-e",
    plano: "A3",
    duracao: "1 ano",
    preco: "325.00",
    img: "img/NFe.png"
  },
  {
    id: 3,
    tipoDocumento: "nf-e",
    plano: "A3",
    duracao: "3 anos",
    preco: "530.00",
    img: "img/NFe.png"
  },
  {
    id: 4,
    tipoDocumento: "nf-e",
    plano: "A3C",
    duracao: "1 ano",
    preco: "495.00",
    img: "img/NFe.png"
  },
  {
    id: 5,
    tipoDocumento: "nf-e",
    plano: "A3C",
    duracao: "3 anos",
    preco: "580.00",
    img: "img/NFe.png"
  },
  {
    id: 6,
    tipoDocumento: "nf-e",
    plano: "A3CL",
    duracao: "1 ano",
    preco: "630.00",
    img: "img/NFe.png"
  },
  {
    id: 7,
    tipoDocumento: "nf-e",
    plano: "A3CL",
    duracao: "3 anos",
    preco: "725.00",
    img: "img/NFe.png"
  },
  {
    id: 8,
    tipoDocumento: "ecpf",
    plano: "A1",
    duracao: "1 ano",
    preco: "155.00",
    img: "img/eCPF.png"
  },
  {
    id: 9,
    tipoDocumento: "ecpf",
    plano: "A3",
    duracao: "1 ano",
    preco: "155.00",
    img: "img/eCPF.png"
  },
  {
    id: 10,
    tipoDocumento: "ecpf",
    plano: "A3",
    duracao: "3 anos",
    preco: "225.00",
    img: "img/eCPF.png"
  },
  {
    id: 11,
    tipoDocumento: "ecpf",
    plano: "A3C",
    duracao: "1 ano",
    preco: "215.00",
    img: "img/eCPF.png"
  },
  {
    id: 12,
    tipoDocumento: "ecpf",
    plano: "A3C",
    duracao: "3 anos",
    preco: "275.00",
    img: "img/eCPF.png"
  },
  {
    id: 13,
    tipoDocumento: "ecpf",
    plano: "A3CL",
    duracao: "1 ano",
    preco: "350.00",
    img: "img/eCPF.png"
  },
  {
    id: 14,
    tipoDocumento: "ecpf",
    plano: "A3CL",
    duracao: "3 anos",
    preco: "420.00",
    img: "img/eCPF.png"
  },
  {
    id: 15,
    tipoDocumento: "ecnpj",
    plano: "A1",
    duracao: "1 ano",
    preco: "221.00",
    img: "img/eCNPJ.png"
  },
  {
    id: 16,
    tipoDocumento: "ecnpj",
    plano: "A3",
    duracao: "1 ano",
    preco: "229.00",
    img: "img/eCNPJ.png"
  },
  {
    id: 17,
    tipoDocumento: "ecnpj",
    plano: "A3",
    duracao: "3 anos",
    preco: "325.00",
    img: "img/eCNPJ.png"
  },
  {
    id: 18,
    tipoDocumento: "ecnpj",
    plano: "A3C",
    duracao: "1 ano",
    preco: "279.00",
    img: "img/eCNPJ.png"
  },
  {
    id: 19,
    tipoDocumento: "ecnpj",
    plano: "A3C",
    duracao: "3 anos",
    preco: "379.00",
    img: "img/eCNPJ.png"
  },
  {
    id: 20,
    tipoDocumento: "ecnpj",
    plano: "A3CL",
    duracao: "1 ano",
    preco: "439.00",
    img: "img/eCNPJ.png"
  },
  {
    id: 21,
    tipoDocumento: "ecnpj",
    plano: "A3CL",
    duracao: "3 anos",
    preco: "545.00",
    img: "img/eCNPJ.png"
  }
];

const openBtn = document.getElementById('open-cart-btn');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close_btn');
const backdrop = document.querySelector('.backdrop');
const cartItems = document.querySelector('.cart-items');

openBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);

let cartData = [];

const savedCartData = localStorage.getItem('cartData');
if (savedCartData) {
  cartData = JSON.parse(savedCartData);
  updateCart();
}

updateCartSummary();
updateSubtotal();

function openCart() {
  cart.classList.add('open');
  backdrop.style.display = 'block';

  setTimeout(() => {
    backdrop.classList.add('show');
  }, 0);
}

function closeCart() {
  cart.classList.remove('open');
  backdrop.classList.remove('show');

  setTimeout(() => {
    backdrop.style.display = 'none';
  }, 500);
}

function addItemCart(tipoDoc) {
  const tipo = document.getElementById("tipo").value;
  const validade = document.getElementById("validade").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);

  console.log("Tipo de Documento: ", tipoDoc);
  console.log("Tipo: ", tipo);
  console.log("Validade: ", validade);
  console.log("Quantidade: ", quantidade);

  const existingItemIndex = cartData.findIndex(item => item.tipoDocumento === tipoDoc && item.plano === tipo && item.duracao === validade);

  if (existingItemIndex !== -1) {
    cartData[existingItemIndex].quantidade += quantidade;
  } else {
    for (let i = 0; i < items.length; i++) {
      if (items[i].tipoDocumento === tipoDoc && items[i].plano === tipo && items[i].duracao === validade) {
        const newItem = Object.assign({}, items[i]); 
        newItem.quantidade = quantidade;
        cartData.push(newItem);
        console.log("Item Adicionado ao Carrinho: ", newItem);
        break;
      }
    }
  }

  updateCart();
  updateCartSummary();
  updateSubtotal();
  openCart();


  localStorage.setItem('cartData', JSON.stringify(cartData));
}

function renderCart() {
  cartItems.innerHTML = '';

  cartData.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <div class="remove-item">
        <span>&times;</span>
      </div>
      <div class="item-img">
        <img src="${item.img}">
      </div>
      <div class="item-details">
        <p>${item.tipoDocumento} - ${item.plano} - ${item.duracao}</p>
        <strong>R$${item.preco}</strong>
        <div class="qty">
            <strong>Quantidade: ${item.quantidade}</strong>
        </div>
      </div>
    `;
    cartItems.appendChild(cartItem);

    const removeButton = cartItem.querySelector('.remove-item');
    removeButton.addEventListener('click', () => removeCartItem(item.id));
  });
}

function removeCartItem(itemId) {
  const index = cartData.findIndex(item => item.id === itemId);

  if (index !== -1) {
    cartData.splice(index, 1);

    updateCart();
    updateCartSummary();
    updateSubtotal();

    localStorage.setItem('cartData', JSON.stringify(cartData));
  } else {
    console.error("Item não encontrado no carrinho.");
  }
}

function updateSubtotal() {
  let subtotal = 0;

  cartData.forEach(item => {
      subtotal += item.preco * item.quantidade;
  });

  // Atualiza o elemento HTML do subtotal
  document.getElementById("subtotal_price").textContent = subtotal.toFixed(2); 
}

function updateCartSummary() {
  document.getElementById("items-cart").textContent = cartData.length;

  let subtotal = 0;
  cartData.forEach(item => {
      subtotal += item.preco * item.quantidade;
  });

  document.getElementById("subtotal_price").textContent = subtotal.toFixed(2);
}

function updateCart() {
  renderCart();
}

const planosMap = {
  "A1": "A1",
  "A3": "A3",
  "A3C": "A3 em cartão",
  "A3CL": "A3 em cartão + leitora ou token"
};

function sendCartToWhatsapp() {
  let number = "+5511915908957"; // Seu número de WhatsApp
  let message = "Pedido de Certificados: %0a";

  let totalOrderPrice = 0; // Inicializa o preço total do pedido como zero

  // Itera sobre os itens do carrinho
  cartData.forEach((item, index) => {
      message += `Item ${index + 1}: %0a`;
      message += `Tipo: ${item.tipoDocumento} %0a`;
      message += `Plano: ${planosMap[item.plano]} %0a`; // Usando o mapeamento para obter o texto completo do plano
      message += `Validade: ${item.duracao} %0a`;
      message += `Quantidade: ${item.quantidade} %0a`;
      message += `Preço unitário: R$ ${item.preco} %0a`;

      // Calcula o preço total deste item (preço unitário * quantidade)
      let totalPrice = parseFloat(item.preco) * item.quantidade;
      message += `Preço total do item: R$ ${totalPrice.toFixed(2)} %0a`;
      message += `%0a`;

      // Adiciona o preço total deste item ao preço total do pedido
      totalOrderPrice += totalPrice;
  });

  // Adiciona o preço total do pedido à mensagem
  message += `%0aPreço total do pedido: R$ ${totalOrderPrice.toFixed(2)} %0a`;

  // Constrói a URL para enviar a mensagem pelo WhatsApp
  let url = "https://wa.me/" + number + "?text=" + message;

  // Abre a URL no WhatsApp em uma nova guia
  window.open(url, '_blank').focus();
}

