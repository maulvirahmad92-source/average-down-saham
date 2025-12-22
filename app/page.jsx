"use client";
import { useState } from "react";

export default function AverageDownApp() {
  const [rows, setRows] = useState([
    { price: 1000, lot: 10 },
    { price: 800, lot: 10 },
  ]);
  const [sellPrice, setSellPrice] = useState(950);

  const addRow = () => setRows([...rows, { price: 0, lot: 0 }]);
  const updateRow = (i, k, v) => {
    const c = [...rows];
    c[i][k] = Number(v);
    setRows(c);
  };

  const totalLot = rows.reduce((a, b) => a + b.lot, 0);
  const totalShares = totalLot * 100;
  const totalValue = rows.reduce((a, b) => a + b.price * b.lot * 100, 0);
  const avg = totalShares ? totalValue / totalShares : 0;
  const pnl = (sellPrice - avg) * totalShares;

  return (
    <main style={{ maxWidth: 480, margin: "auto", padding: 20 }}>
      <h1>📉 Average Down Saham</h1>

      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input type="number" placeholder="Harga" value={r.price}
            onChange={e => updateRow(i, "price", e.target.value)} />
          <input type="number" placeholder="Lot" value={r.lot}
            onChange={e => updateRow(i, "lot", e.target.value)} />
        </div>
      ))}

      <button onClick={addRow}>➕ Tambah Beli</button>
      <hr />

      <p>Total Lot: <b>{totalLot}</b></p>
      <p>Total Lembar: <b>{totalShares}</b></p>
      <p>Total Modal: <b>Rp {totalValue.toLocaleString()}</b></p>
      <p>BEP: <b>Rp {avg.toFixed(2)}</b></p>

      <input type="number" placeholder="Harga Jual" value={sellPrice}
        onChange={e => setSellPrice(Number(e.target.value))} />

      <h3 style={{ color: pnl >= 0 ? "green" : "red" }}>
        {pnl >= 0 ? "Untung" : "Rugi"}: Rp {pnl.toLocaleString()}
      </h3>
    </main>
  );
}
