This is a [Next.js](https://nextjs.org) project which is deployed on this addess: https://gt-cn.netlify.app/
The code for this project could be find here: https://github.com/CipriaNeamtu/gtcn-app

## Description
Explore a dynamic web quiz experience that engages users with interactive questions across diverse topics. Our quiz platform blends intuitive design with seamless functionality, allowing participants to test their knowledge while enjoying a smooth, responsive interface. Featuring personalized user profiles, real-time scoring, and detailed performance analytics, our project aims to elevate learning and entertainment. Built on robust technologies like React, Next.js, and TypeScript, it ensures reliability and scalability. Join us in redefining the quiz experience, where learning meets enjoyment seamlessly.


## Getting Started
Install the node modules and start the server.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Development
The project use NextJs Api Routes and NextUI components.
You could use the imported components or switch them with new ones.

The main page is located on app/page.tsx.
The NavBar and Footer components are imported to main page because we need them in all pages.
Then we have a navigation to the quiz categories, the selected quiz and then to the questions.
The application allows you to add new questions in any quiz category from the Dashboard page.

Feel free to improve this application in any way.