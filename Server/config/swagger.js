import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tech Path AI API",
      version: "1.0.0",
      description: "Tech Path AI Backend API Documentation",
    },

    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],

    /**
     * 🔐 Security
     */
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    /**
     * 🏷️ Global Tags (ORDERED & CLEAN)
     */
    tags: [
      {
        name: "Blogs",
        description: "Public blog endpoints",
      },
      {
        name: "Admin Blogs",
        description: "Administrative blog management",
      },
      { name: "Events", description: "Public event APIs" },

      { name: "Admin Events", description: "Administrative event management" },
      {
        name: "Authentication",
        description: "User authentication APIs",
      },
      {
        name: "Assessment",
        description: "Skill assessment APIs",
      },
      {
        name: "Career Explorer",
        description: "Public career exploration endpoints",
      },
    ],
  },

  /**
   * 📂 IMPORTANT: Scan ALL route files
   */
  apis: ["./routes/**/*.js", "./controllers/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
