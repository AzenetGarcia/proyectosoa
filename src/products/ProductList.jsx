import { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';

const ProductList = ({ products, onEdit, onDelete }) => {
  const [productToDelete, setProductToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const getCategoryDisplayName = (categoryName) => {
    const categoryMap = {
      'blanco': 'Blanco',
      'integral': 'Integral', 
      'dulce': 'Dulce',
      'artesanal': 'Artesanal',
      'sin_gluten': 'Sin Gluten',
      'regional': 'Regional',
      'enriquecido': 'Enriquecido',
      'de_molde': 'De Molde',
      'crujiente': 'Crujiente',
      'dulce_relleno': 'Dulce Relleno',
      'salado': 'Salado',
      'festivo': 'Festivo',
      'vegano': 'Vegano'
    };
    return categoryMap[categoryName] || categoryName || 'Sin categoría';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'text-red-600 bg-red-50', text: 'Sin stock', badge: '🚫' };
    if (stock <= 10) return { color: 'text-orange-600 bg-orange-50', text: `Bajo: ${stock}`, badge: '⚠️' };
    return { color: 'text-green-600 bg-green-50', text: `Stock: ${stock}`, badge: '✅' };
  };

  return (
    <>
      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
          <p className="text-gray-500">No se encontraron productos que coincidan con los filtros aplicados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => {
            const stockStatus = getStockStatus(product.stock);
            const margin = product.purchase_price > 0 
              ? ((product.sale_price - product.purchase_price) / product.purchase_price * 100)
              : 0;
            
            return (
              <div 
                key={product.id} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-orange-300"
              >
                {/* Header con nombre y stock */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-amber-900 line-clamp-2 flex-1 pr-3">
                    🍞 {product.name}
                  </h3>
                  <span className={`inline-flex items-center text-xs px-2.5 py-1.5 rounded-full font-medium ${stockStatus.color}`}>
                    <span className="mr-1">{stockStatus.badge}</span>
                    {stockStatus.text}
                  </span>
                </div>

                {/* Categoría */}
                <div className="mb-3">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-3 py-1.5 rounded-full font-medium">
                    📂 {getCategoryDisplayName(product.category_name)}
                  </span>
                </div>

                {/* Precios y márgenes */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center">
                      💰 Compra:
                    </span>
                    <span className="font-semibold text-gray-800">
                      ${(product.purchase_price || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center">
                      💵 Venta:
                    </span>
                    <span className="font-semibold text-orange-600">
                      ${(product.sale_price || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center">
                      📈 Margen:
                    </span>
                    <span className={`font-semibold ${margin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {margin.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t pt-2">
                    <span className="text-gray-600 flex items-center">
                      💎 Valor inventario:
                    </span>
                    <span className="font-semibold text-blue-600">
                      ${((product.sale_price || 0) * (product.stock || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                {product.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* IVA */}
                <div className="mb-4 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    🧾 IVA: {product.iva || 16}%
                  </span>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => setProductToDelete(product)}
                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    🗑️ Eliminar
                  </button>
                </div>

                {/* Indicador de ID para debug */}
                <div className="mt-2 text-xs text-gray-400 text-center">
                  ID: {product.id}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={productToDelete !== null}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name}
      />
    </>
  );
};

export default ProductList;