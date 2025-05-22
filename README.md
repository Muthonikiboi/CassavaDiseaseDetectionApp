# 🌿 Cassava Disease Detection System
A mobile-based plant disease diagnosis system built to assist farmers and agricultural officers in detecting and identifying cassava leaf diseases using deep learning. The system predicts the disease class from uploaded cassava leaf images and provides recommendations for treatment.
It also shows the accuracy of prediction.

---

The system structure tools is as follows:
| Component        | Tech Stack                          |
|------------------|--------------------------------------|
| 🌐 Frontend (Mobile) | React Native ,Expo                        |
| 🧠 Model Training     | Python, TensorFlow, Jupyter Notebook |
| 🔗 Backend API       | FastAPI                              |
| 🔐 Authentication    | Node.js, Express, MongoDB, Nodemailer *(Private Repo)* |

---
## 🧪 Disease Classes Detected
The goal of the project is to detect a diseased leaf from a healthy on.Image groups used for training:

1. **Cassava Mosaic Disease (CMD)**
2. **Cassava Bacterial Blight (CBB)**
3. **Healthy Leaves**

---

## 🔍 Features
- 📸 Upload cassava leaf images for diagnosis
- 🔎 Predicts disease with confidence score
- 📋 Provides custom treatment and lab test recommendations
- 🔐 Secure user authentication (sign in, reset password, token-based flows)
- 📬 Email-based password recovery via Nodemailer
- ☁️ Hosted backend services using **Render**

---
## 📱 Sample Screenshots
### Design Sample

<img src="https://github.com/user-attachments/assets/8935a7c6-34e7-499e-bb9d-3422715ec1a9" width="300"/>

### Auth Sample

<img src="https://github.com/user-attachments/assets/97d059f4-6e34-40df-8e3f-6dc60260aa97" width="300"/>
<img src="https://github.com/user-attachments/assets/2639287e-086b-4f65-9a0f-25229b580b7f" width="300"/>
<img src="https://github.com/user-attachments/assets/323963a9-9ef4-4964-bad2-3fffee2a51b4" width="300"/>
<img src="https://github.com/user-attachments/assets/017aa310-6c03-44b3-b038-3c0305e8f683" width="300"/>

### Landing Page Sample

<img src="https://github.com/user-attachments/assets/3e4ed603-002b-413d-aade-36c7644170e6" width="300"/>

### Prediction Page Sample

<img src="https://github.com/user-attachments/assets/a58e83c0-4cde-4787-a558-f924a4001359" width="300"/>

### Setting Page

<img src="https://github.com/user-attachments/assets/eeeea99b-a867-4e2d-ae62-9ef7e3cf2dc8" width="300"/>

---

## 📁 Repositories

- 🔗 [Frontend + Model Notebook](https://github.com/Muthonikiboi/CassavaDiseaseDetectionApp)
- 🔗 [FastAPI Backend Integration](https://github.com/Muthonikiboi/CassavaModel-FastAPI)
- 🔐 Auth System: Hosted on [Render](https://render.com/) *(Private Repository)*

---
## 🧪 How It Works

1. **User uploads an image** via the mobile app  
2. **Image is sent** to the FastAPI endpoint hosted on render.com 
3. **Model predicts** the disease type and confidence score 
5. **User receives** a treatment recommendation from the NOde/express backend when a specific disease is predicted
6. **Authentication layer** ensures secure access to the app  

---

### 👩🏻‍💻 Author
[Github](https://github.com/Muthonikiboi)
[LinkedIn](https://www.linkedin.com/in/joy-kiboi-917661278/)
