import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CListGroup,
  CListGroupItem,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Flask backend'e veri gönderimi
      await axios.post('http://localhost:5000/api/inventory', {
        name,
        amount,
        calorie,
      })
      setItems([...items, { name, amount, calorie }])
      setName('')
      setAmount('')
      setCalorie('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CCard>
      <CCardHeader>Gıda Envanteri</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit}>
          <CFormInput label="Ürün Adı" value={name} onChange={(e) => setName(e.target.value)} />
          <CFormInput
            label="Miktar (gr)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <CFormInput label="Kalori" value={calorie} onChange={(e) => setCalorie(e.target.value)} />
          <CButton type="submit">Ekle</CButton>
        </CForm>
        <CListGroup className="mt-4">
          {items.map((item, idx) => (
            <CListGroupItem key={idx}>
              {item.name} - {item.amount}gr - {item.calorie} kalori
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Inventory
