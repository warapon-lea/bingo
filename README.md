# 🎮 Road Trip Scavenger Hunt - คู่มือการใช้งาน

## 📱 ระบบนี้คืออะไร?

เกม **Road Trip Scavenger Hunt** เป็นเกมหาของในรูปแบบออนไลน์ สำหรับกิจกรรม Outing ของบริษัท
- เล่นผ่านมือถือได้ทุกที่
- แต่ละทีมต้องทำภารกิจต่างๆ (ถ่ายรูป) เพื่อรับคะแนน
- ระบบ Scoreboard แบบ Real-time ดูคะแนนได้ตลอดเวลา
- ทีมที่ได้คะแนนสูงสุด = ชนะ!

### 🎁 ใช้ Firebase ฟรี 100%!
- ✅ ไม่ต้องใช้ Firebase Storage (ไม่ต้องอัพเกรดเป็น Blaze)
- ✅ ใช้แค่ **Realtime Database** (ฟรีสำหรับโปรเจ็กต์เล็ก)
- ✅ รูปภาพเก็บเป็น Base64 ใน Database
- ✅ เหมาะสำหรับเกมกิจกรรม 4-10 ทีม

---

## 🚀 วิธีการติดตั้ง (แบบละเอียด)

### ขั้นตอนที่ 1: สร้าง Firebase Project (ฟรี)

1. **เข้าไปที่** [Firebase Console](https://console.firebase.google.com/)
2. **คลิก** "Add project" หรือ "เพิ่มโปรเจ็กต์"
3. **ตั้งชื่อโปรเจ็กต์** เช่น `road-trip-game`
4. **ปิด Google Analytics** (ไม่จำเป็น) แล้วคลิก "Create project"
5. รอสักครู่ให้ Firebase สร้างโปรเจ็กต์เสร็จ

---

### ขั้นตอนที่ 2: เปิดใช้งาน Realtime Database

1. ใน Firebase Console ไปที่เมนูด้านซ้าย → **"Realtime Database"**
2. คลิก **"Create Database"**
3. เลือก **"Start in test mode"** (ให้ทุกคนเข้าถึงได้)
4. เลือก Location: **`asia-southeast1`** (สิงคโปร์ - ใกล้ไทยที่สุด)
5. คลิก **"Enable"**

---

### ขั้นตอนที่ 3: ตั้งค่า Security Rules (สำคัญ!)

1. ไปที่ **Realtime Database → Rules**
2. แก้ไข Rules ให้เป็นแบบนี้:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. คลิก **"Publish"**

> ⚠️ **หมายเหตุ**: Rules นี้เปิดกว้างเพื่อความง่ายในการทดลอง ถ้าใช้จริงควรเพิ่ม Security

> ✅ **ไม่ต้องใช้ Storage!** ระบบนี้ไม่ต้องใช้ Firebase Storage เลย ใช้แค่ Realtime Database (ฟรี 100%)

---

### ขั้นตอนที่ 4: คัดลอก Firebase Config

1. ใน Firebase Console คลิกไอคอน **⚙️ (Settings)** → **Project settings**
2. เลื่อนลงมาที่ **"Your apps"** → คลิก **Web icon** `</>`
3. ตั้งชื่อแอป เช่น `Road Trip Game` แล้วคลิก **"Register app"**
4. คัดลอกโค้ด config ที่ได้ (จะเป็นรูปแบบนี้):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "road-trip-game.firebaseapp.com",
  databaseURL: "https://road-trip-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "road-trip-game",
  storageBucket: "road-trip-game.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxxxxx"
};
```

5. **นำค่าเหล่านี้ไปแทนที่** ในไฟล์ `app.js` บรรทัดที่ 6-13

---

### ขั้นตอนที่ 5: เพิ่ม Firebase SDK

แก้ไขไฟล์ `index.html` โดยเพิ่มโค้ดนี้ **ก่อนบรรทัด** `<script type="module" src="app.js"></script>`:

```html
<!-- Firebase SDK (ใช้แค่ 2 ตัวนี้เท่านั้น - ไม่ต้องใช้ Storage!) -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
```

---

### ขั้นตอนที่ 6: Deploy ไปบน Firebase Hosting (ฟรี)

#### 6.1 ติดตั้ง Firebase CLI
เปิด Terminal และรันคำสั่ง:

```bash
npm install -g firebase-tools
```

#### 6.2 Login เข้า Firebase

```bash
firebase login
```

จะเปิดเบราว์เซอร์ให้ login ด้วย Google Account

#### 6.3 Initialize Firebase Hosting

ไปที่โฟลเดอร์โปรเจ็กต์:

```bash
cd /Users/warapon.lea/Desktop/Work/OKR/bingo-firebase
```

จากนั้นรัน:

```bash
firebase init hosting
```

ตอบคำถามตามนี้:
- **"Use an existing project"** → เลือกโปรเจ็กต์ที่สร้างไว้
- **"What do you want to use as your public directory?"** → พิมพ์ `.` (จุด)
- **"Configure as a single-page app?"** → **N** (No)
- **"Set up automatic builds?"** → **N** (No)
- **"File ./index.html already exists. Overwrite?"** → **N** (No) ⚠️ **สำคัญ! ห้ามเขียนทับ**

#### 6.4 Deploy!

```bash
firebase deploy
```

เมื่อเสร็จจะได้ **URL** ประมาณนี้:
```
https://road-trip-game.web.app
```

> 💡 **แพลน Spark (ฟรี)** รองรับ Firebase Hosting ได้ถึง 10GB/เดือน และ 360MB/วัน!

---

## 🔐 ตั้งรหัส Admin (ทำก่อนใช้งานจริง!)

**⚠️ สำคัญมาก: ต้องทำก่อนให้คนอื่นเล่น!**

1. เปิดไฟล์ **`setup-admin.html`** ในเบราว์เซอร์
2. ใส่รหัสผ่านที่ต้องการ (เช่น `outing2025`)
3. กด **"สร้าง Hash และบันทึก"**
4. เมื่อเห็น **"✅ บันทึกสำเร็จ"** แสดงว่าเสร็จแล้ว
5. **ลบไฟล์ `setup-admin.html` ทิ้งทันที** (เพื่อไม่ให้คนอื่นเข้าไปเปลี่ยนรหัส)

> 💡 **ทำไมต้องทำแบบนี้?**  
> เพื่อความปลอดภัย! รหัสผ่านจะถูกเข้ารหัสเป็น SHA-256 Hash แล้วเก็บใน Firebase  
> คนที่เปิด F12 หรือดู Code จะไม่เห็นรหัสผ่านจริงๆ แค่เห็น Hash ที่ถอดรหัสไม่ได้ 🔒

---

## 🎯 วิธีการเล่น

### 🚗 สำหรับหัวหน้าทีม (คนขับรถ):

1. **เปิดลิงก์เกม** 
2. **คลิก "🎮 สร้างทีมใหม่"**
3. **ตั้งชื่อทีม** เช่น "รถ 1 - ทีมสายฟ้า"
4. **ใส่ชื่อตัวเอง** (หัวหน้าทีม)
5. **ได้รหัสทีม 6 หลัก** (เช่น `ABC123`)
6. **แชร์รหัส** ให้เพื่อนในรถ
7. **คลิก "🚀 เริ่มเกม"**

### 👥 สำหรับสมาชิกทีม:

1. **เปิดลิงก์เกม**
2. **คลิก "👥 เข้าร่วมทีม"**
3. **ใส่รหัสทีม** ที่ได้จากหัวหน้า (เช่น `ABC123`)
4. **ใส่ชื่อตัวเอง**
5. **คลิก "✓ เข้าร่วม"** → เข้าสู่หน้าเกมทันที!

### 🎮 การเล่นเกม:

1. **เลือกภารกิจ** ที่ต้องการทำ (ดูคะแนนแต่ละภารกิจ)
2. **คลิกปุ่ม "📸 ถ่ายรูป"**
3. **ถ่ายรูปตามภารกิจ** (เช่น ถ่ายรูปกับหมา)
4. **คลิก "✓ ยืนยันภารกิจ"** → ได้คะแนนทันที!
5. **ทุกคนในทีมช่วยกันทำภารกิจ** เพื่อสะสมคะแนน

### 🏆 ดูคะแนนแบบ Live:

1. **คลิกปุ่ม "🏆 ดูคะแนน"** ที่หน้าแรก
2. เห็น **Scoreboard แบบ Real-time** 
3. แสดงอันดับ, คะแนน, จำนวนสมาชิก, และภารกิจที่ทำสำเร็จ
4. **ทุกคนดูได้** โดยไม่ต้อง login!

### 👑 สำหรับ Admin:

1. **คลิกปุ่ม "👑 Admin"**
2. **ใส่รหัส**: `outing2025` 🔐
3. เห็น **คะแนนทุกทีม + รายชื่อสมาชิก**
4. **คลิกที่การ์ดทีม** → ดูรูปภาพที่ทีมถ่ายมาทั้งหมด 📸
5. **ตรวจสอบ** ว่ารูปตรงกับภารกิจหรือไม่
6. สามารถ **รีเซ็ตคะแนน** หรือ **ลบทีมทั้งหมด** ได้

---

## 📝 ปรับแต่งภารกิจ

ถ้าอยากเปลี่ยนภารกิจ ไปแก้ไขในไฟล์ `app.js` บรรทัดที่ 17-87:

```javascript
const missions = [
    {
        id: 1,
        title: "🐕 ถ่ายรูปกับหมา",      // ชื่อภารกิจ
        description: "พบเจอหมาและถ่ายรูปด้วย",  // รายละเอียด
        points: 10                     // คะแนนที่ได้
    },
    // เพิ่มภารกิจใหม่ได้ที่นี่
];
```

**เคล็ดลับ**:
- ภารกิจง่ายๆ ให้ 10-15 คะแนน
- ภารกิจยากหน่อย ให้ 20-30 คะแนน  
- ภารกิจยากมาก ให้ 50+ คะแนน

---

## 🎨 ปรับแต่งสีและธีม

แก้ไขไฟล์ `style.css`:

- **สีหลัก**: บรรทัด 8 → `background: linear-gradient(...)`
- **สีปุ่ม**: บรรทัด 41 → `color: #667eea`
- **ฟอนต์**: บรรทัด 6 → `font-family: ...`

---

## 🆘 แก้ปัญหา

### ❌ เกิด Error: "Firebase SDK ยังไม่ได้ถูกโหลด"
→ ตรวจสอบว่าเพิ่ม Firebase SDK ในไฟล์ `index.html` แล้วหรือยัง

### ❌ ถ่ายรูปแล้วไม่ขึ้นคะแนน
→ ตรวจสอบ Firebase Config ว่าใส่ถูกต้องหรือไม่

### ❌ Scoreboard ไม่อัพเดท
→ ตรวจสอบ Security Rules ของ Realtime Database

### ❌ ชื่อซ้ำในทีมเดียวกัน
→ ระบบป้องกันชื่อซ้ำอัตโนมัติ กรุณาใช้ชื่ออื่น หรือเพิ่มนามสกุล

### ✅ รีเฟรชแล้วกลับมาที่เดิม
→ ระบบบันทึก session อัตโนมัติ! พอรีเฟรชจะกลับเข้าทีมเดิมทันที

### 🔄 ต้องการออกจากทีม
→ คลิกปุ่ม "← ออกจากทีม" ที่มุมซ้ายบน (คะแนนที่ทำไว้จะยังอยู่)

---

## 💡 Tips & Tricks

### 🔐 ตั้งรหัส Admin (ครั้งแรก)
1. เปิดไฟล์ `setup-admin.html` ในเบราว์เซอร์
2. ใส่รหัสผ่านที่ต้องการ (เช่น `outing2025`)
3. กด "สร้าง Hash และบันทึก"
4. **ลบไฟล์ `setup-admin.html` ทิ้งทันทีเพื่อความปลอดภัย!**

### เปลี่ยนรหัส Admin
ใช้ไฟล์ `setup-admin.html` ใหม่อีกครั้ง แล้วใส่รหัสใหม่

### เปลี่ยนจำนวนคะแนน
แก้ไขในไฟล์ `app.js` ที่ `missions` array

### ตรวจสอบรูปภาพทีม
1. เข้า Admin Panel
2. คลิกที่การ์ดทีมที่ต้องการดู
3. เห็นรูปภาพทุกภารกิจ
4. คลิกที่รูปเพื่อดูแบบขยายใหญ่

### เพิ่ม Sound Effects
เพิ่มในไฟล์ `app.js` ฟังก์ชัน `submitMission()`:
```javascript
const audio = new Audio('success.mp3');
audio.play();
```

---

## 📞 ติดต่อ & สนับสนุน

หากมีปัญหาหรือต้องการความช่วยเหลือ:
- ดูเอกสาร Firebase: https://firebase.google.com/docs
- ถามคำถามได้เลย!

---

## ✨ ขอให้สนุกกับเกม Road Trip Scavenger Hunt! 🎉
