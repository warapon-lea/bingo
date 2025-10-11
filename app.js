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
let currentGame = null; // 'snapventure' or 'wordguessing'
let currentAdminGame = 'snapventure'; // default admin game

// ================================================
// LocalStorage Keys
// ================================================
const STORAGE_TEAM_ID = 'roadtrip_team_id';
const STORAGE_USER_NAME = 'roadtrip_user_name';
const STORAGE_CURRENT_GAME = 'roadtrip_current_game';

// ================================================
// Game Configuration
// ================================================
const GAME_CONFIG = {
    snapventure: {
        name: 'Snap Venture',
        icon: '📸',
        description: 'ถ่ายรูปตามภารกิจ',
        missionType: 'photo' // only photo missions
    },
    wordguessing: {
        name: 'Word Guessing',
        icon: '💭',
        description: 'ตอบคำถามทายคำ',
        missionType: 'quiz' // only quiz missions
    }
};

// ================================================
// Initialize Default Missions and Settings
// ================================================
function initializeDefaultMissions() {
    // สร้างภารกิจเริ่มต้น
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
    
    // ตั้งค่าจำนวนสมาชิกเริ่มต้น
    firebase.database().ref('settings/maxMembers').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            firebase.database().ref('settings/maxMembers').set(5);
            console.log('✅ ตั้งค่าจำนวนสมาชิกเริ่มต้น: 5 คน');
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
    const savedGame = localStorage.getItem(STORAGE_CURRENT_GAME);
    
    if (savedTeamId && savedUserName && savedGame) {
        // ตรวจสอบว่าทีมยังมีอยู่หรือไม่
        try {
            const teamRef = db.ref(`games/${savedGame}/teams/${savedTeamId}`);
            const snapshot = await teamRef.once('value');
            
            if (snapshot.exists()) {
                currentTeamId = savedTeamId;
                currentUserName = savedUserName;
                currentGame = savedGame;
                
                // กลับไปหน้าเกมอัตโนมัติ
                document.getElementById('welcome').style.display = 'none';
                document.getElementById('gameBoard').style.display = 'block';
                loadGameBoard();
                
                const gameName = GAME_CONFIG[savedGame].name;
                console.log(`✅ กลับเข้าทีม ${gameName}:`, savedTeamId, 'ชื่อ:', savedUserName);
            } else {
                // ทีมถูกลบแล้ว ล้างข้อมูล
                clearSession();
            }
        } catch (error) {
            console.error('Error checking session:', error);
            clearSession();
        }
    }
}

// ================================================
// Save Session
// ================================================
function saveSession(teamId, userName) {
    localStorage.setItem(STORAGE_TEAM_ID, teamId);
    localStorage.setItem(STORAGE_USER_NAME, userName);
    localStorage.setItem(STORAGE_CURRENT_GAME, currentGame);
}

// ================================================
// Clear Session
// ================================================
function clearSession() {
    localStorage.removeItem(STORAGE_TEAM_ID);
    localStorage.removeItem(STORAGE_USER_NAME);
    localStorage.removeItem(STORAGE_CURRENT_GAME);
    currentTeamId = null;
    currentUserName = null;
    currentGame = null;
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
    if (!currentGame) {
        alert('กรุณาเลือกเกมก่อน!');
        return;
    }
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('createTeam').style.display = 'block';
}

function showJoinTeam() {
    if (!currentGame) {
        alert('กรุณาเลือกเกมก่อน!');
        return;
    }
    document.getElementById('gameMenu').style.display = 'none';
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
        currentAdminGame = 'snapventure'; // default
        loadAdminScoreboard();
        loadMissionsAdmin();
        loadScheduleSettings();
    } else {
        alert('❌ รหัสผิด! ไม่สามารถเข้าใช้งานได้');
    }
}

function selectAdminGame(gameType) {
    currentAdminGame = gameType;
    
    // Update active button
    document.querySelectorAll('.game-selector-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.game-selector-btn').classList.add('active');
    
    // Reload current tab data
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        const tabName = activeTab.textContent.includes('คะแนน') ? 'scoreboard' :
                       activeTab.textContent.includes('ภารกิจ') ? 'missions' : 'schedule';
        showAdminTab(tabName);
    }
}

function confirmLeaveTeam() {
    if (confirm('⚠️ ต้องการออกจากทีมใช่หรือไม่?\n(คะแนนที่ทำไว้จะยังอยู่)')) {
        backToWelcome();
    }
}

function confirmLeaveRoom() {
    const gameName = GAME_CONFIG[currentGame]?.name || 'เกมนี้';
    if (confirm(`🚪 ต้องการออกจากห้อง ${gameName} ใช่หรือไม่?\n\n✓ คะแนนที่ทำไว้จะยังคงอยู่\n✓ คุณสามารถกลับมาเล่นเกมอื่นได้`)) {
        leaveRoom();
    }
}

function leaveRoom() {
    // Clear session และกลับไปหน้าแรก
    clearSession();
    
    // ซ่อนทุกหน้า
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    
    // แสดงข้อความแจ้งเตือน
    alert('✅ ออกจากห้องสำเร็จ!\nคุณสามารถเลือกเกมใหม่หรือเข้าร่วมทีมอื่นได้');
}

// ================================================
// Game Rules Functions
// ================================================
function showGameRules(gameType) {
    const rulesContent = document.getElementById('rulesContent');
    
    if (gameType === 'snapventure') {
        rulesContent.innerHTML = `
            <h4>📸 Snap Venture - เกมถ่ายรูปผจญภัย</h4>
            <p><strong>🎯 เป้าหมาย:</strong> ถ่ายรูปตามภารกิจที่กำหนดให้ได้มากที่สุด!</p>
            
            <h4>📋 วิธีเล่น:</h4>
            <ul>
                <li><span class="rule-emoji">👥</span> สร้างทีมหรือเข้าร่วมทีมด้วยรหัส 6 หลัก</li>
                <li><span class="rule-emoji">📸</span> เลือกภารกิจและถ่ายรูปตามที่โจทย์กำหนด</li>
                <li><span class="rule-emoji">✅</span> ส่งรูปเพื่อรับคะแนนทันที (ไม่ต้องรอตรวจ)</li>
                <li><span class="rule-emoji">🏆</span> ทีมที่ได้คะแนนรวมสูงสุดคือผู้ชนะ!</li>
            </ul>
            
            <h4>⚠️ กฎกติกา:</h4>
            <ul>
                <li><span class="rule-emoji">📵</span> แต่ละภารกิจทำได้ครั้งเดียวเท่านั้น</li>
                <li><span class="rule-emoji">⏰</span> ต้องส่งรูปภายในเวลาที่กำหนด</li>
                <li><span class="rule-emoji">🚗</span> ทุกคนในรถสามารถร่วมทำภารกิจได้</li>
                <li><span class="rule-emoji">🎮</span> สนุกและปลอดภัย - ไม่ทำอะไรที่เสี่ยงอันตราย!</li>
            </ul>
            
            <p style="text-align: center; margin-top: 20px; color: #4ECDC4; font-weight: bold;">
                🎉 ขอให้สนุกกับการผจญภัย! 🎉
            </p>
        `;
    } else if (gameType === 'wordguessing') {
        rulesContent.innerHTML = `
            <h4>💭 Word Guessing - เกมทายคำ</h4>
            <p><strong>🎯 เป้าหมาย:</strong> ตอบคำถามให้ถูกต้องให้ได้มากที่สุด!</p>
            
            <h4>📋 วิธีเล่น:</h4>
            <ul>
                <li><span class="rule-emoji">👥</span> สร้างทีมหรือเข้าร่วมทีมด้วยรหัส 6 หลัก</li>
                <li><span class="rule-emoji">❓</span> เลือกคำถามและพิมพ์คำตอบ</li>
                <li><span class="rule-emoji">✅</span> ระบบตรวจคำตอบอัตโนมัติ (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)</li>
                <li><span class="rule-emoji">🏆</span> ทีมที่ได้คะแนนรวมสูงสุดคือผู้ชนะ!</li>
            </ul>
            
            <h4>⚠️ กฎกติกา:</h4>
            <ul>
                <li><span class="rule-emoji">📵</span> แต่ละคำถามตอบได้ครั้งเดียวเท่านั้น</li>
                <li><span class="rule-emoji">⏰</span> ต้องตอบภายในเวลาที่กำหนด</li>
                <li><span class="rule-emoji">🚗</span> ทุกคนในรถสามารถช่วยกันคิดตอบได้</li>
                <li><span class="rule-emoji">🤝</span> ไม่ใช้ Google ในการหาคำตอบ (เล่นด้วยความรู้ของทีม!)</li>
            </ul>
            
            <p style="text-align: center; margin-top: 20px; color: #4ECDC4; font-weight: bold;">
                🧠 ขอให้สนุกกับการใช้สมอง! 🧠
            </p>
        `;
    }
    
    document.getElementById('rulesModal').style.display = 'block';
}

function acceptRules() {
    document.getElementById('rulesModal').style.display = 'none';
    // แสดงเมนูเกม (สร้าง/เข้าร่วม)
    document.getElementById('gameMenu').style.display = 'block';
}

function selectGame(gameType) {
    console.log('🎮 selectGame called with:', gameType);
    
    try {
        currentGame = gameType;
        localStorage.setItem(STORAGE_CURRENT_GAME, gameType);
        
        // Update game menu title and description
        const config = GAME_CONFIG[gameType];
        if (!config) {
            console.error('❌ Game config not found for:', gameType);
            return;
        }
        
        const gameTitleEl = document.getElementById('gameMenuTitle');
        const gameDescEl = document.getElementById('gameMenuDesc');
        
        if (gameTitleEl && gameDescEl) {
            gameTitleEl.innerHTML = `${config.icon} ${config.name}`;
            gameDescEl.textContent = config.description;
        }
        
        // Hide welcome
        const welcomeEl = document.getElementById('welcome');
        if (welcomeEl) {
            welcomeEl.style.display = 'none';
        }
        
        // Show rules popup first
        showGameRules(gameType);
        
        console.log('✅ selectGame completed');
    } catch (error) {
        console.error('❌ Error in selectGame:', error);
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
}

function backToWelcome() {
    // ซ่อนทุกหน้า
    document.getElementById('gameMenu').style.display = 'none';
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
    currentGame = null;
    localStorage.removeItem(STORAGE_CURRENT_GAME);
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
    
    if (!currentGame) {
        alert('กรุณาเลือกเกมก่อน!');
        return;
    }
    
    try {
        const teamCode = generateTeamCode();
        currentTeamId = teamCode;
        currentUserName = leaderName;
        
        const teamData = {
            name: teamName,
            teamCode: teamCode,
            game: currentGame,
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
        
        // Save to game-specific path
        await db.ref(`games/${currentGame}/teams/${teamCode}`).set(teamData);
        
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
    
    if (!currentGame) {
        alert('กรุณาเลือกเกมก่อน!');
        return;
    }
    
    try {
        // Try to find team in current game first
        let teamRef = db.ref(`games/${currentGame}/teams/${teamCode}`);
        let snapshot = await teamRef.once('value');
        
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
        
        // ตรวจสอบจำนวนสมาชิกสูงสุด
        const settingsSnapshot = await firebase.database().ref(`games/${currentGame}/settings/maxMembers`).once('value');
        const maxMembers = settingsSnapshot.val() || 5;
        const currentMemberCount = teamData.members ? Object.keys(teamData.members).length : 0;
        
        if (currentMemberCount >= maxMembers) {
            alert(`❌ ทีมเต็มแล้ว!\nทีมนี้มีสมาชิกครบ ${maxMembers} คนแล้ว`);
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
    if (!currentGame) return;
    
    const teamRef = db.ref(`games/${currentGame}/teams/${currentTeamId}`);
    
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
            const tag = document.createElement('div');
            tag.className = `member-tag ${member.role === 'leader' ? 'leader' : ''}`;
            
            const avatar = document.createElement('div');
            avatar.className = 'member-avatar';
            avatar.textContent = member.role === 'leader' ? '👑' : '👤';
            
            const info = document.createElement('div');
            info.className = 'member-info';
            
            const name = document.createElement('div');
            name.className = 'member-name';
            name.textContent = member.name;
            
            const role = document.createElement('div');
            role.className = 'member-role';
            role.textContent = member.role === 'leader' ? 'หัวหน้าทีม' : 'สมาชิก';
            
            info.appendChild(name);
            info.appendChild(role);
            tag.appendChild(avatar);
            tag.appendChild(info);
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
    
    if (!currentGame) {
        container.innerHTML = '<p class="empty-state">กรุณาเลือกเกมก่อน</p>';
        return;
    }
    
    // เช็คเวลาก่อน
    firebase.database().ref(`games/${currentGame}/schedule`).once('value', (scheduleSnapshot) => {
        const schedule = scheduleSnapshot.val();
        const now = Date.now();
        
        // ถ้ามี schedule และยังไม่ถึงเวลาเริ่ม
        if (schedule && schedule.start && now < schedule.start) {
            container.innerHTML = `
                <div class="schedule-message not-started">
                    <div class="schedule-icon">⏳</div>
                    <h3>ยังไม่ถึงเวลาทำภารกิจ</h3>
                    <p>ภารกิจจะเริ่มในวันที่</p>
                    <p class="schedule-time">${formatDateTime(schedule.start)}</p>
                </div>
            `;
            return;
        }
        
        // ถ้ามี schedule และหมดเวลาแล้ว
        if (schedule && schedule.end && now > schedule.end) {
            container.innerHTML = `
                <div class="schedule-message ended">
                    <div class="schedule-icon">🏁</div>
                    <h3>หมดเวลาทำภารกิจแล้ว</h3>
                    <p>ภารกิจสิ้นสุดเมื่อ</p>
                    <p class="schedule-time">${formatDateTime(schedule.end)}</p>
                    <button class="leave-room-btn" onclick="leaveRoom()">
                        🚪 ออกจากห้องและไปเกมใหม่
                    </button>
                </div>
            `;
            return;
        }
        
        // โหลดภารกิจปกติ (อยู่ในช่วงเวลาหรือไม่มี schedule)
        if (!currentGame) return;
        
        // Start countdown timer if schedule exists
        if (schedule && schedule.start && schedule.end) {
            startCountdownTimer(schedule.start, schedule.end);
        }
        
        firebase.database().ref(`games/${currentGame}/missions`).once('value', (snapshot) => {
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
                const isRevoked = missionData && missionData.revoked;
                const completedBy = missionData ? missionData.completedBy : null;
                const revokedReason = missionData ? missionData.revokedReason : null;
                const card = createMissionCard(mission, isCompleted, isRevoked, completedBy, revokedReason);
                container.appendChild(card);
            });
        });
    });
}

function createMissionCard(mission, isCompleted, isRevoked, completedBy, revokedReason) {
    const card = document.createElement('div');
    card.className = `mission-card ${isCompleted ? 'completed' : ''} ${isRevoked ? 'revoked' : ''}`;
    
    const missionType = mission.type || 'photo';
    
    // Show different messages based on status
    let statusText = '';
    if (isRevoked) {
        statusText = `
            <div style="background: #FFF5F5; border: 2px solid #FF6B6B; border-radius: 8px; padding: 10px; margin-top: 10px;">
                <div style="font-size: 0.9rem; color: #FF6B6B; font-weight: bold; margin-bottom: 5px;">
                    🚫 ภารกิจถูกยกเลิก
                </div>
                <div style="font-size: 0.85rem; color: #C0392B;">
                    เหตุผล: ${revokedReason || 'ไม่ผ่านการตรวจสอบ'}
                </div>
            </div>
        `;
    } else if (completedBy) {
        statusText = `<div style="font-size: 0.85rem; color: #00D2A0; margin-top: 5px;">✓ ทำโดย ${completedBy}</div>`;
    }
    
    // ไอคอนและข้อความปุ่มตามประเภท
    const buttonIcon = missionType === 'quiz' ? '❓' : '📸';
    const buttonText = missionType === 'quiz' ? 'ตอบคำถาม' : 'ถ่ายรูป';
    const clickFunction = missionType === 'quiz' ? `openQuizModal(${mission.id})` : `openPhotoModal(${mission.id})`;
    
    // แสดงประเภทภารกิจ
    const typeBadge = missionType === 'quiz' 
        ? '<span class="mission-type-badge quiz">❓ ตอบคำถาม</span>' 
        : '<span class="mission-type-badge photo">📸 ถ่ายรูป</span>';
    
    // Button state
    let buttonHTML = '';
    if (isRevoked) {
        buttonHTML = `
            <button class="mission-btn revoked" disabled>
                🚫 ถูกยกเลิก
            </button>
        `;
    } else if (isCompleted) {
        buttonHTML = `
            <button class="mission-btn completed" disabled>
                ✓ สำเร็จแล้ว
            </button>
        `;
    } else {
        buttonHTML = `
            <button class="mission-btn" onclick="${clickFunction}">
                ${buttonIcon} ${buttonText}
            </button>
        `;
    }
    
    card.innerHTML = `
        <div class="mission-header">
            <div class="mission-title">${mission.title}</div>
        </div>
        ${typeBadge}
        ${statusText}
        ${buttonHTML}
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
    document.getElementById('photoPreview').innerHTML = '';
    document.getElementById('photoInput').value = '';
    
    document.getElementById('photoModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('photoModal').style.display = 'none';
    currentMissionId = null;
}

// ================================================
// Quiz Modal
// ================================================
function openQuizModal(missionId) {
    currentMissionId = missionId;
    
    if (!currentGame) return;
    
    // ดึงข้อมูลภารกิจจาก Firebase
    firebase.database().ref(`games/${currentGame}/missions`).once('value', (snapshot) => {
        const missionsData = snapshot.val();
        const missionEntry = Object.entries(missionsData).find(([key, value]) => value.id === missionId);
        
        if (missionEntry) {
            const mission = missionEntry[1];
            document.getElementById('quizModalTitle').textContent = mission.title;
            document.getElementById('quizAnswerInput').value = '';
            document.getElementById('quizModal').style.display = 'block';
        }
    });
}

function closeQuizModal() {
    document.getElementById('quizModal').style.display = 'none';
    currentMissionId = null;
}

// ================================================
// Countdown Timer
// ================================================
let countdownInterval = null;

function startCountdownTimer(startTime, endTime) {
    const timerElement = document.getElementById('countdownTimer');
    
    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    function updateTimer() {
        const now = Date.now();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            // หมดเวลา
            timerElement.style.display = 'none';
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            // Reload missions to show ended message
            location.reload();
            return;
        }
        
        // คำนวณเวลาที่เหลือ
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // แสดงเวลา
        let timeText = '';
        if (days > 0) {
            timeText = `${days} วัน ${hours} ชั่วโมง`;
        } else if (hours > 0) {
            timeText = `${hours} ชม. ${minutes} นาที`;
        } else if (minutes > 0) {
            timeText = `${minutes} นาที ${seconds} วินาที`;
        } else {
            timeText = `${seconds} วินาที`;
        }
        
        // เช็คว่าใกล้หมดเวลาไหม (เหลือน้อยกว่า 1 ชั่วโมง)
        const isWarning = timeLeft < (60 * 60 * 1000);
        
        timerElement.className = `countdown-timer ${isWarning ? 'warning' : ''}`;
        timerElement.innerHTML = `
            <span class="timer-icon">${isWarning ? '⚠️' : '⏰'}</span>
            <span class="timer-text">เหลือเวลา: ${timeText}</span>
        `;
        timerElement.style.display = 'flex';
    }
    
    // Update ทันที
    updateTimer();
    
    // Update ทุกวินาที
    countdownInterval = setInterval(updateTimer, 1000);
}

async function submitQuizAnswer() {
    if (!currentGame) return;
    
    // เช็คเวลาก่อนส่ง
    const scheduleSnapshot = await firebase.database().ref(`games/${currentGame}/schedule`).once('value');
    const schedule = scheduleSnapshot.val();
    const now = Date.now();
    
    if (schedule) {
        if (now < schedule.start) {
            alert('❌ ยังไม่ถึงเวลาทำภารกิจ!');
            closeQuizModal();
            return;
        }
        if (now > schedule.end) {
            alert('❌ หมดเวลาทำภารกิจแล้ว!');
            closeQuizModal();
            return;
        }
    }
    
    const userAnswer = document.getElementById('quizAnswerInput').value.trim();
    
    if (!userAnswer) {
        alert('❌ กรุณาใส่คำตอบ!');
        return;
    }
    
    try {
        // ดึงข้อมูลภารกิจจาก Firebase
        const missionsSnapshot = await firebase.database().ref(`games/${currentGame}/missions`).once('value');
        const missionsData = missionsSnapshot.val();
        const missionEntry = Object.entries(missionsData).find(([key, value]) => value.id === currentMissionId);
        
        if (!missionEntry) {
            alert('❌ ไม่พบข้อมูลภารกิจ!');
            return;
        }
        
        const [missionKey, mission] = missionEntry;
        const correctAnswer = mission.answer;
        
        // เช็คคำตอบ (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่ และช่องว่าง)
        const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        
        if (!isCorrect) {
            alert(`❌ คำตอบไม่ถูกต้อง!\nลองใหม่อีกครั้งนะ`);
            return;
        }
        
        // คำตอบถูก! บันทึกลง Firebase
        const teamRef = firebase.database().ref(`games/${currentGame}/teams/${currentTeamId}`);
        const snapshot = await teamRef.once('value');
        const teamData = snapshot.val();
        
        if (!teamData) {
            alert('❌ ไม่พบข้อมูลทีม กรุณาลองใหม่');
            return;
        }
        
        const timestamp = Date.now();
        
        // Update mission
        await teamRef.child(`missions/${currentMissionId}`).set({
            completed: true,
            completedBy: currentUserName,
            answer: userAnswer,
            timestamp: timestamp
        });
        
        // Update score (immediate points)
        const newScore = (teamData.score || 0) + mission.points;
        await teamRef.child('score').set(newScore);
        
        // Save submission record for admin review
        const submissionRef = firebase.database().ref(`games/${currentGame}/submissions`).push();
        await submissionRef.set({
            teamId: currentTeamId,
            teamName: teamData.name || 'Unknown Team',
            missionId: currentMissionId,
            missionTitle: mission.title || 'Unknown Mission',
            missionPoints: mission.points || 0,
            missionType: 'quiz',
            submittedBy: currentUserName || 'Unknown',
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            timestamp: timestamp,
            status: 'approved' // default status
        });
        
        closeQuizModal();
        alert(`🎉 ถูกต้อง! ${currentUserName} ตอบถูก +${mission.points} คะแนน`);
        loadGameBoard();
        
    } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
}

// ================================================
// Photo Input Handler
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    // ================================================
    // Event Delegation for All Buttons
    // ================================================
    
    // Use event delegation on document body
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-game], [data-admin-game], [data-tab], #adminMenuBtn');
        
        if (!target) return;
        
        // Game selection (Snap Venture, Word Guessing)
        if (target.dataset.game) {
            e.preventDefault();
            selectGame(target.dataset.game);
        }
        
        // Admin menu button
        if (target.id === 'adminMenuBtn') {
            e.preventDefault();
            showAdmin();
        }
        
        // Admin game selector
        if (target.dataset.adminGame) {
            e.preventDefault();
            selectAdminGame(target.dataset.adminGame);
        }
        
        // Admin tabs
        if (target.dataset.tab) {
            e.preventDefault();
            showAdminTab(target.dataset.tab);
        }
    });
    
    // ================================================
    // Photo Input Preview
    // ================================================
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
    if (!currentGame) return;
    
    // เช็คเวลาก่อนส่ง
    const scheduleSnapshot = await firebase.database().ref(`games/${currentGame}/schedule`).once('value');
    const schedule = scheduleSnapshot.val();
    const now = Date.now();
    
    if (schedule) {
        if (now < schedule.start) {
            alert('❌ ยังไม่ถึงเวลาทำภารกิจ!');
            closeModal();
            return;
        }
        if (now > schedule.end) {
            alert('❌ หมดเวลาทำภารกิจแล้ว!');
            closeModal();
            return;
        }
    }
    
    const photoInput = document.getElementById('photoInput');
    const file = photoInput.files[0];
    
    if (!file) {
        alert('กรุณาถ่ายรูปก่อน!');
        return;
    }
    
    // Get mission from Firebase
    const missionsSnapshot = await firebase.database().ref(`games/${currentGame}/missions`).once('value');
    const missionsData = missionsSnapshot.val();
    const missionEntry = Object.entries(missionsData).find(([key, value]) => value.id === currentMissionId);
    const mission = missionEntry ? missionEntry[1] : null;
    
    if (!mission) {
        alert('ไม่พบภารกิจนี้!');
        return;
    }
    
    try {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = '<div class="loading"></div> กำลังบันทึก...';
        submitBtn.disabled = true;
        
        // แปลงรูปเป็น Base64
        const reader = new FileReader();
        reader.onload = async (e) => {
            const photoBase64 = e.target.result;
            
            const teamRef = db.ref(`games/${currentGame}/teams/${currentTeamId}`);
            const snapshot = await teamRef.once('value');
            const teamData = snapshot.val();
            
            if (!teamData) {
                alert('❌ ไม่พบข้อมูลทีม กรุณาลองใหม่');
                return;
            }
            
            const timestamp = Date.now();
            
            // Update mission in team
            await teamRef.child(`missions/${currentMissionId}`).set({
                completed: true,
                completedBy: currentUserName,
                photoBase64: photoBase64,
                timestamp: timestamp
            });
            
            // Update score (immediate points)
            const newScore = (teamData.score || 0) + mission.points;
            await teamRef.child('score').set(newScore);
            
            // Save submission record for admin review
            const submissionRef = db.ref(`games/${currentGame}/submissions`).push();
            await submissionRef.set({
                teamId: currentTeamId,
                teamName: teamData.name || 'Unknown Team',
                missionId: currentMissionId,
                missionTitle: mission.title || 'Unknown Mission',
                missionPoints: mission.points || 0,
                missionType: 'photo',
                submittedBy: currentUserName || 'Unknown',
                photoBase64: photoBase64,
                timestamp: timestamp,
                status: 'approved' // default status
            });
            
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
// Calculate Average Completion Time (Tiebreaker)
// ================================================
function calculateAverageCompletionTime(missions) {
    if (!missions) return Infinity; // ทีมที่ไม่มีภารกิจจะอยู่ท้ายสุด
    
    const completedMissions = Object.values(missions).filter(m => m.completed && m.timestamp);
    
    if (completedMissions.length === 0) return Infinity;
    
    // หาเวลาแรกสุดที่เริ่มทำ (timestamp ที่เก่าที่สุด)
    const timestamps = completedMissions.map(m => m.timestamp);
    const firstTime = Math.min(...timestamps);
    const lastTime = Math.max(...timestamps);
    
    // คำนวณเวลาที่ใช้ทั้งหมด (มิลลิวินาที)
    const totalTime = lastTime - firstTime;
    
    // ถ้าทำเสร็จเพียงภารกิจเดียว ให้ใช้เวลาที่ทำภารกิจนั้น
    if (completedMissions.length === 1) {
        return timestamps[0];
    }
    
    // คืนค่าเวลาเฉลี่ยต่อภารกิจ
    return totalTime / completedMissions.length;
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
            const avgTime = calculateAverageCompletionTime(team.missions);
            teams.push({
                code: childSnapshot.key,
                name: team.teamName,
                score: team.score || 0,
                members: team.members ? Object.keys(team.members).length : 0,
                missions: team.missions ? Object.keys(team.missions).length : 0,
                avgCompletionTime: avgTime
            });
        });
        
        // Sort by score (descending), then by average time (ascending - faster is better)
        teams.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score; // คะแนนสูงกว่าชนะ
            }
            // คะแนนเท่ากัน -> ใช้เวลาเฉลี่ยน้อยกว่าชนะ
            return a.avgCompletionTime - b.avgCompletionTime;
        });
        
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
    const gameName = GAME_CONFIG[currentAdminGame].name;
    const gameIcon = GAME_CONFIG[currentAdminGame].icon;
    
    // Update game display
    document.getElementById('currentGameDisplay').innerHTML = `${gameIcon} กำลังแสดงทีมของเกม <strong>${gameName}</strong>`;
    
    db.ref(`games/${currentAdminGame}/teams`).on('value', snapshot => {
        const teams = [];
        snapshot.forEach(childSnapshot => {
            const team = childSnapshot.val();
            const avgTime = calculateAverageCompletionTime(team.missions);
            teams.push({
                code: childSnapshot.key,
                name: team.name || team.teamName || 'Unknown Team',
                score: team.score || 0,
                members: team.members ? Object.keys(team.members).length : 0,
                missions: team.missions ? Object.keys(team.missions).length : 0,
                membersList: team.members || {},
                avgCompletionTime: avgTime
            });
        });
        
        // Sort by score (descending), then by average time (ascending)
        teams.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.avgCompletionTime - b.avgCompletionTime;
        });
        
        container.innerHTML = '';
        teams.forEach((team, index) => {
            const card = createAdminScoreCard(team, index + 1, currentAdminGame);
            container.appendChild(card);
        });
        
        if (teams.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: #636E72; padding: 40px;">ยังไม่มีทีมใน ${gameName}</p>`;
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

function createAdminScoreCard(team, rank, gameType) {
    const card = document.createElement('div');
    card.className = `score-card ${rank === 1 ? 'first' : ''}`;
    
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
    
    // สร้างรายชื่อสมาชิก
    const membersHTML = Object.values(team.membersList)
        .map(m => {
            const icon = m.role === 'leader' ? '👑' : '👤';
            const roleClass = m.role === 'leader' ? 'leader' : 'member';
            return `<span class="admin-member-badge ${roleClass}">${icon} ${m.name}</span>`;
        })
        .join('');
    
    card.innerHTML = `
        <div class="team-info">
            <div class="team-detail">
                <div class="rank">#${rank}</div>
                <div class="team-name">${medal} ${team.name}</div>
            </div>
            <div class="team-code">รหัสทีม: <strong>${team.code}</strong></div>
            <div class="admin-members-list">
                <div class="admin-members-label">👥 สมาชิก ${team.members} คน:</div>
                <div class="admin-members-tags">${membersHTML}</div>
            </div>
            <div class="team-missions-count">✓ ${team.missions} ภารกิจ</div>
            <div style="margin-top: 10px; display: flex; gap: 10px;">
                <button class="view-photo-btn" onclick="event.stopPropagation(); showTeamPhotos({code: '${team.code}', name: '${team.name}'}, '${gameType}')" style="flex: 1;">
                    📸 ดูรูปภาพ
                </button>
                <button class="view-photo-btn" onclick="event.stopPropagation(); showTeamSubmissions('${team.code}', '${team.name}')" style="flex: 1;">
                    � ดูการส่งงาน
                </button>
            </div>
        </div>
        <div class="team-score">${team.score}</div>
    `;
    
    return card;
}

// ================================================
// Show Team Photos
// ================================================
async function showTeamPhotos(team, gameType) {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('teamPhotosPanel').style.display = 'block';
    document.getElementById('photoPanelTeamName').textContent = `📸 ${team.name}`;
    
    const container = document.getElementById('photoMissionsContainer');
    container.innerHTML = '<p style="text-align: center; color: #636E72;">กำลังโหลด...</p>';
    
    try {
        const teamRef = db.ref(`games/${gameType}/teams/${team.code}`);
        const snapshot = await teamRef.once('value');
        const teamData = snapshot.val();
        const completedMissions = teamData.missions || {};
        
        // Get missions for this game
        const missionsSnapshot = await db.ref(`games/${gameType}/missions`).once('value');
        const missionsData = missionsSnapshot.val();
        const gameMissions = missionsData ? Object.values(missionsData) : [];
        
        container.innerHTML = '';
        
        gameMissions.forEach(mission => {
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
    const gameName = GAME_CONFIG[currentAdminGame].name;
    if (!confirm(`⚠️ ต้องการรีเซ็ตคะแนนทั้งหมดใน ${gameName} ใช่หรือไม่?\n(ภารกิจที่ทำแล้วจะถูกลบ แต่ทีมและสมาชิกยังอยู่)`)) {
        return;
    }
    
    db.ref(`games/${currentAdminGame}/teams`).once('value', snapshot => {
        const updates = {};
        snapshot.forEach(childSnapshot => {
            const teamCode = childSnapshot.key;
            updates[`games/${currentAdminGame}/teams/${teamCode}/score`] = 0;
            updates[`games/${currentAdminGame}/teams/${teamCode}/missions`] = null;
        });
        
        db.ref().update(updates).then(() => {
            alert('✅ รีเซ็ตคะแนนสำเร็จ!');
        });
    });
}

function deleteAllTeams() {
    const gameName = GAME_CONFIG[currentAdminGame].name;
    if (!confirm(`⚠️⚠️⚠️ ต้องการลบทีมทั้งหมดใน ${gameName} ใช่หรือไม่?\nการกระทำนี้ไม่สามารถย้อนกลับได้!`)) {
        return;
    }
    
    if (!confirm('แน่ใจหรือไม่? ข้อมูลทั้งหมดจะหายไป!')) {
        return;
    }
    
    db.ref(`games/${currentAdminGame}/teams`).remove().then(() => {
        alert('✅ ลบทีมทั้งหมดสำเร็จ!');
    });
}

// ================================================
// Admin Tab Management
// ================================================
function showAdminTab(tabName) {
    // ซ่อนแท็บทั้งหมด
    document.getElementById('adminScoreboardTab').style.display = 'none';
    document.getElementById('adminSubmissionsTab').style.display = 'none';
    document.getElementById('adminMissionsTab').style.display = 'none';
    document.getElementById('adminScheduleTab').style.display = 'none';
    
    // ลบ active จากปุ่มทั้งหมด
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // แสดงแท็บที่เลือก
    if (tabName === 'scoreboard') {
        document.getElementById('adminScoreboardTab').style.display = 'block';
        tabs[0].classList.add('active');
        loadAdminScoreboard();
    } else if (tabName === 'submissions') {
        document.getElementById('adminSubmissionsTab').style.display = 'block';
        tabs[1].classList.add('active');
        loadSubmissions();
    } else if (tabName === 'missions') {
        document.getElementById('adminMissionsTab').style.display = 'block';
        tabs[2].classList.add('active');
        loadMissionsAdmin();
    } else if (tabName === 'schedule') {
        document.getElementById('adminScheduleTab').style.display = 'block';
        tabs[3].classList.add('active');
        loadScheduleSettings();
    }
}

// ================================================
// Load Missions for Admin Management
// ================================================
function loadMissionsAdmin() {
    const container = document.getElementById('missionsAdminContainer');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดภารกิจ...</p>';
    
    const gameName = GAME_CONFIG[currentAdminGame].name;
    
    firebase.database().ref(`games/${currentAdminGame}/missions`).once('value', (snapshot) => {
        container.innerHTML = '';
        
        const missionsData = snapshot.val();
        if (!missionsData || Object.keys(missionsData).length === 0) {
            container.innerHTML = `<p class="empty-state">ยังไม่มีภารกิจใน ${gameName}<br>กดปุ่ม "➕ เพิ่มภารกิจใหม่" เพื่อเริ่มต้น</p>`;
            return;
        }
        
        // แปลงเป็น array และเรียงตาม id
        const missionsArray = Object.entries(missionsData)
            .map(([key, value]) => ({ key, ...value }))
            .sort((a, b) => a.id - b.id);
        
        missionsArray.forEach(mission => {
            const missionType = mission.type || 'photo';
            const typeBadge = missionType === 'quiz' 
                ? '<span class="admin-type-badge quiz">❓ Quiz</span>' 
                : '<span class="admin-type-badge photo">📸 Photo</span>';
            
            const card = document.createElement('div');
            card.className = 'mission-admin-card';
            card.innerHTML = `
                <div class="mission-admin-info">
                    <div class="mission-admin-emoji">${mission.title.split(' ')[0]}</div>
                    <div class="mission-admin-details">
                        ${typeBadge}
                        <div class="mission-admin-title">${mission.title}</div>
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
// Toggle Mission Type Fields
// ================================================
function toggleMissionTypeFields() {
    const missionType = document.getElementById('missionType').value;
    const answerField = document.getElementById('answerField');
    
    if (missionType === 'quiz') {
        answerField.style.display = 'block';
    } else {
        answerField.style.display = 'none';
    }
}

// ================================================
// Show Add Mission Form
// ================================================
function showAddMissionForm() {
    document.getElementById('missionFormTitle').textContent = '➕ เพิ่มภารกิจใหม่';
    document.getElementById('missionType').value = 'photo';
    document.getElementById('missionEmoji').value = '';
    document.getElementById('missionTitle').value = '';
    document.getElementById('missionAnswer').value = '';
    document.getElementById('missionPoints').value = '10';
    document.getElementById('editMissionId').value = '';
    toggleMissionTypeFields();
    document.getElementById('missionFormModal').style.display = 'block';
}

// ================================================
// Edit Mission
// ================================================
function editMission(missionKey) {
    firebase.database().ref(`games/${currentAdminGame}/missions/${missionKey}`).once('value', (snapshot) => {
        const mission = snapshot.val();
        if (!mission) return;
        
        // แยก emoji จากชื่อ
        const titleParts = mission.title.split(' ');
        const emoji = titleParts[0];
        const titleWithoutEmoji = titleParts.slice(1).join(' ');
        
        document.getElementById('missionFormTitle').textContent = '✏️ แก้ไขภารกิจ';
        document.getElementById('missionType').value = mission.type || 'photo';
        document.getElementById('missionEmoji').value = emoji;
        document.getElementById('missionTitle').value = titleWithoutEmoji;
        document.getElementById('missionAnswer').value = mission.answer || '';
        document.getElementById('missionPoints').value = mission.points;
        document.getElementById('editMissionId').value = missionKey;
        toggleMissionTypeFields();
        document.getElementById('missionFormModal').style.display = 'block';
    });
}

// ================================================
// Save Mission (Add or Update)
// ================================================
function saveMission() {
    const missionType = document.getElementById('missionType').value;
    const emoji = document.getElementById('missionEmoji').value.trim();
    const title = document.getElementById('missionTitle').value.trim();
    const answer = document.getElementById('missionAnswer').value.trim();
    const points = parseInt(document.getElementById('missionPoints').value);
    const editMissionId = document.getElementById('editMissionId').value;
    
    // Validation
    if (!emoji || !title || !points) {
        alert('❌ กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
    }
    
    if (missionType === 'quiz' && !answer) {
        alert('❌ กรุณาใส่คำตอบสำหรับภารกิจแบบ Quiz');
        return;
    }
    
    if (points < 5 || points > 100) {
        alert('❌ คะแนนต้องอยู่ระหว่าง 5-100');
        return;
    }
    
    const fullTitle = `${emoji} ${title}`;
    const missionData = {
        title: fullTitle,
        description: title, // ใช้ชื่อเดียวกันเป็น description
        points: points,
        type: missionType
    };
    
    // เพิ่มคำตอบสำหรับ Quiz
    if (missionType === 'quiz') {
        missionData.answer = answer;
    }
    
    if (editMissionId) {
        // แก้ไขภารกิจเดิม
        firebase.database().ref(`games/${currentAdminGame}/missions/${editMissionId}`).update(missionData)
            .then(() => {
                alert('✅ แก้ไขภารกิจสำเร็จ!');
                closeMissionForm();
                loadMissionsAdmin();
            }).catch((error) => {
                alert('❌ เกิดข้อผิดพลาด: ' + error.message);
            });
    } else {
        // เพิ่มภารกิจใหม่
        firebase.database().ref(`games/${currentAdminGame}/missions`).once('value', (snapshot) => {
            const missionsData = snapshot.val() || {};
            const maxId = Object.values(missionsData).reduce((max, m) => Math.max(max, m.id || 0), 0);
            const newId = maxId + 1;
            
            missionData.id = newId;
            
            const newMissionRef = firebase.database().ref(`games/${currentAdminGame}/missions`).push();
            newMissionRef.set(missionData)
                .then(() => {
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
    
    firebase.database().ref(`games/${currentAdminGame}/missions/${missionKey}`).remove()
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
// Schedule Management
// ================================================
function loadScheduleSettings() {
    // โหลดการตั้งเวลา
    firebase.database().ref(`games/${currentAdminGame}/schedule`).once('value', (snapshot) => {
        const schedule = snapshot.val();
        
        if (schedule && schedule.start && schedule.end) {
            // แปลง timestamp เป็น datetime-local format
            document.getElementById('scheduleStart').value = new Date(schedule.start).toISOString().slice(0, 16);
            document.getElementById('scheduleEnd').value = new Date(schedule.end).toISOString().slice(0, 16);
            
            updateScheduleDisplay(schedule);
        } else {
            document.getElementById('scheduleStatus').textContent = 'ไม่มีการจำกัดเวลา';
            document.getElementById('displayStart').textContent = '-';
            document.getElementById('displayEnd').textContent = '-';
        }
    });
    
    // โหลดการตั้งค่าจำนวนสมาชิก
    firebase.database().ref(`games/${currentAdminGame}/settings/maxMembers`).once('value', (snapshot) => {
        const maxMembers = snapshot.val() || 5;
        document.getElementById('maxMembersInput').value = maxMembers;
        document.getElementById('displayMaxMembers').textContent = maxMembers;
    });
}

function updateScheduleDisplay(schedule) {
    const now = Date.now();
    const start = schedule.start;
    const end = schedule.end;
    
    let status = '';
    let statusColor = '';
    
    if (now < start) {
        status = '⏳ ยังไม่เริ่ม';
        statusColor = '#FFA502';
    } else if (now >= start && now <= end) {
        status = '✅ กำลังดำเนินการ';
        statusColor = '#4ECDC4';
    } else {
        status = '❌ สิ้นสุดแล้ว';
        statusColor = '#FF6B6B';
    }
    
    const statusElement = document.getElementById('scheduleStatus');
    statusElement.textContent = status;
    statusElement.style.color = statusColor;
    statusElement.style.fontWeight = 'bold';
    
    document.getElementById('displayStart').textContent = formatDateTime(start);
    document.getElementById('displayEnd').textContent = formatDateTime(end);
}

function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} เวลา ${hours}:${minutes} น.`;
}

function saveSchedule() {
    const startValue = document.getElementById('scheduleStart').value;
    const endValue = document.getElementById('scheduleEnd').value;
    
    if (!startValue || !endValue) {
        alert('❌ กรุณาเลือกเวลาเริ่มและสิ้นสุด');
        return;
    }
    
    const startTime = new Date(startValue).getTime();
    const endTime = new Date(endValue).getTime();
    
    if (startTime >= endTime) {
        alert('❌ เวลาเริ่มต้องน้อยกว่าเวลาสิ้นสุด');
        return;
    }
    
    const gameName = GAME_CONFIG[currentAdminGame].name;
    firebase.database().ref(`games/${currentAdminGame}/schedule`).set({
        start: startTime,
        end: endTime
    }).then(() => {
        alert(`✅ บันทึกเวลาสำหรับ ${gameName} สำเร็จ!`);
        loadScheduleSettings();
    }).catch((error) => {
        alert('❌ เกิดข้อผิดพลาด: ' + error.message);
    });
}

function clearSchedule() {
    const gameName = GAME_CONFIG[currentAdminGame].name;
    if (!confirm(`⚠️ ต้องการลบการตั้งเวลาของ ${gameName} ใช่หรือไม่?\n(ภารกิจจะสามารถทำได้ตลอดเวลา)`)) {
        return;
    }
    
    firebase.database().ref(`games/${currentAdminGame}/schedule`).remove()
        .then(() => {
            alert('✅ ลบการตั้งเวลาสำเร็จ!');
            document.getElementById('scheduleStart').value = '';
            document.getElementById('scheduleEnd').value = '';
            loadScheduleSettings();
        })
        .catch((error) => {
            alert('❌ เกิดข้อผิดพลาด: ' + error.message);
        });
}

// ================================================
// Max Members Management
// ================================================
function saveMaxMembers() {
    const maxMembers = parseInt(document.getElementById('maxMembersInput').value);
    
    if (!maxMembers || maxMembers < 2 || maxMembers > 20) {
        alert('❌ กรุณาใส่จำนวนสมาชิกระหว่าง 2-20 คน');
        return;
    }
    
    const gameName = GAME_CONFIG[currentAdminGame].name;
    firebase.database().ref(`games/${currentAdminGame}/settings/maxMembers`).set(maxMembers)
        .then(() => {
            alert(`✅ บันทึกสำเร็จ! ${gameName} จำกัดจำนวนสมาชิกสูงสุด ${maxMembers} คน`);
            document.getElementById('displayMaxMembers').textContent = maxMembers;
        })
        .catch((error) => {
            alert('❌ เกิดข้อผิดพลาด: ' + error.message);
        });
}

// ================================================
// Close modal when clicking outside
// ================================================
window.onclick = function(event) {
    const photoModal = document.getElementById('photoModal');
    const quizModal = document.getElementById('quizModal');
    const missionFormModal = document.getElementById('missionFormModal');
    
    if (event.target === photoModal) {
        closeModal();
    }
    if (event.target === quizModal) {
        closeQuizModal();
    }
    if (event.target === missionFormModal) {
        closeMissionForm();
    }
};

// ================================================
// Submissions Review (Admin)
// ================================================
let currentTeamForSubmissions = null;

async function loadSubmissions() {
    // Show team list view
    document.getElementById('submissionsTeamListView').style.display = 'block';
    document.getElementById('submissionsDetailView').style.display = 'none';
    
    const container = document.getElementById('submissionsTeamList');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดข้อมูล...</p>';
    
    try {
        // Load teams and submissions
        const teamsSnapshot = await firebase.database().ref(`games/${currentAdminGame}/teams`).once('value');
        const submissionsSnapshot = await firebase.database().ref(`games/${currentAdminGame}/submissions`).once('value');
        
        const teamsData = teamsSnapshot.val();
        const submissionsData = submissionsSnapshot.val();
        
        if (!teamsData) {
            container.innerHTML = '<div class="empty-submissions">📭 ยังไม่มีทีม</div>';
            updateSubmissionStats(0, 0, 0);
            return;
        }
        
        // Calculate stats per team
        const teamStats = {};
        
        if (submissionsData) {
            Object.values(submissionsData).forEach(submission => {
                if (!teamStats[submission.teamId]) {
                    teamStats[submission.teamId] = {
                        total: 0,
                        approved: 0,
                        revoked: 0
                    };
                }
                teamStats[submission.teamId].total++;
                if (submission.status === 'approved') {
                    teamStats[submission.teamId].approved++;
                } else if (submission.status === 'revoked') {
                    teamStats[submission.teamId].revoked++;
                }
            });
        }
        
        // Calculate overall stats
        const allSubmissions = submissionsData ? Object.values(submissionsData) : [];
        const approvedCount = allSubmissions.filter(s => s.status === 'approved').length;
        const revokedCount = allSubmissions.filter(s => s.status === 'revoked').length;
        updateSubmissionStats(approvedCount, revokedCount, allSubmissions.length);
        
        // Display team cards
        container.innerHTML = '';
        
        Object.entries(teamsData).forEach(([teamId, team]) => {
            const stats = teamStats[teamId] || { total: 0, approved: 0, revoked: 0 };
            const card = createTeamSubmissionCard(teamId, team, stats);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading submissions:', error);
        container.innerHTML = '<div class="empty-submissions">❌ เกิดข้อผิดพลาดในการโหลดข้อมูล</div>';
    }
}

function createTeamSubmissionCard(teamId, team, stats) {
    const card = document.createElement('div');
    card.className = 'team-submission-card';
    card.onclick = () => showTeamSubmissionsDetail(teamId, team.name || team.teamName || 'Unknown Team');
    
    card.innerHTML = `
        <div class="team-submission-header">
            <div class="team-submission-icon">🚗</div>
            <div class="team-submission-info">
                <div class="team-submission-name">${team.name || team.teamName || 'Unknown Team'}</div>
                <div class="team-submission-code">รหัส: ${teamId}</div>
            </div>
        </div>
        <div class="team-submission-stats">
            <div class="team-stat">
                <span class="team-stat-value">${stats.total}</span>
                <span class="team-stat-label">ส่งทั้งหมด</span>
            </div>
            <div class="team-stat">
                <span class="team-stat-value">${stats.approved}</span>
                <span class="team-stat-label">อนุมัติ</span>
            </div>
            <div class="team-stat revoked">
                <span class="team-stat-value">${stats.revoked}</span>
                <span class="team-stat-label">ยกเลิก</span>
            </div>
            <div class="team-stat score">
                <span class="team-stat-value">${team.score || 0}</span>
                <span class="team-stat-label">คะแนน</span>
            </div>
        </div>
    `;
    
    return card;
}

async function showTeamSubmissionsDetail(teamId, teamName) {
    currentTeamForSubmissions = teamId;
    
    // Hide team list, show detail view
    document.getElementById('submissionsTeamListView').style.display = 'none';
    document.getElementById('submissionsDetailView').style.display = 'block';
    
    // Update title
    document.getElementById('submissionsDetailTitle').textContent = `📋 รายการส่งงาน: ${teamName}`;
    
    // Load submissions for this team
    await loadTeamSubmissionsDetail();
    
    // Populate mission filter
    await populateSubmissionFilters();
}

function backToTeamList() {
    currentTeamForSubmissions = null;
    document.getElementById('submissionsTeamListView').style.display = 'block';
    document.getElementById('submissionsDetailView').style.display = 'none';
}

async function loadTeamSubmissionsDetail() {
    if (!currentTeamForSubmissions) return;
    
    const container = document.getElementById('submissionsDetailContainer');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดข้อมูล...</p>';
    
    const filterMission = document.getElementById('filterMission').value;
    const filterStatus = document.getElementById('filterStatus').value;
    
    try {
        const submissionsSnapshot = await firebase.database().ref(`games/${currentAdminGame}/submissions`).once('value');
        const submissionsData = submissionsSnapshot.val();
        
        if (!submissionsData) {
            container.innerHTML = '<div class="empty-submissions">📭 ยังไม่มีการส่งงาน</div>';
            return;
        }
        
        // Filter by team and other criteria
        let submissionsArray = Object.entries(submissionsData)
            .map(([key, value]) => ({ key, ...value }))
            .filter(s => s.teamId === currentTeamForSubmissions)
            .sort((a, b) => b.timestamp - a.timestamp);
        
        // Apply filters
        if (filterMission !== 'all') {
            submissionsArray = submissionsArray.filter(s => s.missionId == filterMission);
        }
        if (filterStatus !== 'all') {
            submissionsArray = submissionsArray.filter(s => s.status === filterStatus);
        }
        
        // Display submissions
        container.innerHTML = '';
        if (submissionsArray.length === 0) {
            container.innerHTML = '<div class="empty-submissions">🔍 ไม่พบข้อมูลตามเงื่อนไขที่เลือก</div>';
            return;
        }
        
        submissionsArray.forEach(submission => {
            const card = createSubmissionCard(submission);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading team submissions:', error);
        container.innerHTML = '<div class="empty-submissions">❌ เกิดข้อผิดพลาดในการโหลดข้อมูล</div>';
    }
}

function createSubmissionCard(submission) {
    const card = document.createElement('div');
    card.className = `submission-card ${submission.status === 'revoked' ? 'revoked' : ''}`;
    
    const statusBadge = submission.status === 'revoked' 
        ? '<span class="submission-status revoked">❌ ยกเลิกแล้ว</span>'
        : '<span class="submission-status approved">✅ อนุมัติแล้ว</span>';
    
    const timeStr = new Date(submission.timestamp).toLocaleString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let contentHTML = '';
    if (submission.missionType === 'photo') {
        contentHTML = `
            <div class="submission-content">
                <img src="${submission.photoBase64}" alt="Photo" class="submission-photo" onclick="showLightbox('${submission.photoBase64}')">
            </div>
        `;
    } else if (submission.missionType === 'quiz') {
        contentHTML = `
            <div class="submission-content">
                <div class="submission-answer-label">💭 คำตอบ:</div>
                <div class="submission-answer">${submission.userAnswer}</div>
                <div class="submission-answer-label" style="margin-top: 10px;">✓ เฉลย:</div>
                <div class="submission-answer">${submission.correctAnswer}</div>
            </div>
        `;
    }
    
    const isRevoked = submission.status === 'revoked';
    
    // Show revoked reason if exists
    let revokedReasonHTML = '';
    if (isRevoked && submission.revokedReason) {
        revokedReasonHTML = `
            <div class="revoked-reason">
                <strong>🚫 เหตุผลที่ยกเลิก:</strong> ${submission.revokedReason}
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="submission-header">
            <div class="submission-info">
                <div class="submission-team">🚗 ${submission.teamName}</div>
                <div class="submission-mission">${submission.missionTitle}</div>
                <div class="submission-meta">
                    👤 ส่งโดย: ${submission.submittedBy} | 🕐 ${timeStr}
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end;">
                <div class="submission-points">+${submission.missionPoints}</div>
                ${statusBadge}
            </div>
        </div>
        ${revokedReasonHTML}
        ${contentHTML}
        <div class="submission-actions">
            <button class="revoke-btn" onclick="revokeSubmission('${submission.key}', '${submission.teamId}', ${submission.missionId}, ${submission.missionPoints})" ${isRevoked ? 'disabled' : ''}>
                ${isRevoked ? '❌ ยกเลิกแล้ว' : '❌ ยกเลิกและตัดคะแนน'}
            </button>
        </div>
    `;
    
    return card;
}

async function revokeSubmission(submissionKey, teamId, missionId, points) {
    // Ask for reason
    const reason = prompt(
        `⚠️ ยกเลิกภารกิจนี้?\n\n` +
        `กรุณาระบุเหตุผล (เช่น ส่งรูปผิด, ตอบผิด):\n\n` +
        `หมายเหตุ:\n` +
        `- จะตัดคะแนน ${points} คะแนน\n` +
        `- ทีมนี้จะไม่สามารถทำภารกิจนี้ใหม่ได้`
    );
    
    if (!reason || reason.trim() === '') {
        alert('❌ กรุณาระบุเหตุผลในการยกเลิก');
        return;
    }
    
    try {
        // Update submission status with reason
        await firebase.database().ref(`games/${currentAdminGame}/submissions/${submissionKey}`).update({
            status: 'revoked',
            revokedAt: Date.now(),
            revokedReason: reason.trim()
        });
        
        // Mark mission as revoked (NOT remove - keep it locked)
        await firebase.database().ref(`games/${currentAdminGame}/teams/${teamId}/missions/${missionId}`).update({
            completed: false,
            revoked: true,
            revokedReason: reason.trim(),
            revokedAt: Date.now()
        });
        
        // Deduct points
        const teamSnapshot = await firebase.database().ref(`games/${currentAdminGame}/teams/${teamId}`).once('value');
        const teamData = teamSnapshot.val();
        const newScore = Math.max(0, (teamData.score || 0) - points);
        await firebase.database().ref(`games/${currentAdminGame}/teams/${teamId}/score`).set(newScore);
        
        alert(`✅ ยกเลิกภารกิจสำเร็จ!\n\n✂️ ตัดคะแนน: -${points}\n🚫 เหตุผล: ${reason}\n⚠️ ทีมนี้ไม่สามารถทำภารกิจนี้ใหม่ได้`);
        
        // Reload current view
        if (currentTeamForSubmissions) {
            loadTeamSubmissionsDetail();
        } else {
            loadSubmissions();
        }
        
    } catch (error) {
        console.error('Error revoking submission:', error);
        alert('❌ เกิดข้อผิดพลาด: ' + error.message);
    }
}

function updateSubmissionStats(approved, revoked, total) {
    document.getElementById('approvedCount').textContent = approved;
    document.getElementById('revokedCount').textContent = revoked;
    document.getElementById('totalSubmissions').textContent = total;
}

async function populateSubmissionFilters() {
    try {
        // Populate mission filter (only available in detail view)
        const missionsSnapshot = await firebase.database().ref(`games/${currentAdminGame}/missions`).once('value');
        const missionsData = missionsSnapshot.val();
        
        const missionFilter = document.getElementById('filterMission');
        if (missionFilter) {
            missionFilter.innerHTML = '<option value="all">ทุกภารกิจ</option>';
            
            if (missionsData) {
                Object.values(missionsData)
                    .sort((a, b) => a.id - b.id)
                    .forEach(mission => {
                        const option = document.createElement('option');
                        option.value = mission.id;
                        option.textContent = mission.title;
                        missionFilter.appendChild(option);
                    });
            }
        }
        
    } catch (error) {
        console.error('Error populating filters:', error);
    }
}

// ================================================
// Show Team Submissions (from Scoreboard)
// ================================================
async function showTeamSubmissions(teamId, teamName) {
    // Switch to submissions tab
    showAdminTab('submissions');
    
    // Wait for tab to load
    setTimeout(async () => {
        // Go directly to team detail view
        await showTeamSubmissionsDetail(teamId, teamName);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
}
