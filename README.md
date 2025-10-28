# 🌱 पर्यावरण संरक्षण गतिविधि | Paryavaran Sanrakshan

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E.svg)](https://supabase.com/)

> **मालवा क्षेत्र में पर्यावरण संरक्षण गतिविधियों को दस्तावेज़ और ट्रैक करने के लिए एक आधुनिक वेब एप्लिकेशन**
> 
> *A modern web application to document and track environmental conservation activities in the Malwa region*

## 📖 विषय-सूची | Table of Contents

- [परिचय | Introduction](#-परिचय--introduction)
- [मुख्य विशेषताएं | Key Features](#-मुख्य-विशेषताएं--key-features)
- [तकनीकी स्टैक | Tech Stack](#-तकनीकी-स्टैक--tech-stack)
- [इंस्टालेशन | Installation](#-इंस्टालेशन--installation)
- [उपयोग | Usage](#-उपयोग--usage)
- [प्रोजेक्ट संरचना | Project Structure](#-प्रोजेक्ट-संरचना--project-structure)
- [योगदान | Contributing](#-योगदान--contributing)

## 🌍 परिचय | Introduction

**पर्यावरण संरक्षण गतिविधि** एक डिजिटल प्लेटफ़ॉर्म है जो मालवा क्षेत्र में पर्यावरण संरक्षण के प्रयासों को रिकॉर्ड और प्रबंधित करने के लिए बनाया गया है। यह एप्लिकेशन व्यक्तियों, संस्थाओं और सरकारी संगठनों को उनके पर्यावरणीय कार्यों को दस्तावेज़ित करने और साझा करने में सक्षम बनाता है।

*Paryavaran Sanrakshan is a digital platform designed to record and manage environmental conservation efforts in the Malwa region. This application enables individuals, institutions, and government organizations to document and share their environmental work.*

### 🎯 उद्देश्य | Objectives

- 🌳 पर्यावरण संरक्षण गतिविधियों का डिजिटल रिकॉर्ड बनाना
- 📊 क्षेत्रवार डेटा संग्रह और विश्लेषण
- 🤝 सामुदायिक भागीदारी को बढ़ावा देना
- 📱 सरल और सुलभ इंटरफ़ेस प्रदान करना

## ✨ मुख्य विशेषताएं | Key Features

### 🔐 प्रमाणीकरण | Authentication
- ✅ ईमेल/पासवर्ड आधारित सुरक्षित लॉगिन
- ✅ उपयोगकर्ता पंजीकरण और खाता प्रबंधन
- ✅ Supabase के साथ सुरक्षित डेटा संग्रहण

### 📝 सबमिशन फॉर्म | Submission Form
- 📍 **जिला और स्थान**: भौगोलिक डेटा संग्रह
- 👥 **कार्य सम्पन्नकर्ता**: व्यक्तिगत/संस्था/सरकारी/समाज
- 📄 **कार्य विवरण**: विस्तृत विवरण (हिंदी/अंग्रेजी)
- 🎯 **परिणाम**: प्रभाव और परिणामों का दस्तावेज़ीकरण
- 🖼️ **फोटो अपलोड**: Google Drive लिंक के माध्यम से
- ✅ **सफलता पॉपअप**: सबमिशन की पुष्टि

### 👨‍💼 एडमिन डैशबोर्ड | Admin Dashboard
- 📊 **सांख्यिकी कार्ड**: कुल सबमिशन, उपयोगकर्ता, चित्र
- 📋 **डेटा टेबल**: सभी सबमिशन की सूची
- 🔍 **विवरण मॉडल**: पूर्ण जानकारी देखने के लिए क्लिक करें
- 🎨 **रंग-कोडित सेक्शन**: आसान नेविगेशन
- 🔄 **रिफ्रेश**: रियल-टाइम डेटा अपडेट

### 🎨 UI/UX Features
- 🌿 **3D प्लांट एनिमेशन**: React Three Fiber
- ✨ **स्मूथ एनिमेशन**: Framer Motion
- 🎨 **ग्रीन थीम**: Tailwind CSS
- 📱 **रेस्पॉन्सिव डिज़ाइन**: मोबाइल और डेस्कटॉप
- 🌐 **द्विभाषी**: हिंदी और अंग्रेजी

## 🛠️ तकनीकी स्टैक | Tech Stack

### Frontend
```json
{
  "framework": "React 18.x",
  "bundler": "Vite 7.x (Rolldown)",
  "styling": "Tailwind CSS 3.x",
  "animations": "Framer Motion",
  "3D graphics": "@react-three/fiber",
  "routing": "React Router DOM",
  "forms": "React Hook Form"
}
```

### Backend
```json
{
  "database": "Supabase (PostgreSQL)",
  "authentication": "Supabase Auth",
  "storage": "Supabase Storage (optional)",
  "realtime": "Supabase Realtime"
}
```

### Development Tools
- **PostCSS**: CSS प्रोसेसिंग
- **Autoprefixer**: ब्राउज़र संगतता
- **ESLint**: कोड क्वालिटी
- **Git**: वर्जन कंट्रोल

## 🚀 इंस्टालेशन | Installation

### पूर्वापेक्षाएँ | Prerequisites
- Node.js 18+ 
- npm या yarn
- Git
- Supabase खाता

### चरण | Steps

1️⃣ **रिपॉजिटरी क्लोन करें**
```bash
git clone https://github.com/Saurabhyadavastro/Paryawaran-Sanrakshan-malwa-.git
cd paryavaran-sanrakshan
```

2️⃣ **डिपेंडेंसी इंस्टॉल करें**
```bash
npm install
```

3️⃣ **Supabase सेटअप करें**
- [Supabase](https://supabase.com) पर नया प्रोजेक्ट बनाएं
- Database में निम्न टेबल बनाएं:

```sql
-- Submissions Table
CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_email TEXT NOT NULL,
  user_id UUID NOT NULL,
  district TEXT NOT NULL,
  place TEXT NOT NULL,
  completed_by TEXT NOT NULL,
  work_description TEXT NOT NULL,
  result TEXT NOT NULL,
  google_drive_link TEXT
);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all
CREATE POLICY "Allow authenticated read" ON submissions
  FOR SELECT TO authenticated USING (true);

-- Policy: Allow users to insert their own data
CREATE POLICY "Allow authenticated insert" ON submissions
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = user_id);
```

4️⃣ **एनवायरनमेंट वेरिएबल सेट करें**
`src/supabaseClient.js` में अपनी Supabase क्रेडेंशियल्स अपडेट करें:
```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
```

5️⃣ **डेवलपमेंट सर्वर चलाएं**
```bash
npm run dev
```

6️⃣ **ब्राउज़र में खोलें**
```
http://localhost:5173
```

## 📱 उपयोग | Usage

### उपयोगकर्ता के लिए | For Users

1. **साइन अप करें**
   - होम पेज पर जाएं
   - "Don't have an account? Sign Up" क्लिक करें
   - ईमेल और पासवर्ड दर्ज करें
   - ईमेल वेरिफिकेशन लिंक क्लिक करें

2. **साइन इन करें**
   - अपनी ईमेल और पासवर्ड से लॉगिन करें
   - सबमिशन फॉर्म पेज पर रीडायरेक्ट होंगे

3. **फॉर्म भरें**
   - जिला और स्थान दर्ज करें
   - कार्य सम्पन्नकर्ता चुनें
   - कार्य का विस्तृत विवरण लिखें
   - परिणाम का विवरण दें
   - Google Drive लिंक (वैकल्पिक)
   - "फॉर्म सबमिट करें" क्लिक करें

4. **सफलता पुष्टि**
   - सुंदर पॉपअप दिखाई देगा
   - फॉर्म स्वतः रीसेट हो जाएगा

### एडमिन के लिए | For Admins

1. **एडमिन लॉगिन**
   - `/admin` पर जाएं
   - Username: `admin_env_malwa`
   - Password: `Paryavaran@123`

2. **डैशबोर्ड एक्सेस करें**
   - सभी सबमिशन देखें
   - सांख्यिकी चेक करें
   - डेटा रिफ्रेश करें

3. **विवरण देखें**
   - किसी भी "Work Description" या "Result" पर क्लिक करें
   - पूर्ण विवरण मॉडल में खुलेगा
   - सभी जानकारी रंग-कोडित सेक्शन में

## 📁 प्रोजेक्ट संरचना | Project Structure

```
paryavaran-sanrakshan/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/          # स्टेटिक फाइलें
│   ├── components/      # पुन: प्रयोज्य कॉम्पोनेन्ट
│   ├── context/
│   │   └── AuthContext.jsx    # प्रमाणीकरण स्टेट
│   ├── pages/
│   │   ├── LoginPage.jsx      # लॉगिन पेज (3D प्लांट)
│   │   ├── SubmissionForm.jsx # यूजर फॉर्म
│   │   ├── AdminLogin.jsx     # एडमिन लॉगिन
│   │   └── AdminDashboard.jsx # एडमिन पैनल
│   ├── App.jsx          # मुख्य राउटर
│   ├── main.jsx         # एंट्री पॉइंट
│   ├── index.css        # ग्लोबल स्टाइल
│   └── supabaseClient.js # DB कनेक्शन
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 स्क्रीनशॉट्स | Screenshots

### 🏠 होम पेज
- 3D प्लांट एनिमेशन
- हिंदी/अंग्रेजी शीर्षक
- ईमेल लॉगिन फॉर्म

### 📝 सबमिशन फॉर्म
- हिंदी लेबल्स
- वैलिडेशन
- सफलता पॉपअप

### 👨‍💼 एडमिन डैशबोर्ड
- सांख्यिकी कार्ड
- डेटा टेबल
- विस्तृत मॉडल

## 🔒 सुरक्षा | Security

- ✅ Supabase Row Level Security (RLS)
- ✅ प्रमाणित उपयोगकर्ता ही डेटा सबमिट कर सकते हैं
- ✅ पासवर्ड एन्क्रिप्टेड
- ✅ HTTPS कनेक्शन
- ✅ एडमिन एक्सेस सुरक्षित

## 🚀 डिप्लॉयमेंट | Deployment

### Vercel पर डिप्लॉय करें
```bash
npm install -g vercel
vercel
```

### Netlify पर डिप्लॉय करें
```bash
npm run build
# dist फोल्डर अपलोड करें
```

### एनवायरनमेंट वेरिएबल
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 🤝 योगदान | Contributing

हम योगदान का स्वागत करते हैं! कृपया निम्नलिखित चरणों का पालन करें:

1. Fork करें
2. Feature ब्रांच बनाएं (`git checkout -b feature/AmazingFeature`)
3. Changes commit करें (`git commit -m 'Add some AmazingFeature'`)
4. Branch पर Push करें (`git push origin feature/AmazingFeature`)
5. Pull Request खोलें

## 📄 लाइसेंस | License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 डेवलपर | Developer

**Saurabh Yadav**
- GitHub: [@Saurabhyadavastro](https://github.com/Saurabhyadavastro)
- Repository: [Paryawaran-Sanrakshan-malwa-](https://github.com/Saurabhyadavastro/Paryawaran-Sanrakshan-malwa-)

## 📞 संपर्क | Contact

प्रश्नों या सुझावों के लिए, कृपया GitHub Issues का उपयोग करें।

---

**🌱 पर्यावरण बचाओ, भविष्य बनाओ | Save Environment, Build Future 🌍**

Made with ❤️ for Malwa Region
#
