import React, { useState } from 'react'
import {
  Card, CardHeader, CardContent, CardActions, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, Rating, Typography, Chip, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box
} from '@mui/material'

function MascotasForm({ onCreateMascota = () => {} }) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [especie, setEspecie] = useState('Perro')
  const [edad, setEdad] = useState('')
  const [nivelEnergia, setNivelEnergia] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Lógica de clasificación y cuota de adopción
  const calcularClasificacion = () => {
    const numEdad = Number(edad)
    if (edad === '' || isNaN(numEdad) || numEdad < 0) {
      return { categoria: 'Sin definir', color: 'default', cuota: '$0' }
    }

    if (numEdad < 1) {
      return { categoria: 'Cachorro', color: 'warning', cuota: '$15.000' }
    }
    if ((especie === 'Gato' && numEdad > 5) || numEdad > 7) {
      return { categoria: 'Senior', color: 'info', cuota: '$0 (Gratuita)' }
    }
    return { categoria: 'Adulto', color: 'primary', cuota: '$15.000' }
  }

  const { categoria, color, cuota } = calcularClasificacion()

  const limpiarFormulario = () => {
    setNombre('')
    setDescripcion('')
    setEspecie('Perro')
    setEdad('')
    setNivelEnergia(1)
  }

  const handleClick = () => {
    // Validación: campos obligatorios y rating >= 1 estrella
    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      edad === '' ||
      Number(edad) < 0 ||
      nivelEnergia < 1
    ) {
      setDialogOpen(true)
      return
    }

    const nuevaMascota = {
      nombre,
      descripcion,
      especie,
      edad: Number(edad),
      nivelEnergia,
      categoria,
      color,
      cuota
    }

    onCreateMascota(nuevaMascota)
    limpiarFormulario()
  }

  return (
    <>
      <Card raised>
        <CardHeader title="Registrar Mascota" />
        <CardContent>
          <div className="mt-3">
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              fullWidth
            />
          </div>

          <div className="mt-3">
            <TextField
              label="Descripción"
              multiline
              rows={2}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              fullWidth
            />
          </div>

          <div className="mt-3">
            <FormControl>
              <FormLabel>Especie</FormLabel>
              <RadioGroup
                row
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
              >
                <FormControlLabel value="Perro" control={<Radio />} label="Perro" />
                <FormControlLabel value="Gato" control={<Radio />} label="Gato" />
                <FormControlLabel value="Conejo" control={<Radio />} label="Conejo" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="mt-3">
            <TextField
              label="Edad (años)"
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              fullWidth
            />
          </div>

          <div className="mt-3">
            <Typography component="legend">Nivel de Energía</Typography>
            <Rating
              value={nivelEnergia}
              onChange={(_, valor) => setNivelEnergia(valor || 0)}
            />
          </div>

          {/* Elemento reactivo: Clasificación y Aporte */}
          <Box className="mt-3 p-2" sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Clasificación y Aporte:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Chip label={categoria} color={color} size="small" />
              <Typography variant="body2" fontWeight="bold">
                Cuota sugerida: {cuota}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions>
          <Button onClick={handleClick} fullWidth variant="outlined" color="primary">
            Registrar Mascota
          </Button>
        </CardActions>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Advertencia</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Todos los atributos son obligatorios. El nivel de energía debe tener al menos una estrella.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MascotasForm