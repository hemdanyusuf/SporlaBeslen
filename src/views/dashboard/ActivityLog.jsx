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
 * ActivityLog
 * Kullanıcının yaptığı aktiviteleri listeleyen ve ekleme yapmaya yarayan basit bileşen.
 */
const ActivityLog = () => {
  const [logs, setLogs] = useState([])
  const [userId, setUserId] = useState('')
  const [activityType, setActivityType] = useState('')
  const [duration, setDuration] = useState('')
  const [calories, setCalories] = useState('')
  const [date, setDate] = useState('')

  const fetchLogs = async () => {
    try {
      const res = await axios.get('/api/activity')
      let data = res.data
      if (Array.isArray(data?.logs)) {
        data = data.logs
      }
      data = Array.isArray(data) ? data : []
      setLogs(data)
    } catch (err) {
      console.error(err)
      setLogs([])
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/activity', {
        user_id: userId,
        activity_type: activityType,
        duration_minutes: duration,
        calories_burned: calories,
        date,
      })
      setLogs((prevLogs) =>
        Array.isArray(prevLogs) ? [...prevLogs, res.data] : [res.data]
      )
      setUserId('')
      setActivityType('')
      setDuration('')
      setCalories('')
      setDate('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/activity/${id}`)
      setLogs((prevLogs) =>
        Array.isArray(prevLogs) ? prevLogs.filter((log) => log.id !== id) : prevLogs
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>Aktivite Günlüğü</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit}>
          <CFormInput
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <CFormInput
            label="Aktivite Türü"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          />
          <CFormInput
            label="Süre (dakika)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <CFormInput
            label="Yakılan Kalori"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <CFormInput
            type="date"
            label="Tarih"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <CButton type="submit">Ekle</CButton>
        </CForm>
        <CListGroup className="mt-4">
          {Array.isArray(logs) && logs.length > 0 ? (
            logs.map((log) => (
              <CListGroupItem
                key={log.id}
                className="d-flex justify-content-between align-items-center"
              >
                <span>
                  {log.date} - {log.activity_type} ({log.duration_minutes} dk,
                  {` ${log.calories_burned} kcal`})
                </span>
                <CButton
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(log.id)}
                >
                  Sil
                </CButton>
              </CListGroupItem>
            ))
          ) : (
            <CListGroupItem>Aktivite kaydı bulunamadı</CListGroupItem>
          )}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default ActivityLog
