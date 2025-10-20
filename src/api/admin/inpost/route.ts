import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import InpostFulfillmentService from "../../../services/inpost-fulfillment"
import { AdminGetOrdersParams, AdminPostOrdersOrderFulfillmentsReq, AdminPostOrdersOrderReq, AdminPostOrdersOrderReturnsReq } from "@medusajs/admin-sdk"
import { MikroORM, EntityManager } from "@mikro-orm/core"
import { Migration } from "@mikro-orm/migrations"
import { PostgresDriver } from "@mikro-orm/postgresql"
import { AwilixContainer } from "awilix"
import { Client } from "pg"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
): Promise<any> => {
  const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
    "inpostFulfillmentService"
  )

  res.json(await inpostFulfillmentService.getFulfillmentOptions())
}
