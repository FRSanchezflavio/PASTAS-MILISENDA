import { productRepository } from '../repositories/product.repository.js';

export const getAllProducts = async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const result = await productRepository.getProducts({
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      query
    });

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const getProductDetail = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productRepository.getProductById(pid);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    
    res.render('productDetail', { product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Validar campos requeridos
    if (!productData.name || !productData.category || !productData.price) {
      return res.status(400).json({
        status: 'error',
        message: 'Nombre, categoría y precio son campos requeridos'
      });
    }

    const product = await productRepository.createProduct(productData);
    
    res.status(201).json({
      status: 'success',
      payload: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    
    const product = await productRepository.updateProduct(pid, productData);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    
    res.json({
      status: 'success',
      payload: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    
    const result = await productRepository.deleteProduct(pid);
    if (!result) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    
    res.json({
      status: 'success',
      message: 'Producto eliminado correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};
