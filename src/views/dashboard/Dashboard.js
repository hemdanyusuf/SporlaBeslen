import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CAlert } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

/**
 * Dashboard
 * Kullanıcıya basit bir kalori grafiği ve BMI (Vücut Kitle İndeksi) hesaplama formu sunar.
 */
const Dashboard = () => {
  const [bmi, setBmi] = useState(null)

  // Profil bilgilerini localStorage'dan alarak BMI hesapla
  useEffect(() => {
    const stored = localStorage.getItem('profile')
    if (!stored) return
    try {
      const profile = JSON.parse(stored)
      const h = parseFloat(profile.height) / 100
      const w = parseFloat(profile.weight)
      if (h && w) {
        const value = w / (h * h)
        setBmi(value.toFixed(2))
      }
    } catch (_) {
      // ignore parse error
    }
  }, [])

  // Örnek kalori verisi (sabit)
  const calorieData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        label: 'Kalori Alımı',
        backgroundColor: '#4bc0c0',
        data: [2000, 1800, 2200, 1900, 2100, 2300, 2000],
      },
    ],
  }

  return (
    <CRow>
      {/* Kalori grafiği */}
      <CCol xs={12} lg={6}>
        <CCard className="mb-4">
          <CCardHeader>Haftalık Kalori Alımı</CCardHeader>
          <CCardBody>
            <CChartBar data={calorieData} labels="labels" />
          </CCardBody>
        </CCard>
      </CCol>

      {/* BMI bilgisi */}
      <CCol xs={12} lg={6}>
        <CCard className="mb-4">
          <CCardHeader>Vücut Kitle İndeksi</CCardHeader>
          <CCardBody>
            {bmi ? (
              <CAlert color="info" className="m-0">
                BMI: {bmi}
              </CAlert>
            ) : (
              <CAlert color="warning" className="m-0">
                Profil bilgileri eksik
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
