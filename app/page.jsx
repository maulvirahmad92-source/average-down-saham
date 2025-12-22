"use client";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([
    { harga: 1000, lot: 10 },
    { harga: 800, lot: 10 },
  ]);
  const [hargaJual, setHargaJual] = useState(950);
  const [target, setTarget] = useState(5);

  const tambahBeli = () =>
    setItems([...items, { harga: 0, lot: 0 }]);

  const totalLot = items.reduce((a, b) => a + b.lot, 0);
  const totalLembar = totalLot * 100;
  const totalModal = items.reduce(
    (a, b) => a + b.harga * b.lot * 100,
    0
  );

  const bep = totalModal / totalLembar || 0;
  const hasil = (hargaJual - bep) * totalLembar;

  const hargaTarget =
    bep * (1 + target / 100);

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📈 Average Down Saham</h1>

        {items.map((item, i) => (
          <div key={i} style={styles.grid}>
            <input
              type="number"
              placeholder="Harga"
              value={item.harga}
              onChange={e => {
                const x = [...items];
                x[i].harga = +e.target.value;
                setItems(x);
              }}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Lot"
              value={item.lot}
              onChange={e => {
                const x = [...items];
                x[i].lot = +e.target.value;
                setItems(x);
              }}
              style={styles.input}
            />
          </div>
        ))}

        <button onClick={tambahBeli} style={styles.btn}>
          ➕ Tambah Average Down
        </button>

        <div style={styles.result}>
          <p>Total Lot: <b>{totalLot}</b></p>
          <p>Total Modal: <b>Rp {totalModal.toLocaleString()}</b></p>
          <p>BEP: <b>Rp {bep.toFixed(2)}</b></p>
        </div>

        <input
          type="number"
          placeholder="Harga Jual"
          value={hargaJual}
          onChange={e => setHargaJual(+e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Target Profit (%)"
          value={target}
          onChange={e => setTarget(+e.target.value)}
          style={styles.input}
        />

        <p>🎯 Harga Target: <b>Rp {hargaTarget.toFixed(2)}</b></p>

        <h2 style={{
          color: hasil >= 0 ? "#16a34a" : "#dc2626",
          marginTop: 10
        }}>
          {hasil >= 0 ? "Untung" : "Rugi"}: Rp {Math.abs(hasil).toLocaleString()}
        </h2>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0fdf4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  card: {
    background: "white",
    borderRadius: 12,
    padding: 24,
    maxWidth: 420,
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 8
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    width: "100%",
    marginTop: 10
  },
  btn: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  result: {
    marginTop: 15,
    lineHeight: 1.6
  }
};
