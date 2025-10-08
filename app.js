// ================================================
// Firebase Configuration  
// ================================================
const firebaseConfig = {
  apiKey: "AIzaSyB4wsKzG-aH2HmvwLvl6aBx0xBDv7Bbc74",
  authDomain: "road-trip-game-367c4.firebaseapp.com",
  databaseURL: "https://road-trip-game-367c4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "road-trip-game-367c4",
  storageBucket: "road-trip-game-367c4.firebasestorage.app",
  messagingSenderId: "902568353621",
  appId: "1:902568353621:web:db7fff225cd7b3dacf19dc",
  measurementId: "G-RW8WMCFS1W"
};

// ================================================
// ภารกิจทั้งหมด
// ================================================
const missions = [
    { id: 1, title: "🐕 ถ่ายรูปกับหมา", description: "พบเจอหมาและถ่ายรูปด้วย", points: 10 },
    { id: 2, title: "🐱 ถ่ายรูปกับแมว", description: "พบเจอแมวและถ่ายรูปด้วย", points: 15 },
    { id: 3, title: "💰 หาป้าย TrueMoney", description: "ถ่ายรูปกับป้าย TrueMoney Wallet", points: 20 },
    { id: 4, title: "🏪 หาร้าน 7-Eleven", description: "ถ่ายรูปหน้าร้าน 7-Eleven", points: 10 },
    { id: 5, title: "⛽ หาปั๊มน้ำมัน PTT", description: "ถ่ายรูปที่ปั๊ม PTT", points: 15 },
    { id: 6, title: "🌳 ถ่ายรูปกับต้นไม้ใหญ่", description: "หาต้นไม้ใหญ่และถ่ายรูปด้วย", points: 10 },
    { id: 7, title: "🚗 รถสีแดง", description: "ถ่ายรูปกับรถสีแดง", points: 10 },
    { id: 8, title: "🍜 ร้านอาหารริมทาง", description: "หาร้านอาหารและถ่ายรูป", points: 15 },
    { id: 9, title: "🏛️ วัดหรือศาลเจ้า", description: "ถ่ายรูปที่วัดหรือศาลเจ้า", points: 25 },
    { id: 10, title: "🌅 ทิวทัศน์สวยๆ", description: "ถ่ายภาพทิวทัศน์ที่สวยงาม", points: 20 },
    { id: 11, title: "🚜 รถแทรกเตอร์", description: "หายานพาหนะเกษตรและถ่ายรูป", points: 30 },
    { id: 12, title: "🐮 วัว ควาย หรือแพะ", description: "พบสัตว์ในฟาร์มและถ่ายรูป", points: 25 },
    { id: 13, title: "🌾 ทุ่งนา", description: "ถ่ายรูปกับทุ่งนา", points: 15 },
    { id: 14, title: "🏔️ ภูเขา", description: "ถ่ายรูปกับภูเขา", points: 20 },
    { id: 15, title: "📸 รูปหมู่ทีม", description: "ถ่ายรูปหมู่สมาชิกทุกคนในทีม", points: 50 }
];

// ================================================
// Global Variables
// ================================================
let db;
let currentTeamId = null;
let currentUserName = null;
let currentMissionId = null;

// ================================================
// LocalStorage Keys
// ================================================
const STORAGE_TEAM_ID = 'roadtrip_team_id';
const STORAGE_USER_NAME = 'roadtrip_user_name';

// ================================================
// Initialize Default Missions
// ================================================
function initializeDefaultMissions() {
    firebase.database().ref('missions').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            console.log('🎯 สร้างภารกิจเริ่มต้น...');
            const defaultMissions = [
                { id: 1, title: "🐕 ถ่ายรูปกับหมา", description: "พบเจอหมาและถ่ายรูปด้วย", points: 10 },
                { id: 2, title: "🐱 ถ่ายรูปกับแมว", description: "พบเจอแมวและถ่ายรูปด้วย", points: 15 },
                { id: 3, title: "💰 หาป้าย TrueMoney", description: "ถ่ายรูปกับป้าย TrueMoney Wallet", points: 20 },
                { id: 4, title: "🏪 หาร้าน 7-Eleven", description: "ถ่ายรูปหน้าร้าน 7-Eleven", points: 10 },
                { id: 5, title: "⛽ หาปั๊มน้ำมัน PTT", description: "ถ่ายรูปที่ปั๊ม PTT", points: 15 },
                { id: 6, title: "🌳 ถ่ายรูปกับต้นไม้ใหญ่", description: "หาต้นไม้ใหญ่และถ่ายรูปด้วย", points: 10 },
                { id: 7, title: "🚗 รถสีแดง", description: "ถ่ายรูปกับรถสีแดง", points: 10 },
                { id: 8, title: "🍜 ร้านอาหารริมทาง", description: "หาร้านอาหารและถ่ายรูป", points: 15 },
                { id: 9, title: "🏛️ วัดหรือศาลเจ้า", description: "ถ่ายรูปที่วัดหรือศาลเจ้า", points: 25 },
                { id: 10, title: "🌅 ทิวทัศน์สวยๆ", description: "ถ่ายภาพทิวทัศน์ที่สวยงาม", points: 20 },
                { id: 11, title: "🚜 รถแทรกเตอร์", description: "หายานพาหนะเกษตรและถ่ายรูป", points: 30 },
                { id: 12, title: "🐮 วัว ควาย หรือแพะ", description: "พบสัตว์ในฟาร์มและถ่ายรูป", points: 25 },
                { id: 13, title: "🌾 ทุ่งนา", description: "ถ่ายรูปกับทุ่งนา", points: 15 },
                { id: 14, title: "🏔️ ป้ายชื่อจังหวัด", description: "ถ่ายรูปกับป้ายชื่อจังหวัด", points: 30 },
                { id: 15, title: "🦆 เป็ด ห่าน หรือไก่", description: "พบสัตว์ปีกและถ่ายรูป", points: 20 }
            ];
            
            defaultMissions.forEach(mission => {
                firebase.database().ref('missions').push(mission);
            });
            console.log('✅ สร้างภารกิจเริ่มต้นเสร็จสิ้น');
        }
    });
}

// ================================================
// Initialize Firebase
// ================================================
function initFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            console.error('❌ Firebase SDK ยังไม่ได้ถูกโหลด');
            return;
        }

        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        console.log('✅ Firebase initialized successfully');
        
        // สร้างภารกิจเริ่มต้นถ้ายังไม่มี
        initializeDefaultMissions();
        
        // ตรวจสอบว่ามี session เดิมหรือไม่
        checkExistingSession();
        
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
    }
}

// ================================================
// Check Existing Session
// ================================================
async function checkExistingSession() {
    const savedTeamId = localStorage.getItem(STORAGE_TEAM_ID);
    const savedUserName = localStorage.getItem(STORAGE_USER_NAME);
    
    if (savedTeamId && savedUserName) {
        // ตรวจสอบว่าทีมยังมีอยู่หรือไม่
        try {
            const teamRef = db.ref(`teams/${savedTeamId}`);
            const snapshot = await teamRef.once('value');
            
            if (snapshot.exists()) {
                currentTeamId = savedTeamId;
                currentUserName = savedUserName;
                
                // กลับไปหน้าเกมอัตโนมัติ
                document.getElementById('welcome').style.display = 'none';
                document.getElementById('gameBoard').style.display = 'block';
                loadGameBoard();
                
                console.log('✅ กลับเข้าทีม:', savedTeamId, 'ชื่อ:', savedUserName);
            } else {
                // ทีมถูกลบแล้ว ล้างข้อมูล
                clearSession();
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
    }
}

// ================================================
// Save Session
// ================================================
function saveSession(teamId, userName) {
    localStorage.setItem(STORAGE_TEAM_ID, teamId);
    localStorage.setItem(STORAGE_USER_NAME, userName);
}

// ================================================
// Clear Session
// ================================================
function clearSession() {
    localStorage.removeItem(STORAGE_TEAM_ID);
    localStorage.removeItem(STORAGE_USER_NAME);
    currentTeamId = null;
    currentUserName = null;
}

// ================================================
// Generate Team Code
// ================================================
function generateTeamCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// ================================================
// Navigation Functions
// ================================================
function showCreateTeam() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('createTeam').style.display = 'block';
}

function showJoinTeam() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('joinTeam').style.display = 'block';
}

function showPublicScoreboard() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('publicScoreboard').style.display = 'block';
    loadPublicScoreboard();
}

async function showAdmin() {
    const password = prompt('🔐 ใส่รหัส Admin:');
    if (!password) return;
    
    // Hash the password using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Check against Firebase (stored hash) - ใช้ Firebase แบบเก่า
    const adminRef = firebase.database().ref('admin/passwordHash');
    const snapshot = await adminRef.once('value');
    
    if (snapshot.exists() && snapshot.val() === hashHex) {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminScoreboard();
    } else {
        alert('❌ รหัสผิด! ไม่สามารถเข้าใช้งานได้');
    }
}

function confirmLeaveTeam() {
    if (confirm('⚠️ ต้องการออกจากทีมใช่หรือไม่?\n(คะแนนที่ทำไว้จะยังอยู่)')) {
        backToWelcome();
    }
}

function backToWelcome() {
    // ซ่อนทุกหน้า
    document.getElementById('createTeam').style.display = 'none';
    document.getElementById('joinTeam').style.display = 'none';
    document.getElementById('teamCodeDisplay').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('publicScoreboard').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
    
    // แสดงหน้าแรก
    document.getElementById('welcome').style.display = 'block';
    
    // Clear session
    clearSession();
}

// ================================================
// Create Team
// ================================================
async function createTeam() {
    const teamName = document.getElementById('teamNameInput').value.trim();
    const leaderName = document.getElementById('leaderNameInput').value.trim();
    
    if (!teamName || !leaderName) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน!');
        return;
    }
    
    try {
        const teamCode = generateTeamCode();
        currentTeamId = teamCode;
        currentUserName = leaderName;
        
        const teamData = {
            teamName: teamName,
            teamCode: teamCode,
            score: 0,
            createdAt: Date.now(),
            members: {
                [leaderName]: {
                    name: leaderName,
                    role: 'leader',
                    joinedAt: Date.now()
                }
            },
            missions: {}
        };
        
        await db.ref(`teams/${teamCode}`).set(teamData);
        
        // บันทึก session
        saveSession(teamCode, leaderName);
        
        // แสดงรหัสทีม
        document.getElementById('createTeam').style.display = 'none';
        document.getElementById('teamCodeDisplay').style.display = 'block';
        document.getElementById('displayTeamCode').textContent = teamCode;
        
    } catch (error) {
        console.error('Error creating team:', error);
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
}

// ================================================
// Copy Team Code
// ================================================
function copyTeamCode() {
    const code = document.getElementById('displayTeamCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('📋 คัดลอกรหัสแล้ว: ' + code);
    });
}

function copyCurrentTeamCode() {
    if (currentTeamId) {
        navigator.clipboard.writeText(currentTeamId).then(() => {
            alert('📋 คัดลอกรหัสแล้ว: ' + currentTeamId);
        });
    }
}

// ================================================
// Start Game
// ================================================
function startGame() {
    document.getElementById('teamCodeDisplay').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    loadGameBoard();
}

// ================================================
// Join Team
// ================================================
async function joinTeamWithCode() {
    const teamCode = document.getElementById('teamCodeInput').value.trim().toUpperCase();
    const memberName = document.getElementById('memberNameInput').value.trim();
    
    if (!teamCode || !memberName) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน!');
        return;
    }
    
    if (teamCode.length !== 6) {
        alert('รหัสทีมต้องมี 6 หลัก!');
        return;
    }
    
    try {
        const teamRef = db.ref(`teams/${teamCode}`);
        const snapshot = await teamRef.once('value');
        
        if (!snapshot.exists()) {
            alert('❌ ไม่พบทีมนี้! กรุณาตรวจสอบรหัสอีกครั้ง');
            return;
        }
        
        const teamData = snapshot.val();
        
        // ตรวจสอบว่าชื่อซ้ำหรือไม่
        if (teamData.members && teamData.members[memberName]) {
            alert('⚠️ ชื่อนี้มีคนใช้แล้วในทีม!\nกรุณาใช้ชื่ออื่น หรือเพิ่มนามสกุล');
            return;
        }
        
        // เพิ่มสมาชิกเข้าทีม
        await teamRef.child(`members/${memberName}`).set({
            name: memberName,
            role: 'member',
            joinedAt: Date.now()
        });
        
        currentTeamId = teamCode;
        currentUserName = memberName;
        
        // บันทึก session
        saveSession(teamCode, memberName);
        
        // เข้าสู่หน้าเกม
        document.getElementById('joinTeam').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        loadGameBoard();
        
    } catch (error) {
        console.error('Error joining team:', error);
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
}

// ================================================
// Load Game Board
// ================================================
function loadGameBoard() {
    const teamRef = db.ref(`teams/${currentTeamId}`);
    
    // Listen to team data
    teamRef.on('value', snapshot => {
        const teamData = snapshot.val();
        if (!teamData) return;
        
        // Update team info
        document.getElementById('teamName').textContent = teamData.teamName || 'ทีม';
        document.getElementById('teamScore').textContent = teamData.score || 0;
        
        // Update members
        const members = teamData.members || {};
        const membersList = document.getElementById('membersList');
        document.getElementById('memberCount').textContent = Object.keys(members).length;
        
        membersList.innerHTML = '';
        Object.values(members).forEach(member => {
            const tag = document.createElement('span');
            tag.className = `member-tag ${member.role === 'leader' ? 'leader' : ''}`;
            tag.textContent = member.role === 'leader' ? `👑 ${member.name}` : member.name;
            membersList.appendChild(tag);
        });
        
        // Load missions
        loadMissions(teamData.missions || {});
    });
}

// ================================================
// Load Missions (from Firebase)
// ================================================
function loadMissions(completedMissions) {
    const container = document.querySelector('.missions-container');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดภารกิจ...</p>';
    
    // โหลดภารกิจจาก Firebase แทนค่าคงที่
    firebase.database().ref('missions').once('value', (snapshot) => {
        container.innerHTML = '';
        
        const missionsData = snapshot.val();
        if (!missionsData) {
            container.innerHTML = '<p class="empty-state">ยังไม่มีภารกิจในระบบ</p>';
            return;
        }
        
        // แปลงเป็น array และเรียงตาม id
        const missionsArray = Object.entries(missionsData)
            .map(([key, value]) => ({ key, ...value }))
            .sort((a, b) => a.id - b.id);
        
        missionsArray.forEach(mission => {
            const missionData = completedMissions[mission.id];
            const isCompleted = missionData && missionData.completed;
            const completedBy = missionData ? missionData.completedBy : null;
            const card = createMissionCard(mission, isCompleted, completedBy);
            container.appendChild(card);
        });
    });
}

function createMissionCard(mission, isCompleted, completedBy) {
    const card = document.createElement('div');
    card.className = `mission-card ${isCompleted ? 'completed' : ''}`;
    
    const completedText = completedBy ? `<div style="font-size: 0.85rem; color: #00D2A0; margin-top: 5px;">✓ ทำโดย ${completedBy}</div>` : '';
    
    card.innerHTML = `
        <div class="mission-header">
            <div class="mission-title">${mission.title}</div>
            <div class="mission-points">+${mission.points}</div>
        </div>
        <div class="mission-description">${mission.description}</div>
        ${completedText}
        <button class="mission-btn ${isCompleted ? 'completed' : ''}" 
                onclick="openPhotoModal(${mission.id})"
                ${isCompleted ? 'disabled' : ''}>
            ${isCompleted ? '✓ สำเร็จแล้ว' : '📸 ถ่ายรูป'}
        </button>
    `;
    
    return card;
}

// ================================================
// Photo Modal
// ================================================
function openPhotoModal(missionId) {
    currentMissionId = missionId;
    const mission = missions.find(m => m.id === missionId);
    
    document.getElementById('modalTitle').textContent = mission.title;
    document.getElementById('modalDescription').textContent = mission.description;
    document.getElementById('photoPreview').innerHTML = '';
    document.getElementById('photoInput').value = '';
    
    document.getElementById('photoModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('photoModal').style.display = 'none';
    currentMissionId = null;
}

// ================================================
// Photo Input Handler
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.getElementById('photoInput');
    
    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const preview = document.getElementById('photoPreview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Initialize Firebase
    initFirebase();
});

// ================================================
// Submit Mission
// ================================================
async function submitMission() {
    const photoInput = document.getElementById('photoInput');
    const file = photoInput.files[0];
    
    if (!file) {
        alert('กรุณาถ่ายรูปก่อน!');
        return;
    }
    
    const mission = missions.find(m => m.id === currentMissionId);
    
    try {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = '<div class="loading"></div> กำลังบันทึก...';
        submitBtn.disabled = true;
        
        // แปลงรูปเป็น Base64
        const reader = new FileReader();
        reader.onload = async (e) => {
            const photoBase64 = e.target.result;
            
            const teamRef = db.ref(`teams/${currentTeamId}`);
            const snapshot = await teamRef.once('value');
            const teamData = snapshot.val();
            
            // Update mission
            await teamRef.child(`missions/${currentMissionId}`).set({
                completed: true,
                completedBy: currentUserName,
                photoBase64: photoBase64,
                timestamp: Date.now()
            });
            
            // Update score
            const newScore = (teamData.score || 0) + mission.points;
            await teamRef.child('score').set(newScore);
            
            closeModal();
            alert(`🎉 สำเร็จ! ${currentUserName} ทำภารกิจสำเร็จ +${mission.points} คะแนน`);
        };
        
        reader.readAsDataURL(file);
        
    } catch (error) {
        console.error('Error submitting mission:', error);
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
}

// ================================================
// Public Scoreboard
// ================================================
function loadPublicScoreboard() {
    const container = document.getElementById('publicScoresContainer');
    
    // Real-time listener
    db.ref('teams').on('value', snapshot => {
        const teams = [];
        snapshot.forEach(childSnapshot => {
            const team = childSnapshot.val();
            teams.push({
                code: childSnapshot.key,
                name: team.teamName,
                score: team.score || 0,
                members: team.members ? Object.keys(team.members).length : 0,
                missions: team.missions ? Object.keys(team.missions).length : 0
            });
        });
        
        // Sort by score
        teams.sort((a, b) => b.score - a.score);
        
        // Display
        container.innerHTML = '';
        teams.forEach((team, index) => {
            const card = createScoreCard(team, index + 1);
            container.appendChild(card);
        });
        
        if (teams.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72; padding: 40px;">ยังไม่มีทีมเข้าร่วม</p>';
        }
    });
}

// ================================================
// Admin Scoreboard
// ================================================
function loadAdminScoreboard() {
    const container = document.getElementById('adminScoresContainer');
    
    db.ref('teams').on('value', snapshot => {
        const teams = [];
        snapshot.forEach(childSnapshot => {
            const team = childSnapshot.val();
            teams.push({
                code: childSnapshot.key,
                name: team.teamName,
                score: team.score || 0,
                members: team.members ? Object.keys(team.members).length : 0,
                missions: team.missions ? Object.keys(team.missions).length : 0,
                membersList: team.members || {}
            });
        });
        
        teams.sort((a, b) => b.score - a.score);
        
        container.innerHTML = '';
        teams.forEach((team, index) => {
            const card = createAdminScoreCard(team, index + 1);
            container.appendChild(card);
        });
        
        if (teams.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72; padding: 40px;">ยังไม่มีทีมเข้าร่วม</p>';
        }
    });
}

function createScoreCard(team, rank) {
    const card = document.createElement('div');
    card.className = `score-card ${rank === 1 ? 'first' : ''}`;
    
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
    
    card.innerHTML = `
        <div class="team-info">
            <div class="team-detail">
                <div class="rank">#${rank}</div>
                <div class="team-name">${medal} ${team.name}</div>
            </div>
            <div class="team-members-count">👥 ${team.members} คน</div>
            <div class="team-missions-count">✓ ${team.missions}/${missions.length} ภารกิจ</div>
        </div>
        <div class="team-score">${team.score}</div>
    `;
    
    return card;
}

function createAdminScoreCard(team, rank) {
    const card = document.createElement('div');
    card.className = `score-card ${rank === 1 ? 'first' : ''}`;
    card.style.cursor = 'pointer';
    card.onclick = () => showTeamPhotos(team);
    
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
    const memberNames = Object.values(team.membersList).map(m => 
        m.role === 'leader' ? `👑 ${m.name}` : m.name
    ).join(', ');
    
    card.innerHTML = `
        <div class="team-info">
            <div class="team-detail">
                <div class="rank">#${rank}</div>
                <div class="team-name">${medal} ${team.name}</div>
            </div>
            <div class="team-members-count">รหัส: ${team.code}</div>
            <div class="team-members-count">${memberNames}</div>
            <div class="team-missions-count">✓ ${team.missions}/${missions.length} ภารกิจ</div>
            <div style="margin-top: 8px; font-size: 0.85rem; color: #4ECDC4;">
                📸 คลิกเพื่อดูรูปภาพ
            </div>
        </div>
        <div class="team-score">${team.score}</div>
    `;
    
    return card;
}

// ================================================
// Show Team Photos
// ================================================
async function showTeamPhotos(team) {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('teamPhotosPanel').style.display = 'block';
    document.getElementById('photoPanelTeamName').textContent = `📸 ${team.name}`;
    
    const container = document.getElementById('photoMissionsContainer');
    container.innerHTML = '<p style="text-align: center; color: #636E72;">กำลังโหลด...</p>';
    
    try {
        const teamRef = db.ref(`teams/${team.code}`);
        const snapshot = await teamRef.once('value');
        const teamData = snapshot.val();
        const completedMissions = teamData.missions || {};
        
        container.innerHTML = '';
        
        missions.forEach(mission => {
            const missionData = completedMissions[mission.id];
            const card = createPhotoCard(mission, missionData, team.name);
            container.appendChild(card);
        });
        
        if (Object.keys(completedMissions).length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72; padding: 40px;">ทีมนี้ยังไม่ได้ทำภารกิจใดๆ</p>';
        }
        
    } catch (error) {
        console.error('Error loading photos:', error);
        container.innerHTML = '<p style="text-align: center; color: #FF6B6B;">เกิดข้อผิดพลาดในการโหลดรูปภาพ</p>';
    }
}

function createPhotoCard(mission, missionData, teamName) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    
    if (missionData && missionData.completed) {
        const timestamp = new Date(missionData.timestamp);
        const dateStr = timestamp.toLocaleString('th-TH');
        
        card.innerHTML = `
            <div class="photo-card-header">
                <div class="photo-mission-title">${mission.title}</div>
                <div class="photo-points">+${mission.points}</div>
            </div>
            <div class="photo-info">
                <div>✓ ทำโดย: <strong>${missionData.completedBy}</strong></div>
                <div>🕐 ${dateStr}</div>
            </div>
            <div class="photo-image-container">
                <img src="${missionData.photoBase64}" alt="${mission.title}" 
                     onclick="openPhotoLightbox('${missionData.photoBase64}', '${mission.title}', '${teamName}', '${missionData.completedBy}')">
            </div>
        `;
    } else {
        card.className = 'photo-card incomplete';
        card.innerHTML = `
            <div class="photo-card-header">
                <div class="photo-mission-title">${mission.title}</div>
                <div class="photo-points">+${mission.points}</div>
            </div>
            <div class="photo-status">❌ ยังไม่ได้ทำ</div>
        `;
    }
    
    return card;
}

function backToAdminPanel() {
    document.getElementById('teamPhotosPanel').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
}

// ================================================
// Photo Lightbox
// ================================================
function openPhotoLightbox(photoSrc, missionTitle, teamName, completedBy) {
    const lightbox = document.createElement('div');
    lightbox.className = 'photo-lightbox';
    lightbox.onclick = () => document.body.removeChild(lightbox);
    
    lightbox.innerHTML = `
        <div class="lightbox-content" onclick="event.stopPropagation()">
            <span class="lightbox-close" onclick="this.parentElement.parentElement.remove()">×</span>
            <h3>${missionTitle}</h3>
            <p style="color: #636E72; margin: 10px 0;">ทีม: ${teamName} | ทำโดย: ${completedBy}</p>
            <img src="${photoSrc}" alt="${missionTitle}">
        </div>
    `;
    
    document.body.appendChild(lightbox);
}

// ================================================
// Admin Functions
// ================================================
function resetAllScores() {
    if (!confirm('⚠️ ต้องการรีเซ็ตคะแนนทั้งหมดใช่หรือไม่?\n(ภารกิจที่ทำแล้วจะถูกลบ แต่ทีมและสมาชิกยังอยู่)')) {
        return;
    }
    
    db.ref('teams').once('value', snapshot => {
        const updates = {};
        snapshot.forEach(childSnapshot => {
            const teamCode = childSnapshot.key;
            updates[`teams/${teamCode}/score`] = 0;
            updates[`teams/${teamCode}/missions`] = null;
        });
        
        db.ref().update(updates).then(() => {
            alert('✅ รีเซ็ตคะแนนสำเร็จ!');
        });
    });
}

function deleteAllTeams() {
    if (!confirm('⚠️⚠️⚠️ ต้องการลบทีมทั้งหมดใช่หรือไม่?\nการกระทำนี้ไม่สามารถย้อนกลับได้!')) {
        return;
    }
    
    if (!confirm('แน่ใจหรือไม่? ข้อมูลทั้งหมดจะหายไป!')) {
        return;
    }
    
    db.ref('teams').remove().then(() => {
        alert('✅ ลบทีมทั้งหมดสำเร็จ!');
    });
}

// ================================================
// Admin Tab Management
// ================================================
function showAdminTab(tabName) {
    // ซ่อนแท็บทั้งหมด
    document.getElementById('adminScoreboardTab').style.display = 'none';
    document.getElementById('adminMissionsTab').style.display = 'none';
    
    // ลบ active จากปุ่มทั้งหมด
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // แสดงแท็บที่เลือก
    if (tabName === 'scoreboard') {
        document.getElementById('adminScoreboardTab').style.display = 'block';
        tabs[0].classList.add('active');
    } else if (tabName === 'missions') {
        document.getElementById('adminMissionsTab').style.display = 'block';
        tabs[1].classList.add('active');
        loadMissionsAdmin();
    }
}

// ================================================
// Load Missions for Admin Management
// ================================================
function loadMissionsAdmin() {
    const container = document.getElementById('missionsAdminContainer');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดภารกิจ...</p>';
    
    firebase.database().ref('missions').once('value', (snapshot) => {
        container.innerHTML = '';
        
        const missionsData = snapshot.val();
        if (!missionsData || Object.keys(missionsData).length === 0) {
            container.innerHTML = '<p class="empty-state">ยังไม่มีภารกิจในระบบ<br>กดปุ่ม "➕ เพิ่มภารกิจใหม่" เพื่อเริ่มต้น</p>';
            return;
        }
        
        // แปลงเป็น array และเรียงตาม id
        const missionsArray = Object.entries(missionsData)
            .map(([key, value]) => ({ key, ...value }))
            .sort((a, b) => a.id - b.id);
        
        missionsArray.forEach(mission => {
            const card = document.createElement('div');
            card.className = 'mission-admin-card';
            card.innerHTML = `
                <div class="mission-admin-info">
                    <div class="mission-admin-emoji">${mission.title.split(' ')[0]}</div>
                    <div class="mission-admin-details">
                        <div class="mission-admin-title">${mission.title}</div>
                        <div class="mission-admin-desc">${mission.description}</div>
                        <div class="mission-admin-points">🏆 ${mission.points} คะแนน</div>
                    </div>
                </div>
                <div class="mission-admin-actions">
                    <button class="edit-btn-small" onclick="editMission('${mission.key}')">✏️ แก้ไข</button>
                    <button class="delete-btn-small" onclick="deleteMission('${mission.key}', '${mission.title}')">🗑️ ลบ</button>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// ================================================
// Show Add Mission Form
// ================================================
function showAddMissionForm() {
    document.getElementById('missionFormTitle').textContent = '➕ เพิ่มภารกิจใหม่';
    document.getElementById('missionEmoji').value = '';
    document.getElementById('missionTitle').value = '';
    document.getElementById('missionDescription').value = '';
    document.getElementById('missionPoints').value = '10';
    document.getElementById('editMissionId').value = '';
    document.getElementById('missionFormModal').style.display = 'block';
}

// ================================================
// Edit Mission
// ================================================
function editMission(missionKey) {
    firebase.database().ref(`missions/${missionKey}`).once('value', (snapshot) => {
        const mission = snapshot.val();
        if (!mission) return;
        
        // แยก emoji จากชื่อ
        const titleParts = mission.title.split(' ');
        const emoji = titleParts[0];
        const titleWithoutEmoji = titleParts.slice(1).join(' ');
        
        document.getElementById('missionFormTitle').textContent = '✏️ แก้ไขภารกิจ';
        document.getElementById('missionEmoji').value = emoji;
        document.getElementById('missionTitle').value = titleWithoutEmoji;
        document.getElementById('missionDescription').value = mission.description;
        document.getElementById('missionPoints').value = mission.points;
        document.getElementById('editMissionId').value = missionKey;
        document.getElementById('missionFormModal').style.display = 'block';
    });
}

// ================================================
// Save Mission (Add or Update)
// ================================================
function saveMission() {
    const emoji = document.getElementById('missionEmoji').value.trim();
    const title = document.getElementById('missionTitle').value.trim();
    const description = document.getElementById('missionDescription').value.trim();
    const points = parseInt(document.getElementById('missionPoints').value);
    const editMissionId = document.getElementById('editMissionId').value;
    
    // Validation
    if (!emoji || !title || !description || !points) {
        alert('❌ กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
    }
    
    if (points < 5 || points > 100) {
        alert('❌ คะแนนต้องอยู่ระหว่าง 5-100');
        return;
    }
    
    const fullTitle = `${emoji} ${title}`;
    
    if (editMissionId) {
        // แก้ไขภารกิจเดิม
        firebase.database().ref(`missions/${editMissionId}`).once('value', (snapshot) => {
            const oldData = snapshot.val();
            firebase.database().ref(`missions/${editMissionId}`).update({
                title: fullTitle,
                description: description,
                points: points
            }).then(() => {
                alert('✅ แก้ไขภารกิจสำเร็จ!');
                closeMissionForm();
                loadMissionsAdmin();
            }).catch((error) => {
                alert('❌ เกิดข้อผิดพลาด: ' + error.message);
            });
        });
    } else {
        // เพิ่มภารกิจใหม่
        firebase.database().ref('missions').once('value', (snapshot) => {
            const missionsData = snapshot.val() || {};
            const maxId = Object.values(missionsData).reduce((max, m) => Math.max(max, m.id || 0), 0);
            const newId = maxId + 1;
            
            const newMissionRef = firebase.database().ref('missions').push();
            newMissionRef.set({
                id: newId,
                title: fullTitle,
                description: description,
                points: points
            }).then(() => {
                alert('✅ เพิ่มภารกิจใหม่สำเร็จ!');
                closeMissionForm();
                loadMissionsAdmin();
            }).catch((error) => {
                alert('❌ เกิดข้อผิดพลาด: ' + error.message);
            });
        });
    }
}

// ================================================
// Delete Mission
// ================================================
function deleteMission(missionKey, missionTitle) {
    if (!confirm(`⚠️ ต้องการลบภารกิจ "${missionTitle}" ใช่หรือไม่?\n\n(คะแนนที่ทำไว้แล้วจะยังคงอยู่ในทีม)`)) {
        return;
    }
    
    firebase.database().ref(`missions/${missionKey}`).remove()
        .then(() => {
            alert('✅ ลบภารกิจสำเร็จ!');
            loadMissionsAdmin();
        })
        .catch((error) => {
            alert('❌ เกิดข้อผิดพลาด: ' + error.message);
        });
}

// ================================================
// Close Mission Form Modal
// ================================================
function closeMissionForm() {
    document.getElementById('missionFormModal').style.display = 'none';
}

// ================================================
// Close modal when clicking outside
// ================================================
window.onclick = function(event) {
    const photoModal = document.getElementById('photoModal');
    const missionFormModal = document.getElementById('missionFormModal');
    
    if (event.target === photoModal) {
        closeModal();
    }
    if (event.target === missionFormModal) {
        closeMissionForm();
    }
};
