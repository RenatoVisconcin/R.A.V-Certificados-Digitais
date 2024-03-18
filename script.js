const tipoSelect = document.getElementById("tipo");
const validadeSelect = document.getElementById("validade");
const quantidadeInput = document.querySelector('input[name="quantidade"]');

function updateValidadeOptions() {
  const isA1Selected = tipoSelect.value === "A1";
  validadeSelect.options[2].disabled = isA1Selected; 
}

function updatePrice() {
  const chosenTipo = tipoSelect.value;
  const chosenValidade = validadeSelect.value;
  const chosenQuantidade = quantidadeInput.value;
  
  const priceElementId = `price_${chosenTipo}_${chosenValidade}`;
  
  const priceElement = document.getElementById(priceElementId);
  const precoContainer = document.querySelector(".preco-container");

  if (priceElement && chosenQuantidade.trim() !== "") {
    const price = priceElement.value;
    const totalPrice = parseFloat(price) * parseInt(chosenQuantidade);
    precoContainer.textContent = `Preço total para ${chosenQuantidade} unidades: R$ ${totalPrice.toFixed(2)}`;
  } else {
    precoContainer.textContent = "Por favor, selecione tipo, validade e quantidade.";
  }
}

tipoSelect.addEventListener("change", updateValidadeOptions);
tipoSelect.addEventListener("change", updatePrice);
validadeSelect.addEventListener("change", updatePrice);
quantidadeInput.addEventListener("input", updatePrice); 

updateValidadeOptions();


// Mapeamento dos tipos de certificado
const tiposMap = {
  "A1": "A1",
  "A3": "A3",
  "A3C": "A3 em cartão",
  "A3CL": "A3 em cartão + leitora ou token"
};

// Mapeamento das validades dos certificados
const validadesMap = {
  "1 ano": "1 ano",
  "3 anos": "3 anos"
};

function sendToWhatsapp(certType){
  let number = "+5511915908957"; 
  let tipo = tiposMap[document.getElementById("tipo").value];
  let validade = validadesMap[document.getElementById("validade").value];
  let quantidade = document.getElementsByName("quantidade")[0].value;

  let tipo1 = document.getElementById("tipo").value;
  let validade1 = document.getElementById("validade").value;

  let priceId = `price_${tipo1}_${validade1}`;
  let price = document.getElementById(priceId)?.value || "Indisponível";

  let baseMessage = `*Certificado*: ${certType}%0a`
                   + `*Tipo*: ${tipo}%0a`
                   + `*Validade*: ${validade}%0a`
                   + `*Quantidade*: ${quantidade}%0a`
                   + `*Preço*: R$ ${price}%0a`;

  var url = "https://wa.me/" + number + "?text=" + baseMessage;

  // Abertura da URL no WhatsApp em uma nova guia
  window.open(url, '_blank').focus();
}


