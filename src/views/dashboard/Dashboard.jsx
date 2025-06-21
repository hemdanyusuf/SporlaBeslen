import { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CButton,
  CAlert,
} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import axios from 'axios'
import ActivityLog from './ActivityLog'

/**
 * Dashboard
 * Kullanıcıya basit bir kalori grafiği ve BMI (Vücut Kitle İndeksi) hesaplama formu sunar.
 */
const Dashboard = () => {
  const [weight, setWeight] = useState('') // kilo (kg)
  const [height, setHeight] = useState('') // boy (cm)
  const [bmi, setBmi] = useState(null)
  const [dailyCalories, setDailyCalories] = useState(null)

  const fetchDailyCalories = async () => {
    try {
      const res = await axios.get('/api/recommend/1')
      setDailyCalories(res.data.calories)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchDailyCalories()
  }, [])

  const getBmiCategory = (value) => {
    if (value < 18.5) return 'Zayıf'
    if (value < 25) return 'Normal (sağlıklı)'
    if (value < 30) return 'Fazla kilolu (pre-obez)'
    if (value < 35) return '1. derece obezite'
    if (value < 40) return '2. derece obezite'
    return '3. derece (morbid) obezite'
  }

  // BMI hesapla
  const handleBmi = (e) => {
    e.preventDefault()
    const h = parseFloat(height) / 100
    if (!h || !weight) return
    const value = weight / (h * h)
    setBmi(value)
  }

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

      {/* Günlük Kalori İhtiyacı */}
      <CCol xs={12} lg={6}>
        <CCard className="mb-4 w-100 p-3">
          <CCardHeader>Günlük Kalori İhtiyacı</CCardHeader>
          <CCardBody>
            <h5>{dailyCalories ? `${dailyCalories} kcal` : '...'}</h5>
            <div className="text-end mt-3">
              <CButton onClick={fetchDailyCalories}>Yeniden Hesapla</CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* BMI hesaplama */}
      <CCol xs={12} lg={6}>
        <CCard className="mb-4">
          <CCardHeader>Vücut Kitle İndeksi Hesapla</CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleBmi}>
              <CCol xs={6}>
                <CFormInput
                  type="number"
                  label="Kilo (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </CCol>
              <CCol xs={6}>
                <CFormInput
                  type="number"
                  label="Boy (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </CCol>
              <CCol xs={12} className="text-end">
                <CButton type="submit">Hesapla</CButton>
              </CCol>
            </CForm>
            {bmi && (
              <CAlert color="info" className="mt-3">
                Hesaplanan BMI: {bmi.toFixed(2)} ({getBmiCategory(bmi)})
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Aktivite günlüğü */}
      <CCol xs={12} lg={6}>
        <ActivityLog />
      </CCol>
    </CRow>
  )
}

export default Dashboard
