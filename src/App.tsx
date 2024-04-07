import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import './App.css'
import './forms.css'

// Variables that are used in the front end form field
function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [organization, setOrganization] = useState('')
  const [office, setOffice] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [whitelist, setWhitelist] = useState('')
  const [deviceId, setDeviceId] = useState('')
  const [justification, setJustification] = useState('')

  useEffect(() => {
    const generateDeviceId = async () => {
      try {
        // Check if the device ID exists in localStorage
        const storedDeviceId = localStorage.getItem('deviceId');
        if (storedDeviceId) {
          setDeviceId(storedDeviceId);
        } else {
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          const newDeviceId = result.visitorId;
          setDeviceId(newDeviceId);
          // Store the device ID in localStorage
          localStorage.setItem('deviceId', newDeviceId);
        }
      } catch (error) {
        console.log('Error generating device ID:', error);
      }
    };
  
    generateDeviceId();
  }, []);

  // This is where the fields are pushed to the backend
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await fetch('http://10.1.50.164:8000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          organization: organization,
          office: office,
          email: email,
          phone: phone,
          whitelist: whitelist,
          device_id: deviceId,
          justification: justification,
        }),
      })
       // This is to reset the fields after a successful submission
      if (response.ok) {
        const data = await response.json()
        console.log(data.justification)
        // Reset form fields after successful submission
        setFirstName('')
        setLastName('')
        setOrganization('')
        setOffice('')
        setEmail('')
        setPhone('')
        setWhitelist('')
        setJustification('')
      } else {
        console.error('Error submitting form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <>
      {/* ... */}
      <form onSubmit={handleSubmit} className="premium-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <input
            type="text"
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="office">Office:</label>
          <input
            type="text"
            id="office"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="whitelist">Site Requesting Whitelist:</label>
          <input
            type="text"
            id="whitelist"
            value={whitelist}
            onChange={(e) => setWhitelist(e.target.value)}
            className="form-input"
          />
        </div>
        <div className='form-group'>
          <label htmlFor='device-id'>Device ID:</label>
          <input
            type='text'
            id='device-id'
            value={deviceId}
            readOnly
            className='form-input'
          />
        </div>
        <div className="form-group">
          <label htmlFor="justification">Justification:</label>
          <textarea
            id="justification"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </>
  )
}

export default App