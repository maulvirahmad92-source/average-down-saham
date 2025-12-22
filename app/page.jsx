"use client";
import { useState } from "react";

export default function Home() {
  const [harga1, setHarga1] = useState(1000);
  const [lot1, setLot1] = useState(10);
  const [harga2, setHarga2] = useState(800);
  const [lot2, setLot2] = useState(10);
  const [hargaJual, setHargaJual] = useState(950);

  const totalLot = lot1 + lot2;
  const totalLembar = totalLot * 100;
  const totalModal =
    harga1 * lot1 * 100 + harga2 * lot2 * 100;
  const bep = totalModal / totalLembar;
  const hasil =
    (hargaJual - bep) * totalLembar;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📈 Average Down Saham</h1>

        <div style={styles.grid}>
          <input type="number" value={harga1} onChange={e => setHarga1(+e.target.value)} placeholder="Harga Beli 1" style={styles.input}/>
          <input type="number" value={lot1} onChange={e => setLot1(+e.target.value)} placeholder="Lot 1" style={styles.input}/>
          <input type="number" value={harga2} onChange={e => setHarga2(+e.target.value)} placeholder="Harga Beli 2" style={styles.input}/>
          <input type="number" value={lot2} onChange={e => setLot2(+e.target.value)} placeholder="Lot 2" style={styles.input}/>
        </div>

        <div style={styles.result}>
          <p>Total Lot: <b>{totalLot}</b></p>
          <p>Total Lembar: <b>{totalLembar}</b></p>
          <p>Total Modal: <b>Rp {totalModal.toLocaleString()}</b></p>
          <p>BEP: <b>Rp {bep.toFixed(2)}</b></p>
        </div>

        <input
          type="number"
          value={hargaJual}
          onChange={e => setHargaJual(+e.target.value)}
          placeholder="Harga Jual"
          style={styles.input}
        />

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
    gap: 10
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    width: "100%"
  },
  result: {
    marginTop: 15,
    lineHeight: 1.6
  }
};
