"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const payment_utils_1 = require("./payment.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const confirmationService = (transactionId, status, email) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    if (verifyResponse && (verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.pay_status) === 'Successful') {
        yield user_model_1.User.findOneAndUpdate({ email }, {
            $set: { premiumMember: true },
        }, { new: true });
    }
    const successTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .success {
            color: #4CAF50;
          }
          .cancel {
            color: #f44336;
          }
          .redirect-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            color: #fff;
          }
          .success-link {
            background-color: #4CAF50;
          }
          .cancel-link {
            background-color: #f44336;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="${status === 'success' ? 'success' : 'cancel'}">
            Payment ${status === 'success' ? 'Successful' : 'Canceled'}
          </h1>
          <a href="${config_1.default.client_url}" class="redirect-link ${status === 'success' ? 'success-link' : 'cancel-link'}">
            ${status === 'success' ? 'Go to Dashboard' : 'Retry Payment'}
          </a>
        </div>
      </body>
    </html>
  `;
    return successTemplate;
});
const paymentForMonetization = (loggerUser, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield user_model_1.User.findOne({ email: loggerUser.email });
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.OK, 'User not found');
    }
    if (isExistUser.premiumMember) {
        throw new AppError_1.default(http_status_1.default.OK, 'You are already a premium member');
    }
    const transactionId = `TXN-${Date.now()}${Math.floor(10000 + Math.random()) * 90000}`;
    const paymentInfo = {
        transactionId,
        amount,
        customerName: isExistUser.name,
        customerEmail: isExistUser.email,
        customerPhone: isExistUser.phone,
        customerAddress: isExistUser.address,
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentInfo);
    const result = yield user_model_1.User.findOneAndUpdate({
        email: loggerUser.email,
    }, {
        $set: {
            transactionId,
        },
    });
    if (isExistUser) {
        yield user_model_1.User.findOneAndUpdate({ email: loggerUser.email }, {
            $set: { premiumMember: true },
        });
    }
    return {
        result,
        paymentSession,
    };
});
const getPaymentInfoUser = (loggerUser) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield user_model_1.User.findOne({
        email: loggerUser.email,
        premiumMember: true,
    });
    if (!payment) {
        throw new AppError_1.default(http_status_1.default.OK, 'User not found');
    }
    return payment;
});
exports.PaymentServices = {
    confirmationService,
    paymentForMonetization,
    getPaymentInfoUser
};
