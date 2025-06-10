import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton, CAlert } from '@coreui/react'

/**
 * Settings
 * Kullanıcı ad, email ve şifre bilgilerini güncelleyebileceği basit bir form.
 */
const Settings = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    setMessage('Bilgiler kaydedildi (örnek)')
  }

  return (
    <CCard>
      <CCardHeader>Profil Ayarları</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSave}>
          <CFormInput label="Ad" value={name} onChange={(e) => setName(e.target.value)} />
          <CFormInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <CFormInput
            type="password"
            label="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CButton type="submit">Kaydet</CButton>
        </CForm>
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
