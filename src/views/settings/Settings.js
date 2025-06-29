import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton, CAlert } from '@coreui/react'

/**
 * Settings
 * Kullanıcı ad, email ve şifre bilgilerini güncelleyebileceği basit bir form.
 */
const Settings = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('profile')
    if (stored) {
      try {
        const p = JSON.parse(stored)
        setProfile(p)
        setName(p.name || '')
        setEmail(p.email || '')
        setPassword(p.password || '')
        setAge(p.age || '')
        setWeight(p.weight || '')
        setHeight(p.height || '')
        setEditing(false)
        setShowInfo(false)
      } catch (_) {
        // ignore parse error
      }
    }
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    const data = { name, email, password, age, weight, height }
    localStorage.setItem('profile', JSON.stringify(data))
    setProfile(data)
    setMessage('Bilgiler kaydedildi')
    setEditing(false)
    setShowInfo(false)
  }

  return (
    <CCard>
      <CCardHeader>Profil Ayarları</CCardHeader>
      <CCardBody>
        {editing ? (
          <CForm className="row g-3" onSubmit={handleSave}>
            <CFormInput label="Ad" value={name} onChange={(e) => setName(e.target.value)} />
            <CFormInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <CFormInput
              type="password"
              label="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CFormInput
              type="number"
              label="Yaş"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
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
            <CButton type="submit">Kaydet</CButton>
          </CForm>
        ) : showInfo ? (
          <CRow className="gy-3">
            {profile && (
              <CCol md={6}>
                <CCard className="h-100">
                  <CCardHeader>Bilgilerim</CCardHeader>
                  <CCardBody>
                    <p>
                      <strong>Ad:</strong> {profile.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {profile.email}
                    </p>
                    <p>
                      <strong>Yaş:</strong> {profile.age}
                    </p>
                    <p>
                      <strong>Kilo:</strong> {profile.weight} kg
                    </p>
                    <p>
                      <strong>Boy:</strong> {profile.height} cm
                    </p>
                  </CCardBody>
                </CCard>
              </CCol>
            )}
            <CCol md={6}>
              <CCard className="h-100 text-center">
                <CCardHeader>Düzenle</CCardHeader>
                <CCardBody className="d-flex justify-content-center align-items-center">
                  <CButton
                    onClick={() => {
                      setEditing(true)
                      setShowInfo(false)
                    }}
                  >
                    Düzenle
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ) : (
          <div className="d-flex gap-2">
            <CButton onClick={() => setShowInfo(true)}>Bilgilerim</CButton>
            <CButton
              onClick={() => {
                setEditing(true)
                setShowInfo(false)
              }}
            >
              Düzenleme
            </CButton>
          </div>
        )}
        {message && (
          <CAlert color="success" className="mt-3">
            {message}
          </CAlert>
        )}
      </CCardBody>
    </CCard>
  )
}

export default Settings
