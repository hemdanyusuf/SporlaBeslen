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
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(true)
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
        setWeight(p.weight || '')
        setHeight(p.height || '')
        setEditing(false)
      } catch (_) {
        // ignore parse error
      }
    }
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    const data = { name, email, password, weight, height }
    localStorage.setItem('profile', JSON.stringify(data))
    setProfile(data)
    setMessage('Bilgiler kaydedildi')
    setEditing(false)
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
        ) : (
          <>
            {profile && (
              <div className="mb-3">
                <p>
                  <strong>Ad:</strong> {profile.name}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Kilo:</strong> {profile.weight} kg
                </p>
                <p>
                  <strong>Boy:</strong> {profile.height} cm
                </p>
              </div>
            )}
            <CButton onClick={() => setEditing(true)}>Düzenle</CButton>
          </>
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
