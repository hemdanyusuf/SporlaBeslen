import { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
} from '@coreui/react'

/**
 * CalorieTracker
 * Kullanıcının boy, kilo, doğum tarihi ve cinsiyetine göre günlük kalori ihtiyacını hesaplar.
 */
const CalorieTracker = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('male')
  const [activity, setActivity] = useState(1.2)
  const [calorie, setCalorie] = useState(null)

  // Basit BMR ve kalori hesaplama
  const handleCalculate = (e) => {
    e.preventDefault()
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!h || !w || !birthDate) return
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    let bmr = 10 * w + 6.25 * h - 5 * age
    if (gender === 'male') {
      bmr += 5
    } else {
      bmr -= 161
    }
    const act = parseFloat(activity)
    setCalorie(Math.round(bmr * act))
  }

  return (
    <CCard>
      <CCardHeader>Günlük Kalori İhtiyacı</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleCalculate}>
          <CFormInput
            type="number"
            label="Kilo (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <CFormInput
            type="number"
            label="Boy (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <CFormInput
            type="date"
            label="Doğum Tarihi"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <CFormSelect
            label="Cinsiyet"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </CFormSelect>
          <CFormInput
            label="Aktivite Katsayısı"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <CButton type="submit">Hesapla</CButton>
        </CForm>
        {calorie && (
          <CAlert color="success" className="mt-3">
            Tahmini günlük ihtiyaç: {calorie} kalori
          </CAlert>
        )}
      </CCardBody>
    </CCard>
  )
}

export default CalorieTracker
