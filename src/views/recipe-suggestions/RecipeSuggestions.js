import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem, CButton } from '@coreui/react'

/**
 * RecipeSuggestions
 * Envanterdeki ürünlere göre örnek tarif önerileri listeler.
 * Burada statik veriler kullanıldı, makine öğrenimi entegrasyonu yapılabilir.
 */
const RecipeSuggestions = () => {
  const [showMeals, setShowMeals] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)

  const recipeData = {
    Sabah: {
      name: 'Crepes (French)',
      ingredients: [
        '1 1/2 c. all-purpose flour',
        '1/2 tsp. baking powder',
        '1/2 tsp. salt',
        '1 Tbsp. sugar',
        '2 c. milk',
        '2 eggs',
        '1/2 tsp. vanilla',
        '2 Tbsp. butter',
      ],
      instructions: [
        'Mix flour, sugar, baking powder and salt together in a bowl. Stir in remaining ingredients.',
        'Beat mixture until smooth.',
      ],
      url: 'www.cookbooks.com/Recipe-Details.aspx?id=585427',
    },
    Ara: {
      name: 'Mexican Cookie Rings',
      ingredients: [
        '1 1/2 c. sifted flour',
        '1/2 tsp. baking powder',
        '1/2 tsp. salt',
        '1/2 c. butter',
        '2/3 c. sugar',
        '3 egg yolks',
        '1 tsp. vanilla',
        'multi-colored candies',
      ],
      instructions: [
        'Sift flour, baking powder and salt together.',
        'Cream together butter and sugar.',
        'Add egg yolks and vanilla.',
        'Beat until light and fluffy.',
        'Mix in sifted dry ingredients.',
        'Shape into 1-inch balls.',
        'Push wooden spoon handle through center (twist).',
        'Shape into rings.',
        'Dip each cookie into candies.',
        'Place on lightly greased baking sheets.',
        'Bake in 375° oven for 10 to 12 minutes or until golden brown.',
        'Cool on racks.',
        'Serves 2 dozen.',
      ],
      url: 'www.cookbooks.com/Recipe-Details.aspx?id=364136',
    },
  }

  const handleMealClick = (meal) => {
    setSelectedMeal(meal)
    setShowMeals(false)
  }

  const recipe = selectedMeal && recipeData[selectedMeal]

  return (
    <CCard>
      <CCardHeader>Tarif Önerileri</CCardHeader>
      <CCardBody>
        <CButton className="mb-3" onClick={() => setShowMeals(!showMeals)}>
          Yemek Önerisi
        </CButton>
        {showMeals && (
          <div className="d-flex gap-2 mb-3">
            {['Sabah', 'Öğle', 'Ara', 'Akşam'].map((m) => (
              <CButton key={m} color="secondary" onClick={() => handleMealClick(m)}>
                {m}
              </CButton>
            ))}
          </div>
        )}
        {recipe ? (
          <div>
            <h5>{recipe.name}</h5>
            <p>
              <strong>Malzemeler:</strong>
            </p>
            <CListGroup className="mb-3">
              {recipe.ingredients.map((ing, idx) => (
                <CListGroupItem key={idx}>{ing}</CListGroupItem>
              ))}
            </CListGroup>
            <p>
              <strong>Talimatlar:</strong>
            </p>
            <CListGroup className="mb-3">
              {recipe.instructions.map((step, idx) => (
                <CListGroupItem key={idx}>{step}</CListGroupItem>
              ))}
            </CListGroup>
            <a href={`https://${recipe.url}`} target="_blank" rel="noopener noreferrer">
              {recipe.url}
            </a>
          </div>
        ) : (
          selectedMeal && <p>Bu öğün için öneri bulunamadı.</p>
        )}
      </CCardBody>
    </CCard>
  )
}

export default RecipeSuggestions
