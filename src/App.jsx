import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [telephone, setTelephone] = useState('')
  const [address, setAddress] = useState('')
  const [hobbies, setHobbies] = useState([])
  const [newHobby, setNewHobby] = useState('')
  const [message, setMessage] = useState('')


  const fetchAPI = async () => {
    setLoading(true)
    setError(null)
    try{
      const response = await axios.get(`http://localhost:8000/api/users`)
      setUsers(response.data)
    }
    catch(err){
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  const addHobby = () => {
    if (newHobby.trim() !== '') {
        setHobbies([...hobbies, newHobby.trim()])
        setNewHobby('')
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(firstName, lastName, telephone, address, hobbies)
    try{
      const addNewUser = await axios.post('http://localhost:8000/api/users', {firstName, lastName, telephone, address, hobbies})
      setMessage('Adding a user !');
    }
    catch(err){
      console. log(err)
      setMessage("Error adding user");
    }
    finally{
      fetchAPI()
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  if (loading) {return <p>Loading data...</p>}
  if (error) {return <p>{error}</p>}

  return (
    <>
     {users && !loading && users.map(user => {
      return(
        <div key={user.id} style={{border: '2px solid red'}}>
          <h3>FirstName : {user.firstName}</h3>
          <h4>LastName : {user.lastName}</h4>
          <p>Telephone : {user.telephone}</p>
          <p>Address : {user.address}</p>
          <p>Hobbies : {user.hobbies.join(", ")}</p>
        </div>
      )
     })}
     <form action="POST" onSubmit={handleSubmit} >
      <input type="text" placeholder='firstName' required onChange={e => setFirstName(e.target.value) } />
      <input type="text" placeholder='lastName' required onChange={e => setLastName(e.target.value) } />
      <input type="text" placeholder='telephone' required onChange={e => setTelephone(e.target.value) } />
      <input type="text" placeholder='address' required onChange={e => setAddress(e.target.value) } />
      <div>
        <input type="text" placeholder='hobby' required onChange={e => setNewHobby(e.target.value) } />
        <button type="button" onClick={addHobby}>Add a hobby</button>
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      </div>
      <input type="submit" />
     </form>
     {message && <p>{message}</p>}
    </>
  )
}

export default App
