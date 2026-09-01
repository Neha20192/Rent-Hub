# 🏠 RentHub — Property Listing & Rental Management App

**RentHub** is a modern, responsive Angular web application for browsing, listing, and managing residential property rentals. Built with Angular (Standalone Components), Reactive Forms, custom RxJS state/auth management, and end-to-end unit tests powered by Vitest.

---

## 🔗 Quick Links

* **GitHub Repository:** [https://github.com/Neha20192/Rent-Hub](https://github.com/Neha20192/Rent-Hub)
* **Live Application:** [https://rent-hub-blue.vercel.app/](https://rent-hub-blue.vercel.app/) 

---

## 🔑 Demo User Credentials

Use the following credentials to test different application roles and permissions:

| Role | Email / Username | Password | Access Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `test@renthub.com` | `123456` | Full Access: View listings, create, edit properties |
| **Normal User** | `user@renthub.com` | `123456` | View listings & manage favorite properties |

---

## 🌟 Key Features

### 👤 User & Role Management
* **Role-Based Access Control (RBAC):** Distinct permissions for Users vs. Admins.
* **Authentication Service:** State-driven auth managed via RxJS `BehaviorSubject` and `localStorage` persistence.
* **Dynamic Header & Navigation:** UI elements adapt dynamically based on user login state and role.

### 🏢 Property Listings & Management
* **Property Feed & Details:** Browse property listings with detailed views including location, rent pricing, room configurations, and property type.
* **Full CRUD Operations (Admin):**
  * **Create Post:** Add property listings with image URLs, pricing, availability, and description.
  * **Edit Post:** Edit existing posts pre-filled via Reactive Forms (`patchValue`).
* **Favorites System:** Save preferred listings directly to a personal bookmarks collection.

### 🎯 Form Handling & Validation
* Robust **Reactive Forms** (`FormGroup`, `FormControl`) with client-side validation rules.

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** Angular 22 (Standalone Components)
* **State & Data Persistence:** RxJS (`BehaviorSubject`), `localStorage`
* **Styling & UI:** Responsive scss layout
* **Testing Framework:** Vitest + `@angular/core/testing` (`TestBed`)
* **Deployment:** Vercel

---
