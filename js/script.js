// Seleção de elementos do DOM
const container = document.querySelector(".container"); // Contêiner principal que exibe o QR code
const qrCodeBtn = document.querySelector("#qr-form button"); // Botão para gerar o QR code
const qrCodeInput = document.querySelector("#qr-form input"); // Campo de entrada de texto para URL ou texto
const qrCodeImg = document.querySelector("#qr-code img"); // Imagem onde o QR code será exibido]

// Função para gerar o QR code
function genereteQrcCode() {
  const qrCodeInputValue = qrCodeInput.value; // Obtém o valor digitado no campo de entrada

  // Se o campo de entrada estiver vazio, a função não faz nada
  if (!qrCodeInputValue) return;

  // Altera o texto do botão para informar que o QR code está sendo gerado
  qrCodeBtn.innerText = "Gerando código...";

  // A URL da imagem do QR code é alterada para chamar a API externa (QR Server) passando o valor de entrada
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;

  // Adiciona um evento para quando a imagem do QR code for completamente carregada
  qrCodeImg.addEventListener("load", () => {
    // Quando a imagem for carregada, a classe "active" é adicionada ao contêiner, mostrando o QR code
    container.classList.add("active");

    // O texto do botão é alterado para "Código criado!" após a geração do QR code
    qrCodeBtn.innerText = "Código criado!";
  });

  document.getElementById("download-btn").style.display = "block";
}
// Evento para gerar o QR code ao clicar no botão
qrCodeBtn.addEventListener("click", () => {
  genereteQrcCode(); // Chama a função para gerar o QR code
});

// Evento para gerar o QR code ao pressionar a tecla "Enter"
qrCodeInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    genereteQrcCode(); // Chama a função para gerar o QR code ao pressionar Enter
  }
});

// Evento para limpar o QR code quando o campo de entrada for apagado
qrCodeInput.addEventListener("keyup", () => {
  // Verifica se o campo de entrada está vazio
  if (!qrCodeInput.value) {
    // Remove a classe "active" do contêiner, ocultando o QR code
    container.classList.remove("active");

    // Restaura o texto do botão para "Gerar QR Code"
    qrCodeBtn.innerText = "Gerar QR Code";
  }
});

function downloadImage() {
  let name = document.getElementById("name").src;

  fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${name}`)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => alert("Erro ao baixar a imagem"));
}