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
 * Settings
 * Kullanıcı ad, email ve şifre bilgilerini güncelleyebileceği basit bir form.
 */
const Settings = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [waist, setWaist] = useState('')
  const [chest, setChest] = useState('')
  const [hip, setHip] = useState('')
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
          <CFormInput
            type="number"
            label="Boy (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <CFormInput
            type="number"
            label="Kilo (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <CFormInput
            type="date"
            label="Doğum Tarihi"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <CFormSelect label="Cinsiyet" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Seçiniz</option>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
            <option value="other">Diğer</option>
          </CFormSelect>
          <CFormInput
            type="number"
            label="Bel (cm)"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
          <CFormInput
            type="number"
            label="Göğüs (cm)"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
          />
          <CFormInput
            type="number"
            label="Kalça (cm)"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
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
