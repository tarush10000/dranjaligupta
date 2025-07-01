// js/config.js
const CONFIG = {
    API_BASE_URL: 'https://appointment-5tt0.onrender.com/api', // Your existing API
    ADMIN_SESSION_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 days
    PASSWORD_SALT: 'dr_anjali_clinic_2024_secure'
};

// Hash function for password verification
function hashPassword(password) {
    if (!password) return null;
    
    let hash = 0;
    const combined = password + CONFIG.PASSWORD_SALT;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

// Fetch password hash from backend
async function getPasswordHash() {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/password`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.password_hash;
        } else {
            console.error('Failed to fetch password hash');
            return null;
        }
    } catch (error) {
        console.error('Error fetching password hash:', error);
        return null;
    }
}