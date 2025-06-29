import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import axios from 'axios'

/**
 * Inventory
 * Kullanıcının evindeki gıdaları listeler ve yeni ürün eklemek için form içerir.
 * Örnek olarak form gönderildiğinde Flask backend'ine POST isteği yapılır.
 */
const Inventory = () => {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('gr.')
  const [showForm, setShowForm] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const [selectedRemove, setSelectedRemove] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('inventory')
    if (!stored) return
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) setItems(parsed)
    } catch (_) {
      // ignore parse error
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Flask backend'e veri gonderimi (opsiyonel)
      await axios.post('http://localhost:5000/api/inventory', {
        name,
        amount,
        unit,
      })
    } catch (err) {
      // backend yoksa hata gosterme
      console.error(err)
    }
    const newItems = [...items, { name, amount, unit }]
    setItems(newItems)
    localStorage.setItem('inventory', JSON.stringify(newItems))
    setName('')
    setAmount('')
    setUnit('gr.')
    setShowForm(false)
  }

  const handleRemove = () => {
    const idx = parseInt(selectedRemove, 10)
    const updated = items.filter((_, i) => i !== idx)
    setItems(updated)
    localStorage.setItem('inventory', JSON.stringify(updated))
    setSelectedRemove('')
    setShowRemove(false)
  }

  return (
    <CCard>
      <CCardHeader>Gıda Envanteri</CCardHeader>
      <CCardBody>
        {showForm ? (
          <CForm className="row g-3 mb-3" onSubmit={handleSubmit}>
            <CFormInput label="Ürün Adı" value={name} onChange={(e) => setName(e.target.value)} />
            <CFormInput label="Miktar" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <CFormSelect label="Birim" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="gr.">gr.</option>
              <option value="pc.">pc.</option>
            </CFormSelect>
            <CRow className="gap-2 px-3">
              <CButton type="submit">Kaydet</CButton>
              <CButton color="secondary" type="button" onClick={() => setShowForm(false)}>
                İptal
              </CButton>
            </CRow>
          </CForm>
        ) : showRemove ? (
          <div className="mb-3">
            <p>Çıkarmak istediğiniz ürünü seçin</p>
            <CFormSelect value={selectedRemove} onChange={(e) => setSelectedRemove(e.target.value)}>
              <option value="">Seçiniz</option>
              {items.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.name}
                </option>
              ))}
            </CFormSelect>
            <CRow className="gap-2 px-3 mt-2">
              <CButton color="danger" onClick={handleRemove} disabled={selectedRemove === ''}>
                Sil
              </CButton>
              <CButton
                color="secondary"
                type="button"
                onClick={() => {
                  setShowRemove(false)
                  setSelectedRemove('')
                }}
              >
                İptal
              </CButton>
            </CRow>
          </div>
        ) : (
          <CRow className="mb-3 gap-2">
            <CButton onClick={() => setShowForm(true)}>Ürün Ekle</CButton>
            <CButton color="danger" onClick={() => setShowRemove(true)}>
              Ürün Çıkar
            </CButton>
          </CRow>
        )}
        <CListGroup className="mt-4">
          {items.map((item, idx) => (
            <CListGroupItem key={idx}>
              {item.name} - {item.amount}
              {item.unit}
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Inventory
