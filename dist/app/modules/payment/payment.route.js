"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_validation_1 = require("./payment.validation");
const router = (0, express_1.Router)();
router.post('/confirmation', payment_controller_1.PaymentController.confirmationController);
router.post('/monetization', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(payment_validation_1.PaymentValidation.paymentValidationSchema), payment_controller_1.PaymentController.paymentForMonetization);
router.get('/info', (0, auth_1.default)('admin', 'user'), payment_controller_1.PaymentController.getPaymentInfo);
exports.paymentRoutes = router;
