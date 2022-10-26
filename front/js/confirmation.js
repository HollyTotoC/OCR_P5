let params = new URL(document.location).searchParams;
let orderId = params.get("orderId");

document.getElementById("orderId").textContent = orderId;