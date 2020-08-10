const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 3000
app.listen(PORT, (req, res) => {
	console.log(`Server running on port ${PORT}`)
})
