import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CAlert, CForm, CFormInput } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

/**
 * Dashboard
 * Kullanıcıya basit bir kalori grafiği ve BMI (Vücut Kitle İndeksi) hesaplama formu sunar.
 */
const Dashboard = () => {
  const [bmi, setBmi] = useState(null)
  const [calIn, setCalIn] = useState('')
  const [calOut, setCalOut] = useState('')

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

  // Günlük kalori bilgisini localStorage'dan yükle
  useEffect(() => {
    const stored = localStorage.getItem('dailyCalories')
    if (!stored) return
    try {
      const data = JSON.parse(stored)
      if (data.in) setCalIn(data.in)
      if (data.out) setCalOut(data.out)
    } catch (_) {
      // ignore parse error
    }
  }, [])

  // Kalori değerleri değiştiğinde kaydet
  useEffect(() => {
    if (calIn === '' && calOut === '') return
    localStorage.setItem('dailyCalories', JSON.stringify({ in: calIn, out: calOut }))
  }, [calIn, calOut])

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

  const dailyCalorieData = {
    labels: ['Alınan', 'Harcanan'],
    datasets: [
      {
        label: 'Kalori',
        backgroundColor: ['#4bc0c0', '#f87979'],
        data: [Number(calIn) || 0, Number(calOut) || 0],
      },
    ],
  }

  const netCalories = (Number(calIn) || 0) - (Number(calOut) || 0)

  return (
    <>
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

      <CRow>
        <CCol xs={12} lg={6} className="mx-auto">
          <CCard className="mb-4">
            <CCardHeader>Günlük Kalori Takibi</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mb-3">
                <CFormInput
                  type="number"
                  label="Alınan Kalori"
                  value={calIn}
                  onChange={(e) => setCalIn(e.target.value)}
                />
                <CFormInput
                  type="number"
                  label="Harcanan Kalori"
                  value={calOut}
                  onChange={(e) => setCalOut(e.target.value)}
                />
              </CForm>
              <CChartBar data={dailyCalorieData} labels="labels" />
              <CAlert color={netCalories >= 0 ? 'danger' : 'success'} className="mt-3">
                {netCalories >= 0 ? 'Kalori Fazlası: ' : 'Kalori Açığı: '}
                {Math.abs(netCalories)} kcal
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
