import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'


const App = () => {

  const [count, setCount] = useState(32)
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const myName = 'Alice'

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

  console.log(users)

  useEffect(() => {
    fetchAPI()
  }, [count])

  if (loading) {
    return <p>Loading data...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
     <h1 className='myH1'>Hello World!</h1>
     <p>Hello my name is {myName} and I am {count}</p>
     <button onClick={() => setCount(count + 1)}>+1</button>
     {users && users.map(user => {
      return(
        <div style={{border: '2px solid red'}}>
          <h3>FirstName : {user.firstName}</h3>
          <h4>LastName : {user.lastName}</h4>
          <p>Telephone : {user.telephone}</p>
          <p>Address : {user.address}</p>
          <p>Hobbies : {user.hobbies.join(", ")}</p>
        </div>
      )
     })}
    </>
  )
}

export default App
