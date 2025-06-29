import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
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
  const [calorie, setCalorie] = useState('')
  const [showForm, setShowForm] = useState(false)

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
        calorie,
      })
    } catch (err) {
      // backend yoksa hata gosterme
      console.error(err)
    }
    const newItems = [...items, { name, amount, calorie }]
    setItems(newItems)
    localStorage.setItem('inventory', JSON.stringify(newItems))
    setName('')
    setAmount('')
    setCalorie('')
    setShowForm(false)
  }

  return (
    <CCard>
      <CCardHeader>Gıda Envanteri</CCardHeader>
      <CCardBody>
        {showForm ? (
          <CForm className="row g-3 mb-3" onSubmit={handleSubmit}>
            <CFormInput label="Ürün Adı" value={name} onChange={(e) => setName(e.target.value)} />
            <CFormInput
              label="Miktar (gr)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <CFormInput
              label="Kalori"
              value={calorie}
              onChange={(e) => setCalorie(e.target.value)}
            />
            <CRow className="gap-2 px-3">
              <CButton type="submit">Kaydet</CButton>
              <CButton color="secondary" type="button" onClick={() => setShowForm(false)}>
                İptal
              </CButton>
            </CRow>
          </CForm>
        ) : (
          <CButton className="mb-3" onClick={() => setShowForm(true)}>
            Ürün Ekle
          </CButton>
        )}
        <CListGroup className="mt-4">
          {items.map((item, idx) => (
            <CListGroupItem key={idx}>
              {item.name} - {item.amount}gr{item.calorie ? ` - ${item.calorie} kalori` : ''}
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Inventory
