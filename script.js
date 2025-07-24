let clienteWeb = null;

const clientId = 'Esp32' + Math.floor(Math.random() * 900) + 100;
clienteWeb = new Paho.MQTT.Client('broker.hivemq.com', 8884, clientId);

// Obtem acesso ao elemento do HTML
const tempPagina = document.getElementById("temperatura")
const umidadePagina = document.getElementById("umidade")
const timePagina = document.getElementById("time")

clienteWeb.onMessageArrived = function(message) {
    const payload = message.payloadString;
    const dados = JSON.parse(payload)

    tempPagina.textContent = String(dados.temperatura) + " °C"
    umidadePagina.textContent = String(dados.umidade) + " %"
    
    const agora = new Date()
    const dataPtBR = agora.toLocaleString()
    timePagina.textContent = "Atualizado em: " + dataPtBR
}

clienteWeb.connect({   
    useSSL: true, 
    onSuccess: function() {
        alert('A conexão com Broker foi bem sucedida')
        clienteWeb.subscribe('senai510/temperatura/m');
    },
    onFailure: function() {
        alert('A conexão com Broker falhou')
    }
});
