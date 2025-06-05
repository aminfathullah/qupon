# Qupon - Professional Qurban Coupon Generator

<div align="center">

![Qupon Logo](https://img.shields.io/badge/Qupon-Qurban%20Coupon%20Generator-8bc34a?style=for-the-badge&logo=receipt&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-qupon.vercel.app-blue?style=for-the-badge)](https://qupon.vercel.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.1.1-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)

**A modern, professional web application for generating and printing Qurban (Islamic sacrifice) coupons with beautiful UI/UX design.**

[🎯 Live Demo](https://qupon.vercel.app/) • [📖 Documentation](#documentation) • [🚀 Getting Started](#getting-started) • [💡 Features](#features)

</div>

---

## 🌟 Overview

Qupon is a sophisticated web application designed to streamline the creation and management of Qurban coupons for Islamic communities. Built with modern React technologies and Material-UI, it offers a professional, user-friendly interface for generating customizable coupons with sequential numbering, QR codes, and flexible printing options.

### 🎯 Live Application
**Access the application at: [https://qupon.vercel.app/](https://qupon.vercel.app/)**

## ✨ Features

### 🎨 **Modern UI/UX Design**
- **Glassmorphism Effects**: Contemporary translucent design with backdrop filters
- **Gradient Themes**: Beautiful color schemes with Islamic-inspired green and gold palette
- **Dark/Light Mode**: Complete theme switching with persistent user preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎫 **Coupon Generation**
- **Sequential Numbering**: Automatic numbering system for organized coupon management
- **QR Code Integration**: Unique QR codes for each coupon for digital verification
- **Customizable Templates**: Flexible title, subtitle, and additional text options
- **Advanced Typography**: Professional font styling with Material-UI typography system

### 🖨️ **Print & Export Options**
- **Multiple Paper Sizes**: Support for A4, Letter, and custom paper dimensions
- **Orientation Control**: Portrait and landscape printing options
- **High-Quality PDF Export**: Export coupons as PDF documents
- **Direct Browser Printing**: Seamless printing directly from the browser
- **Print Preview**: Real-time preview before printing

### ⚙️ **Advanced Configuration**
- **Layout Customization**: Adjustable margins, spacing, and layout options
- **Font Controls**: Size, color, and style customization
- **Color Themes**: Professional color schemes for different occasions
- **Batch Processing**: Generate multiple coupons efficiently

## 🛠️ Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend Framework** | React | 19.1.0 | Core UI framework |
| **UI Library** | Material-UI (MUI) | 7.1.1 | Modern component library |
| **Build Tool** | Vite | 6.3.5 | Fast development and build tool |
| **Styling** | Emotion | 11.14.0 | CSS-in-JS styling solution |
| **PDF Generation** | jsPDF | 3.0.1 | PDF export functionality |
| **Canvas Rendering** | html2canvas | 1.4.1 | HTML to canvas conversion |
| **QR Code Generation** | qrcode | 1.5.4 | QR code generation |
| **Print Functionality** | react-to-print | 3.1.0 | Browser printing integration |

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **Yarn** package manager

### Installation

1. **Clone the repository**
   ```cmd
   git clone https://github.com/yourusername/qupon.git
   cd qupon
   ```

2. **Install dependencies**
   ```cmd
   yarn install
   ```

3. **Start development server**
   ```cmd
   yarn dev
   ```

4. **Build for production**
   ```cmd
   yarn build
   ```

5. **Preview production build**
   ```cmd
   yarn preview
   ```

## 📖 Usage Guide

### Step-by-Step Process

1. **📝 Configure Settings**
   - Enter the number of coupons to generate
   - Customize titles, subtitles, and additional text
   - Adjust paper size and orientation

2. **🎨 Advanced Customization**
   - Choose color schemes and themes
   - Adjust font sizes and typography
   - Configure layout and spacing options

3. **👀 Preview & Generate**
   - Click "Generate Coupon" to create preview
   - Review the generated coupons
   - Use zoom controls for detailed inspection

4. **🖨️ Print or Export**
   - Direct print to your printer
   - Export as high-quality PDF
   - Save for future use

## 🎯 Use Cases

- **Mosques & Islamic Centers**: Streamline Qurban coupon distribution
- **Community Organizations**: Organize Qurban collections efficiently  
- **Religious Events**: Professional coupon management for Islamic occasions
- **Educational Institutions**: Teaching tools for Islamic finance concepts

## 🔧 Development

### Project Structure
```
qupon/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Application pages
│   ├── utils/            # Utility functions and helpers
│   └── assets/           # Images and icons
├── package.json          # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

### Key Components
- **MainLayout**: Application layout with navigation and theming
- **CouponGenerator**: Main interface for coupon configuration
- **CouponPreview**: Preview and export functionality
- **QRCodeComponent**: QR code generation and integration

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Material-UI Team** for the excellent component library
- **Vite Team** for the blazing-fast build tool
- **React Community** for the robust ecosystem
- **Islamic Community** for inspiration and requirements

## 📞 Support

For support, questions, or suggestions:

- **Website**: [https://qupon.vercel.app/](https://qupon.vercel.app/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/qupon/issues)
- **Email**: support@qupon.app

---

<div align="center">

**Made with ❤️ for the Islamic Community**

[![Qupon](https://img.shields.io/badge/Qupon-Professional%20Qurban%20Coupon%20Generator-8bc34a?style=for-the-badge)](https://qupon.vercel.app/)

</div>

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
