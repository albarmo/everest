"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const logger = morgan_1.default;
app.use((0, cors_1.default)());
app.use(logger('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(errorHandler_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ message: '[TCR_Elbrus]: OK' });
});
app.listen(port, () => {
    console.log(`⚡️[TCR_Elbrus]: Server is running at http://localhost:${port}`);
});
