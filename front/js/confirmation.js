function main() {
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = localStorage.getItem('orderId');
    console.log(localStorage.getItem("orderId"));
    localStorage.clear();
  }

  main ();