# Portfolio Website

A modern, minimalist portfolio website built with React, Vite, and Tailwind CSS. Features smooth animations, light/dark theme switching, and full responsiveness.

## Features

- **Modern Design**: Clean, minimalist interface with playful animations
- **Dark/Light Theme**: Seamless theme switching with localStorage persistence
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion for elegant transitions
- **GitHub Integration**: Live GitHub stats and contribution graph
- **Contact Form**: Integrated with Formspree for easy communication
- **Optimized Performance**: Fast loading times and smooth scrolling

## Sections

- Hero/Landing
- About Me
- Featured Projects
- Skills & Technologies
- Work Experience
- Certifications
- GitHub Statistics
- Contact Form

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **HTTP**: Axios
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:3000/Portfolio/](http://localhost:3000/Portfolio/) in your browser

## Customization

### Update Personal Information

Edit [src/utils/constants.js](src/utils/constants.js) to update:
- Name, tagline, email, location
- Social media links
- GitHub username

### Update Content Data

Edit the JSON files in [src/assets/data/](src/assets/data/):
- `projects.json` - Your projects
- `skills.json` - Your skills and technologies
- `experience.json` - Work experience
- `certifications.json` - Professional certifications

### Setup Contact Form

1. Sign up at [Formspree](https://formspree.io)
2. Get your form endpoint
3. Update the `FORMSPREE_ENDPOINT` in [src/components/sections/Contact.jsx](src/components/sections/Contact.jsx:30)

### Add Your Images

Place your images in [public/assets/images/](public/assets/images/):
- Profile photo
- Project screenshots
- Certification badges

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Deployment

### GitHub Pages

1. Create a new GitHub repository
2. Update the `base` path in [vite.config.js](vite.config.js) to match your repository name
3. Push your code to the `main` branch
4. Enable GitHub Pages in repository Settings > Pages > Source: GitHub Actions
5. The workflow will automatically deploy your site

Your site will be available at: `https://YOUR_USERNAME.github.io/Portfolio/`

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
