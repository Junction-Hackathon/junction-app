# Eid Adhaa Donation Manager 📱🐑

A mobile application built for a hackathon to automate and simplify the donation process during **Eid El Adhaa**. The goal is to help manage the sacrifice and distribution of sheep to poor people, while keeping the process smooth for donors, executors, and organizers.

## 💡 Project Idea

During Eid El Adhaa, many people want to donate money so others can handle the process of:

- Buying sheep
- Sacrificing them
- Distributing meat to the needy

This app facilitates that by connecting all involved roles into one organized system — **no digital payment integration needed**, donations happen physically.

---

## 🔧 Tech Stack

- **React Native** (Expo)
- **Axios** for API integration
- **Local auth strategy** (email + password)
- **Backend connected** (RESTful APIs)
- **Role-based access** to features

---

## 👥 User Roles

### 🟢 Donor

- Logs in with email and password
- Can view:
  - Sheep they donated for
  - Sacrifice status (e.g. pending, completed)

### 🔵 Executor

- Views sheep assigned to them for sacrifice
- Updates status after completion

### 🔴 Organizer

- Uses a **web dashboard**
- Manages:
  - Donors and executors
  - Sheep assignments
  - Donation tracking (in/out)

---

## 🌐 Backend Integration

- **Axios** used for making HTTP requests
- Connected to a real backend server (hosted)
- Handles:
  - Authentication
  - Role-based data retrieval
  - Sheep & donation management

---

## 🚫 Limitations

- No built-in payment system (donation is handled offline)
- Organizer dashboard is not part of this mobile app (web only)

---

## 📅 Development Notes

- Built in **2 days** during a hackathon sprint
- Mobile app fully functional with API
- Authentication and role-based logic implemented
- Ready for production-level enhancements

---

## 🚀 Future Features

- Real-time notifications
- Delivery tracking
- Admin analytics panel
- Payment gateway integration (optional)

---

Made with ❤️ during a Hackathon by Djo
