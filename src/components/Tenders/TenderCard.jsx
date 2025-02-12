const TenderCard = ({ tender }) => {
  return (
    <div className="relative p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/80 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg hover:scale-[1.02] transition-all duration-300">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-600/20 blur-md opacity-50 -z-10" />

      <h2 className="text-2xl font-bold text-gray-100 tracking-wide">{tender.title}</h2>
      <p className="text-gray-400 text-sm mt-1">
        <span className="text-cyan-400">ID:</span> {tender.id} | <span className="text-purple-400">Data:</span> {tender.date}
      </p>

      <div className="mt-4 text-gray-300 text-sm space-y-2">
        <p>
          <span className="font-semibold text-cyan-300">Categorie:</span> {tender.category}
        </p>
        <p>
          <span className="font-semibold text-purple-300">SID:</span> {tender.sid}
        </p>
        <p>
          <span className="font-semibold text-green-300">Valoare:</span> {tender.awarded_value_eu} €
        </p>
        <p>
          <span className="font-semibold text-yellow-300">Furnizor:</span> {tender.supplier?.label} 
          <span className="text-gray-400"> (ID: {tender.supplier?.id})</span>
        </p>
        <p>
          <span className="font-semibold text-red-300">Achizitor:</span> {tender.purchaser?.name || "N/A"} 
          <span className="text-gray-400"> (ID: {tender.purchaser?.id})</span>
        </p>
      </div>

      {tender.awarded && tender.awarded.length > 0 && (
        <div className="mt-6 p-4 border border-gray-700/60 rounded-lg bg-gray-900/50">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">🏆 Detalii Awarded</h3>
          {tender.awarded.map((award, index) => (
            <div key={index} className="mt-2 p-2 border-t border-gray-700/40">
              <p>
                <span className="font-semibold text-blue-300">Data:</span> {award.date}
              </p>
              <p>
                <span className="font-semibold text-orange-300">Suppliers ID:</span> {award.suppliers_id}
              </p>
              <p>
                <span className="font-semibold text-green-300">Count:</span> {award.count}
              </p>
              <p>
                <span className="font-semibold text-purple-300">Suppliers Name:</span> {award.suppliers_name}
              </p>
              <p>
                <span className="font-semibold text-pink-300">Value:</span> {award.value} €
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenderCard;
