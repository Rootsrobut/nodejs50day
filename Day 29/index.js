import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
const app = express();
app.use(express.static('public'));

const productsController =
  new ProductsController();
const usersController = new UserController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

app.get('/register', usersController.getRegister);
app.post('/register', usersController.postRegister);
app.get('/', productsController.getProducts);
app.get(
  '/add-product',
  productsController.getAddProduct
);

app.get(
  '/update-product/:id',
  productsController.getUpdateProductView
);

app.post(
  '/delete-product/:id',
  productsController.deleteProduct
);

app.post(
  '/',
  uploadFile.single('imageUrl'),
  validationMiddleware,
  productsController.postAddProduct
);

app.post(
  '/update-product',
  productsController.postUpdateProduct
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
