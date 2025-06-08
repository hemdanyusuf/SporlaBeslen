import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Inventory = React.lazy(() => import('./views/inventory/Inventory'))
const CalorieTracker = React.lazy(() => import('./views/calorie-tracker/CalorieTracker'))
const RecipeSuggestions = React.lazy(() => import('./views/recipe-suggestions/RecipeSuggestions'))
const Settings = React.lazy(() => import('./views/settings/Settings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/inventory', name: 'Inventory', element: Inventory },
  { path: '/calorie-tracker', name: 'CalorieTracker', element: CalorieTracker },
  { path: '/recipe-suggestions', name: 'RecipeSuggestions', element: RecipeSuggestions },
  { path: '/settings', name: 'Settings', element: Settings },
]

export default routes
