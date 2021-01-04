if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

const item = document.getElementById('dropdown').selectedOptions[0].text;
var stripeHandler = StripeCheckout.configure({
  key:stripePublicKey,
  locale: 'auto',
  token: function(token){
    const items = document.getElementById('dropdown').selectedOptions[0].value;
    fetch('/purchase',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        stripeTokenID: token.id,
        items: items
      })
    }).then((res) => {
      return res.json()
    }).then((data) => {
      alert(data.message)
    }).catch(function(error){
      console.error(error)
    })
  }
})

function purchaseClicked(){
  const priceElement = document.getElementById('dropdown').selectedOptions[0].value;
  const name = document.getElementById('name').value;
  if (priceElement == ''){
    alert('please select an option')
  } else {
    const price = parseFloat(priceElement) * 100
    stripeHandler.open({
      name: name,
      amount: price
      })
  }
}

