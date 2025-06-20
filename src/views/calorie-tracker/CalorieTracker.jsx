import { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton, CAlert } from '@coreui/react'

/**
 * CalorieTracker
 * Kullanıcının yaş, kilo, boy ve aktivite seviyesine göre günlük kalori ihtiyacını hesaplar.
 */
const CalorieTracker = () => {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activity, setActivity] = useState(1.2)
  const [calorie, setCalorie] = useState(null)

  // Basit BMR ve kalori hesaplama
  const handleCalculate = (e) => {
    e.preventDefault()
    const h = parseFloat(height)
    const w = parseFloat(weight)
    const a = parseFloat(age)
    if (!h || !w || !a) return
    // Harris-Benedict
    const bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a
    setCalorie(Math.round(bmr * activity))
  }

  return (
    <CCard>
      <CCardHeader>Günlük Kalori İhtiyacı</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleCalculate}>
          <CFormInput label="Yaş" value={age} onChange={(e) => setAge(e.target.value)} />
          <CFormInput
            label="Kilo (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <CFormInput label="Boy (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
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
