import { useEffect, useState } from 'react'
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
 * Basit bir envanter yönetimi ekranı.
 * GET /api/inventory ile veriler listelenir, POST /api/inventory ile yeni
 * öğe eklenir ve DELETE /api/inventory/:id ile silme işlemi yapılır.
 */
const Inventory = () => {
  const [items, setItems] = useState([])
  const [userId, setUserId] = useState('')
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/inventory')
      console.log("Gelen veri:", res.data) // 🔍 Konsola yaz
      setItems(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/inventory', {
        user_id: userId,
        item_name: itemName,
        quantity,
      })
      setItems([...items, res.data])
      setUserId('')
      setItemName('')
      setQuantity('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`)
      setItems(items.filter((item) => item.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CCard>
      <CCardHeader>Gıda Envanteri</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit}>
          <CFormInput label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <CFormInput label="Ürün Adı" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          <CFormInput label="Miktar" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <CButton type="submit">Ekle</CButton>
        </CForm>
        <CListGroup className="mt-4">
          {Array.isArray(items) && items.map((item) => (
            <CListGroupItem
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                {item.item_name} - {item.quantity} (User {item.user_id})
              </span>
              <CButton color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                Sil
              </CButton>
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Inventory
