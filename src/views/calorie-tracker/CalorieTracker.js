import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton, CAlert } from '@coreui/react'

/**
 * CalorieTracker
 * Kullanıcının yaş, kilo, boy ve aktivite seviyesine göre günlük kalori ihtiyacını hesaplar.
 */
const CalorieTracker = () => {
  const [profile, setProfile] = useState(null)
  const [activity, setActivity] = useState(1.2)
  const [calorie, setCalorie] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('profile')
    if (!stored) return
    try {
      const p = JSON.parse(stored)
      setProfile(p)
    } catch (_) {
      // ignore
    }
  }, [])

  // Basit BMR ve kalori hesaplama
  const handleCalculate = (e) => {
    e.preventDefault()
    if (!profile) return
    const h = parseFloat(profile.height)
    const w = parseFloat(profile.weight)
    const a = parseFloat(profile.age)
    if (!h || !w || !a) return
    // Harris-Benedict
    const bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a
    setCalorie(Math.round(bmr * activity))
  }

  return (
    <CCard>
      <CCardHeader>Günlük Kalori İhtiyacı</CCardHeader>
      <CCardBody>
        {profile ? (
          <>
            <p className="mb-3">
              Yaş: {profile.age}, Kilo: {profile.weight} kg, Boy: {profile.height} cm
            </p>
            <CForm className="row g-3" onSubmit={handleCalculate}>
              <CFormInput
                label="Aktivite Katsayısı"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
              <CButton type="submit">Hesapla</CButton>
            </CForm>
            <ul className="mt-3">
              <li>Hareketsiz: 1.2</li>
              <li>Hafif Aktif (1-3 gün egzersiz): 1.375</li>
              <li>Orta Aktif (3-5 gün egzersiz): 1.55</li>
              <li>Çok Aktif (6-7 gün egzersiz): 1.725</li>
            </ul>
          </>
        ) : (
          <CAlert color="warning">Profil bilgilerinizi önce Ayarlar kısmından giriniz.</CAlert>
        )}
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
