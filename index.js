const express = require("express")
const { GracefulShutdownServer } = require("medusa-core-utils")

const loaders = require("@medusajs/medusa/dist/loaders/index").default

;(async() => {
  async function start() {
    const app = express()
    const directory = process.cwd()

    try {
      const { container } = await loaders({
        directory,
        expressApp: app,
        dependencies: {
          "@medusajs/admin-sdk": "2.7.1",
          "@medusajs/cli": "2.7.1",
          "@medusajs/framework": "2.7.1",
          "@medusajs/medusa": "2.7.1",
          "@mikro-orm/core": "6.4.3",
          "@mikro-orm/knex": "6.4.3",
          "@mikro-orm/migrations": "6.4.3",
          "@mikro-orm/postgresql": "6.4.3",
          "awilix": "^8.0.1",
          "pg": "^8.13.0"
        }
      })
      const configModule = container.resolve("configModule")
      const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000

      const server = GracefulShutdownServer.create(
        app.listen(port, (err) => {
          if (err) {
            return
          }
          console.log(`Server is ready on port: ${port}`)
        })
      )

      // Handle graceful shutdown
      const gracefulShutDown = () => {
        server
          .shutdown()
          .then(() => {
            console.info("Gracefully stopping the server.")
            process.exit(0)
          })
          .catch((e) => {
            console.error("Error received when shutting down the server.", e)
            process.exit(1)
          })
      }
      process.on("SIGTERM", gracefulShutDown)
      process.on("SIGINT", gracefulShutDown)
    } catch (err) {
      console.error("Error starting server", err)
      process.exit(1)
    }
  }

  await start()
})()
