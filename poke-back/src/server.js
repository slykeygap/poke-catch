import app from './app.js'

const PORT = process.env.PORT || 80
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, () => {
  if (process.env.PORT) {
    console.log(`Servidor corriendo en puerto ${PORT}`)
  } else {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`)
  }
})

