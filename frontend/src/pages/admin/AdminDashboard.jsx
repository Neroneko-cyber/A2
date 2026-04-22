import React from 'react';
import { Users, ShoppingBag, DollarSign, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Pengguna', value: '1,245', icon: <Users size={24} color="#3498db" />, bg: 'rgba(52, 152, 219, 0.1)' },
    { title: 'Total Pesanan', value: '856', icon: <ShoppingBag size={24} color="#2ecc71" />, bg: 'rgba(46, 204, 113, 0.1)' },
    { title: 'Pendapatan', value: 'Rp 45.5M', icon: <DollarSign size={24} color="#f1c40f" />, bg: 'rgba(241, 196, 15, 0.1)' },
    { title: 'Peringatan Stok', value: '12 Item', icon: <AlertTriangle size={24} color="#e74c3c" />, bg: 'rgba(231, 76, 60, 0.1)' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#fff' }}>Dashboard Ringkasan</h1>
      <p style={{ color: '#a0a0b0', marginBottom: '30px' }}>Selamat datang di panel kendali admin Kitsune Noir.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            background: 'rgba(26, 26, 36, 0.8)',
            border: '1px solid rgba(220, 20, 60, 0.2)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '50px', height: '50px',
              borderRadius: '10px', background: stat.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#a0a0b0', fontWeight: 'normal' }}>{stat.title}</h3>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'rgba(26, 26, 36, 0.8)',
        border: '1px solid rgba(220, 20, 60, 0.2)',
        borderRadius: '12px',
        padding: '20px',
        minHeight: '300px'
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#fff' }}>Aktivitas Terbaru</h2>
        <div style={{ color: '#a0a0b0', textAlign: 'center', marginTop: '100px' }}>
          Area ini dapat diisi dengan grafik penjualan atau tabel pesanan terbaru.
        </div>
      </div>
    </motion.div>
  );
}
