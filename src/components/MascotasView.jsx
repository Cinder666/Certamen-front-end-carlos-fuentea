import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Rating,
  Divider,
  Box
} from '@mui/material'

function MascotasView({ mascotas = [] }) {
  return (
    <div className="row">
      {mascotas.map((m, index) => (
        <div className="col-6 mb-3" key={index}>
          <Card raised>
            <CardHeader
              title={m.nombre}
              subheader={`${m.especie} - ${m.edad} año(s)`}
              action={<Chip label={m.categoria} color={m.color} />}
            />
            <Divider />
            <CardContent>
              <Typography variant="body2" color="text.secondary" paragraph>
                {m.descripcion}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Energía:
                </Typography>
                <Rating value={m.nivelEnergia} readOnly size="small" />
              </Box>

              <Typography variant="body2" fontWeight="bold">
                Aporte final: {m.cuota}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default MascotasView