import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FiAlertCircle, FiCheck, FiX, FiClock, FiRefreshCw, FiEdit, FiEye } from 'react-icons/fi';
import { API_URL } from '../../config';

interface Report {
  id: string;
  description: string;
  neighborhood: string;
  image: string;
  city: string;
  tel?: string;
  status: 'EN_ATTENTE' | 'VALIDE' | 'REJETE' | 'EN_COURS' | 'RESOLU';
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const statusOptions = [
  { value: 'EN_ATTENTE', label: 'En attente', icon: <FiClock className="text-yellow-500" /> },
  { value: 'VALIDE', label: 'Validé', icon: <FiCheck className="text-green-500" /> },
  { value: 'REJETE', label: 'Rejeté', icon: <FiX className="text-red-500" /> },
  { value: 'EN_COURS', label: 'En cours', icon: <FiRefreshCw className="text-blue-500" /> },
  { value: 'RESOLU', label: 'Résolu', icon: <FiCheck className="text-purple-500" /> },
];

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReportId, setEditingReportId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>('EN_ATTENTE');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

   

  useEffect(() => {
    fetchReports();
  }, []);

   const fetchReports = async () => {
    try {
      const response = await api.get('/report');
      setReports(response.data.data.reports); // <-- Correction ici
    } catch (error) {
      toast.error('Erreur lors du chargement des signalements');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reportId: string) => {
    try {
      await api.put(`/report/${reportId}`, { status: editStatus });
      toast.success('Statut mis à jour avec succès');
      setEditingReportId(null);
      fetchReports();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const openImagePreview = (imagePath: string) => {
    setImagePreview(`${API_URL}/${imagePath}`);
  };

  const closeImagePreview = () => {
    setImagePreview(null);
  };

  const getStatusBadge = (status: string) => {
    const statusObj = statusOptions.find(opt => opt.value === status);
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        status === 'EN_ATTENTE' ? 'bg-yellow-100 text-yellow-800' :
        status === 'VALIDE' ? 'bg-green-100 text-green-800' :
        status === 'REJETE' ? 'bg-red-100 text-red-800' :
        status === 'EN_COURS' ? 'bg-blue-100 text-blue-800' :
        'bg-purple-100 text-purple-800'
      }`}>
        {statusObj?.icon}
        <span className="ml-1">{statusObj?.label}</span>
      </span>
    );
  };

  if (loading) {
    return <div className="p-8 text-center">Chargement des signalements...</div>;
  }

  return (
    // ...existing code...
<div className="p-6">
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Gestion des signalements</h2>
      <div className="flex items-center gap-2">
        <FiAlertCircle className="text-green-600" />
        <span className="text-xs sm:text-sm text-gray-600">
          {reports.length} signalement{reports.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
    
    <div className="w-full overflow-x-auto">
      <table className="min-w-[600px] sm:min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
            <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signaleur</th>
            <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
            <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                <button 
                  onClick={() => openImagePreview(report.image)}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden border border-gray-200 hover:border-green-500 transition"
                >
                  <img
                    src={`http://127.0.0.1:5000/${report.image}`} 
                    alt="Signalement"
                    className="w-full h-full object-cover"
                  />
                </button>
              </td>
              <td className="px-2 sm:px-6 py-4 max-w-[120px] sm:max-w-xs">
                <div className="text-xs sm:text-sm text-gray-900 line-clamp-3">{report.description}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  {new Date(report.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-xs sm:text-sm text-gray-900">{report.neighborhood}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">{report.city}</div>
              </td>
              <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-xs sm:text-sm text-gray-900">
                  {report.user.firstName} {report.user.lastName}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500">{report.user.email}</div>
                {report.tel && <div className="text-[10px] sm:text-xs text-gray-500">{report.tel}</div>}
              </td>
              <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                {editingReportId === report.id ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="border rounded p-1 w-full text-xs sm:text-sm"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  getStatusBadge(report.status)
                )}
              </td>
              <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                {editingReportId === report.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(report.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingReportId(null)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 sm:gap-4">
                    <button
                      onClick={() => {
                        setEditingReportId(report.id);
                        setEditStatus(report.status);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                      title="Modifier le statut"
                    >
                      <FiEdit size={14} className="sm:size-4" />
                    </button>
                    <button
                      onClick={() => openImagePreview(report.image)}
                      className="text-green-600 hover:text-green-900"
                      title="Voir l'image"
                    >
                      <FiEye size={14} className="sm:size-4" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Modal de prévisualisation d'image */}
  {imagePreview && (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-2 sm:p-4 border-b flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-medium">Prévisualisation de l'image</h3>
          <button
            onClick={closeImagePreview}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>
        <div className="p-2 sm:p-4">
          <img
            src={imagePreview}
            alt="Signalement en grand"
            className="max-w-full max-h-[60vh] sm:max-h-[70vh] mx-auto"
          />
        </div>
      </div>
    </div>
  )}
</div>
// ...existing code...
  );
};

export default Reports;