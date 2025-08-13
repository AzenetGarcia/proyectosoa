export default function SalesTable({ sales, loading, onCancel }) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
        <p className="text-amber-700 font-medium mt-2">Cargando ventas...</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border text-left">Fecha</th>
            <th className="p-2 border text-left">Vendedor</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Método</th>
            <th className="p-2 border">Estatus</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 && (
            <tr>
              <td className="p-3 text-center text-gray-500" colSpan={7}>
                No hay ventas registradas
              </td>
            </tr>
          )}
          {sales.map((s) => (
            <tr key={s._id || s.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                {s.created_at ? new Date(s.created_at).toLocaleString() : '—'}
              </td>
              <td className="p-2 border">{s.user_id || '—'}</td>
              <td className="p-2 border text-center">
                {Array.isArray(s.products)
                  ? s.products.reduce((acc, p) => acc + (p.quantity || 0), 0)
                  : 0}
              </td>
              <td className="p-2 border text-right">${Number(s.total || 0).toFixed(2)}</td>
              <td className="p-2 border text-center">{s.payment_method}</td>
              <td className="p-2 border text-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    s.status === 'cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {s.status}
                </span>
              </td>
              <td className="p-2 border text-center">
                {s.status !== 'cancelled' && (
                  <button
                    onClick={() => onCancel(s)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
