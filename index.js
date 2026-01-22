const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
    console.log(`- Module 2 (Tenants/Reservations) mapped to /api/tenants & /api/reservas`);
});
