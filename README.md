# Portfolio - Gianni Pasquinelli

> **Role:** Frontend Developer  
> **Location:** Argentina  
> **Status:** Open to new opportunities

![Portfolio Banner](</public/img/bg/wave(1).svg>)

## 📖 The Story

This project started as a simple static site built with **HTML, CSS (Bootstrap), and JavaScript**. It served its purpose, but as I grew as a developer, I realized my portfolio needed to reflect my actual skills and the modern web ecosystem I love working with.

I decided to **rebuild everything from scratch**, migrating from a static layout to a robust **React ecosystem**. My goal was not just to "show" my work, but to make the portfolio _itself_ a piece of engineering I could be proud of.

I moved away from Bootstrap's rigid grid to the flexibility of **Tailwind CSS**, adopted **Vite** for a blazing fast dev environment, and integrated **Supabase** to make the content dynamic—allowing me to update projects and experience without touching the code.

The result is a performance-focused, visually engaging application that represents who I am as a developer today: focused on details, performance, and user experience.

---

## 🛠 Tech Stack & Architecture

This application is built on a modern, scalable stack designed for performance and maintainability.

### Frontend

- **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) - utilizing the latest React features and fast tooling.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - for a utility-first, maintainable design system.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) + [OGL](https://github.com/oframe/ogl) (WebGL) - for fluid transitions and the interactive 3D hero section.
- **Routing:** React Router v7.

### Backend & Data

- **Database:** [Supabase](https://supabase.com/) (PostgreSQL) - Stores `projects`, `skills`, `studies`, and `work_experience`.
- **API:** Serverless functions for handling contact form submissions (via Resend).

### Design Philosophy

- **"Tokio Hack" Theme:** The color palette involves deep purples and neons, inspired by my VS Code theme.
- **Glassmorphism & Depth:** Heavy use of transparent layers and blurs to create depth without clutter.
- **Performance First:** 3D elements are carefully optimized (using OGL instead of heavier libraries where possible) to ensure smooth 60fps on most devices.

---

## 🚀 Features

- **Interactive 3D Hero:** Custom WebGL fluid/ray simulation.
- **Dynamic Project Filtering:** Projects are fetched from Supabase, filterable by visibility and sort order.
- **Resume Web:** A dedicated, printer-friendly route (`/resume`) that acts as a live CV.
- **Curved Section Titles:** Custom SVG-based text paths for unique section headers.
- **Contact Form:** Fully functional serverless form integration and validation.

---

## 📂 Project Structure

```bash
src/
├── api/          # Serverless functions
├── app/          # Page components (Hero, Contact, etc.)
├── features/     # Feature-specific logic (Resume, Projects)
├── hooks/        # Custom React hooks (useProfile, etc.)
├── ui/           # Reusable UI components (Buttons, Cards)
└── lib/          # Utilities and Supabase client
```

---

## 📬 Contact

I am currently looking for Frontend Developer roles where I can contribute my skills in React and modern UI development.

- **Email:** [giannipasquinelli@gmail.com](mailto:giannipasquinelli@gmail.com)
- **LinkedIn:** [linkedin.com/in/gianni-pasquinelli](https://linkedin.com/in/gianni-pasquinelli)
- **GitHub:** [github.com/gianni03](https://github.com/gianni03)

---

_Desarrollado con ❤️ por Gianni Pasquinelli using React + Vite._
