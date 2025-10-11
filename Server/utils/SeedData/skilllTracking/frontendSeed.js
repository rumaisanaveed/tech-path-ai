import { sequelize } from "../../../config/connectDB.js";
import { CreateModule } from "../../../controllers/admin/SkillTracking/module/moduleService.js";
import { DomainModuleMapping } from "../../../models/index.js";



const bulkInsert = [
  {
    id: 1,
    title: "Introduction to HTML",
    description:
      "This lesson covers the basics of HTML including structure, elements, and common tags needed to build a simple webpage.",
    badge: "HTML Rookie",
    totalXP: 130,
    typeId: 1,
    sequence: 1,
    isFeatured: true,
    slug: "introduction-to-html",
    prerequisiteModuleId: null,
    createdBy: null,
  },
  {
    id: 2,
    title: "CSS Fundamentals",
    description:
      "Learn how to style web pages using Cascading Style Sheets (CSS). Understand selectors, properties, and the box model to bring your HTML to life.",
    badge: "CSS Fundamentals",
    totalXP: 150,
    typeId: 1,
    sequence: 2,
    isFeatured: true,
    slug: "css-fundamentals",
    prerequisiteModuleId: 1,
    createdBy: null,
  },
  {
    id: 3,
    title: "CSS Flexbox",
    description:
      "Master the Flexbox layout model to create flexible, responsive layouts with ease. Learn alignment, distribution, and ordering of elements.",
    badge: "Flex Champion",
    totalXP: 155,
    typeId: 1,
    sequence: 3,
    isFeatured: true,
    slug: "css-flexbox",
    prerequisiteModuleId: 2,
    createdBy: null,
  },
  {
    id: 4,
    title: "CSS Grid Layout",
    description:
      "Learn CSS Grid, the most powerful layout system in CSS. Create complex, two-dimensional layouts with rows and columns.",
    badge: "Grid Guru",
    totalXP: 160,
    typeId: 1,
    sequence: 4,
    isFeatured: true,
    slug: "css-grid-layout",
    prerequisiteModuleId: 2,
    createdBy: null,
  },
  {
    id: 5,
    title: "CSS Animations & Transitions",
    description:
      "Bring your designs to life with CSS animations and transitions. Learn keyframes, timing functions, and how to create smooth interactive effects.",
    badge: "Animation Artist",
    totalXP: 150,
    typeId: 1,
    sequence: 5,
    isFeatured: true,
    slug: "css-animations-transitions",
    prerequisiteModuleId: 2,
    createdBy: null,
  },
  {
    id: 6,
    title: "Responsive Web Design",
    description:
      "Master the art of building layouts that look great on any device using media queries, flexible units, and mobile-first principles.",
    badge: "Responsive Design",
    totalXP: 165,
    typeId: 2,
    sequence: 6,
    isFeatured: true,
    slug: "responsive-web-design",
    prerequisiteModuleId: 3,
    createdBy: null,
  },
  {
    id: 7,
    title: "Web Accessibility (a11y) Fundamentals",
    description:
      "Learn how to build accessible web applications using semantic HTML, ARIA attributes, keyboard navigation, and screen reader considerations.",
    badge: "A11y Advocate",
    totalXP: 150,
    typeId: 1,
    sequence: 7,
    isFeatured: true,
    slug: "web-accessibility-fundamentals",
    prerequisiteModuleId: 1,
    createdBy: null,
  },
  {
    id: 8,
    title: "Introduction to JavaScript",
    description:
      "Get started with JavaScript, the programming language of the web. Learn variables, data types, operators, and control structures to make web pages interactive.",
    badge: "Intro JS",
    totalXP: 160,
    typeId: 1,
    sequence: 8,
    isFeatured: true,
    slug: "introduction-to-javascript",
    prerequisiteModuleId: 1,
    createdBy: null,
  },
  {
    id: 9,
    title: "JavaScript Functions & Loops",
    description:
      "Master JavaScript functions, loops, and control flow to write reusable and efficient code.",
    badge: "JS Functions",
    totalXP: 140,
    typeId: 1,
    sequence: 9,
    isFeatured: true,
    slug: "javascript-functions-and-loops",
    prerequisiteModuleId: 8,
    createdBy: null,
  },
  {
    id: 10,
    title: "ES6+ JavaScript Features",
    description:
      "Master modern JavaScript features including destructuring, spread/rest operators, template literals, and arrow functions that make code cleaner and more efficient.",
    badge: "ES6 Expert",
    totalXP: 145,
    typeId: 1,
    sequence: 10,
    isFeatured: true,
    slug: "es6-javascript-features",
    prerequisiteModuleId: 9,
    createdBy: null,
  },
  {
    id: 11,
    title: "JavaScript Array Methods",
    description:
      "Learn essential array methods like map, filter, reduce, find, and forEach to manipulate data efficiently and write functional programming style code.",
    badge: "Array Wizard",
    totalXP: 150,
    typeId: 1,
    sequence: 11,
    isFeatured: true,
    slug: "javascript-array-methods",
    prerequisiteModuleId: 10,
    createdBy: null,
  },
  {
    id: 12,
    title: "DOM Manipulation",
    description:
      "Learn how to interact with and modify the Document Object Model (DOM) using JavaScript to dynamically update content, styles, and elements.",
    badge: "DOM Mastery",
    totalXP: 155,
    typeId: 1,
    sequence: 12,
    isFeatured: true,
    slug: "dom-manipulation",
    prerequisiteModuleId: 8,
    createdBy: null,
  },
  {
    id: 13,
    title: "JavaScript Events & Event Listeners",
    description:
      "Learn how to handle user interactions using event listeners, event types, and callback functions.",
    badge: "Event Enchanter",
    totalXP: 160,
    typeId: 1,
    sequence: 13,
    isFeatured: true,
    slug: "javascript-events-and-event-listeners",
    prerequisiteModuleId: 12,
    createdBy: null,
  },
  {
    id: 14,
    title: "Asynchronous JavaScript",
    description:
      "Understand asynchronous programming with callbacks, Promises, and async/await to handle time-consuming operations without blocking your code.",
    badge: "Async Master",
    totalXP: 170,
    typeId: 2,
    sequence: 14,
    isFeatured: true,
    slug: "asynchronous-javascript",
    prerequisiteModuleId: 9,
    createdBy: null,
  },
  {
    id: 15,
    title: "Working with APIs & Fetch",
    description:
      "Learn how to fetch data from REST APIs using the Fetch API, handle responses, errors, and integrate external data into your applications.",
    badge: "API Navigator",
    totalXP: 175,
    typeId: 2,
    sequence: 15,
    isFeatured: true,
    slug: "working-with-apis-fetch",
    prerequisiteModuleId: 14,
    createdBy: null,
  },
  {
    id: 16,
    title: "Browser DevTools & Debugging",
    description:
      "Master browser developer tools for debugging JavaScript, inspecting elements, monitoring network requests, and profiling performance.",
    badge: "Debug Detective",
    totalXP: 135,
    typeId: 1,
    sequence: 16,
    isFeatured: true,
    slug: "browser-devtools-debugging",
    prerequisiteModuleId: 8,
    createdBy: null,
  },
  {
    id: 17,
    title: "Git & Version Control Basics",
    description:
      "Learn essential Git commands for version control: commits, branches, merging, and collaborating on GitHub. Essential for every developer.",
    badge: "Git Guardian",
    totalXP: 140,
    typeId: 1,
    sequence: 17,
    isFeatured: true,
    slug: "git-version-control-basics",
    prerequisiteModuleId: null,
    createdBy: null,
  },
  {
    id: 18,
    title: "NPM & Package Management",
    description:
      "Understand how to use npm (Node Package Manager) to install, manage, and update packages in your JavaScript projects.",
    badge: "Package Pro",
    totalXP: 130,
    typeId: 1,
    sequence: 18,
    isFeatured: true,
    slug: "npm-package-management",
    prerequisiteModuleId: 17,
    createdBy: null,
  },
  {
    id: 19,
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React, including components, JSX, and how React changes the way we build user interfaces.",
    badge: "React Rookie",
    totalXP: 150,
    typeId: 1,
    sequence: 19,
    isFeatured: true,
    slug: "introduction-to-react",
    prerequisiteModuleId: 11,
    createdBy: null,
  },
  {
    id: 20,
    title: "React State & Props",
    description:
      "Understand how to manage data within components using state and share data using props.",
    badge: "State Wizard",
    totalXP: 155,
    typeId: 1,
    sequence: 20,
    isFeatured: true,
    slug: "react-state-and-props",
    prerequisiteModuleId: 19,
    createdBy: null,
  },
  {
    id: 21,
    title: "React Hooks Fundamentals",
    description:
      "Learn core React Hooks like useState and useEffect to manage state and side effects in functional components.",
    badge: "Hook Hero",
    totalXP: 155,
    typeId: 1,
    sequence: 21,
    isFeatured: true,
    slug: "react-hooks-fundamentals",
    prerequisiteModuleId: 20,
    createdBy: null,
  },
  {
    id: 22,
    title: "React Conditional Rendering",
    description:
      "Learn how to render components conditionally in React based on state or props.",
    badge: "Render Master",
    totalXP: 150,
    typeId: 1,
    sequence: 22,
    isFeatured: true,
    slug: "react-conditional-rendering",
    prerequisiteModuleId: 20,
    createdBy: null,
  },
  {
    id: 23,
    title: "React Lists & Keys",
    description:
      "Master rendering lists in React and the importance of keys for stable component identity.",
    badge: "List Legend",
    totalXP: 150,
    typeId: 1,
    sequence: 23,
    isFeatured: true,
    slug: "react-lists-and-keys",
    prerequisiteModuleId: 22,
    createdBy: null,
  },
  {
    id: 24,
    title: "Lifting State Up / Component Communication",
    description:
      "Learn how to manage shared state between components by lifting state up to a common ancestor.",
    badge: "State Connector",
    totalXP: 155,
    typeId: 1,
    sequence: 24,
    isFeatured: true,
    slug: "lifting-state-up-component-communication",
    prerequisiteModuleId: 20,
    createdBy: null,
  },
  {
    id: 25,
    title: "React Forms & Events",
    description:
      "Handle user input, forms, and events in React applications using controlled and uncontrolled components.",
    badge: "Form Mage",
    totalXP: 155,
    typeId: 1,
    sequence: 25,
    isFeatured: true,
    slug: "react-forms-and-events",
    prerequisiteModuleId: 13,
    createdBy: null,
  },
  {
    id: 26,
    title: "React Router Basics",
    description:
      "Learn how to navigate between pages in React using React Router for single-page application routing.",
    badge: "Route Navigator",
    totalXP: 140,
    typeId: 1,
    sequence: 26,
    isFeatured: true,
    slug: "react-router-basics",
    prerequisiteModuleId: 19,
    createdBy: null,
  },
  {
    id: 27,
    title: "React useContext & Context API",
    description:
      "Learn how to manage global state in React using the Context API and useContext hook to avoid prop drilling and share data across components.",
    badge: "Context King",
    totalXP: 165,
    typeId: 2,
    sequence: 27,
    isFeatured: true,
    slug: "react-usecontext-context-api",
    prerequisiteModuleId: 21,
    createdBy: null,
  },
  {
    id: 28,
    title: "React useReducer Hook",
    description:
      "Master the useReducer hook for managing complex state logic in React. Learn when to use useReducer vs useState and how to structure reducers.",
    badge: "Reducer Expert",
    totalXP: 170,
    typeId: 2,
    sequence: 28,
    isFeatured: true,
    slug: "react-usereducer-hook",
    prerequisiteModuleId: 21,
    createdBy: null,
  },
  {
    id: 29,
    title: "Custom React Hooks",
    description:
      "Learn how to create custom hooks to extract and reuse component logic across your application, making your code more modular and maintainable.",
    badge: "Hook Architect",
    totalXP: 165,
    typeId: 2,
    sequence: 29,
    isFeatured: true,
    slug: "custom-react-hooks",
    prerequisiteModuleId: 21,
    createdBy: null,
  },
  {
    id: 30,
    title: "React Performance Optimization",
    description:
      "Optimize your React applications using React.memo, useMemo, useCallback, and lazy loading to prevent unnecessary re-renders and improve performance.",
    badge: "Perf Optimizer",
    totalXP: 180,
    typeId: 2,
    sequence: 30,
    isFeatured: true,
    slug: "react-performance-optimization",
    prerequisiteModuleId: 27,
    createdBy: null,
  },
  {
    id: 31,
    title: "State Management with Redux Toolkit",
    description:
      "Learn modern Redux with Redux Toolkit for predictable state management in large React applications. Understand slices, reducers, and middleware.",
    badge: "Redux Master",
    totalXP: 185,
    typeId: 2,
    sequence: 31,
    isFeatured: true,
    slug: "state-management-redux-toolkit",
    prerequisiteModuleId: 28,
    createdBy: null,
  },
  {
    id: 32,
    title: "Introduction to TypeScript",
    description:
      "Get started with TypeScript, a typed superset of JavaScript. Learn types, interfaces, and how TypeScript helps catch errors before runtime.",
    badge: "Type Tamer",
    totalXP: 175,
    typeId: 2,
    sequence: 32,
    isFeatured: true,
    slug: "introduction-to-typescript",
    prerequisiteModuleId: 10,
    createdBy: null,
  },
  {
    id: 33,
    title: "React with TypeScript",
    description:
      "Learn how to use TypeScript with React, including typing props, state, events, and hooks for type-safe React applications.",
    badge: "TS React Pro",
    totalXP: 190,
    typeId: 2,
    sequence: 33,
    isFeatured: true,
    slug: "react-with-typescript",
    prerequisiteModuleId: 32,
    createdBy: null,
  },
  {
    id: 34,
    title: "Introduction to Testing with Jest",
    description:
      "Learn the basics of testing JavaScript code with Jest, including unit tests, test structure, assertions, and mocking.",
    badge: "Test Warrior",
    totalXP: 180,
    typeId: 2,
    sequence: 34,
    isFeatured: true,
    slug: "introduction-to-testing-jest",
    prerequisiteModuleId: 11,
    createdBy: null,
  },
  {
    id: 35,
    title: "React Testing Library",
    description:
      "Learn how to test React components using React Testing Library, focusing on user behavior and integration testing rather than implementation details.",
    badge: "Test Specialist",
    totalXP: 185,
    typeId: 2,
    sequence: 35,
    isFeatured: true,
    slug: "react-testing-library",
    prerequisiteModuleId: 34,
    createdBy: null,
  },
];

export async function insertModules() {
  try {
    for (const mod of bulkInsert) {
      // 👇 Adjust data according to your CreateModule() expectations
      const data = {
        title: mod.title,
        description: mod.description,
        badge: mod.badge,
        totalXp: mod.totalXP, // note lowercase "Xp" expected by CreateModule
        typeId: mod.typeId,
        sequence: mod.sequence,
        isFeatured: mod.isFeatured,
        prerequisiteModuleId: mod.prerequisiteModuleId,
        createdBy: 6,
        domainId: 3, // ✅ <-- change this to your domain ID (frontend, backend, etc.)
      };

      const created = await CreateModule(data);
      console.log(`✅ Inserted: ${created.title}`);
    }

    console.log('\n🎉 All modules inserted successfully!');
  } catch (error) {
    console.error('❌ Error inserting modules:', error.message);
  } 
}

export const seedDomainModules = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected.");

    // Optional: clear existing mappings for careerDomainId = 3
    await DomainModuleMapping.destroy({
      where: { careerDomainId: 3 },
    });
    console.log("🗑 Cleared old mappings for careerDomainId = 3.");

    // Prepare new mappings
    const newMappings = [];
    for (let moduleId = 1; moduleId <= 35; moduleId++) {
      newMappings.push({
        careerDomainId: 3,
        moduleId,
      });
    }

    // Bulk insert
    await DomainModuleMapping.bulkCreate(newMappings, { ignoreDuplicates: true });
    console.log(`✅ Inserted ${newMappings.length} module mappings for careerDomainId = 3.`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding domain modules:", error);
    process.exit(1);
  }
};