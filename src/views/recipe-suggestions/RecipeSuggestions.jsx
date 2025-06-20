import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react'

/**
 * RecipeSuggestions
 * Envanterdeki ürünlere göre örnek tarif önerileri listeler.
 * Burada statik veriler kullanıldı, makine öğrenimi entegrasyonu yapılabilir.
 */
const RecipeSuggestions = () => {
  const recipes = ['Tavuklu Salata', 'Sebzeli Omlet', 'Meyveli Yoğurt']

  return (
    <CCard>
      <CCardHeader>Tarif Önerileri</CCardHeader>
      <CCardBody>
        <CListGroup>
          {recipes.map((r, idx) => (
            <CListGroupItem key={idx}>{r}</CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default RecipeSuggestions
