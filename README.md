<div align="center">
  <br />
    <a href="https://librweb.vercel.app" target="_blank">
      <img src="/public/banner-librweb.jpg" alt="banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="next.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
  </div>
</div>
<br>

# Libr...

**Libr...** is a modern library management website built using the Next.js framework. This platform allows users to explore a collection of books, manage accounts, and handle book issues entirely online. Since the database is self-contained, it is not connected to a physical library, making it ideal for 'personal' or 'project-based' usage.

## Features

- **Book Browsing**  
  - Scroll through a curated collection of books.
  - View details like titles, authors, and categories.

- **Account Management**  
  - Create an account and log in with ease using **Auth.js**.  
  - Secure account authentication.  
  - Delete your account, removing all associated issue history.

- **Book Issuing System**  
  - Issue books directly within the software.  
  - Return or reissue books as needed.  

- **Account Deletion**  
  - A simple and efficient process that ensures all user data, including issue history, is permanently removed.

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/)
- **Authentication:** [Auth.js](https://authjs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sayanmondl/library-system-web.git
   ```
2. Navigate to the project directory:
   ```bash
   cd libr
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the necessary credentials for `Auth.js` and `MongoDB` connections.

5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open the website in your browser at `http://localhost:3000`.

## Usage

1. **Explore Books:** Browse through the available books using the intuitive UI.  
2. **Manage Your Account:** Create an account or log in to access additional features.  
3. **Book Operations:** Issue, return, or reissue books directly through the website.  
4. **Delete Account:** Permanently remove your account and associated data.

## Deployment

The app is hosted on [Vercel](https://vercel.com). Check out the live version here: [librweb.vercel.app](https://librweb.vercel.app)


## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add feature name"
   ```
4. Push to your branch:  
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, email **[sayanmondal5869@gmail.com](mailto:sayanmondal5869@gmail.com)**.