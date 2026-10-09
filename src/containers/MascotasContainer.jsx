import React, { useState } from 'react'
import MascotasForm from '../components/MascotasForm'
import MascotasView from '../components/MascotasView'

function MascotasContainer() {
  const [mascotas, setMascotas] = useState([])

  const handleCreate = (mascota) => {
    setMascotas([...mascotas, mascota])
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <MascotasForm onCreateMascota={handleCreate} />
        </div>
        <div className="col-8">
          <MascotasView mascotas={mascotas} />
        </div>
      </div>
    </div>
  )
}

export default MascotasContainer