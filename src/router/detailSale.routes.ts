import {
  addDetailSaleHandler,
  deleteDetailSaleHandler,
  detailSaleUpdateErrorHandler,
  getDetailSaleByDateHandler,
  getDetailSaleDatePagiHandler,
  getDetailSaleHandler,
  preSetDetailSaleHandler,
  updateDetailSaleHandler,
} from "../controller/detailSale.controller";
import { managerValidator } from "../middleware/managerValidator";

import { hasAnyPermit } from "../middleware/permitValidator";
import { roleValidator } from "../middleware/roleValidator";
import { validateAll, validateToken } from "../middleware/validator";
import {
  allSchemaId,
  detailSaleErrorUpdateSchema,
  detailSaleSchema,
  detailSaleUpdateSchema,
} from "../schema/schema";

const detailSaleRoute = require("express").Router();

detailSaleRoute.get(
  "/pagi/:page",
  validateToken,
  hasAnyPermit(["view"]),
  getDetailSaleHandler
);

detailSaleRoute.get(
  "/by-date",
  validateToken,
  hasAnyPermit(["view"]),
  getDetailSaleByDateHandler
);

detailSaleRoute.get(
  "/pagi/by-date/:page",
  validateToken,
  hasAnyPermit(["view"]),
  getDetailSaleDatePagiHandler
);

//that for only device
detailSaleRoute.post(
  "/",
  validateToken,
  validateAll(detailSaleSchema),
  addDetailSaleHandler
);

detailSaleRoute.post(
  "/preset",
  validateToken,
  validateAll(detailSaleSchema),
  preSetDetailSaleHandler
);

detailSaleRoute.patch(
  "/",
  validateToken,
  validateAll(allSchemaId),
  updateDetailSaleHandler
);

detailSaleRoute.patch(
  "/error",
  validateToken,
  validateAll(detailSaleErrorUpdateSchema),
  managerValidator,
  detailSaleUpdateErrorHandler
);

detailSaleRoute.delete(
  "/",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["delete"]),
  validateAll(allSchemaId),
  deleteDetailSaleHandler
);

export default detailSaleRoute;
