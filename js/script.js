// Seleção de elementos do DOM
const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");
const qrCodeInput = document.querySelector("#qr-form input");
const qrCodeImg = document.querySelector("#qr-code img");

// Função para gerar o QR code
function genereteQrcCode() {
  const qrCodeInputValue = qrCodeInput.value;

  
  if (!qrCodeInputValue) return;

  
  qrCodeBtn.innerText = "Gerando código...";

  
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;

 
  qrCodeImg.addEventListener("load", () => {
    
    container.classList.add("active");

    
    qrCodeBtn.innerText = "Código criado!";
  });

  document.getElementById("download-btn").style.display = "block";
}

qrCodeBtn.addEventListener("click", () => {
  genereteQrcCode();
});


qrCodeInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    genereteQrcCode();
  }
});

// Evento para limpar o QR code quando o campo de entrada for apagado
qrCodeInput.addEventListener("keyup", () => {
  
  if (!qrCodeInput.value) {
    
    container.classList.remove("active");

    
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

const downButton = document.getElementById("download-btn");
downButton.addEventListener("click", () => {
  downloadImage();
});
