# Kupon Qurban Generator

Aplikasi web sederhana untuk membuat kupon qurban dengan UI/UX yang baik. Aplikasi ini memungkinkan pengguna membuat dan mencetak kupon qurban secara efisien sesuai dengan ukuran kertas yang dipilih.

## Fitur

- Pembuatan kupon qurban dengan nomor berurutan
- Pengaturan ukuran kertas dan orientasi cetak
- Kustomisasi judul, subjudul, dan teks tambahan pada kupon
- Pengaturan lanjutan untuk tampilan kupon (ukuran font, warna, dll.)
- Preview kupon sebelum dicetak
- Cetak kupon langsung dari browser
- Simpan kupon dalam format PDF

## Teknologi

- React JS
- Material UI
- Vite
- React-to-Print
- jsPDF & html2canvas

## Cara Menjalankan

```bash
# Pasang dependensi
yarn

# Jalankan server development
yarn dev

# Build untuk production
yarn build

# Preview hasil build
yarn preview
```

## Penggunaan

1. Masukkan jumlah kupon yang ingin dibuat
2. Sesuaikan pengaturan dasar dan lanjutan sesuai kebutuhan
3. Klik tombol "Generate Kupon" untuk melihat preview
4. Cetak kupon atau simpan sebagai PDF+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
